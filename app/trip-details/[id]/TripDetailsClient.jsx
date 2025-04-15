"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext"; // Import theme context
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TodayIcon from "@mui/icons-material/Today";
import {
  Place as PlaceIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  DeleteOutline as DeleteIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Share as ShareIcon,
  ArrowBack as BackIcon,
  LocationOn as LocationOnIcon,
  Label as LabelIcon,
  CalendarMonth as CalendarMonthIcon,
  Notes as NotesIcon,
  Check as CheckIcon, // Add this missing import
} from "@mui/icons-material";
import styled from "styled-components";

// Styled components for this page
const TripDetailsContainer = styled.div`
  max-width: 1000px;
  margin: 6rem auto 3rem;
  padding: 0 2rem;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin: 5rem auto 2rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    margin: 4.5rem auto 1.5rem;
    padding: 0 1rem;
  }
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 20px;

  &:hover {
    color: ${(props) =>
      props.theme.colors.accent || props.theme.colors.primary};
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const TitleSection = styled.div`
  text-align: right;
  flex: 1;

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--primary-color);

    @media (max-width: 768px) {
      font-size: 26px;
    }

    @media (max-width: 480px) {
      font-size: 22px;
    }
  }

  .trip-dates {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    color: var(--text-secondary);
    font-size: 15px;

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }
`;

const FavoriteButtonWrapper = styled(motion.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  svg {
    font-size: 32px;

    @media (max-width: 480px) {
      font-size: 28px;
    }
  }
`;

const ActionButtonsBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: flex-end;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &.primary {
    background: var(--primary-color);
    color: white;
  }

  &.secondary {
    background: rgba(59, 88, 152, 0.1);
    color: var(--primary-color);
  }

  &.danger {
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
  }

  svg {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;

    svg {
      font-size: 16px;
    }
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
    border-radius: 12px;
  }
`;

const CarouselImage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f9fc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SectionCard = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px
    ${(props) =>
      props.theme.darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.08)"};

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${(props) =>
      props.theme.colors.accent || props.theme.colors.primary};
    text-align: right;
    position: relative;
    padding-right: 16px;

    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
      background-color: ${(props) => props.theme.colors.primary};
      border-radius: 2px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

const DetailBoxes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  direction: rtl;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DetailBox = styled.div`
  background: ${(props) => props.$color || "rgba(59, 88, 152, 0.05)"};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.$iconBg || "rgba(59, 88, 152, 0.1)"};

    svg {
      color: ${(props) => props.$iconColor || "var(--primary-color)"};
      font-size: 20px;
    }
  }

  .content {
    flex: 1;

    .label {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }
  }

  @media (max-width: 480px) {
    padding: 14px;

    .icon {
      width: 36px;
      height: 36px;

      svg {
        font-size: 18px;
      }
    }

    .content {
      .label {
        font-size: 12px;
      }

      .value {
        font-size: 15px;
      }
    }
  }
`;

const Timeline = styled.div`
  padding-right: 24px;
  position: relative;
  margin-top: 20px;
  direction: rtl;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 10px;
    width: 2px;
    background-color: rgba(59, 88, 152, 0.2);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: ${(props) => (props.$isLast ? "0" : "24px")};
  padding-right: 20px;

  &::before {
    content: "";
    position: absolute;
    right: 1px;
    top: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--primary-color);
    z-index: 1;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text-primary);
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
  }

  @media (max-width: 480px) {
    padding-bottom: ${(props) => (props.$isLast ? "0" : "20px")};

    &::before {
      width: 16px;
      height: 16px;
      top: 5px;
    }

    h3 {
      font-size: 15px;
    }

    p {
      font-size: 13px;
    }
  }
`;

const NotesSection = styled.div`
  white-space: pre-line;
  direction: rtl;
  text-align: right;
  line-height: 1.6;
  color: var(--text-primary);
  font-size: 15px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: ${(props) => {
    switch (props.status) {
      case "completed":
        return "rgba(76, 175, 80, 0.9)";
      case "cancelled":
        return "rgba(244, 67, 54, 0.9)";
      default:
        return "rgba(33, 150, 243, 0.9)";
    }
  }};
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    bottom: 15px;
    right: 15px;
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 20px;

    svg {
      font-size: 16px;
    }
  }
`;

// Add these custom arrow components
const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIcon style={{ color: "white" }} />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIcon style={{ color: "white" }} />
    </div>
  );
};

// ...existing code...

const ScheduleSection = styled.div`
  margin-top: 20px;
`;

const DayCard = styled.div`
  background: ${(props) => props.theme?.colors?.surface || "#ffffff"};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px
    ${(props) =>
      props.theme?.darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.08)"};
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 10px;
  }
