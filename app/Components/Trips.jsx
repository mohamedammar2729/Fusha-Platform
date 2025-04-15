"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext"; // Import theme context
import axios from "axios";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {
  MyMyBox,
  TripCard,
  CarouselContainer,
  GradientOverlay,
  DetailsContainer,
  DetailRow,
  DetailItem,
  TimelineSection,
  TimelineItem,
  CarouselImage,
  TripCardSkeleton,
  EmptyTripsState,
  CreateTripButton,
  DeleteConfirmOverlay,
  DeleteConfirmDialog,
  DeleteConfirmButtons,
  TimelineDot,
  TimelineLine,
  StatusBadge,
  TripHeader,
  TripTitle,
  FilterContainer,
  FilterButton,
  ActionButtons,
  ActionButton,
  TripDate,
  TopActionBar,
  SearchInput,
  NoResultsFound,
  ImageCounter,
  TripFeature,
  FeatureIcon,
  CardActions,
  ViewDetailsButton,
  TripsGrid,
  TripsListHeader,
  SortButton,
  AddTripButton,
  PageTitle,
  LoadingOverlay,
  SuccessMessage,
  HeaderSection,
  FavoriteButton,
  pulseAnimation,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  IconButton,
  ImageNavigation,
  NavButton,
  DetailSection,
  DetailGroup,
  DetailIcon,
  DetailContent,
  DetailLabel,
  DetailValue,
  TimelineContainer,
  TimelineContent,
  TimelinePlace,
  TimelineEstimate,
  NotesText,
  AIBadge,
  DialogActions,
  SectionTitle,
  NotesIcon,
} from "../styledComponent/Trips/StyledTrips";
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
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  Add as AddIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Visibility as VisibilityIcon,
  Check as CheckIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  NightlightRound as MoonIcon,
  Close as CloseIcon,
  LocationOn as LocationOnIcon,
  CalendarMonth as CalendarMonthIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";
import { format } from "date-fns"; // You'll need to install this package
import { ar } from "date-fns/locale"; // Arabic locale for dates
import { StyledTextField } from "../styledComponent/TripType/StyledTripType";

