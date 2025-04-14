"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Skeleton,
  Tooltip as MuiTooltip,
  Badge,
  Divider,
  Alert,
  ButtonGroup,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessibleIcon from "@mui/icons-material/Accessible";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import TodayIcon from "@mui/icons-material/Today";

// MUI Icons
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PhotoIcon from "@mui/icons-material/Photo";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { format, subDays, subMonths } from "date-fns";
import { ar } from "date-fns/locale";

// Status component to display place status with appropriate styling
const StatusBadge = ({ status, rejectionReason }) => {
  const statusConfig = {
    approved: {
      label: "معتمد",
      color: "success",
      icon: <CheckCircleIcon fontSize="small" />,
    },
    pending: {
      label: "قيد المراجعة",
      color: "warning",
      icon: <PendingIcon fontSize="small" />,
    },
    rejected: {
      label: "مرفوض",
      color: "error",
      icon: <CancelIcon fontSize="small" />,
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Tooltip
      title={
        status === "rejected" && rejectionReason
          ? `سبب الرفض: ${rejectionReason}`
          : ""
      }
      arrow
      placement="top"
    >
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
        sx={{
          fontWeight: "bold",
          direction: "rtl",
          padding: "5px",
        }}
      />
    </Tooltip>
  );
};

// Format date function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Enhance the main component with tabs for different views

const MyPlaces = () => {
  const { theme, darkMode } = useTheme();
  const router = useRouter();

  // State management
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [activeTab, setActiveTab] = useState("grid");
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [batchActionMenu, setBatchActionMenu] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: "info",
  });

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);
  const [placeStatistics, setPlaceStatistics] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  // Handle selection of places for batch operations
  const handleSelectPlace = (placeId) => {
    setSelectedPlaces((prevSelected) => {
      if (prevSelected.includes(placeId)) {
        return prevSelected.filter((id) => id !== placeId);
      } else {
        return [...prevSelected, placeId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedPlaces.length === filteredPlaces.length) {
      setSelectedPlaces([]);
    } else {
      setSelectedPlaces(filteredPlaces.map((place) => place.id));
    }
  };

  const handleBatchAction = (action) => {
    // Logic for handling batch actions (delete, feature, etc)
    if (action === "delete") {
      // Show confirmation dialog for batch delete
      // ...
    } else if (action === "feature") {
      // Logic for featuring multiple places
      // ...
    }

    setBatchActionMenu(null);
  };

  // Load places data
  // Add this to the MyPlaces component
  // Update the useEffect for loading data from API
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        try {
          const response = await axios.get(
            "https://iti-server-production.up.railway.app/api/seller-places/my-places",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Format the data to match the component's expected format
          const formattedPlaces = response.data.map((place) => ({
            id: place._id,
            name: place.name,
            category: place.category,
            description: place.description,
            address: `${place.city}, ${place.address}`,
            status: place.isApproved
              ? "approved"
              : place.rejectionReason
              ? "rejected"
              : "pending",
            images: place.images || [],
            stats: {
              views: place.views || 0,
              visits: place.visits || 0,
              ratings: place.rating || 0,
              reviewsCount: place.reviews?.length || 0,
            },
            createdAt: place.createdAt,
            updatedAt: place.updatedAt,
            featured: place.featured || false,
            isApproved: place.isApproved,
            rejectionReason: place.rejectionReason,
            _id: place._id,
          }));

          setPlaces(formattedPlaces);
          setFilteredPlaces(formattedPlaces);
        } catch (error) {
          console.error("Error fetching places:", error);
          // Fall back to sample data in development
          setPlaces(samplePlaces);
          setFilteredPlaces(samplePlaces);

          // You might want to show some error notification here
        }

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchPlaces:", error);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [router]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...places];

    // Apply status filter
    if (activeFilter !== "all") {
      result = result.filter((place) => place.status === activeFilter);
    }

    // Apply search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (place) =>
          place.name.toLowerCase().includes(term) ||
          place.category.toLowerCase().includes(term) ||
          place.description.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let compareResult = 0;

      switch (sortBy) {
        case "name":
          compareResult = a.name.localeCompare(b.name);
          break;
        case "date":
          compareResult = new Date(b.updatedAt) - new Date(a.updatedAt);
          break;
        case "views":
          compareResult = b.stats.views - a.stats.views;
          break;
        case "visits":
          compareResult = b.stats.visits - a.stats.visits;
          break;
        default:
          compareResult = new Date(b.updatedAt) - new Date(a.updatedAt);
      }

      return sortDirection === "asc" ? -compareResult : compareResult;
    });

    setFilteredPlaces(result);
  }, [places, activeFilter, searchTerm, sortBy, sortDirection]);

  // Handler functions
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setFilterMenuAnchor(null);
  };

  const handleSortChange = (sort) => {
    if (sortBy === sort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sort);
      setSortDirection("desc");
    }
    setSortMenuAnchor(null);
  };

  const handleOpenActionMenu = (event, placeId) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedPlaceId(placeId);
  };

  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
    setSelectedPlaceId(null);
  };

  const handleDeleteClick = (placeId) => {
    setPlaceToDelete(placeId);
    setDeleteDialogOpen(true);
    handleCloseActionMenu();
  };

  const handleConfirmDelete = () => {
    // This would be replaced with an actual API call
    setPlaces(places.filter((place) => place.id !== placeToDelete));
    setDeleteDialogOpen(false);
    setPlaceToDelete(null);
    setSuccessMessage("تم حذف المكان بنجاح");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPlaceToDelete(null);
  };

  const handleEditPlace = (placeId) => {
    router.push(`/edit-place/${placeId}`);
    handleCloseActionMenu();
  };

  const handleAddPlace = () => {
    router.push("/add-place");
  };

  const handleFeaturePlace = (placeId) => {
    // This would be replaced with an actual API call
    const updatedPlaces = places.map((place) => {
      if (place.id === placeId) {
        return {
          ...place,
          featured: !place.featured,
        };
      }
      return place;
    });

    setPlaces(updatedPlaces);
    handleCloseActionMenu();

    const featuredStatus = updatedPlaces.find(
      (p) => p.id === placeId
    )?.featured;
    setSuccessMessage(
      featuredStatus ? "تم تمييز المكان بنجاح" : "تم إلغاء تمييز المكان بنجاح"
    );
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: "info" });
    }, 3000);
  };

  // Calculate statistics
  const stats = {
    total: places.length,
    approved: places.filter((place) => place.status === "approved").length,
    pending: places.filter((place) => place.status === "pending").length,
    rejected: places.filter((place) => place.status === "rejected").length,
    featured: places.filter((place) => place.featured).length,
    totalViews: places.reduce((total, place) => total + place.stats.views, 0),
    totalVisits: places.reduce((total, place) => total + place.stats.visits, 0),
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const handleViewDetails = async (placeId) => {
    try {
      setDetailsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      // Get the place from current state if available
      const existingPlace = places.find(
        (place) => place._id === placeId || place.id === placeId
      );

      if (existingPlace) {
        setSelectedPlaceDetails(existingPlace);
        setCurrentImageIndex(0);
        setDetailsDialogOpen(true);
      }

      // Also fetch the latest details from backend to get most up-to-date info
      try {
        const response = await axios.get(
          `https://iti-server-production.up.railway.app/api/seller-places/my-places/${placeId}/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update with the fresh data
        setSelectedPlaceDetails({
          ...response.data,
          id: response.data._id, // Ensure consistent ID access
          _id: response.data._id,
          status: response.data.isApproved
            ? "approved"
            : response.data.rejectionReason
            ? "rejected"
            : "pending",
        });
      } catch (error) {
        console.error("Error fetching place details:", error);
        showNotification("حدث خطأ أثناء تحميل تفاصيل المكان", "error");
        // Continue with existing data if available
      }
    } catch (error) {
      console.error("Error in handleViewDetails:", error);
      showNotification("حدث خطأ أثناء تحميل تفاصيل المكان", "error");
    } finally {
      setDetailsLoading(false);
    }
  };

  // Add these handlers for image navigation
  const handleNextImage = () => {
    if (selectedPlaceDetails && selectedPlaceDetails.images?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedPlaceDetails.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (selectedPlaceDetails && selectedPlaceDetails.images?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedPlaceDetails.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Get category label function
  const getCategoryLabel = (category) => {
    const categories = {
      restaurants: "مطاعم وكافيهات",
      tourism: "أماكن سياحية",
      hotels: "فنادق ومنتجعات",
      shopping: "تسوق ومولات",
      entertainment: "أنشطة ترفيهية",
      museums: "متاحف ومعارض",
    };

    return categories[category] || category;
  };

  // Function to handle viewing statistics
  const handleViewStatistics = async (placeId) => {
    try {
      setStatsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      // Get place from current state
      const place = places.find((p) => p._id === placeId || p.id === placeId);
      if (place) {
        setPlaceStatistics(place);
      }

      // Fetch latest statistics from backend
      try {
        const response = await axios.get(
          `https://iti-server-production.up.railway.app/api/seller-places/my-places/${placeId}/statistics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlaceStatistics({
          ...place,
          ...response.data,
        });

        setStatsDialogOpen(true);
      } catch (error) {
        // If API is not available, use the data we already have
        console.error("Error fetching statistics:", error);
        showNotification("سيتم عرض البيانات المتوفرة محليًا", "info");
        setPlaceStatistics(place);
        setStatsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error in handleViewStatistics:", error);
      showNotification("حدث خطأ أثناء تحميل إحصائيات المكان", "error");
    } finally {
      setStatsLoading(false);
    }
  };

  return (
    <PageContainer>
      {/* Statistics Section */}
      <StatsContainer>
        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color={theme.colors.primary}>
            <StorefrontIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.total}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              إجمالي الأماكن
            </StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color="#4CAF50">
            <CheckCircleIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.approved}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              تم الموافقة عليها
            </StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color="#FF9800">
            <PendingIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.pending}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              قيد المراجعة
            </StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color={theme.colors.primary}>
            <VisibilityIcon />
          </StatsIconWrapper>
          <StatsContent>
            <StatsValue $darkMode={darkMode} $theme={theme}>
              {stats.totalViews.toLocaleString()}
            </StatsValue>
            <StatsLabel $darkMode={darkMode} $theme={theme}>
              المشاهدات
            </StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard $darkMode={darkMode} $theme={theme}>
          <StatsIconWrapper $darkMode={darkMode} $color="#4A72AC">
            <PersonIcon />
          </StatsIconWrapper>
        </StatsCard>
      </StatsContainer>

      {/* <AnalyticsSection /> */}

      <InsightsSection places={places} darkMode={darkMode} theme={theme} />

      {/* Controls Section */}
      <ActionsContainer>
        <SearchBox>
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="البحث عن مكان..."
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: darkMode
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(0,0,0,0.5)",
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "12px",
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: theme.colors.primary + "40",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.colors.primary,
                },
              },
            }}
          />
        </SearchBox>

        <ActionsButtonGroup>
          {/* View mode tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              minHeight: "42px",
              bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              borderRadius: "12px",
              padding: "4px",
              "& .MuiTab-root": {
                minHeight: "42px",
                pt: 0,
                pb: 0,
                color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                transition: "all 0.2s ease",
                "&.Mui-selected": {
                  color: theme.colors.primary,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.colors.primary,
                height: "3px",
                borderRadius: "1.5px",
              },
            }}
          >
            <Tab
              icon={<ViewModuleIcon />}
              value="grid"
              aria-label="grid view"
              sx={{
                minWidth: "auto",
                borderRadius: "8px",
                "&.Mui-selected": {
                  bgcolor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                },
              }}
            />
            <Tab
              icon={<ViewListIcon />}
              value="list"
              aria-label="list view"
              sx={{
                minWidth: "auto",
                borderRadius: "8px",
                "&.Mui-selected": {
                  bgcolor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                },
              }}
            />
          </Tabs>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* Filter and sort buttons */}
          <FilterButton
            variant="outlined"
            onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
            endIcon={<FilterListIcon />}
            $darkMode={darkMode}
            $theme={theme}
          >
            تصفية
          </FilterButton>

          <FilterButton
            variant="outlined"
            onClick={(e) => setSortMenuAnchor(e.currentTarget)}
            endIcon={<SortIcon />}
            $darkMode={darkMode}
            $theme={theme}
          >
            {sortDirection === "asc" ? "تصاعدي" : "تنازلي"}
          </FilterButton>

          {/* Batch actions for selected places */}
          {selectedPlaces.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mr: 2 }}>
              <Typography variant="body2">
                تم تحديد {selectedPlaces.length}{" "}
                {selectedPlaces.length === 1 ? "مكان" : "أماكن"}
              </Typography>
              <Button
                variant="outlined"
                onClick={(e) => setBatchActionMenu(e.currentTarget)}
                startIcon={<MoreVertIcon />}
                size="small"
                sx={{ direction: "ltr" }}
              >
                إجراء
              </Button>
              <IconButton onClick={() => setSelectedPlaces([])} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          <AddButton
            variant="contained"
            onClick={handleAddPlace}
            startIcon={<AddBusinessIcon sx={{ ml: "8px" }} />}
            $darkMode={darkMode}
            $theme={theme}
          >
            إضافة مكان جديد
          </AddButton>
        </ActionsButtonGroup>
      </ActionsContainer>

      {/* Places List Section with Selection Support */}
      {loading ? (
        <LoadingPlaceCards darkMode={darkMode} theme={theme} />
      ) : filteredPlaces.length > 0 ? (
        <Box sx={{ position: "relative" }}>
          {activeTab === "grid" && (
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      selectedPlaces.length === filteredPlaces.length &&
                      filteredPlaces.length > 0
                    }
                    indeterminate={
                      selectedPlaces.length > 0 &&
                      selectedPlaces.length < filteredPlaces.length
                    }
                    onChange={handleSelectAll}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    تحديد الكل ({filteredPlaces.length})
                  </Typography>
                }
              />

              <Typography variant="body2" color="textSecondary">
                إجمالي النتائج: {filteredPlaces.length}
              </Typography>
            </Box>
          )}

          {activeTab === "grid" && (
            <CardsContainer>
              <AnimatePresence>
                {filteredPlaces.map((place) => (
                  <motion.div
                    key={place.id}
                    variants={itemVariants}
                    layout
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Checkbox
                        checked={selectedPlaces.includes(place.id)}
                        onChange={() => handleSelectPlace(place.id)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          zIndex: 2,
                          bgcolor: "rgba(255, 255, 255, 0.7)",
                          borderRadius: "50%",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                          },
                        }}
                      />
                      <EnhancedPlaceCard
                        place={place}
                        onEdit={handleEditPlace}
                        onDelete={() => handleDeleteClick(place.id)}
                        onToggleFeature={handleFeaturePlace}
                        onView={() => handleViewDetails(place.id)}
                        darkMode={darkMode}
                        theme={theme}
                        className="place-card"
                      />
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardsContainer>
          )}

          {activeTab === "list" && (
            <TableContainer
              component={Paper}
              sx={{
                overflow: "auto",
                borderRadius: 3,
                boxShadow: darkMode
                  ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
                backgroundColor: darkMode ? theme.colors.surface : "#ffffff",
                "& .MuiTable-root": {
                  backgroundColor: darkMode ? theme.colors.surface : "#ffffff",
                },
              }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: darkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.02)",
                      "& th": {
                        color: darkMode
                          ? theme.colors.text
                          : "rgba(0, 0, 0, 0.87)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        borderBottom: darkMode
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedPlaces.length === filteredPlaces.length &&
                          filteredPlaces.length > 0
                        }
                        indeterminate={
                          selectedPlaces.length > 0 &&
                          selectedPlaces.length < filteredPlaces.length
                        }
                        onChange={handleSelectAll}
                        sx={{
                          color: darkMode
                            ? "rgba(255, 255, 255, 0.3)"
                            : undefined,
                          "&.Mui-checked": {
                            color: theme.colors.primary,
                          },
                          "&.MuiCheckbox-indeterminate": {
                            color: theme.colors.primary,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">المكان</TableCell>
                    <TableCell align="center">الفئة</TableCell>
                    <TableCell align="center">الحالة</TableCell>
                    <TableCell align="center">المشاهدات</TableCell>
                    <TableCell align="center">الزيارات</TableCell>
                    <TableCell align="center">التقييم</TableCell>
                    <TableCell style={{ width: 125 }}>تاريخ التحديث</TableCell>
                    <TableCell align="center">الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    "& .MuiTableRow-root": {
                      "&:hover": {
                        backgroundColor: darkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: darkMode
                          ? `${theme.colors.primary}20`
                          : `${theme.colors.primary}10`,
                        "&:hover": {
                          backgroundColor: darkMode
                            ? `${theme.colors.primary}30`
                            : `${theme.colors.primary}20`,
                        },
                      },
                    },
                    "& .MuiTableCell-root": {
                      color: darkMode ? theme.colors.text : undefined,
                      borderBottom: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.08)"
                        : undefined,
                    },
                  }}
                >
                  {filteredPlaces.map((place) => (
                    <TableRow
                      key={place.id}
                      hover
                      selected={selectedPlaces.includes(place.id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedPlaces.includes(place.id)}
                          onChange={() => handleSelectPlace(place.id)}
                          sx={{
                            color: darkMode
                              ? "rgba(255, 255, 255, 0.3)"
                              : undefined,
                            "&.Mui-checked": {
                              color: theme.colors.primary,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          src={place.images[0]}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                        <Box style={{ textAlign: "right", width: "150px" }}>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{
                              color: darkMode ? theme.colors.text : undefined,
                            }}
                          >
                            {place.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: darkMode
                                ? theme.colors.textSecondary
                                : "text.secondary",
                            }}
                          >
                            {place.address}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{place.category}</TableCell>
                      <TableCell>
                        <StatusBadge status={place.status} />
                      </TableCell>
                      <TableCell align="right">
                        {place.stats.views.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {place.stats.visits.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {place.stats.ratings > 0 ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Typography variant="body2" mr={0.5}>
                              {place.stats.ratings.toFixed(1)}
                            </Typography>
                            <StarIcon sx={{ color: "#FFC107", fontSize: 16 }} />
                          </Box>
                        ) : (
                          <Typography
                            sx={{
                              color: darkMode
                                ? "rgba(255, 255, 255, 0.5)"
                                : "rgba(0, 0, 0, 0.38)",
                            }}
                          >
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(place.updatedAt)}</TableCell>
                      <TableCell style={{ width: 150 }}>
                        <IconButton
                          onClick={() => handleEditPlace(place.id)}
                          size="small"
                          sx={{
                            color: darkMode ? theme.colors.text : undefined,
                            "&:hover": {
                              backgroundColor: darkMode
                                ? "rgba(255, 255, 255, 0.1)"
                                : undefined,
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(place.id)}
                          size="small"
                          sx={{
                            "&:hover": {
                              backgroundColor: darkMode
                                ? "rgba(255, 0, 0, 0.1)"
                                : undefined,
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleViewDetails(place.id)}
                          size="small"
                          sx={{
                            color: darkMode ? theme.colors.primary : undefined,
                            "&:hover": {
                              backgroundColor: darkMode
                                ? `${theme.colors.primary}20`
                                : undefined,
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ) : (
        <EmptyState
          darkMode={darkMode}
          theme={theme}
          onAddNew={handleAddPlace}
        />
      )}

      {/* Batch action menu */}
      <Menu
        anchorEl={batchActionMenu}
        open={Boolean(batchActionMenu)}
        onClose={() => setBatchActionMenu(null)}
      >
        <MenuItem onClick={() => handleBatchAction("feature")} dense>
          <ListItemIcon>
            <StarIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>تمييز المحدد</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleBatchAction("download")} dense>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>تصدير بيانات المحدد</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleBatchAction("delete")}
          dense
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>حذف المحدد</ListItemText>
        </MenuItem>
      </Menu>

      {/* Action menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleCloseActionMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {selectedPlaceId &&
          places.find((p) => p.id === selectedPlaceId)?.status ===
            "approved" && (
            <MenuItem onClick={() => handleFeaturePlace(selectedPlaceId)} dense>
              {places.find((p) => p.id === selectedPlaceId)?.featured ? (
                <>
                  <StarBorderIcon fontSize="small" sx={{ ml: 1 }} />
                  إلغاء التمييز
                </>
              ) : (
                <>
                  <StarIcon fontSize="small" sx={{ ml: 1 }} />
                  تمييز المكان
                </>
              )}
            </MenuItem>
          )}
        <MenuItem onClick={() => handleEditPlace(selectedPlaceId)} dense>
          <EditIcon fontSize="small" sx={{ ml: 1 }} />
          تعديل المكان
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteClick(selectedPlaceId)}
          dense
          sx={{ color: "error.main" }}
        >
          <DeleteIcon fontSize="small" sx={{ ml: 1 }} />
          حذف المكان
        </MenuItem>
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
        dir="rtl"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>تأكيد حذف المكان</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل أنت متأكد من أنك تريد حذف هذا المكان؟ لا يمكن التراجع عن هذه
            العملية.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleCancelDelete} variant="outlined">
            إلغاء
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{ mr: 1 }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              maxWidth: "90%",
              width: "auto",
            }}
          >
            <Alert
              severity="success"
              variant="filled"
              sx={{
                borderRadius: 2,
                boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
              }}
            >
              {successMessage}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {notification.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            maxWidth: "90%",
            width: "auto",
          }}
        >
          <Alert
            severity={notification.type}
            variant="filled"
            sx={{
              borderRadius: 2,
              boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
            }}
          >
            {notification.message}
          </Alert>
        </motion.div>
      )}

      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: darkMode ? theme.colors.surface : "#ffffff",
            color: theme.colors.text,
            borderRadius: "12px",
            border: `1px solid ${
              darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
          },
        }}
      >
        {selectedPlaceDetails && (
          <>
            <DialogTitle
              sx={{
                borderBottom: "1px solid",
                borderColor: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StorefrontIcon sx={{ color: theme.colors.primary, ml: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {selectedPlaceDetails.name}
                </Typography>
                <Chip
                  label={getCategoryLabel(selectedPlaceDetails.category)}
                  size="small"
                  sx={{
                    mr: 1,
                    backgroundColor: `${theme.colors.primary}30`,
                    color: theme.colors.primary,
                    fontWeight: "bold",
                  }}
                />
                <StatusBadge
                  status={selectedPlaceDetails.status}
                  rejectionReason={selectedPlaceDetails.rejectionReason}
                />
              </Box>
              <IconButton
                aria-label="close"
                onClick={() => setDetailsDialogOpen(false)}
                sx={{ color: theme.colors.textSecondary }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3, pb: 1 }}>
              {detailsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                  <CircularProgress sx={{ color: theme.colors.primary }} />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {/* Image gallery */}
                  <Grid item xs={12} md={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        position: "relative",
                        height: 300,
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                        borderRadius: "8px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: `1px solid ${
                          darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                        }`,
                      }}
                    >
                      {selectedPlaceDetails.images &&
                      selectedPlaceDetails.images.length > 0 ? (
                        <>
                          <img
                            src={selectedPlaceDetails.images[currentImageIndex]}
                            alt={`${selectedPlaceDetails.name} - صورة ${
                              currentImageIndex + 1
                            }`}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                          {selectedPlaceDetails.images.length > 1 && (
                            <>
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  left: 8,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                  },
                                }}
                                onClick={handleNextImage}
                              >
                                <ArrowForwardIcon />
                              </IconButton>
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  right: 8,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                  },
                                }}
                                onClick={handlePreviousImage}
                              >
                                <ArrowBackIcon />
                              </IconButton>
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 8,
                                  left: 8,
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: "4px",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {currentImageIndex + 1} /{" "}
                                {selectedPlaceDetails.images.length}
                              </Box>
                            </>
                          )}
                        </>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ color: theme.colors.textSecondary }}
                        >
                          لا توجد صور متاحة
                        </Typography>
                      )}
                    </Paper>

                    {/* Image thumbnails */}
                    {selectedPlaceDetails.images &&
                      selectedPlaceDetails.images.length > 1 && (
                        <Box
                          sx={{
                            display: "flex",
                            mt: 2,
                            gap: 1,
                            overflowX: "auto",
                            pb: 1,
                          }}
                        >
                          {selectedPlaceDetails.images.map((img, idx) => (
                            <Box
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              sx={{
                                width: 60,
                                height: 60,
                                flexShrink: 0,
                                borderRadius: "4px",
                                overflow: "hidden",
                                cursor: "pointer",
                                border:
                                  idx === currentImageIndex
                                    ? `2px solid ${theme.colors.primary}`
                                    : `2px solid transparent`,
                              }}
                            >
                              <img
                                src={img}
                                alt={`${selectedPlaceDetails.name} - صورة ${
                                  idx + 1
                                }`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          ))}
                        </Box>
                      )}

                    {/* Key information badges */}
                    <Box
                      sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                    >
                      {selectedPlaceDetails.hasParkingSpace && (
                        <Chip
                          icon={<LocalParkingIcon />}
                          label="موقف سيارات"
                          size="small"
                          sx={{
                            backgroundColor: darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.03)",
                            color: theme.colors.text,
                          }}
                        />
                      )}

                      {selectedPlaceDetails.isAccessible && (
                        <Chip
                          icon={<AccessibleIcon />}
                          label="وصول لذوي الاحتياجات"
                          size="small"
                          sx={{
                            backgroundColor: darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.03)",
                            color: theme.colors.text,
                          }}
                        />
                      )}

                      {selectedPlaceDetails.featured && (
                        <Chip
                          icon={<StarIcon />}
                          label="مميز"
                          size="small"
                          sx={{
                            backgroundColor: `${theme.colors.primary}30`,
                            color: theme.colors.primary,
                          }}
                        />
                      )}

                      {selectedPlaceDetails.stats && (
                        <Chip
                          icon={<VisibilityIcon />}
                          label={`${selectedPlaceDetails.stats.views} مشاهدة`}
                          size="small"
                          sx={{
                            backgroundColor: darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.03)",
                            color: theme.colors.text,
                          }}
                        />
                      )}
                    </Box>
                  </Grid>

                  {/* Place details */}
                  <Grid item xs={12} md={6}>
                    <Accordion
                      $darkMode={darkMode}
                      $theme={theme}
                      defaultExpanded
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        $darkMode={darkMode}
                        $theme={theme}
                      >
                        <CategoryIcon sx={{ color: theme.colors.primary }} />
                        <Typography sx={{ fontWeight: "bold" }}>
                          معلومات أساسية
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails $darkMode={darkMode} $theme={theme}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "pre-wrap",
                            maxHeight: "300px",
                            overflowY: "auto",
                            pb: 2,
                            "&::-webkit-scrollbar": {
                              width: "6px",
                            },
                            "&::-webkit-scrollbar-track": {
                              backgroundColor: darkMode
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(0,0,0,0.05)",
                              borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: darkMode
                                ? "rgba(255,255,255,0.2)"
                                : "rgba(0,0,0,0.2)",
                              borderRadius: "10px",
                              "&:hover": {
                                backgroundColor: darkMode
                                  ? "rgba(255,255,255,0.3)"
                                  : "rgba(0,0,0,0.3)",
                              },
                            },
                          }}
                        >
                          {selectedPlaceDetails.description}
                        </Typography>
                        <DetailItem $theme={theme}>
                          <LocationOnIcon />
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              العنوان
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.colors.textSecondary }}
                            >
                              {selectedPlaceDetails.address},{" "}
                              {selectedPlaceDetails.city}
                            </Typography>
                          </Box>
                        </DetailItem>

                        {selectedPlaceDetails.phone && (
                          <DetailItem $theme={theme}>
                            <PhoneIcon />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold" }}
                              >
                                رقم الهاتف
                              </Typography>
                              <Typography
                                variant="body2"
                                dir="ltr"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                {selectedPlaceDetails.phone}
                              </Typography>
                            </Box>
                          </DetailItem>
                        )}

                        {selectedPlaceDetails.email && (
                          <DetailItem $theme={theme}>
                            <EmailIcon />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold" }}
                              >
                                البريد الإلكتروني
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                {selectedPlaceDetails.email}
                              </Typography>
                            </Box>
                          </DetailItem>
                        )}

                        {selectedPlaceDetails.website && (
                          <DetailItem $theme={theme}>
                            <LanguageIcon />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold" }}
                              >
                                الموقع الإلكتروني
                              </Typography>
                              <Typography
                                variant="body2"
                                component="a"
                                href={
                                  selectedPlaceDetails.website.startsWith(
                                    "http"
                                  )
                                    ? selectedPlaceDetails.website
                                    : `http://${selectedPlaceDetails.website}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  color: theme.colors.primary,
                                  textDecoration: "none",
                                  "&:hover": { textDecoration: "underline" },
                                }}
                              >
                                {selectedPlaceDetails.website}
                              </Typography>
                            </Box>
                          </DetailItem>
                        )}

                        {selectedPlaceDetails.priceRange && (
                          <DetailItem $theme={theme}>
                            <AttachMoneyIcon />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold" }}
                              >
                                نطاق الأسعار
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                {selectedPlaceDetails.priceRange}
                              </Typography>
                            </Box>
                          </DetailItem>
                        )}
                      </AccordionDetails>
                    </Accordion>

                    {((selectedPlaceDetails.weekdayHours &&
                      selectedPlaceDetails.weekdayHours.from) ||
                      (selectedPlaceDetails.weekendHours &&
                        selectedPlaceDetails.weekendHours.from) ||
                      selectedPlaceDetails.customHours) && (
                      <Accordion $darkMode={darkMode} $theme={theme}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          $darkMode={darkMode}
                          $theme={theme}
                        >
                          <AccessTimeIcon
                            sx={{ color: theme.colors.primary }}
                          />
                          <Typography sx={{ fontWeight: "bold" }}>
                            مواعيد العمل
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails $darkMode={darkMode} $theme={theme}>
                          {selectedPlaceDetails.customHours ? (
                            <Box>
                              {selectedPlaceDetails.customSchedule &&
                                Object.keys(
                                  selectedPlaceDetails.customSchedule
                                ).map((day) => (
                                  <Box
                                    key={day}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      mb: 1,
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      {day === "sunday"
                                        ? "الأحد"
                                        : day === "monday"
                                        ? "الإثنين"
                                        : day === "tuesday"
                                        ? "الثلاثاء"
                                        : day === "wednesday"
                                        ? "الأربعاء"
                                        : day === "thursday"
                                        ? "الخميس"
                                        : day === "friday"
                                        ? "الجمعة"
                                        : day === "saturday"
                                        ? "السبت"
                                        : day}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: theme.colors.textSecondary }}
                                    >
                                      {selectedPlaceDetails.customSchedule[day]
                                        .isOpen
                                        ? `${selectedPlaceDetails.customSchedule[day].from} - ${selectedPlaceDetails.customSchedule[day].to}`
                                        : "مغلق"}
                                    </Typography>
                                  </Box>
                                ))}
                            </Box>
                          ) : (
                            <Box>
                              {selectedPlaceDetails.weekdayHours &&
                                selectedPlaceDetails.weekdayHours.from && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      mb: 1,
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      أيام الأسبوع
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: theme.colors.textSecondary }}
                                    >
                                      {selectedPlaceDetails.weekdayHours.from} -{" "}
                                      {selectedPlaceDetails.weekdayHours.to}
                                    </Typography>
                                  </Box>
                                )}
                              {selectedPlaceDetails.weekendHours &&
                                selectedPlaceDetails.weekendHours.from && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      نهاية الأسبوع
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: theme.colors.textSecondary }}
                                    >
                                      {selectedPlaceDetails.weekendHours.from} -{" "}
                                      {selectedPlaceDetails.weekendHours.to}
                                    </Typography>
                                  </Box>
                                )}
                            </Box>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    )}

                    {selectedPlaceDetails.amenities &&
                      selectedPlaceDetails.amenities.length > 0 && (
                        <Accordion $darkMode={darkMode} $theme={theme}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            $darkMode={darkMode}
                            $theme={theme}
                          >
                            <CheckCircleIcon
                              sx={{ color: theme.colors.primary }}
                            />
                            <Typography sx={{ fontWeight: "bold" }}>
                              المرافق والخدمات
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails $darkMode={darkMode} $theme={theme}>
                            <Box
                              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                            >
                              {selectedPlaceDetails.amenities.map(
                                (amenity, idx) => (
                                  <Chip
                                    key={idx}
                                    label={amenity.label}
                                    size="small"
                                    sx={{
                                      backgroundColor: darkMode
                                        ? "rgba(255,255,255,0.05)"
                                        : "rgba(0,0,0,0.03)",
                                      color: theme.colors.text,
                                    }}
                                  />
                                )
                              )}
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      )}

                    {/* Display info about when the place was added/updated */}
                    <Accordion $darkMode={darkMode} $theme={theme}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        $darkMode={darkMode}
                        $theme={theme}
                      >
                        <TodayIcon sx={{ color: theme.colors.primary }} />
                        <Typography sx={{ fontWeight: "bold" }}>
                          معلومات إضافية
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails $darkMode={darkMode} $theme={theme}>
                        <DetailItem $theme={theme}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              تاريخ الإضافة
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.colors.textSecondary }}
                            >
                              {formatDate(selectedPlaceDetails.createdAt)}
                            </Typography>
                          </Box>
                        </DetailItem>

                        <DetailItem $theme={theme}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              آخر تحديث
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.colors.textSecondary }}
                            >
                              {formatDate(selectedPlaceDetails.updatedAt)}
                            </Typography>
                          </Box>
                        </DetailItem>

                        {selectedPlaceDetails.status === "rejected" && (
                          <DetailItem $theme={theme}>
                            <CancelIcon sx={{ color: "#f44336" }} />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold", color: "#f44336" }}
                              >
                                سبب الرفض
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: darkMode ? "#ff8a80" : "#c62828" }}
                              >
                                {selectedPlaceDetails.rejectionReason}
                              </Typography>
                            </Box>
                          </DetailItem>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              )}
            </DialogContent>

            <DialogActions
              sx={{
                padding: "16px 24px",
                borderTop: "1px solid",
                borderColor: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Button
                  onClick={() =>
                    handleViewStatistics(
                      selectedPlaceDetails._id || selectedPlaceDetails.id
                    )
                  }
                  startIcon={<VisibilityIcon />}
                  sx={{
                    color: theme.colors.primary,
                    borderColor: theme.colors.primary,
                    "&:hover": { backgroundColor: `${theme.colors.primary}10` },
                  }}
                  variant="outlined"
                  disabled={statsLoading}
                >
                  {statsLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "عرض الإحصائيات"
                  )}
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => setDetailsDialogOpen(false)}
                  sx={{ color: theme.colors.textSecondary, mr: 1 }}
                  variant="text"
                >
                  إغلاق
                </Button>
                <Button
                  onClick={() => {
                    setDetailsDialogOpen(false);
                    handleEditPlace(
                      selectedPlaceDetails._id || selectedPlaceDetails.id
                    );
                  }}
                  startIcon={<EditIcon />}
                  variant="contained"
                  disabled={selectedPlaceDetails.status === "pending"}
                  sx={{
                    backgroundColor: theme.colors.primary,
                    color: darkMode ? "#000" : "#fff",
                    "&:hover": { backgroundColor: theme.colors.accent },
                    "&.Mui-disabled": {
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  تعديل المكان
                </Button>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>
    </PageContainer>
  );
};

// Analytics Section
// const AnalyticsSection = () => {
//   const [timeRange, setTimeRange] = useState("week");
//   const [analyticsType, setAnalyticsType] = useState("views");

//   // Generate sample data - would be replaced with actual API data
//   const data = useMemo(() => {
//     const ranges = {
//       week: 7,
//       month: 30,
//       year: 12,
//     };

//     if (timeRange === "year") {
//       return Array.from({ length: ranges[timeRange] }, (_, i) => ({
//         name: format(new Date(2025, i, 1), "MMM", { locale: ar }),
//         views: Math.floor(Math.random() * 1000) + 500,
//         visits: Math.floor(Math.random() * 500) + 100,
//       }));
//     }

//     return Array.from({ length: ranges[timeRange] }, (_, i) => {
//       const date =
//         timeRange === "week"
//           ? format(new Date(2025, 3, i + 1), "E", { locale: ar })
//           : format(new Date(2025, 3, i + 1), "d MMM", { locale: ar });

//       return {
//         name: date,
//         views: Math.floor(Math.random() * 100) + 20,
//         visits: Math.floor(Math.random() * 50) + 5,
//       };
//     });
//   }, [timeRange]);

//   return (
//     <AnalyticsContainer>
//       <AnalyticsHeader>
//         <Typography variant="h5" fontWeight="bold">
//           تحليلات الأداء
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <ButtonGroup>
//             <Button
//               onClick={() => setTimeRange("week")}
//               variant={timeRange === "week" ? "contained" : "outlined"}
//               size="small"
//             >
//               أسبوع
//             </Button>
//             <Button
//               onClick={() => setTimeRange("month")}
//               variant={timeRange === "month" ? "contained" : "outlined"}
//               size="small"
//             >
//               شهر
//             </Button>
//             <Button
//               onClick={() => setTimeRange("year")}
//               variant={timeRange === "year" ? "contained" : "outlined"}
//               size="small"
//             >
//               سنة
//             </Button>
//           </ButtonGroup>

//           <ButtonGroup>
//             <Button
//               onClick={() => setAnalyticsType("views")}
//               variant={analyticsType === "views" ? "contained" : "outlined"}
//               size="small"
//             >
//               المشاهدات
//             </Button>
//             <Button
//               onClick={() => setAnalyticsType("visits")}
//               variant={analyticsType === "visits" ? "contained" : "outlined"}
//               size="small"
//             >
//               الزيارات
//             </Button>
//           </ButtonGroup>
//         </Box>
//       </AnalyticsHeader>

//       <Box sx={{ height: 300, width: "100%" }}>
//         <ResponsiveContainer>
//           <LineChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip
//               formatter={(value) => [
//                 `${value}`,
//                 analyticsType === "views" ? "المشاهدات" : "الزيارات",
//               ]}
//               labelFormatter={(label) => `اليوم: ${label}`}
//             />
//             <Line
//               type="monotone"
//               dataKey={analyticsType}
//               stroke={analyticsType === "views" ? "#4A72AC" : "#F6B17A"}
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Box>
//     </AnalyticsContainer>
//   );
// };

// Insights Section
const InsightsSection = ({ places, darkMode, theme }) => {
  // Calculate category distribution
  const categoryData = useMemo(() => {
    const categories = {};
    places.forEach((place) => {
      if (!categories[place.category]) {
        categories[place.category] = 0;
      }
      categories[place.category]++;
    });

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [places]);

  // Calculate performance metrics
  const performanceData = useMemo(() => {
    return [
      {
        name: "الأكثر مشاهدة",
        place: places.length
          ? places.reduce((max, place) =>
              max.stats.views > place.stats.views ? max : place
            ).name
          : "-",
        value: places.length
          ? places.reduce((max, place) =>
              max.stats.views > place.stats.views ? max : place
            ).stats.views
          : 0,
      },
      {
        name: "الأكثر زيارة",
        place: places.length
          ? places.reduce((max, place) =>
              max.stats.visits > place.stats.visits ? max : place
            ).name
          : "-",
        value: places.length
          ? places.reduce((max, place) =>
              max.stats.visits > place.stats.visits ? max : place
            ).stats.visits
          : 0,
      },
      {
        name: "الأعلى تقييماً",
        place: places.length
          ? places.reduce((max, place) =>
              max.stats.ratings > place.stats.ratings ? max : place
            ).name
          : "-",
        value: places.length
          ? places
              .reduce((max, place) =>
                max.stats.ratings > place.stats.ratings ? max : place
              )
              .stats.ratings.toFixed(1)
          : 0,
      },
    ];
  }, [places]);

  // Color array for pie chart
  // const COLORS = [
  //   "#4A72AC",
  //   "#F6B17A",
  //   "#4CAF50",
  //   "#FEC20F",
  //   "#FF5252",
  //   "#9C27B0",
  //   "#00BCD4",
  // ];

  // return (
  //   <Grid container spacing={3} sx={{ mb: 4 }}>
  //     <Grid item xs={12} md={6}>
  //       <InsightCard $darkMode={darkMode} $theme={theme}>
  //         <InsightCardHeader>
  //           <Typography variant="h6" fontWeight="bold">
  //             توزيع الأماكن حسب الفئة
  //           </Typography>
  //         </InsightCardHeader>
  //         <Box
  //           sx={{
  //             height: 250,
  //             width: "100%",
  //             display: "flex",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <ResponsiveContainer width="100%" height="100%">
  //             <PieChart>
  //               <Pie
  //                 data={categoryData}
  //                 cx="50%"
  //                 cy="50%"
  //                 labelLine={false}
  //                 outerRadius={80}
  //                 fill="#8884d8"
  //                 dataKey="value"
  //                 label={({ name, percent }) =>
  //                   `${name} (${(percent * 100).toFixed(0)}%)`
  //                 }
  //               >
  //                 {categoryData.map((entry, index) => (
  //                   <Cell
  //                     key={`cell-${index}`}
  //                     fill={COLORS[index % COLORS.length]}
  //                   />
  //                 ))}
  //               </Pie>
  //               <Tooltip formatter={(value) => [value, "عدد الأماكن"]} />
  //               <Legend
  //                 layout="vertical"
  //                 align="right"
  //                 verticalAlign="middle"
  //               />
  //             </PieChart>
  //           </ResponsiveContainer>
  //         </Box>
  //       </InsightCard>
  //     </Grid>
  //     <Grid item xs={12} md={6}>
  //       <InsightCard $darkMode={darkMode} $theme={theme}>
  //         <InsightCardHeader>
  //           <Typography variant="h6" fontWeight="bold">
  //             الأماكن الأكثر أداءً
  //           </Typography>
  //         </InsightCardHeader>
  //         <Box sx={{ p: 2 }}>
  //           <List>
  //             {performanceData.map((item, index) => (
  //               <ListItem
  //                 key={index}
  //                 divider={index < performanceData.length - 1}
  //                 sx={{
  //                   p: 2,
  //                   borderRadius: 2,
  //                   bgcolor: darkMode
  //                     ? "rgba(255,255,255,0.03)"
  //                     : "rgba(0,0,0,0.01)",
  //                   mb: 1,
  //                 }}
  //               >
  //                 <ListItemIcon>
  //                   <Avatar
  //                     sx={{
  //                       bgcolor: COLORS[index % COLORS.length],
  //                       width: 35,
  //                       height: 35,
  //                     }}
  //                   >
  //                     {index === 0 ? (
  //                       <VisibilityIcon />
  //                     ) : index === 1 ? (
  //                       <PersonIcon />
  //                     ) : (
  //                       <StarIcon />
  //                     )}
  //                   </Avatar>
  //                 </ListItemIcon>
  //                 <ListItemText
  //                   primary={
  //                     <Typography variant="body1" fontWeight="medium">
  //                       {item.place}
  //                     </Typography>
  //                   }
  //                   secondary={
  //                     <Typography variant="body2" color="textSecondary">
  //                       {`${item.name}: ${item.value.toLocaleString()}`}
  //                     </Typography>
  //                   }
  //                 />
  //               </ListItem>
  //             ))}
  //           </List>
  //         </Box>
  //       </InsightCard>
  //     </Grid>
  //   </Grid>
  // );
};

// Enhance the PlaceCard component render

// Add this to the EnhancedPlaceCard component
const EnhancedPlaceCard = ({
  place,
  onEdit,
  onDelete,
  onToggleFeature,
  onView,
  darkMode,
  theme,
}) => {
  const [showQuickStats, setShowQuickStats] = useState(false);

  // Map the API status values to component status
  const getStatusValue = () => {
    if (place.isApproved) return "approved";
    if (place.rejectionReason) return "rejected";
    return "pending";
  };

  return (
    <PlaceCard
      $darkMode={darkMode}
      $theme={theme}
      $status={getStatusValue()}
      $featured={place.featured}
      layout
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <CardHeader $darkMode={darkMode}>
        {place.featured && (
          <FeaturedBadge $darkMode={darkMode} $theme={theme}>
            <StarIcon sx={{ fontSize: 16 }} /> مميز
          </FeaturedBadge>
        )}
        <CardImageContainer className="card-image-container">
          <CardImage style={{ backgroundImage: `url(${place.images[0]})` }} />
          <CardImageOverlay>
            <Tooltip title="عرض المكان">
              <IconButton
                onClick={() => onView(place._id)}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            {place.images.length > 1 && (
              <PhotoCountBadge>
                <PhotoIcon fontSize="small" />
                <span>{place.images.length}</span>
              </PhotoCountBadge>
            )}
          </CardImageOverlay>
        </CardImageContainer>

        <CardStatusBanner $status={getStatusValue()}>
          <StatusBadge
            status={getStatusValue()}
            rejectionReason={place.rejectionReason}
          />
          {getStatusValue() === "approved" && (
            <Tooltip
              title={place.featured ? "إلغاء تمييز المكان" : "تمييز المكان"}
            >
              <IconButton
                size="small"
                onClick={() => onToggleFeature(place._id)}
                sx={{ ml: 1 }}
              >
                {place.featured ? (
                  <StarIcon fontSize="small" />
                ) : (
                  <StarBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </CardStatusBanner>
      </CardHeader>

      <CardBody>
        <PlaceName onClick={() => onView(place._id)} sx={{ cursor: "pointer" }}>
          {place.name}
        </PlaceName>

        <CategoryRow>
          <CategoryIcon fontSize="small" sx={{ opacity: 0.7 }} />
          <Typography
            variant="body2"
            sx={{
              color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
            }}
          >
            {place.category}
          </Typography>
        </CategoryRow>

        <AddressRow $theme={theme}>
          <LocationOnIcon fontSize="small" sx={{ opacity: 0.7 }} />
          <Typography
            variant="body2"
            sx={{
              color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
            }}
          >
            {place.address}
          </Typography>
        </AddressRow>

        <PlaceDescription $theme={theme}>
          {place.description.length > 120
            ? place.description.substring(0, 120) + "..."
            : place.description}
        </PlaceDescription>

        {/* Display rejection reason if the place was rejected */}
        {getStatusValue() === "rejected" && (
          <RejectionMessage $darkMode={darkMode} $theme={theme}>
            <CancelIcon fontSize="small" /> {place.rejectionReason}
          </RejectionMessage>
        )}

        <Button
          fullWidth
          variant="text"
          onClick={() => setShowQuickStats(!showQuickStats)}
          startIcon={
            showQuickStats ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
          sx={{ mb: 1, mt: 1, color: theme.colors.textSecondary }}
        >
          {showQuickStats ? "إخفاء الإحصائيات" : "عرض الإحصائيات"}
        </Button>

        {showQuickStats && (
          <QuickStatsContainer $darkMode={darkMode} $theme={theme}>
            <QuickStatItem>
              <Tooltip title="عدد المشاهدات">
                <VisibilityIcon
                  fontSize="small"
                  sx={{ color: theme.colors.primary }}
                />
              </Tooltip>
              <QuickStatValue>{place.stats?.views || 0}</QuickStatValue>
              <QuickStatLabel>مشاهدة</QuickStatLabel>
            </QuickStatItem>

            <QuickStatItem>
              <Tooltip title="عدد الزيارات">
                <PersonPinCircleIcon
                  fontSize="small"
                  sx={{ color: "#f6b17a" }}
                />
              </Tooltip>
              <QuickStatValue>{place.stats?.visits || 0}</QuickStatValue>
              <QuickStatLabel>زيارة</QuickStatLabel>
            </QuickStatItem>

            <QuickStatItem>
              <Tooltip title="التقييم">
                <StarIcon fontSize="small" sx={{ color: "#ffc107" }} />
              </Tooltip>
              <QuickStatValue>
                {place.stats?.ratings ? place.stats.ratings.toFixed(1) : "0.0"}
              </QuickStatValue>
              <QuickStatLabel>التقييم</QuickStatLabel>
            </QuickStatItem>

            <QuickStatItem>
              <Tooltip title="عدد التقييمات">
                <RateReviewIcon fontSize="small" sx={{ color: "#9c27b0" }} />
              </Tooltip>
              <QuickStatValue>{place.stats?.reviewsCount || 0}</QuickStatValue>
              <QuickStatLabel>تقييم</QuickStatLabel>
            </QuickStatItem>
          </QuickStatsContainer>
        )}

        <PlaceMeta>
          <MetaItem $theme={theme}>
            <AccessTimeIcon fontSize="small" /> {formatDate(place.createdAt)}
          </MetaItem>
        </PlaceMeta>
      </CardBody>

      <CardActions>
        <ActionButton
          $darkMode={darkMode}
          $theme={theme}
          $primary
          variant="contained"
          onClick={() => onEdit(place._id)}
          disabled={getStatusValue() === "pending"}
        >
          تعديل
        </ActionButton>
        <ActionButton
          $darkMode={darkMode}
          $theme={theme}
          variant="outlined"
          onClick={() => onView(place._id)}
        >
          {getStatusValue() === "approved" ? "عرض" : "التفاصيل"}
        </ActionButton>
        <IconButton onClick={(e) => onDelete(place._id)} size="small">
          <DeleteIcon color="error" />
        </IconButton>
      </CardActions>
    </PlaceCard>
  );
};

// Add this component to the file
const EmptyState = ({ darkMode, theme, onAddNew }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
      textAlign: "center",
      padding: "40px 20px",
      backgroundColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)",
      borderRadius: "16px",
      border: "2px dashed",
      borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    }}
  >
    <StorefrontIcon sx={{ fontSize: 70, opacity: 0.5, mb: 3 }} />
    <Typography
      variant="h5"
      sx={{ mb: 2, fontWeight: "bold", color: theme.colors.text }}
    >
      لا توجد أماكن مضافة بعد
    </Typography>
    <Typography
      variant="body1"
      sx={{ mb: 4, color: theme.colors.textSecondary, maxWidth: "600px" }}
    >
      قم بإضافة مكانك الأول ليظهر للزوار ويتم إضافته في خطط الرحلات. سيتم مراجعة
      المكان من قبل المشرفين قبل نشره.
    </Typography>
    <Button
      variant="contained"
      startIcon={<AddBusinessIcon />}
      onClick={onAddNew}
      sx={{
        backgroundColor: theme.colors.primary,
        color: darkMode ? "#000" : "#fff",
        padding: "12px 24px",
        borderRadius: "50px",
        "&:hover": {
          backgroundColor: theme.colors.accent,
          transform: "translateY(-3px)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        },
        transition: "all 0.3s ease",
      }}
    >
      إضافة مكان جديد
    </Button>
  </Box>
);

// Styled components
const PageContainer = styled.div`
  padding: 24px;
  direction: rtl;
  max-width: 1500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// ...existing code...

const StatsCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  border-radius: 16px;
  box-shadow: ${({ $darkMode }) =>
    $darkMode
      ? "0 4px 20px rgba(0, 0, 0, 0.2)"
      : "0 4px 12px rgba(0, 0, 0, 0.05)"};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $darkMode }) =>
      $darkMode
        ? "0 8px 25px rgba(0, 0, 0, 0.25)"
        : "0 8px 20px rgba(0, 0, 0, 0.1)"};
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StatsIconWrapper = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $darkMode, $color }) =>
    $darkMode ? `${$color}20` : `${$color}15`};
  color: ${({ $color }) => $color};

  svg {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;

    svg {
      font-size: 24px;
    }
  }
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 4px;
  color: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.text : "inherit"};

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const StatsLabel = styled.div`
  font-size: 14px;
  color: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.textSecondary : $theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.div`
  flex: 1;
  min-width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ActionsButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})`
  border-radius: 12px;
  direction: ltr;
  padding: 10px 16px;
  border: 1px solid
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"};
  background-color: ${({ $darkMode }) =>
    $darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"};
  color: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.text : "rgba(0,0,0,0.87)"};
  text-transform: none;
  font-weight: 500;
  min-width: 120px;

  &:hover {
    background-color: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
    border-color: ${({ $theme }) => $theme.colors.primary}60;
  }
`;

const AddButton = styled(Button, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})`
  border-radius: 12px;
  padding: 10px 16px;
  background: ${({ $darkMode, $theme }) =>
    `linear-gradient(135deg, ${$theme.colors.primary}, ${
      $darkMode ? "#F6B17A" : "#4A72AC"
    })`};
  color: ${({ $darkMode }) => ($darkMode ? "#000" : "#fff")};
  text-transform: none;
  font-weight: 600;
  min-width: 160px;
  box-shadow: 0 4px 10px ${({ $theme }) => $theme.colors.primary}40;

  &:hover {
    box-shadow: 0 6px 14px ${({ $theme }) => $theme.colors.primary}60;
    transform: translateY(-2px);
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ $darkMode, $theme }) =>
    $darkMode ? "rgba(255,255,255,0.5)" : $theme.colors.textSecondary};
`;

const PlaceMeta = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
`;

const PlaceCard = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  box-shadow: 0 4px 20px
    rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.2 : 0.08)});
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid
    ${({ $darkMode, $featured, $theme }) =>
      $featured
        ? `${$theme.colors.primary}40`
        : $darkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.06)"};

  ${({ $status, $featured }) =>
    $status === "rejected" &&
    !$featured &&
    `
    opacity: 0.9;
  `}

  ${({ $featured, $theme }) =>
    $featured &&
    `
    box-shadow: 0 8px 25px ${$theme.colors.primary}30;
  `}
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px
      rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.3 : 0.12)});
  }