`;

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid
    ${(props) =>
      props.theme?.darkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.06)"};

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: ${(props) => props.theme?.colors?.primary || "#3b5898"};
  }
`;

const ActivityItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${(props) =>
    props.theme?.darkMode
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(59, 88, 152, 0.05)"};
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  .time {
    font-weight: 600;
    margin-bottom: 4px;
    color: ${(props) => props.theme?.colors?.primary || "#3b5898"};
  }

  .activity {
    color: ${(props) => props.theme?.colors?.text || "#333333"};
  }

  .place {
    font-size: 13px;
    margin-top: 4px;
    color: ${(props) =>
      props.theme?.colors?.textSecondary ||
      props.theme?.colors?.text ||
      "#666666"};
    opacity: ${(props) => (props.theme?.darkMode ? 0.7 : 0.6)};
  }
`;

const TipsList = styled.ul`
  padding-right: 20px;
  padding-left: 0;
  direction: rtl;

  li {
    margin-bottom: 10px;
    position: relative;
    color: ${(props) => props.theme?.colors?.text || "#333333"};

    &::marker {
      color: ${(props) => props.theme?.colors?.primary || "#3b5898"};
    }
  }
`;

const PlacesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PlaceCard = styled.div`
  background: ${(props) => props.theme?.colors?.surface || "#ffffff"};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px
    ${(props) =>
      props.theme?.darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.08)"};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px
      ${(props) =>
        props.theme?.darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.12)"};
  }
`;

const PlaceImage = styled.div`
  height: 150px;
  background: ${(props) => (props.theme?.darkMode ? "#1a1a1a" : "#f7f9fc")};
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceDetails = styled.div`
  padding: 12px;
  transition: all 0.3s ease;

  h4 {
    margin: 0 0 8px;
    color: ${(props) => props.theme?.colors?.text || "#333333"};
    font-size: 16px;
  }

  .description {
    font-size: 13px;
    color: ${(props) =>
      props.theme?.colors?.textSecondary ||
      props.theme?.colors?.text ||
      "#666666"};
    opacity: ${(props) => (props.theme?.darkMode ? 0.7 : 0.6)};
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }

  .price {
    font-weight: 600;
    color: ${(props) => props.theme?.colors?.primary || "#3b5898"};
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const AIGeneratedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${(props) =>
    props.theme?.darkMode
      ? `linear-gradient(135deg, ${
          props.theme?.colors?.primary || "#3b5898"
        }, ${
          props.theme?.colors?.accent ||
          props.theme?.colors?.primary ||
          "#3b5898"
        })`
      : `linear-gradient(135deg, ${
          props.theme?.colors?.primary || "#3b5898"
        }, ${
          props.theme?.colors?.accent ||
          props.theme?.colors?.primary ||
          "#3b5898"
        })`};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px
    ${(props) =>
      props.theme?.darkMode ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.15)"};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px
      ${(props) =>
        props.theme?.darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)"};
  }

  svg {
    font-size: 16px;
  }
`;

