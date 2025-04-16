"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { motion } from "framer-motion";
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
  Check as CheckIcon,
  Close as CloseIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import { HeaderSection } from "../styledComponent/Trips/StyledTrips";
import {
  ActionButton,
  ActionButtonsBar,
  ActivityItem,
  AIGeneratedBadge,
  CarouselContainer,
  CarouselImage,
  CloseButton,
  DayCard,
  DayHeader,
  DetailBox,
  DetailBoxes,
  DialogContent,
  DialogOverlay,
  FavoriteButtonWrapper,
  NotesSection,
  PlaceCard,
  PlaceDetails,
  PlaceImage,
  PlacesGrid,
  ScheduleSection,
  SectionCard,
  StatusBadge,
  Timeline,
  TimelineItem,
  TipsList,
  TitleSection,
} from "../styledComponent/TripDetailsDialog/StyledTripDetails";
import CollapsibleSection from "./CollapsibleSection";
import MapIcon from "@mui/icons-material/Map";
import InfoIcon from "@mui/icons-material/Info";
import NoteIcon from "@mui/icons-material/Note";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import styled from "styled-components";

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



const TripDetailsDialog = ({
  tripId,
  isOpen,
  onClose,
  onTripDeleted,
  onTripUpdated,
}) => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { darkMode, theme } = useTheme();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Fetch trip details when dialog opens
  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!isOpen || !tripId) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `http://localhost:4000/api/createprogram/${tripId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTrip(response.data);

        // Check if this trip is in favorites
        const savedFavorites = JSON.parse(
          localStorage.getItem("favoriteTrips") || "[]"
        );
        setIsFavorite(savedFavorites.includes(tripId));
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId, isOpen]);

  const handleFavoriteToggle = useCallback(() => {
    // Toggle favorite state
    setIsFavorite((prev) => !prev);

    // Update localStorage
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoriteTrips") || "[]"
    );
    let newFavorites;

    if (isFavorite) {
      newFavorites = savedFavorites.filter((itemId) => itemId !== tripId);
    } else {
      newFavorites = [...savedFavorites, tripId];
    }

    localStorage.setItem("favoriteTrips", JSON.stringify(newFavorites));

    // Notify parent component that favorites have been updated
    if (onTripUpdated) onTripUpdated();
  }, [tripId, isFavorite, onTripUpdated]);

  const handleDeleteTrip = useCallback(async () => {
    setShowDeleteConfirmation(true);
  }, []);

  const confirmDeleteTrip = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/createprogram/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Notify parent that trip was deleted
      if (onTripDeleted) onTripDeleted(tripId);
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Failed to delete trip:", error);
      alert("حدث خطأ أثناء حذف الرحلة.");
    } finally {
      setShowDeleteConfirmation(false); // Close confirmation dialog
    }
  }, [tripId, onClose, onTripDeleted]);

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

  // If not open, don't render anything
  if (!isOpen) return null;

  return (
    <>
      <DialogOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        $colors={theme.colors}
        $darkMode={darkMode}
      >
        <DialogContent
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          $colors={theme.colors}
          $darkMode={darkMode}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "50px 0" }}>
              <div className="loading-spinner"></div>
              <h2>جاري تحميل تفاصيل الرحلة...</h2>
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "50px 0" }}>
              <h2>خطأ: {error}</h2>
            </div>
          ) : !trip ? (
            <div style={{ textAlign: "center", padding: "50px 0" }}>
              <h2>لم يتم العثور على الرحلة</h2>
            </div>
          ) : (
            // The actual trip content
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* HeaderSection with title and favorite button */}
              <HeaderSection $colors={theme.colors} $darkMode={darkMode}>
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

              {/* Action Buttons (Edit, Share, Delete) */}
              <ActionButtonsBar>
                <ActionButton
                  className="secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onClose();
                    window.location.href = `/edit-trip/${tripId}`;
                  }}
                >
                  <EditIcon /> تعديل الرحلة
                </ActionButton>

                <ActionButton
                  className="secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: trip.locate || "تفاصيل الرحلة",
                        text: `تفاصيل رحلة ${trip.locate || ""}`,
                        url: window.location.href,
                      });
                    } else {
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
                  <Slider
                    {...carouselSettings}
                    prevArrow={<PrevArrow />}
                    nextArrow={<NextArrow />}
                  >
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
                {trip.status && (
                  <StatusBadge $status={trip.status || "upcoming"}>
                    {trip.status === "completed" ? (
                      <>
                        <CheckIcon />
                        <span>مكتملة</span>
                      </>
                    ) : trip.status === "cancelled" ? (
                      <>
                        <ScheduleIcon />
                        <span>ملغاة</span>
                      </>
                    ) : (
                      <>
                        <AccessTimeIcon />
                        <span>قادمة</span>
                      </>
                    )}
                  </StatusBadge>
                )}
              </CarouselContainer>

              {/* Trip Details */}
              <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                <CollapsibleSection
                  title="تفاصيل الرحلة"
                  colors={theme.colors}
                  darkMode={darkMode}
                  defaultExpanded={true}
                  icon={<InfoIcon sx={{ color: theme.colors?.primary }} />}
                >
                  <DetailBoxes>
                    <DetailBox
                      $color={
                        darkMode
                          ? "rgba(33, 150, 243, 0.15)"
                          : "rgba(33, 150, 243, 0.05)"
                      }
                      $iconBg={
                        darkMode
                          ? "rgba(33, 150, 243, 0.3)"
                          : "rgba(33, 150, 243, 0.1)"
                      }
                      $iconColor="#2196F3"
                    >
                      <div className="icon">
                        <LocationOnIcon />
                      </div>
                      <div className="content">
                        <div className="label">الوجهة</div>
                        <div className="value">{trip.locate || "غير محدد"}</div>
                      </div>
                    </DetailBox>

                    {/* Keep the rest of your DetailBox components */}
                    <DetailBox
                      $color={
                        darkMode
                          ? "rgba(76, 175, 80, 0.15)"
                          : "rgba(76, 175, 80, 0.05)"
                      }
                      $iconBg={
                        darkMode
                          ? "rgba(76, 175, 80, 0.3)"
                          : "rgba(76, 175, 80, 0.1)"
                      }
                      $iconColor="#4CAF50"
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
                        darkMode
                          ? "rgba(156, 39, 176, 0.3)"
                          : "rgba(156, 39, 176, 0.1)"
                      }
                      $iconColor="#9C27B0"
                    >
                      <div className="icon">
                        <PeopleIcon />
                      </div>
                      <div className="content">
                        <div className="label">عدد الأشخاص</div>
                        <div className="value">
                          {trip.numberOfPersons || 0} أشخاص
                        </div>
                      </div>
                    </DetailBox>

                    <DetailBox
                      $color={
                        darkMode
                          ? "rgba(255, 152, 0, 0.15)"
                          : "rgba(255, 152, 0, 0.05)"
                      }
                      $iconBg={
                        darkMode
                          ? "rgba(255, 152, 0, 0.3)"
                          : "rgba(255, 152, 0, 0.1)"
                      }
                      $iconColor="#FF9800"
                    >
                      <div className="icon">
                        <CategoryIcon />
                      </div>
                      <div className="content">
                        <div className="label">نوع البرنامج</div>
                        <div className="value">
                          {trip.typeOfProgram || "غير محدد"}
                        </div>
                      </div>
                    </DetailBox>

                    <DetailBox
                      $color={
                        darkMode
                          ? "rgba(233, 30, 99, 0.15)"
                          : "rgba(233, 30, 99, 0.05)"
                      }
                      $iconBg={
                        darkMode
                          ? "rgba(233, 30, 99, 0.3)"
                          : "rgba(233, 30, 99, 0.1)"
                      }
                      $iconColor="#E91E63"
                    >
                      <div className="icon">
                        <LabelIcon />
                      </div>
                      <div className="content">
                        <div className="label">الفئة</div>
                        <div className="value">
                          {trip.category || "غير محدد"}
                        </div>
                      </div>
                    </DetailBox>

                    <DetailBox
                      $color={
                        darkMode
                          ? "rgba(0, 150, 136, 0.15)"
                          : "rgba(0, 150, 136, 0.05)"
                      }
                      $iconBg={
                        darkMode
                          ? "rgba(0, 150, 136, 0.3)"
                          : "rgba(0, 150, 136, 0.1)"
                      }
                      $iconColor="#009688"
                    >
                      <div className="icon">
                        <CalendarMonthIcon />
                      </div>
                      <div className="content">
                        <div className="label">تاريخ الرحلة</div>
                        <div className="value">
                          {formatTripDate(trip.startDate)}
                        </div>
                      </div>
                    </DetailBox>
                  </DetailBoxes>
                </CollapsibleSection>
              </SectionCard>

              {/* Trip Timeline */}
              {getTripPlaces().length > 0 && (
                <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                  <CollapsibleSection
                    title="مسار الرحلة"
                    colors={theme.colors}
                    darkMode={darkMode}
                    icon={<MapIcon sx={{ color: theme.colors?.primary }} />}
                  >
                    <Timeline>
                      {getTripPlaces().map((place, index) => (
                        <TimelineItem
                          key={index}
                          $isLast={index === getTripPlaces().length - 1}
                        >
                          <h3>{place}</h3>
                          {trip.timeEstimate && (
                            <p>
                              {trip.timeEstimate[index] || "المدة غير محددة"}
                            </p>
                          )}
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </CollapsibleSection>
                </SectionCard>
              )}

              {/* Trip Notes */}
              {trip.notes && trip.notes.trim() && (
                <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                  <CollapsibleSection
                    title="ملاحظات"
                    colors={theme.colors}
                    darkMode={darkMode}
                    icon={<NoteIcon sx={{ color: theme.colors?.primary }} />}
                  >
                    <NotesSection>{trip.notes}</NotesSection>
                  </CollapsibleSection>
                </SectionCard>
              )}

              {/* Additional Info if available */}
              {trip.additionalInfo && (
                <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                  <CollapsibleSection
                    title="معلومات إضافية"
                    colors={theme.colors}
                    darkMode={darkMode}
                    icon={<InfoIcon sx={{ color: theme.colors?.primary }} />}
                  >
                    <NotesSection>{trip.additionalInfo}</NotesSection>
                  </CollapsibleSection>
                </SectionCard>
              )}

              {/* Recommendations/Tips if available */}
              {trip.recommendations && (
                <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                  <CollapsibleSection
                    title="توصيات ونصائح"
                    colors={theme.colors}
                    darkMode={darkMode}
                    icon={
                      <TipsAndUpdatesIcon
                        sx={{ color: theme.colors?.primary }}
                      />
                    }
                  >
                    <NotesSection>{trip.recommendations}</NotesSection>
                  </CollapsibleSection>
                </SectionCard>
              )}

              {/* AI Trip Schedule */}
              {trip.isAIGenerated &&
                trip.schedule &&
                trip.schedule.length > 0 && (
                  <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                    <CollapsibleSection
                      title="جدول الرحلة"
                      colors={theme.colors}
                      darkMode={darkMode}
                      icon={
                        <EventNoteIcon sx={{ color: theme.colors?.primary }} />
                      }
                    >
                      <ScheduleSection>
                        {trip.schedule.map((day, index) => (
                          <DayCard
                            key={index}
                            $colors={theme.colors}
                            $darkMode={darkMode}
                          >
                            <DayHeader
                              $colors={theme.colors}
                              $darkMode={darkMode}
                            >
                              <h3>اليوم {day.day}</h3>
                              <TodayIcon />
                            </DayHeader>
                            {day.activities.map((activity, actIndex) => (
                              <ActivityItem
                                key={actIndex}
                                $colors={theme.colors}
                                $darkMode={darkMode}
                              >
                                <div className="time">{activity.time}</div>
                                <div className="activity">
                                  {activity.activity}
                                </div>
                                <div className="place">{activity.place}</div>
                              </ActivityItem>
                            ))}
                          </DayCard>
                        ))}
                      </ScheduleSection>
                    </CollapsibleSection>
                  </SectionCard>
                )}

              {/* Trip Tips */}
              {trip.isAIGenerated && trip.tips && trip.tips.length > 0 && (
                <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                  <CollapsibleSection
                    title="نصائح للرحلة"
                    colors={theme.colors}
                    darkMode={darkMode}
                    icon={
                      <TipsAndUpdatesIcon
                        sx={{ color: theme.colors?.primary }}
                      />
                    }
                  >
                    <TipsList $colors={theme.colors} $darkMode={darkMode}>
                      {trip.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </TipsList>
                  </CollapsibleSection>
                </SectionCard>
              )}

              {/* Places Details */}
              {trip.isAIGenerated && trip.places && trip.places.length > 0 && (
                <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                  <CollapsibleSection
                    title="أماكن مقترحة"
                    colors={theme.colors}
                    darkMode={darkMode}
                    icon={<PlaceIcon sx={{ color: theme.colors?.primary }} />}
                  >
                    <PlacesGrid>
                      {trip.places.map((place, index) => (
                        <PlaceCard
                          key={index}
                          $colors={theme.colors}
                          $darkMode={darkMode}
                        >
                          <PlaceImage $darkMode={darkMode}>
                            <img
                              src={
                                place.image ||
                                "https://via.placeholder.com/300x150?text=No+Image"
                              }
                              alt={place.name}
                            />
                          </PlaceImage>
                          <PlaceDetails
                            $colors={theme.colors}
                            $darkMode={darkMode}
                          >
                            <h4>{place.name}</h4>
                            <div className="description">
                              {place.description}
                            </div>
                            <div className="meta">
                              <div className="price">
                                {place.price || "السعر غير محدد"}
                              </div>
                              <div className="rating">
                                <span>{place.rate || 0}</span>
                                <StarIcon
                                  sx={{ fontSize: 16, color: "#FFC107" }}
                                />
                              </div>
                            </div>
                          </PlaceDetails>
                        </PlaceCard>
                      ))}
                    </PlacesGrid>
                  </CollapsibleSection>
                </SectionCard>
              )}

              {/* AI Prompt metadata */}
              {trip.isAIGenerated &&
                trip.metadata &&
                trip.metadata.aiPrompt && (
                  <SectionCard $colors={theme.colors} $darkMode={darkMode}>
                    <CollapsibleSection
                      title="خلفية الرحلة"
                      colors={theme.colors}
                      darkMode={darkMode}
                      icon={
                        <HistoryEduIcon sx={{ color: theme.colors?.primary }} />
                      }
                    >
                      <NotesSection style={{ marginTop: "10px" }}>
                        <strong>طلب المستخدم الأصلي:</strong> "
                        {trip.metadata.aiPrompt}"
                        {trip.metadata.generationDate && (
                          <div
                            style={{
                              marginTop: "8px",
                              fontSize: "13px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            تم إنشاء هذه الرحلة في{" "}
                            {new Date(
                              trip.metadata.generationDate
                            ).toLocaleDateString("ar-EG")}
                          </div>
                        )}
                      </NotesSection>
                    </CollapsibleSection>
                  </SectionCard>
                )}
            </motion.div>
          )}
        </DialogContent>
      </DialogOverlay>

      {showDeleteConfirmation && (
        <ConfirmationOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          $darkMode={darkMode}
        >
          <ConfirmationContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            $colors={theme.colors}
            $darkMode={darkMode}
          >
            <ConfirmationHeader $colors={theme.colors}>
              <h3>تأكيد حذف الرحلة</h3>
              <CloseButton
                onClick={() => setShowDeleteConfirmation(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                $colors={theme.colors}
                $darkMode={darkMode}
              >
                <CloseIcon />
              </CloseButton>
            </ConfirmationHeader>

            <ConfirmationMessage $colors={theme.colors}>
              <ErrorOutlineIcon className="icon" />
              <p>
                هل أنت متأكد من حذف هذه الرحلة؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
            </ConfirmationMessage>

            <ButtonsContainer>
              <CancelButton
                onClick={() => setShowDeleteConfirmation(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                $colors={theme.colors}
                $darkMode={darkMode}
              >
                إلغاء
              </CancelButton>
              <ConfirmButton
                onClick={confirmDeleteTrip}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                $colors={theme.colors}
                $darkMode={darkMode}
              >
                حذف
              </ConfirmButton>
            </ButtonsContainer>
          </ConfirmationContent>
        </ConfirmationOverlay>
      )}
    </>
  );
};

export default TripDetailsDialog;



const ConfirmationOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.$darkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.6)"};
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ConfirmationContent = styled(motion.div)`
  background-color: ${(props) => props.$colors?.surface || "#ffffff"};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 420px;
  width: 100%;
  padding: 24px;
  text-align: right;
  direction: rtl;
`;

const ConfirmationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.$colors?.primary || "#3b5898"};
  }
`;

const ConfirmationMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  color: ${(props) => props.$colors?.text || "#333"};

  .icon {
    color: ${(props) => props.$colors?.error || "#f44336"};
    font-size: 24px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ConfirmButton = styled(motion.button)`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  background-color: ${(props) => props.$colors?.error || "#f44336"};
  color: white;
`;

const CancelButton = styled(motion.button)`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$darkMode ? "rgba(255, 255, 255, 0.1)" : "#f5f5f5"};
  color: ${(props) => (props.$darkMode ? "#fff" : "#666")};
`;