`;

const CardHeader = styled.div`
  position: relative;
  height: 180px;
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;

  .place-card:hover & {
    transform: scale(1.05);
  }
`;

const CardImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  .card-image-container:hover & {
    opacity: 1;
  }
`;

const PhotoCountBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardStatusBanner = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 8px 12px;
  background: ${({ $status }) =>
    $status === "approved"
      ? "rgba(76, 175, 80, 0.8)"
      : $status === "rejected"
      ? "rgba(244, 67, 54, 0.8)"
      : "rgba(255, 152, 0, 0.8)"};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardBody = styled.div`
  padding: 18px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 18px 18px;
  justify-content: space-between;
`;

const PlaceName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px;
`;

const PlaceDescription = styled.p`
  font-size: 14px;
  color: ${({ $theme }) =>
    $theme.colors.textSecondary}; // Changed from theme to $theme
  margin: 12px 0;
  line-height: 1.5;
  height: 64px;
  overflow: hidden;
`;

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  svg {
    color: ${({ $theme }) =>
      $theme.colors.primary}; // Changed from theme to $theme
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: ${({ $theme }) =>
    $theme.colors.textSecondary}; // Changed from theme to $theme

  svg {
    font-size: 16px;
    opacity: 0.8;
  }
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: ${({ $theme }) =>
    $theme.colors.textSecondary}; // Changed from theme to $theme
  margin-top: 8px;
`;