const Trips = () => {
  const { darkMode, toggleTheme, theme } = useTheme(); // Use theme context
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [favoriteTrips, setFavoriteTrips] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const token = localStorage.getItem("token");
  const router = useRouter();

  // Add these state variables to your existing state in Trips.jsx
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedTripDetails, setSelectedTripDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Fetch trip data
  const fetchData = useCallback(async () => {
    if (!token) {
      router.push("/");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "https://iti-server-production.up.railway.app/api/createprogram",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add sample dates if they don't exist (for demo purposes)
      const itemsWithDates = response.data.map((item) => ({
        ...item,
        startDate:
          item.startDate ||
          new Date(Date.now() + Math.random() * 30 * 86400000).toISOString(),
        // Get saved favorite state from localStorage or default to false
        isFavorite: favoriteTrips.includes(item._id),
        // Ensure images array exists
        images: item.images || [
          "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        // Ensure selectedTripPlaces array exists
        selectedTripPlaces: item.selectedTripPlaces || ["مكان افتراضي"],
      }));

      setItems(itemsWithDates);
      applyFiltersAndSort(
        itemsWithDates,
        activeFilter,
        searchTerm,
        sortBy,
        sortDirection
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [
    token,
    router,
    activeFilter,
    searchTerm,
    sortBy,
    sortDirection,
    favoriteTrips,
  ]);

  // Load favorite trips from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteTrips");
    if (savedFavorites) {
      setFavoriteTrips(JSON.parse(savedFavorites));
    }
  }, []);

  // Apply filters and sorting
  const applyFiltersAndSort = (items, filter, search, sort, direction) => {
    let result = [...items];

    // Apply status filter
    if (filter !== "all") {
      result = result.filter((item) => item.status === filter);
    }

    // Apply search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.locate?.toLowerCase().includes(searchLower) ||
          item.typeOfProgram?.toLowerCase().includes(searchLower) ||
          (item.selectedTripPlaces &&
            item.selectedTripPlaces[0]?.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (sort === "date") {
      result.sort((a, b) => {
        const dateA = new Date(a.startDate || 0);
        const dateB = new Date(b.startDate || 0);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sort === "budget") {
      result.sort((a, b) => {
        const budgetA = Number(a.budget) || 0;
        const budgetB = Number(b.budget) || 0;
        return direction === "asc" ? budgetA - budgetB : budgetB - budgetA;
      });
    }

    setFilteredItems(result);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    applyFiltersAndSort(items, activeFilter, searchTerm, sortBy, sortDirection);
  }, [items, activeFilter, searchTerm, sortBy, sortDirection]);

  // Add this useEffect to detect screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://iti-server-production.up.railway.app/api/createprogram/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Show success message
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 3000);

      // Animate the removal instead of immediate refetch
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, deleting: true } : item
        )
      );

      // Remove item from state after animation completes
      setTimeout(() => {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      }, 300);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const toggleFavorite = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );

    // Update favorites in state and localStorage
    const newFavorites = favoriteTrips.includes(id)
      ? favoriteTrips.filter((itemId) => itemId !== id)
      : [...favoriteTrips, id];

    setFavoriteTrips(newFavorites);
    localStorage.setItem("favoriteTrips", JSON.stringify(newFavorites));
  };

  // Custom arrow components for carousel
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <motion.div
        className="slick-arrow custom-prev-arrow"
        onClick={onClick}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.2s ease",
        }}
      >
        <ArrowBackIcon sx={{ color: "white" }} />
      </motion.div>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <motion.div
        className="slick-arrow custom-next-arrow"
        onClick={onClick}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.2s ease",
        }}
      >
        <ArrowForwardIcon sx={{ color: "white" }} />
      </motion.div>
    );
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, // This disables arrows completely
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const handleViewDetails = (id) => {
    // Find the trip data for this ID
    const tripData = items.find((item) => item._id === id);
    if (tripData) {
      // Cache the trip data in localStorage
      const cachedTripsString = localStorage.getItem("cachedTrips");
      let cachedTrips = [];
      if (cachedTripsString) {
        cachedTrips = JSON.parse(cachedTripsString);
        // Remove this trip if it's already cached
        cachedTrips = cachedTrips.filter((trip) => trip._id !== id);
      }
      cachedTrips.push(tripData);
      localStorage.setItem(
        "cachedTrips",
        JSON.stringify(cachedTrips.slice(-10))
      ); // Keep last 10 trips
    }
    router.push(`/trip-details/${id}`);
  };

  const handleEditTrip = (id, event) => {
    event.stopPropagation();
    router.push(`/edit-trip/${id}`);
  };

  const toggleSort = () => {
    if (sortBy === "date") {
      setSortBy("budget");
      setSortDirection("desc");
    } else {
      setSortBy("date");
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="trips-container"
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
        transition: "all 0.3s ease",
      }}
    >
      <MyMyBox
        style={{
          backgroundColor: theme.colors.surface,
          boxShadow: `0 8px 30px ${
            darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"
          }`,
          transition: "all 0.3s ease",
        }}
      >
        {/* Page Header with Theme Toggle */}
        <HeaderSection>
          <PageTitle style={{ color: theme.colors.primary }}>
            {darkMode ? "🌙 رحلاتي" : "☀️ رحلاتي"}
          </PageTitle>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: darkMode ? -15 : 15 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              style={{
                cursor: "pointer",
                backgroundColor: theme.colors.primary,
                color: "#fff",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0 3px 8px ${
                  darkMode
                    ? "rgba(246, 177, 122, 0.4)"
                    : "rgba(74, 114, 172, 0.4)"
                }`,
                transition: "all 0.3s ease",
              }}
            >
              {darkMode ? <LightModeIcon /> : <MoonIcon />}
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AddTripButton
                style={{
                  color: "#fff",
                  background: `linear-gradient(135deg, ${
                    theme.colors.primary
                  }, ${darkMode ? "#f37b3b" : "#4f9bd9"})`,
                  border: `1px solid ${darkMode ? "#FF9F6B" : "#4c8bbf"}`,
                  boxShadow: `0 4px 10px ${
                    darkMode
                      ? "rgba(255, 142, 83, 0.5)"
                      : "rgba(46, 123, 184, 0.4)"
                  }`,
                }}
                onClick={() => router.push("/create-trip")}
              >
                <AddIcon /> إنشاء رحلة جديدة
              </AddTripButton>
            </motion.div>
          </div>
        </HeaderSection>

        {/* Search & Filter Bar */}
        <TopActionBar
          style={{
            backgroundColor: darkMode
              ? "rgba(66, 71, 105, 0.5)"
              : "rgba(255, 255, 255, 0.8)",
            borderColor: theme.colors.border,
          }}
        >
          <SearchInput
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              padding: "0",
            }}
          >
            <StyledTextField
              type="text"
              fullWidth
              placeholder="ابحث عن رحلة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              $darkMode={darkMode}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    style={{
                      color: theme.colors.textSecondary,
                      marginLeft: "8px",
                    }}
                  />
                ),
                endAdornment: searchTerm && (
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      color: theme.colors.textSecondary,
                      cursor: "pointer",
                      padding: "4px",
                    }}
                    onClick={() => setSearchTerm("")}
                  >
                    ×
                  </motion.span>
                ),
              }}
            />
          </SearchInput>

          <SortButton
            onClick={toggleSort}
            style={{
              backgroundColor: darkMode ? "rgba(66, 71, 105, 0.7)" : "#fff",
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }}
          >
            <SortIcon style={{ color: theme.colors.primary }} />
            <span>
              {sortBy === "date" ? "التاريخ" : "الميزانية"}
              {sortDirection === "desc" ? " ▼" : " ▲"}
            </span>
          </SortButton>
        </TopActionBar>

        {/* Filter Tabs with theme */}
        <FilterContainer
          style={{
            borderColor: theme.colors.border,
            backgroundColor: darkMode
              ? "rgba(45, 50, 80, 0.3)"
              : "rgba(245, 247, 250, 0.5)",
          }}
        >
          <FilterButton
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
            style={{
              backgroundColor:
                activeFilter === "all"
                  ? theme.colors.primary
                  : darkMode
                  ? "rgba(66, 71, 105, 0.7)"
                  : "#fff",
              color:
                activeFilter === "all"
                  ? darkMode
                    ? "#111"
                    : "#fff"
                  : theme.colors.text,
            }}
          >
            الكل
          </FilterButton>
          <FilterButton
            active={activeFilter === "upcoming"}
            color="#2196F3"
            onClick={() => setActiveFilter("upcoming")}
            style={{
              backgroundColor:
                activeFilter === "upcoming"
                  ? "#2196F3"
                  : darkMode
                  ? "rgba(66, 71, 105, 0.7)"
                  : "#fff",
              color: activeFilter === "upcoming" ? "#fff" : theme.colors.text,
            }}
          >
            القادمة
          </FilterButton>
          <FilterButton
            active={activeFilter === "completed"}
            color="#4CAF50"
            onClick={() => setActiveFilter("completed")}
            style={{
              backgroundColor:
                activeFilter === "completed"
                  ? "#4CAF50"
                  : darkMode
                  ? "rgba(66, 71, 105, 0.7)"
                  : "#fff",
              color: activeFilter === "completed" ? "#fff" : theme.colors.text,
            }}
          >
            المكتملة
          </FilterButton>
          <FilterButton
            active={activeFilter === "cancelled"}
            color="#F44336"
            onClick={() => setActiveFilter("cancelled")}
            style={{
              backgroundColor:
                activeFilter === "cancelled"
                  ? "#F44336"
                  : darkMode
                  ? "rgba(66, 71, 105, 0.7)"
                  : "#fff",
              color: activeFilter === "cancelled" ? "#fff" : theme.colors.text,
            }}
          >
            الملغاة
          </FilterButton>
        </FilterContainer>

        {loading ? (
          // Enhanced loading skeletons with theme
          <>
            <TripCardSkeleton
              style={{
                backgroundColor: darkMode ? "rgba(66, 71, 105, 0.7)" : "#fff",
                backgroundImage: `linear-gradient(
                90deg, 
                ${darkMode ? "rgba(66, 71, 105, 0.7)" : "#f5f5f5"} 25%, 
                ${darkMode ? "rgba(112, 119, 161, 0.7)" : "#e0e0e0"} 37%, 
                ${darkMode ? "rgba(66, 71, 105, 0.7)" : "#f5f5f5"} 63%
              )`,
              }}
            />
            <TripCardSkeleton
              style={{
                backgroundColor: darkMode ? "rgba(66, 71, 105, 0.7)" : "#fff",
                backgroundImage: `linear-gradient(
                90deg, 
                ${darkMode ? "rgba(66, 71, 105, 0.7)" : "#f5f5f5"} 25%, 
                ${darkMode ? "rgba(112, 119, 161, 0.7)" : "#e0e0e0"} 37%, 
                ${darkMode ? "rgba(66, 71, 105, 0.7)" : "#f5f5f5"} 63%
              )`,
              }}
            />
            <TripCardSkeleton
              style={{
                backgroundColor: darkMode ? "rgba(66, 71, 105, 0.7)" : "#fff",
                backgroundImage: `linear-gradient(
                90deg, 
                ${darkMode ? "rgba(66, 71, 105, 0.7)" : "#f5f5f5"} 25%, 
                ${darkMode ? "rgba(112, 119, 161, 0.7)" : "#e0e0e0"} 37%, 
                ${darkMode ? "rgba(66, 71, 105, 0.7)" : "#f5f5f5"} 63%
              )`,
              }}
            />
          </>
        ) : filteredItems.length === 0 && searchTerm ? (
          // No search results with theme
          <NoResultsFound
            style={{
              color: theme.colors.text,
              backgroundColor: darkMode
                ? "rgba(66, 71, 105, 0.3)"
                : "rgba(245, 247, 250, 0.5)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              alt="No results"
              style={{ opacity: darkMode ? 0.8 : 1 }}
            />
            <h3>
              {darkMode ? "🌙 لا توجد نتائج مطابقة" : "لا توجد نتائج مطابقة"}
            </h3>
            <p style={{ color: theme.colors.textSecondary }}>
              لم نتمكن من العثور على رحلات مطابقة لكلمة البحث: "{searchTerm}"
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchTerm("")}
              style={{
                backgroundColor: theme.colors.primary,
                color: darkMode ? "#111" : "#fff",
              }}
            >
              مسح البحث
            </motion.button>
          </NoResultsFound>
        ) : filteredItems.length === 0 && activeFilter !== "all" ? (
          // No filtered results
          <NoResultsFound className={darkMode ? "dark-theme" : "light-theme"}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076402.png"
              alt="No filtered results"
              className={darkMode ? "dark-mode-image" : ""}
            />
            <h3>
              {darkMode
                ? "🌙 لا توجد رحلات مطابقة للفلتر"
                : "لا توجد رحلات مطابقة للفلتر"}
            </h3>
            <p className="secondary-text">
              لم نتمكن من العثور على رحلات{" "}
              {activeFilter === "upcoming"
                ? "قادمة"
                : activeFilter === "completed"
                ? "مكتملة"
                : "ملغاة"}
            </p>
            <CreateTripButton
              onClick={() => router.push("/create")}
              style={{
                backgroundColor: theme.colors.primary,
                color: darkMode ? "#000000" : "#FFFFFF",
                boxShadow: darkMode
                  ? `0 4px 12px ${theme.colors.primary}40`
                  : "0 4px 12px rgba(74, 114, 172, 0.2)",
              }}
            >
              عرض كل الرحلات
            </CreateTripButton>
          </NoResultsFound>
        ) : items.length === 0 ? (
          // Empty state with enhanced visuals
          <motion.div variants={cardVariants}>
            <EmptyTripsState
              style={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                boxShadow: darkMode
                  ? "0 10px 30px rgba(0, 0, 0, 0.3)"
                  : "0 10px 30px rgba(0, 0, 0, 0.1)",
                borderColor: theme.colors.border,
              }}
            >
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                alt="No trips"
                initial={{ y: 10 }}
                animate={{ y: [10, -10, 10] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                style={{
                  opacity: darkMode ? 0.85 : 1,
                  filter: darkMode ? "brightness(0.9)" : "none",
                }}
              />
              <h3 style={{ color: theme.colors.primary }}>
                {darkMode
                  ? "🌙 لم تقم بإنشاء أي رحلات بعد"
                  : "لم تقم بإنشاء أي رحلات بعد"}
              </h3>
              <p style={{ color: theme.colors.textSecondary }}>
                قم بإنشاء رحلة جديدة لتخطيط وتنظيم سفرك بشكل أفضل
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CreateTripButton
                  onClick={() => router.push("/create")}
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: darkMode ? "#000000" : "#FFFFFF",
                    boxShadow: darkMode
                      ? `0 4px 12px ${theme.colors.primary}40`
                      : "0 4px 12px rgba(74, 114, 172, 0.2)",
                  }}
                >
                  <AddIcon /> إنشاء رحلة جديدة
                </CreateTripButton>
              </motion.div>
            </EmptyTripsState>
          </motion.div>
        ) : (
          // Trip items with enhanced themed UI
          <>
            <TripsListHeader
              style={{
                color: theme.colors.textSecondary,
                borderColor: theme.colors.border,
              }}
            >
              <span>عدد الرحلات: {filteredItems.length}</span>
            </TripsListHeader>

            <TripsGrid>
              <AnimatePresence>
                {filteredItems.map((item) => {
                  // Handle potential undefined places array safely
                  const placesString = item.selectedTripPlaces?.[0] || "";
                  const places = placesString
                    .split(" -- ")
                    .filter((place) => place.trim() !== "");

                  const statusConfig = {
                    completed: {
                      color: "#4CAF50",
                      text: "مكتملة",
                      icon: <CheckIcon />,
                    },
                    upcoming: {
                      color: "#2196F3",
                      text: "قادمة",
                      icon: <AccessTimeIcon />,
                    },
                    cancelled: {
                      color: "#F44336",
                      text: "ملغاة",
                      icon: <ScheduleIcon />,
                    },
                  };

                  // Parse date (using a fallback if needed)
                  const tripDate = item.startDate
                    ? new Date(item.startDate)
                    : new Date();

                  // Format the date in Arabic if possible
                  let formattedDate;
                  try {
                    formattedDate = format(tripDate, "d MMMM yyyy", {
                      locale: ar,
                    });
                  } catch (e) {
                    // Fallback if format fails
                    formattedDate = tripDate.toLocaleDateString("ar-EG");
                  }
                  return (
                    <motion.div
                      key={item._id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      whileHover={{
                        y: -5,
                        boxShadow: darkMode
                          ? "0 8px 20px rgba(0, 0, 0, 0.5)"
                          : "0 8px 20px rgba(0, 0, 0, 0.15)",
                      }}
                      onClick={() => handleViewDetails(item._id)}
                    >
                      <TripCard
                        deleting={item.deleting}
                        style={{
                          backgroundColor: theme.colors.card,
                          color: theme.colors.text,
                          boxShadow: darkMode
                            ? "0 4px 15px rgba(0, 0, 0, 0.4)"
                            : "0 4px 12px rgba(0, 0, 0, 0.1)",
                          borderColor: darkMode
                            ? "rgba(112, 119, 161, 0.5)"
                            : theme.colors.border,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {/* Enhanced Image Carousel */}
                        <CarouselContainer>
                          {Array.isArray(item.images) &&
                          item.images.length > 0 ? (
                            <Slider {...carouselSettings}>
                              {item.images.map((image, index) => (
                                <CarouselImage key={index}>
                                  <img src={image} alt={`Trip ${index}`} />
                                </CarouselImage>
                              ))}
                            </Slider>
                          ) : (
                            <CarouselImage>
                              <img
                                src="https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Default Trip"
                              />
                            </CarouselImage>
                          )}

                          {/* Add image counter */}
                          {Array.isArray(item.images) &&
                            item.images.length > 1 && (
                              <ImageCounter>
                                {currentSlide + 1}/{item.images.length}
                              </ImageCounter>
                            )}

                          {/* Enhanced Gradient Overlay with glow effect for dark mode */}
                          <GradientOverlay
                            style={{
                              background: darkMode
                                ? "linear-gradient(to top, rgba(45, 50, 80, 0.95), rgba(45, 50, 80, 0) 70%)"
                                : "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 70%)",
                            }}
                          >
                            <FavoriteButton
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(item._id);
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={item.isFavorite ? "favorite" : ""}
                              style={{
                                backgroundColor: darkMode
                                  ? "rgba(66, 71, 105, 0.8)"
                                  : "rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {item.isFavorite ? (
                                <StarIcon
                                  sx={{ color: "#fec20f", fontSize: "24px" }}
                                />
                              ) : (
                                <StarBorderIcon
                                  sx={{ color: "white", fontSize: "24px" }}
                                />
                              )}
                            </FavoriteButton>
                            <StatusBadge status={item.status || "upcoming"}>
                              {statusConfig[item.status || "upcoming"]?.icon}
                              <span>
                                {statusConfig[item.status || "upcoming"]?.text}
                              </span>
                            </StatusBadge>
                          </GradientOverlay>
                        </CarouselContainer>

                        {/* Trip Header with theme */}
                        <TripHeader
                          style={{
                            borderBottomColor: theme.colors.border,
                          }}
                        >
                          <TripTitle style={{ color: theme.colors.text }}>
                            {item.locate || "رحلة بدون عنوان"}
                          </TripTitle>
                          <TripDate style={{ color: theme.colors.text }}>
                            <EventIcon
                              sx={{ fontSize: 18, color: theme.colors.primary }}
                            />
                            <span>{formattedDate}</span>
                          </TripDate>
                        </TripHeader>

                        {/* Enhanced Details Section with theme */}
                        <DetailsContainer
                          style={{
                            color: theme.colors.text,
                          }}
                        >
                          {/* Trip Features with themed icons */}
                          <div className="trip-features">
                            <TripFeature
                              style={{
                                backgroundColor: darkMode
                                  ? "rgba(45, 50, 80, 0.5)"
                                  : "#f5f7fa",
                                borderColor: theme.colors.border,
                              }}
                            >
                              <FeatureIcon
                                primary
                                style={{
                                  backgroundColor: darkMode
                                    ? "rgba(246, 177, 122, 0.2)"
                                    : "rgba(74, 114, 172, 0.1)",
                                  color: theme.colors.primary,
                                }}
                              >
                                <AttachMoneyIcon />
                              </FeatureIcon>
                              <span>{(item.budget || 0).toLocaleString()}</span>
                              <span
                                style={{ color: theme.colors.textSecondary }}
                              >
                                جنيه
                              </span>
                            </TripFeature>

                            <TripFeature
                              style={{
                                backgroundColor: darkMode
                                  ? "rgba(45, 50, 80, 0.5)"
                                  : "#f5f7fa",
                                borderColor: theme.colors.border,
                              }}
                            >
                              <FeatureIcon
                                secondary
                                style={{
                                  backgroundColor: darkMode
                                    ? "rgba(170, 178, 213, 0.2)"
                                    : "rgba(3, 169, 244, 0.1)",
                                  color: darkMode ? "#AAB2D5" : "#03a9f4",
                                }}
                              >
                                <PeopleIcon />
                              </FeatureIcon>
                              <span>{item.numberOfPersons || 0} </span>
                              <span
                                style={{ color: theme.colors.textSecondary }}
                              >
                                أشخاص
                              </span>
                            </TripFeature>

                            <TripFeature
                              style={{
                                backgroundColor: darkMode
                                  ? "rgba(45, 50, 80, 0.5)"
                                  : "#f5f7fa",
                                borderColor: theme.colors.border,
                              }}
                            >
                              <FeatureIcon
                                success
                                style={{
                                  backgroundColor: darkMode
                                    ? "rgba(76, 175, 80, 0.2)"
                                    : "rgba(76, 175, 80, 0.1)",
                                  color: "#4CAF50",
                                }}
                              >
                                <CategoryIcon />
                              </FeatureIcon>
                              <span>{item.typeOfProgram || "غير محدد"}</span>
                            </TripFeature>
                          </div>

                          {/* Timeline with theme */}
                          {places.length > 0 && (
                            <TimelineSection
                              style={{
                                borderTopColor: theme.colors.border,
                              }}
                            >
                              <h3 style={{ color: theme.colors.text }}>
                                خط سير الرحلة
                              </h3>
                              <div className="timeline-container">
                                {places
                                  .slice(0, isMobile ? 2 : 3)
                                  .map((place, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      <TimelineItem
                                        isLast={
                                          index ===
                                          Math.min(
                                            isMobile ? 1 : 2,
                                            places.length - 1
                                          )
                                        }
                                        style={{ color: theme.colors.text }}
                                      >
                                        <TimelineDot
                                          style={{
                                            backgroundColor:
                                              theme.colors.primary,
                                          }}
                                        />
                                        {index !==
                                          Math.min(
                                            isMobile ? 1 : 2,
                                            places.length - 1
                                          ) && (
                                          <TimelineLine
                                            style={{
                                              backgroundColor: darkMode
                                                ? "rgba(112, 119, 161, 0.5)"
                                                : "#e0e0e0",
                                            }}
                                          />
                                        )}
                                        <span>{place}</span>
                                      </TimelineItem>
                                    </motion.div>
                                  ))}
                                {places.length > (isMobile ? 2 : 3) && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="more-places"
                                  >
                                    {places.length - (isMobile ? 2 : 3)}+ وجهات{" "}
                                    أخرى
                                  </motion.div>
                                )}
                              </div>
                            </TimelineSection>
                          )}

                          {/* Themed action buttons */}
                          <CardActions
                            style={{ borderTopColor: theme.colors.border }}
                          >
                            <ViewDetailsButton
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                backgroundColor: theme.colors.primary,
                                color: "#fff",
                                boxShadow: darkMode
                                  ? "0 4px 8px rgba(246, 177, 122, 0.3)"
                                  : "0 4px 8px rgba(74, 114, 172, 0.2)",
                              }}
                            >
                              <VisibilityIcon /> عرض التفاصيل
                            </ViewDetailsButton>

                            <ActionButtons>
                              <ActionButton
                                edit
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => handleEditTrip(item._id, e)}
                                style={{
                                  backgroundColor: darkMode
                                    ? "rgba(3, 169, 244, 0.2)"
                                    : "rgba(3, 169, 244, 0.1)",
                                  color: "#03a9f4",
                                }}
                              >
                                <EditIcon />
                              </ActionButton>
                              <ActionButton
                                delete
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirm(item._id);
                                }}
                                style={{
                                  backgroundColor: darkMode
                                    ? "rgba(244, 67, 54, 0.2)"
                                    : "rgba(244, 67, 54, 0.1)",
                                  color: "#F44336",
                                }}
                              >
                                <DeleteIcon />
                              </ActionButton>
                            </ActionButtons>
                          </CardActions>
                        </DetailsContainer>
                      </TripCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </TripsGrid>
          </>
        )}

        {/* Themed delete confirmation dialog */}
        <AnimatePresence>
          {deleteConfirm && (
            <DeleteConfirmOverlay
              style={{
                backgroundColor: darkMode
                  ? "rgba(45, 50, 80, 0.85)"
                  : "rgba(0, 0, 0, 0.5)",
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DeleteConfirmDialog
                  style={{
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    boxShadow: darkMode
                      ? "0 10px 30px rgba(0, 0, 0, 0.5)"
                      : "0 10px 30px rgba(0, 0, 0, 0.2)",
                    border: darkMode
                      ? "1px solid rgba(112, 119, 161, 0.3)"
                      : "none",
                  }}
                >
                  <h3 style={{ color: theme.colors.text }}>تأكيد الحذف</h3>
                  <p style={{ color: theme.colors.textSecondary }}>
                    هل أنت متأكد من حذف هذه الرحلة؟ لا يمكن التراجع عن هذا
                    الإجراء.
                  </p>
                  <DeleteConfirmButtons>
                    <motion.button
                      className="confirm-btn"
                      onClick={() => {
                        handleDelete(deleteConfirm);
                        setDeleteConfirm(null);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundColor: "#F44336",
                        color: "#fff",
                      }}
                    >
                      نعم، حذف الرحلة
                    </motion.button>
                    <motion.button
                      className="cancel-btn"
                      onClick={() => setDeleteConfirm(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundColor: darkMode
                          ? "rgba(97, 102, 131, 0.8)"
                          : "#e0e0e0",
                        color: darkMode ? "#fff" : "#333",
                      }}
                    >
                      إلغاء
                    </motion.button>
                  </DeleteConfirmButtons>
                </DeleteConfirmDialog>
              </motion.div>
            </DeleteConfirmOverlay>
          )}
        </AnimatePresence>

        {/* Success message with theme */}
        <AnimatePresence>
          {deleteSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessMessage
                style={{
                  backgroundColor: darkMode
                    ? `${theme.colors.surface}` // Semi-transparent surface color
                    : `${theme.colors.background}`, // Semi-transparent background color
                  color: theme.colors.primary, // Using primary color for text
                  borderColor: `${theme.colors.border}  `, // Semi-transparent border
                  boxShadow: `0 4px 12px ${
                    darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)"
                  }`,
                  borderRight: `4px solid ${theme.colors.primary}`, // Accent border using primary color
                }}
              >
                <CheckIcon style={{ color: theme.colors.primary }} /> تم حذف
                الرحلة بنجاح
              </SuccessMessage>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trip Details Dialog */}
        <AnimatePresence>
          {detailsDialogOpen && (
            <TripDetailsDialog
              open={detailsDialogOpen}
              onClose={() => setDetailsDialogOpen(false)}
              trip={selectedTripDetails}
              darkMode={darkMode}
              theme={theme}
            />
          )}
        </AnimatePresence>
      </MyMyBox>
    </motion.div>
  );
};

// Add this component to your Trips.jsx file
const TripDetailsDialog = ({ open, onClose, trip, darkMode, theme }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Return null if no trip data is provided
  if (!trip) return null;

  // Parse places from trip.selectedTripPlaces
  const getPlaces = () => {
    if (!trip.selectedTripPlaces || !trip.selectedTripPlaces[0]) {
      return [];
    }

    return trip.selectedTripPlaces[0]
      .split(" -- ")
      .filter((place) => place.trim() !== "");
  };

  const places = getPlaces();

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";

    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: ar });
    } catch (error) {
      return "تاريخ غير صالح";
    }
  };

  // Status configuration for badges
  const statusConfig = {
    completed: {
      label: "مكتملة",
      icon: <CheckIcon />,
      color: "#4CAF50",
    },
    upcoming: {
      label: "قادمة",
      icon: <AccessTimeIcon />,
      color: "#2196F3",
    },
    cancelled: {
      label: "ملغاة",
      icon: <ScheduleIcon />,
      color: "#F44336",
    },
  };

  // Handle image navigation
  const handleNextImage = () => {
    if (trip.images && trip.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === trip.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (trip.images && trip.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? trip.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <DialogOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      $theme={{ colors: theme, darkMode }}
    >
      <DialogContent
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        $theme={{ colors: theme, darkMode }}
      >
        <DialogHeader>
          <DialogTitle>{trip.locate || "رحلة"}</DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogHeader>

        {/* Image Carousel */}
        <CarouselContainer>
          {Array.isArray(trip.images) && trip.images.length > 0 ? (
            <>
              <CarouselImage>
                <img
                  src={trip.images[currentImageIndex]}
                  alt={`صورة الرحلة ${currentImageIndex + 1}`}
                />
              </CarouselImage>
              <ImageNavigation>
                <NavButton onClick={handlePreviousImage}>
                  <ArrowBackIcon />
                </NavButton>
                <ImageCounter>
                  {currentImageIndex + 1} / {trip.images.length}
                </ImageCounter>
                <NavButton onClick={handleNextImage}>
                  <ArrowForwardIcon />
                </NavButton>
              </ImageNavigation>
            </>
          ) : (
            <CarouselImage>
              <img
                src="https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="صورة افتراضية للرحلة"
              />
            </CarouselImage>
          )}

          {/* Status Badge */}
          <StatusBadge
            $status={trip.status || "upcoming"}
            $color={statusConfig[trip.status || "upcoming"].color}
          >
            {statusConfig[trip.status || "upcoming"].icon}
            <span>{statusConfig[trip.status || "upcoming"].label}</span>
          </StatusBadge>
        </CarouselContainer>

        {/* Trip Details */}
        <DetailSection>
          <DetailGroup>
            <DetailItem>
              <DetailIcon $color="#2196F3">
                <LocationOnIcon />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>الوجهة</DetailLabel>
                <DetailValue>{trip.locate || "غير محدد"}</DetailValue>
              </DetailContent>
            </DetailItem>

            <DetailItem>
              <DetailIcon $color="#4CAF50">
                <AttachMoneyIcon />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>الميزانية</DetailLabel>
                <DetailValue>
                  {(trip.budget || 0).toLocaleString()} جنيه
                </DetailValue>
              </DetailContent>
            </DetailItem>

            <DetailItem>
              <DetailIcon $color="#9C27B0">
                <PeopleIcon />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>عدد الأشخاص</DetailLabel>
                <DetailValue>{trip.numberOfPersons || 0} أشخاص</DetailValue>
              </DetailContent>
            </DetailItem>

            <DetailItem>
              <DetailIcon $color="#FF9800">
                <CategoryIcon />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>نوع البرنامج</DetailLabel>
                <DetailValue>{trip.typeOfProgram || "غير محدد"}</DetailValue>
              </DetailContent>
            </DetailItem>

            <DetailItem>
              <DetailIcon $color="#009688">
                <CalendarMonthIcon />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>تاريخ الرحلة</DetailLabel>
                <DetailValue>{formatDate(trip.startDate)}</DetailValue>
              </DetailContent>
            </DetailItem>
          </DetailGroup>
        </DetailSection>

        {/* Places/Timeline */}
        {places.length > 0 && (
          <DetailSection>
            <SectionTitle>مسار الرحلة</SectionTitle>
            <TimelineContainer>
              {places.map((place, index) => (
                <TimelineItem key={index} $isLast={index === places.length - 1}>
                  <TimelineDot />
                  <TimelineContent>
                    <TimelinePlace>{place}</TimelinePlace>
                    {trip.timeEstimate && trip.timeEstimate[index] && (
                      <TimelineEstimate>
                        {trip.timeEstimate[index]}
                      </TimelineEstimate>
                    )}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </DetailSection>
        )}

        {/* Notes Section */}
        {trip.notes && trip.notes.trim() && (
          <DetailSection>
            <SectionTitle>
              <NotesIcon /> ملاحظات
            </SectionTitle>
            <NotesText>{trip.notes}</NotesText>
          </DetailSection>
        )}

        {/* AI Generated Badge (if applicable) */}
        {trip.isAIGenerated && (
          <AIBadge>
            <AutoAwesomeIcon /> رحلة مُنشأة بالذكاء الاصطناعي
          </AIBadge>
        )}

        {/* Action Buttons */}
        <DialogActions>
          <ActionButton
            onClick={() => window.open(`/edit-trip/${trip._id}`, "_self")}
            $primary={false}
          >
            <EditIcon /> تعديل
          </ActionButton>
          <ActionButton
            onClick={() => window.open(`/trip-details/${trip._id}`, "_self")}
            $primary={true}
          >
            <VisibilityIcon /> تفاصيل كاملة
          </ActionButton>
        </DialogActions>
      </DialogContent>
    </DialogOverlay>
  );
};

// Add these styled components to your Trips.jsx file
const DialogOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ $theme }) =>
    $theme.darkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.6)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(5px);
  direction: rtl;
`;

const DialogContent = styled(motion.div)`
  background: ${({ $theme }) => $theme.colors.surface};
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ $theme }) =>
      $theme.darkMode ? "rgba(255, 255, 255, 0.1)" : "#f1f1f1"};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ $theme }) =>
      $theme.darkMode ? "rgba(255, 255, 255, 0.2)" : "#888"};
    border-radius: 3px;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ $theme }) => $theme?.colors?.border || "#eee"};
`;

const DialogTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: inherit;
  margin: 0;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ $theme }) => $theme?.colors?.text || "inherit"};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $theme }) =>
      $theme?.darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const CarouselImage = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageNavigation = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ImageCounter = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

const StatusBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${({ $color }) => $color || "#2196F3"};
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  svg {
    font-size: 16px;
  }
`;

const DetailSection = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ $theme }) => $theme?.colors?.border || "#eee"};
`;

const DetailGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DetailIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $color }) => `${$color}20` || "rgba(33, 150, 243, 0.2)"};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ $color }) => $color || "#2196F3"};
    font-size: 20px;
  }
`;

const DetailContent = styled.div`
  flex: 1;
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: ${({ $theme }) => $theme?.colors?.textSecondary || "#666"};
  margin-bottom: 2px;
`;

const DetailValue = styled.div`
  font-weight: 600;
`;

const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ $theme }) => $theme?.colors?.primary || "#3b5898"};
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-right: 20px;
  margin-top: 16px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 8px;
    width: 2px;
    background-color: ${({ $theme }) =>
      $theme?.darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(59, 88, 152, 0.2)"};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: ${({ $isLast }) => ($isLast ? "0" : "16px")};
`;

const TimelineDot = styled.div`
  position: absolute;
  right: -20px;
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ $theme }) => $theme?.colors?.primary || "#3b5898"};
  z-index: 1;
`;

const TimelineContent = styled.div`
  margin-right: 12px;
`;

const TimelinePlace = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const TimelineEstimate = styled.div`
  font-size: 13px;
  color: ${({ $theme }) => $theme?.colors?.textSecondary || "#666"};
`;

const NotesText = styled.div`
  white-space: pre-line;
  line-height: 1.5;
`;

const AIBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 16px 20px;
  background: linear-gradient(135deg, #3b5898, #4a72ac);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  align-self: flex-start;

  svg {
    font-size: 16px;
  }
`;

const DialogActions = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid ${({ $theme }) => $theme?.colors?.border || "#eee"};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background: ${({ $primary, $theme }) =>
    $primary ? $theme?.colors?.primary || "#3b5898" : "transparent"};
  color: ${({ $primary, $theme }) =>
    $primary ? "#fff" : $theme?.colors?.primary || "#3b5898"};
  border: 1px solid
    ${({ $primary, $theme }) =>
      $primary ? "transparent" : $theme?.colors?.primary || "#3b5898"};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: ${({ $primary, $theme }) =>
      $primary
        ? $theme?.darkMode
          ? `${$theme?.colors?.primary}e0`
          : `${$theme?.colors?.primary}d0`
        : $theme?.darkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(59, 88, 152, 0.1)"};
  }
`;

export default Trips;