export default function TripDetailsClient() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { darkMode, theme } = useTheme(); // Use theme context

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/");
          return;
        }

        const response = await axios.get(
          `https://iti-server-production.up.railway.app/api/createprogram/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTrip(response.data);

        // Check if this trip is in favorites
        const savedFavorites = JSON.parse(
          localStorage.getItem("favoriteTrips") || "[]"
        );
        setIsFavorite(savedFavorites.includes(id));
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id, router]);

  const handleFavoriteToggle = useCallback(() => {
    // Toggle favorite state
    setIsFavorite((prev) => !prev);

    // Update localStorage
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoriteTrips") || "[]"
    );
    let newFavorites;

    if (isFavorite) {
      newFavorites = savedFavorites.filter((itemId) => itemId !== id);
    } else {
      newFavorites = [...savedFavorites, id];
    }

    localStorage.setItem("favoriteTrips", JSON.stringify(newFavorites));
  }, [id, isFavorite]);

  const handleDeleteTrip = useCallback(async () => {
    if (
      confirm("هل أنت متأكد من حذف هذه الرحلة؟ لا يمكن التراجع عن هذا الإجراء.")
    ) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `https://iti-server-production.up.railway.app/api/createprogram/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Navigate back to trips page after successful deletion
        router.push("/trips");
      } catch (error) {
        console.error("Failed to delete trip:", error);
        alert("حدث خطأ أثناء حذف الرحلة.");
      }
    }
  }, [id, router]);

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Format dates
  const formatTripDate = (dateString) => {
    if (!dateString) return "غير محدد";

    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: ar });
    } catch (error) {
      return "تاريخ غير صالح";
    }
  };

  // Parse places
  const getTripPlaces = () => {
    if (!trip || !trip.selectedTripPlaces || !trip.selectedTripPlaces[0]) {
      return [];
    }

    return trip.selectedTripPlaces[0]
      .split(" -- ")
      .filter((place) => place.trim() !== "");
  };

  if (loading) {
    return (
      <TripDetailsContainer theme={{ colors: theme.colors, darkMode }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", padding: "100px 0" }}
        >
          <div className="loading-spinner"></div>
          <h2>جاري تحميل تفاصيل الرحلة...</h2>
        </motion.div>
      </TripDetailsContainer>
    );
  }

  if (error) {
    return (
      <TripDetailsContainer theme={{ colors: theme.colors, darkMode }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", padding: "100px 0" }}
        >
          <h2>خطأ: {error}</h2>
          <BackButton
            whileHover={{ x: -5 }}
            onClick={() => router.back()}
            theme={{ colors: theme.colors, darkMode }}
          >
            <BackIcon /> العودة
          </BackButton>
        </motion.div>
      </TripDetailsContainer>
    );
  }

  if (!trip) {
    return (
      <TripDetailsContainer theme={{ colors: theme.colors, darkMode }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", padding: "100px 0" }}
        >
          <h2>لم يتم العثور على الرحلة</h2>
          <BackButton
            whileHover={{ x: -5 }}
            onClick={() => router.back()}
            theme={{ colors: theme.colors, darkMode }}
          >
            <BackIcon /> العودة
          </BackButton>
        </motion.div>
      </TripDetailsContainer>
    );
  }

  const places = getTripPlaces();
  const statusConfig = {
    completed: {
      label: "مكتملة",
      icon: <CheckIcon />,
    },
    upcoming: {
      label: "قادمة",
      icon: <AccessTimeIcon />,
    },
    cancelled: {
      label: "ملغاة",
      icon: <ScheduleIcon />,
    },
  };

  return (
    <TripDetailsContainer theme={{ colors: theme.colors, darkMode }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton
          whileHover={{ x: -5 }}
          onClick={() => router.back()}
          theme={{ colors: theme.colors, darkMode }}
        >
          <BackIcon /> العودة
        </BackButton>

        <HeaderSection theme={{ colors: theme.colors, darkMode }}>
          <TitleSection>
            <h1>{trip.locate || "رحلة بدون عنوان"}</h1>
            <div className="trip-dates">
              <CalendarMonthIcon sx={{ fontSize: 18 }} />
              <span>{formatTripDate(trip.startDate)}</span>
            </div>
          </TitleSection>
          {/* Favorite Button */}
          <FavoriteButtonWrapper
            onClick={handleFavoriteToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFavorite ? (
              <StarIcon sx={{ color: "#fec20f" }} />
            ) : (
              <StarBorderIcon sx={{ color: "var(--primary-color)" }} />
            )}
          </FavoriteButtonWrapper>
        </HeaderSection>

        {/* Action Buttons */}
        <ActionButtonsBar>
          <ActionButton
            className="secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/edit-trip/${id}`)}
          >
            <EditIcon /> تعديل الرحلة
          </ActionButton>

          <ActionButton
            className="secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Share functionality
              if (navigator.share) {
                navigator.share({
                  title: trip.locate || "تفاصيل الرحلة",
                  text: `تفاصيل رحلة ${trip.locate || ""}`,
                  url: window.location.href,
                });
              } else {
                // Fallback - copy link to clipboard
                navigator.clipboard.writeText(window.location.href);
                alert("تم نسخ رابط الرحلة إلى الحافظة");
              }
            }}
          >
            <ShareIcon /> مشاركة
          </ActionButton>

          <ActionButton
            className="danger"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteTrip}
          >
            <DeleteIcon /> حذف
          </ActionButton>
        </ActionButtonsBar>

        {/* Trip Images Carousel */}
        <CarouselContainer>
          {Array.isArray(trip.images) && trip.images.length > 0 ? (
            <Slider {...carouselSettings}>
              {trip.images.map((image, index) => (
                <CarouselImage key={index}>
                  <img src={image} alt={`صورة الرحلة ${index + 1}`} />
                </CarouselImage>
              ))}
            </Slider>
          ) : (
            <CarouselImage>
              <img
                src="https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="صورة افتراضية للرحلة"
              />
            </CarouselImage>
          )}

          {/* Status Badge */}
          <StatusBadge status={trip.status || "upcoming"}>
            {statusConfig[trip.status || "upcoming"]?.icon}
            <span>{statusConfig[trip.status || "upcoming"]?.label}</span>
          </StatusBadge>
        </CarouselContainer>

        {/* Trip Details */}
        <SectionCard theme={{ colors: theme.colors, darkMode }}>
          <h2>تفاصيل الرحلة</h2>
          <DetailBoxes>
            <DetailBox
              $color={
                darkMode
                  ? "rgba(33, 150, 243, 0.15)"
                  : "rgba(33, 150, 243, 0.05)"
              }
              $iconBg={
                darkMode ? "rgba(33, 150, 243, 0.3)" : "rgba(33, 150, 243, 0.1)"
              }
              $iconColor="#2196F3"
              theme={{ colors: theme.colors, darkMode }}
            >
              <div className="icon">
                <LocationOnIcon />
              </div>
              <div className="content">
                <div className="label">الوجهة</div>
                <div className="value">{trip.locate || "غير محدد"}</div>
              </div>
            </DetailBox>

            <DetailBox
              $color={
                darkMode ? "rgba(76, 175, 80, 0.15)" : "rgba(76, 175, 80, 0.05)"
              }
              $iconBg={
                darkMode ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.1)"
              }
              $iconColor="#4CAF50"
              theme={{ colors: theme.colors, darkMode }}
            >
              <div className="icon">
                <AttachMoneyIcon />
              </div>
              <div className="content">
                <div className="label">الميزانية</div>
                <div className="value">
                  {(trip.budget || 0).toLocaleString()} جنيه
                </div>
              </div>
            </DetailBox>

            <DetailBox
              $color={
                darkMode
                  ? "rgba(156, 39, 176, 0.15)"
                  : "rgba(156, 39, 176, 0.05)"
              }
              $iconBg={
                darkMode ? "rgba(156, 39, 176, 0.3)" : "rgba(156, 39, 176, 0.1)"
              }
              $iconColor="#9C27B0"
              theme={{ colors: theme.colors, darkMode }}
            >
              <div className="icon">
                <PeopleIcon />
              </div>
              <div className="content">
                <div className="label">عدد الأشخاص</div>
                <div className="value">{trip.numberOfPersons || 0} أشخاص</div>
              </div>
            </DetailBox>

            <DetailBox
              $color={
                darkMode ? "rgba(255, 152, 0, 0.15)" : "rgba(255, 152, 0, 0.05)"
              }
              $iconBg={
                darkMode ? "rgba(255, 152, 0, 0.3)" : "rgba(255, 152, 0, 0.1)"
              }
              $iconColor="#FF9800"
              theme={{ colors: theme.colors, darkMode }}
            >
              <div className="icon">
                <CategoryIcon />
              </div>
              <div className="content">
                <div className="label">نوع البرنامج</div>
                <div className="value">{trip.typeOfProgram || "غير محدد"}</div>
              </div>
            </DetailBox>

            <DetailBox
              $color={
                darkMode ? "rgba(233, 30, 99, 0.15)" : "rgba(233, 30, 99, 0.05)"
              }
              $iconBg={
                darkMode ? "rgba(233, 30, 99, 0.3)" : "rgba(233, 30, 99, 0.1)"
              }
              $iconColor="#E91E63"
              theme={{ colors: theme.colors, darkMode }}
            >
              <div className="icon">
                <LabelIcon />
              </div>
              <div className="content">
                <div className="label">الفئة</div>
                <div className="value">{trip.category || "غير محدد"}</div>
              </div>
            </DetailBox>

            <DetailBox
              $color={
                darkMode ? "rgba(0, 150, 136, 0.15)" : "rgba(0, 150, 136, 0.05)"
              }
              $iconBg={
                darkMode ? "rgba(0, 150, 136, 0.3)" : "rgba(0, 150, 136, 0.1)"
              }
              $iconColor="#009688"
              theme={{ colors: theme.colors, darkMode }}
            >
              <div className="icon">
                <CalendarMonthIcon />
              </div>
              <div className="content">
                <div className="label">تاريخ الرحلة</div>
                <div className="value">{formatTripDate(trip.startDate)}</div>
              </div>
            </DetailBox>
          </DetailBoxes>
        </SectionCard>

        {/* Trip Timeline */}
        {places.length > 0 && (
          <SectionCard theme={{ colors: theme.colors, darkMode }}>
            <h2>مسار الرحلة</h2>
            <Timeline>
              {places.map((place, index) => (
                <TimelineItem key={index} $isLast={index === places.length - 1}>
                  <h3>{place}</h3>
                  {trip.timeEstimate && (
                    <p>{trip.timeEstimate[index] || "المدة غير محددة"}</p>
                  )}
                </TimelineItem>
              ))}
            </Timeline>
          </SectionCard>
        )}

        {/* Trip Notes */}
        {trip.notes && trip.notes.trim() && (
          <SectionCard theme={{ colors: theme.colors, darkMode }}>
            <h2>ملاحظات</h2>
            <NotesSection>{trip.notes}</NotesSection>
          </SectionCard>
        )}

        {/* Additional Info if available */}
        {trip.additionalInfo && (
          <SectionCard theme={{ colors: theme.colors, darkMode }}>
            <h2>معلومات إضافية</h2>
            <NotesSection>{trip.additionalInfo}</NotesSection>
          </SectionCard>
        )}

        {/* Recommendations/Tips if available */}
        {trip.recommendations && (
          <SectionCard theme={{ colors: theme.colors, darkMode }}>
            <h2>توصيات ونصائح</h2>
            <NotesSection>{trip.recommendations}</NotesSection>
          </SectionCard>
        )}
        {/* AI Badge */}
        {trip.isAIGenerated && (
          <AIGeneratedBadge>
            <AutoAwesomeIcon />
            رحلة مُنشأة بالذكاء الاصطناعي
          </AIGeneratedBadge>
        )}

        {/* AI Trip Schedule */}
        {trip.isAIGenerated && trip.schedule && trip.schedule.length > 0 && (
          <SectionCard theme={{ colors: theme.colors, darkMode }}>
            <h2>جدول الرحلة</h2>
            <ScheduleSection>
              {trip.schedule.map((day, index) => (
                <DayCard key={index} theme={{ colors: theme.colors, darkMode }}>
                  <DayHeader theme={{ colors: theme.colors, darkMode }}>
                    <TodayIcon />
                    <h3>اليوم {day.day}</h3>
                  </DayHeader>
                  {day.activities.map((activity, actIndex) => (
                    <ActivityItem
                      key={actIndex}
                      theme={{ colors: theme.colors, darkMode }}
                    >
                      <div className="time">{activity.time}</div>
                      <div className="activity">{activity.activity}</div>
                      <div className="place">{activity.place}</div>
                    </ActivityItem>
                  ))}
                </DayCard>
              ))}
            </ScheduleSection>
          </SectionCard>
        )}

        {/* Trip Tips */}
        {trip.isAIGenerated && trip.tips && trip.tips.length > 0 && (
          <SectionCard theme={{ colors: theme.colors, darkMode }}>
            <h2>نصائح للرحلة</h2>
            <TipsList theme={{ colors: theme.colors, darkMode }}>
              {trip.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </TipsList>
          </SectionCard>
        )}

        {/* Places Details */}
        {trip.isAIGenerated && trip.places && trip.places.length > 0 && (
          <SectionCard theme={{ colors: theme.colors, darkMode }}>
            <h2>أماكن مقترحة</h2>
            <PlacesGrid>
              {trip.places.map((place, index) => (
                <PlaceCard
                  key={index}
                  theme={{ colors: theme.colors, darkMode }}
                >
                  <PlaceImage>
                    <img
                      src={
                        place.image ||
                        "https://via.placeholder.com/300x150?text=No+Image"
                      }
                      alt={place.name}
                    />
                  </PlaceImage>
                  <PlaceDetails theme={{ colors: theme.colors, darkMode }}>
                    <h4>{place.name}</h4>
                    <div className="description">{place.description}</div>
                    <div className="meta">
                      <div className="price">
                        {place.price || "السعر غير محدد"}
                      </div>
                      <div className="rating">
                        <span>{place.rate || 0}</span>
                        <StarIcon sx={{ fontSize: 16, color: "#FFC107" }} />
                      </div>
                    </div>
                  </PlaceDetails>
                </PlaceCard>
              ))}
            </PlacesGrid>
          </SectionCard>
        )}

        {/* AI Prompt metadata */}
        {trip.isAIGenerated && trip.metadata && trip.metadata.aiPrompt && (
          <SectionCard theme={{ colors: theme.colors, darkMode }}>
            <h2>خلفية الرحلة</h2>
            <NotesSection style={{ marginTop: "10px" }}>
              <strong>طلب المستخدم الأصلي:</strong> "{trip.metadata.aiPrompt}"
              {trip.metadata.generationDate && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                  }}
                >
                  تم إنشاء هذه الرحلة في{" "}
                  {new Date(trip.metadata.generationDate).toLocaleDateString(
                    "ar-EG"
                  )}
                </div>
              )}
            </NotesSection>
          </SectionCard>
        )}
      </motion.div>
    </TripDetailsContainer>
  );
}