const RejectionMessage = styled.div`
  display: flex;
  gap: 8px;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? "rgba(211, 47, 47, 0.2)" : "#ffebee"};
  color: ${({ $darkMode }) => ($darkMode ? "#ff8a80" : "#c62828")};
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  margin: 12px 0;
  align-items: center;

  svg {
    font-size: 16px;
  }
`;

const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})`
  border-radius: 8px;
  text-transform: none;
  flex: ${(props) => (props.$primary ? 1.5 : 1)};
  background: ${({ $primary, $darkMode, $theme }) =>
    $primary
      ? $darkMode
        ? `${$theme.colors.primary}90`
        : $theme.colors.primary
      : "transparent"};
  color: ${({ $primary, $darkMode, $theme }) =>
    $primary
      ? $darkMode
        ? "#000"
        : "#fff"
      : $darkMode
      ? $theme.colors.text
      : "rgba(0,0,0,0.87)"};
  border-color: ${({ $primary, $theme }) =>
    $primary ? "transparent" : `${$theme.colors.primary}40`};

  &:hover {
    background: ${({ $primary, $darkMode, $theme }) =>
      $primary
        ? $darkMode
          ? $theme.colors.primary
          : `${$theme.colors.primary}e0`
        : $darkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.04)"};
    border-color: ${({ $primary, $theme }) =>
      $primary ? "transparent" : `${$theme.colors.primary}60`};
  }
`;

const PlaceSkeleton = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  box-shadow: 0 4px 20px
    rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.2 : 0.08)});
  border: 1px solid
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"};

  .skeleton-header {
    height: 180px;
    width: 100%;
  }

  .skeleton-content {
    padding: 18px;
  }

  .skeleton-actions {
    display: flex;
    gap: 8px;
    padding: 0 18px 18px;
    justify-content: space-between;
  }
`;

const AnalyticsContainer = styled.div`
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px
    rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.2 : 0.08)});

  @media (max-width: 768px) {
    padding: 18px;
  }
`;
const FeaturedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? `${$theme.colors.primary}` : `${$theme.colors.primary}`};
  color: ${({ $darkMode }) => ($darkMode ? "#000" : "#fff")};
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const AnalyticsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const QuickStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 12px 0;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ $darkMode }) =>
    $darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};

  @media (max-width: 380px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

const QuickStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const QuickStatValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const QuickStatLabel = styled.div`
  font-size: 12px;
  color: ${({ $darkMode, $theme }) =>
    $darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
`;

const InsightCard = styled.div`
  background: ${({ $darkMode, $theme }) =>
    $darkMode ? $theme.colors.surface : "#ffffff"};
  border-radius: 16px;
  height: 100%;
  box-shadow: 0 4px 20px
    rgba(0, 0, 0, ${({ $darkMode }) => ($darkMode ? 0.2 : 0.08)});
  overflow: hidden;
`;

const InsightCardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"};
`;

const LoadingPlaceCards = ({ darkMode, theme }) => (
  <CardsContainer>
    {[1, 2, 3, 4].map((item) => (
      <PlaceSkeleton key={item} $darkMode={darkMode} $theme={theme}>
        <div className="skeleton-header">
          <Skeleton variant="rectangular" height="100%" animation="wave" />
        </div>
        <div className="skeleton-content">
          <Skeleton
            variant="text"
            height={32}
            width="70%"
            animation="wave"
            sx={{ mb: 1 }}
          />
          <Skeleton
            variant="text"
            height={24}
            width="50%"
            animation="wave"
            sx={{ mb: 1 }}
          />
          <Skeleton
            variant="text"
            height={24}
            width="90%"
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={64}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="text"
            height={24}
            width="60%"
            animation="wave"
            sx={{ mb: 1 }}
          />
          <Skeleton variant="text" height={20} width="40%" animation="wave" />
        </div>
        <div className="skeleton-actions">
          <Skeleton
            variant="rectangular"
            height={36}
            width="65%"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            height={36}
            width="30%"
            animation="wave"
          />
        </div>
      </PlaceSkeleton>
    ))}
  </CardsContainer>
);

const Accordion = styled(MuiAccordion, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})(({ theme, $darkMode, $theme }) => ({
  backgroundColor: $darkMode ? $theme.colors.surface : "#ffffff",
  color: $theme.colors.text,
  boxShadow: "none",
  borderRadius: "8px !important",
  margin: "8px 0",
  "&:before": {
    display: "none",
  },
  border: `1px solid ${
    $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
  }`,
  "&.Mui-expanded": {
    margin: "8px 0",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})(({ $darkMode, $theme }) => ({
  backgroundColor: $darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
  borderRadius: "8px",
  "& .MuiAccordionSummary-content": {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: $theme.colors.text,
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: $theme.colors.textSecondary,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})(({ $darkMode, $theme }) => ({
  padding: "16px",
  color: $theme.colors.text,
}));

const DetailItem = styled(Box, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})(({ $theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "12px",
  "& .MuiSvgIcon-root": {
    color: $theme.colors.primary,
    marginLeft: "8px",
    marginTop: "4px",
  },
}));

const ReviewItem = styled(Box, {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})(({ $darkMode, $theme }) => ({
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: $darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
  marginBottom: "8px",
  "& .review-header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
}));

// Add this new component to display place details
const PlaceDetailsDialog = ({ open, onClose, place, darkMode, theme }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [statsTimeRange, setStatsTimeRange] = useState("week");

  // Handle image navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? place.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === place.images.length - 1 ? 0 : prev + 1
    );
  };

  // Get status display configuration
  const getStatusConfig = () => {
    const statusConfig = {
      approved: {
        label: "معتمد",
        color: "success",
        icon: <CheckCircleIcon fontSize="small" />,
        description: "تمت الموافقة على المكان ويظهر للمستخدمين",
      },
      pending: {
        label: "قيد المراجعة",
        color: "warning",
        icon: <PendingIcon fontSize="small" />,
        description: "المكان قيد المراجعة من قبل المشرفين",
      },
      rejected: {
        label: "مرفوض",
        color: "error",
        icon: <CancelIcon fontSize="small" />,
        description: `تم رفض المكان: ${
          place.rejectionReason || "لم يتم تحديد سبب"
        }`,
      },
    };

    if (place.isApproved) return statusConfig.approved;
    if (place.rejectionReason) return statusConfig.rejected;
    return statusConfig.pending;
  };

  const statusConfig = getStatusConfig();

  // Generate sample statistics data
  const getStatsData = () => {
    // In a real app, this would come from an API call
    if (statsTimeRange === "week") {
      return Array.from({ length: 7 }, (_, i) => ({
        name: format(subDays(new Date(), 6 - i), "EEE", { locale: ar }),
        views: Math.floor(Math.random() * 50) + 10,
        visits: Math.floor(Math.random() * 25) + 5,
      }));
    } else if (statsTimeRange === "month") {
      return Array.from({ length: 30 }, (_, i) => ({
        name: format(subDays(new Date(), 29 - i), "d", { locale: ar }),
        views: Math.floor(Math.random() * 20) + 5,
        visits: Math.floor(Math.random() * 10) + 2,
      }));
    } else {
      return Array.from({ length: 12 }, (_, i) => ({
        name: format(subMonths(new Date(), 11 - i), "MMM", { locale: ar }),
        views: Math.floor(Math.random() * 500) + 100,
        visits: Math.floor(Math.random() * 250) + 50,
      }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          backgroundColor: darkMode ? theme.colors.background : "#fff",
          color: theme.colors.text,
          backgroundImage: "none",
          overflowY: "visible",
          minHeight: "80vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid",
          borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          direction: "rtl",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {place.name}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, direction: "rtl" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            height: "100%",
          }}
        >
          {/* Left side - Image carousel and basic info */}
          <Box
            sx={{
              flex: "0 0 50%",
              p: 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image carousel */}
            <Box
              sx={{
                position: "relative",
                height: { xs: "300px", md: "400px" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${place.images[currentImageIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.5) 100%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                  zIndex: 10,
                }}
              >
                {place.images.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor:
                        idx === currentImageIndex
                          ? "white"
                          : "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Basic info section */}
            <Box
              sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}
            >
              {/* Status badge */}
              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={statusConfig.icon}
                  label={statusConfig.label}
                  color={statusConfig.color}
                  sx={{ fontWeight: "bold" }}
                />
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: `${statusConfig.color}.main` }}
                >
                  {statusConfig.description}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Category and Location */}
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CategoryIcon fontSize="small" sx={{ opacity: 0.7 }} />
                  <Typography variant="body1">{place.category}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon fontSize="small" sx={{ opacity: 0.7 }} />
                  <Typography variant="body1">{place.address}</Typography>
                </Box>

                {place.phone && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    <Typography variant="body1">{place.phone}</Typography>
                  </Box>
                )}

                {place.email && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    <Typography variant="body1">{place.email}</Typography>
                  </Box>
                )}

                {place.website && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LanguageIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    <Link
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: theme.colors.primary,
                        textDecoration: "none",
                      }}
                    >
                      {place.website}
                    </Link>
                  </Box>
                )}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Operating hours */}
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                ساعات العمل
              </Typography>

              {place.customHours ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {Object.entries(place.customSchedule || {}).map(
                    ([day, hours]) => (
                      <Box
                        key={day}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">{day}</Typography>
                        <Typography variant="body2">
                          {hours.isClosed
                            ? "مغلق"
                            : `${hours.from} - ${hours.to}`}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">أيام الأسبوع</Typography>
                    <Typography variant="body2">
                      {place.weekdayHours?.from} - {place.weekdayHours?.to}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">نهاية الأسبوع</Typography>
                    <Typography variant="body2">
                      {place.weekendHours?.from} - {place.weekendHours?.to}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Right side - Tabs with details */}
          <Box
            sx={{
              flex: "1",
              borderRight: { xs: "none", md: "1px solid" },
              borderLeft: { xs: "none", md: "none" },
              borderTop: { xs: "1px solid", md: "none" },
              borderColor: darkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              sx={{
                borderBottom: "1px solid",
                borderColor: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              }}
              centered
              variant="fullWidth"
              TabIndicatorProps={{
                sx: {
                  backgroundColor: theme.colors.primary,
                  height: 3,
                },
              }}
            >
              <Tab label="وصف المكان" />
              <Tab label="المميزات" />
              <Tab label="الإحصائيات" />
            </Tabs>

            {/* Tab panels */}
            <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
              {/* Description tab */}
              {activeTab === 0 && (
                <Box sx={{ height: "100%" }}>
                  <Typography variant="body1" paragraph>
                    {place.description}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 4 }}
                  >
                    تم الإضافة في: {formatDate(place.createdAt)}
                  </Typography>
                  {place.updatedAt !== place.createdAt && (
                    <Typography variant="body2" color="text.secondary">
                      آخر تحديث: {formatDate(place.updatedAt)}
                    </Typography>
                  )}
                </Box>
              )}

              {/* Features tab */}
              {activeTab === 1 && (
                <Box>
                  {/* Amenities */}
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 2, fontWeight: "bold" }}
                  >
                    المرافق والخدمات
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}
                  >
                    {place.amenities && place.amenities.length > 0 ? (
                      place.amenities.map((amenity, index) => (
                        <Chip
                          key={index}
                          label={amenity.label}
                          size="small"
                          sx={{
                            bgcolor: darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.05)",
                            m: 0.5,
                          }}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        لم يتم إضافة مرافق لهذا المكان
                      </Typography>
                    )}
                  </Box>

                  {/* Features */}
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 2, mt: 3, fontWeight: "bold" }}
                  >
                    مميزات المكان
                  </Typography>

                  <Grid container spacing={2}>
                    {place.features && place.features.length > 0 ? (
                      place.features.map((feature, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CheckCircleIcon
                              fontSize="small"
                              sx={{ color: theme.colors.primary }}
                            />
                            <Typography variant="body2">{feature}</Typography>
                          </Box>
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          لم يتم إضافة مميزات لهذا المكان
                        </Typography>
                      </Grid>
                    )}
                  </Grid>

                  {/* Additional characteristics */}
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 2, fontWeight: "bold" }}
                    >
                      خصائص إضافية
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.02)",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {place.isAccessible ? (
                            <CheckCircleIcon fontSize="small" color="success" />
                          ) : (
                            <CancelIcon fontSize="small" color="error" />
                          )}
                          <Typography variant="body2">
                            {place.isAccessible
                              ? "مناسب لذوي الاحتياجات الخاصة"
                              : "غير مناسب لذوي الاحتياجات الخاصة"}
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.02)",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {place.hasParkingSpace ? (
                            <CheckCircleIcon fontSize="small" color="success" />
                          ) : (
                            <CancelIcon fontSize="small" color="error" />
                          )}
                          <Typography variant="body2">
                            {place.hasParkingSpace
                              ? "يوجد موقف سيارات"
                              : "لا يوجد موقف سيارات"}
                          </Typography>
                        </Paper>
                      </Grid>

                      {place.priceRange && (
                        <Grid item xs={6} md={4}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              bgcolor: darkMode
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(0,0,0,0.02)",
                              borderRadius: 2,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <AttachMoneyIcon fontSize="small" />
                            <Typography variant="body2">
                              فئة السعر: {place.priceRange}
                            </Typography>
                          </Paper>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Box>
              )}

              {/* Statistics tab */}
              {activeTab === 2 && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      إحصائيات المكان
                    </Typography>

                    <ButtonGroup size="small">
                      <Button
                        onClick={() => setStatsTimeRange("week")}
                        variant={
                          statsTimeRange === "week" ? "contained" : "outlined"
                        }
                      >
                        أسبوع
                      </Button>
                      <Button
                        onClick={() => setStatsTimeRange("month")}
                        variant={
                          statsTimeRange === "month" ? "contained" : "outlined"
                        }
                      >
                        شهر
                      </Button>
                      <Button
                        onClick={() => setStatsTimeRange("year")}
                        variant={
                          statsTimeRange === "year" ? "contained" : "outlined"
                        }
                      >
                        سنة
                      </Button>
                    </ButtonGroup>
                  </Box>

                  {/* Stats summary cards */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(120px, 1fr))",
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: darkMode
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <VisibilityIcon
                        sx={{ color: theme.colors.primary, mb: 1 }}
                      />
                      <Typography variant="h5" fontWeight="bold">
                        {place.stats?.views || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        مشاهدة
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: darkMode
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <PersonPinCircleIcon sx={{ color: "#f6b17a", mb: 1 }} />
                      <Typography variant="h5" fontWeight="bold">
                        {place.stats?.visits || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        زيارة
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: darkMode
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <StarIcon sx={{ color: "#ffc107", mb: 1 }} />
                      <Typography variant="h5" fontWeight="bold">
                        {place.stats?.ratings
                          ? place.stats.ratings.toFixed(1)
                          : "0.0"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        التقييم
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: darkMode
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <RateReviewIcon sx={{ color: "#9c27b0", mb: 1 }} />
                      <Typography variant="h5" fontWeight="bold">
                        {place.stats?.reviewsCount || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        تقييم
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Chart */}
                  <Box sx={{ height: 300, mt: 4 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getStatsData()}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={
                            darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.1)"
                          }
                        />
                        <XAxis
                          dataKey="name"
                          stroke={
                            darkMode
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(0,0,0,0.5)"
                          }
                        />
                        <YAxis
                          stroke={
                            darkMode
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(0,0,0,0.5)"
                          }
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: darkMode ? "#333" : "#fff",
                            color: darkMode ? "#fff" : "#333",
                            border: `1px solid ${
                              darkMode
                                ? "rgba(255,255,255,0.2)"
                                : "rgba(0,0,0,0.2)"
                            }`,
                            borderRadius: 8,
                            direction: "rtl",
                          }}
                          formatter={(value, name) => [
                            value,
                            name === "views" ? "المشاهدات" : "الزيارات",
                          ]}
                          labelFormatter={(label) => `اليوم: ${label}`}
                        />
                        <Legend
                          formatter={(value) =>
                            value === "views" ? "المشاهدات" : "الزيارات"
                          }
                        />
                        <Line
                          type="monotone"
                          dataKey="views"
                          stroke={theme.colors.primary}
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="visits"
                          stroke="#f6b17a"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid",
          borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        }}
      >
        <Button
          variant="text"
          onClick={onClose}
          sx={{ color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}
        >
          إغلاق
        </Button>

        {/* Only show edit button if not in pending status */}
        {(place.isApproved || place.rejectionReason) && (
          <Button variant="contained" color="primary" startIcon={<EditIcon />}>
            تعديل المكان
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MyPlaces;
