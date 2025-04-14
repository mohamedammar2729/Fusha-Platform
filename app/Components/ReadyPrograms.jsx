"use client";

// Core React and libraries
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

// Material UI Lab Components
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

// Material UI Icons
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LuggageIcon from "@mui/icons-material/Luggage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Sort";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MicIcon from "@mui/icons-material/Mic";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MapIcon from "@mui/icons-material/Map";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarIcon from "@mui/icons-material/Star";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import WifiIcon from "@mui/icons-material/Wifi";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { th } from "date-fns/locale";
import { Subtitles } from "lucide-react";

// Helper functions for generating random content
const getRandomActivityTitle = () => {
  const activities = [
    "استكشاف معالم المدينة",
    "رحلة بحرية",
    "زيارة المتاحف التاريخية",
    "جولة في المناطق الطبيعية",
    "تجربة المأكولات المحلية",
    "التسوق في الأسواق الشعبية",
    "رحلة استجمام على الشاطئ",
  ];
  return activities[Math.floor(Math.random() * activities.length)];
};

const getRandomDayDescription = (location) => {
  const descriptions = [
    `استكشاف معالم ${location} الرئيسية مع مرشد سياحي، وزيارة أهم المعالم التاريخية والثقافية في المدينة.`,
    `رحلة بحرية استثنائية في مياه ${location} الفيروزية، حيث يمكنك الاستمتاع بمناظر الشواطئ والجزر الخلابة.`,
    `جولة ثقافية في متاحف ${location} لاكتشاف تاريخها العريق، متبوعة بفترة راحة وتناول الغداء في مطعم محلي.`,
    `زيارة المناطق الطبيعية الخلابة المحيطة بـ ${location} والاستمتاع بجولة مشي في المسارات الطبيعية.`,
    `تجربة مميزة للتذوق الطعام المحلي في ${location} والتعرف على أسرار المطبخ التقليدي.`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomWeather = () => {
  const weather = [
    "معتدل ودافئ",
    "مشمس معظم الوقت",
    "دافئ خلال النهار وبارد ليلاً",
    "متقلب مع إمكانية هطول أمطار خفيفة",
    "مشمس ومناسب للأنشطة الخارجية",
  ];
  return weather[Math.floor(Math.random() * weather.length)];
};

// Custom TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`program-tabpanel-${index}`}
      aria-labelledby={`program-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const ReadyPrograms = () => {
  // State definitions
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [bookmarked, setBookmarked] = useState({});
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [shareTooltip, setShareTooltip] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    location: "all",
    sort: "rating",
  });
  const { darkMode, theme } = useTheme();
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState(0);

  // Handle scroll events for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bookmarkedPrograms");
      if (saved) {
        setBookmarked(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    }
  }, []);

  // Add data fetching in useEffect
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setIsPageLoading(true); // Set both loading states to true
        const res = await fetch(
          "https://iti-server-production.up.railway.app/api/readyprogram",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("فشل في جلب البيانات");
        }

        const programsData = await res.json();
        setItems(programsData);
        setLoading(false);
        setIsPageLoading(false); // Update isPageLoading state when fetch completes
      } catch (error) {
        console.error("Error fetching programs:", error);
        setLoading(false);
        setIsPageLoading(false); // Update isPageLoading state on error too
      }
    };

    fetchPrograms();
  }, []);

  // Save bookmarks to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem("bookmarkedPrograms", JSON.stringify(bookmarked));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  }, [bookmarked]);

  // Filter, sort, and paginate items
  useEffect(() => {
    // Filter logic
    let result = [...items];

    if (filter.search.trim()) {
      const search = filter.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.type_trip?.toLowerCase().includes(search) ||
          item.location?.toLowerCase().includes(search) ||
          item.program?.toLowerCase().includes(search)
      );
    }

    if (filter.location !== "all") {
      result = result.filter((item) => item.location === filter.location);
    }

    // Sort logic
    switch (filter.sort) {
      case "rating":
        result.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
        break;
      case "budget-low":
        result.sort((a, b) => parseFloat(a.budget) - parseFloat(b.budget));
        break;
      case "budget-high":
        result.sort((a, b) => parseFloat(b.budget) - parseFloat(a.budget));
        break;
      default:
        break;
    }

    // Calculate total pages
    setTotalPages(Math.ceil(result.length / itemsPerPage));

    // Reset to page 1 when filters change
    setCurrentPage(1);

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = result.slice(startIndex, startIndex + itemsPerPage);

    setFilteredItems(paginatedItems);
  }, [filter, items, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookmarkClick = (id) => {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (id) => {
    setShareModalOpen(id);
  };

  const closeShareModal = () => {
    setShareModalOpen(null);
  };

  const copyShareLink = (id) => {
    navigator.clipboard.writeText(`https://yourwebsite.com/program/${id}`);
    setShareTooltip(id);
    setTimeout(() => setShareTooltip(null), 2000);
  };

  const handleShareToSocial = (platform, id) => {
    const url = encodeURIComponent(`https://yourwebsite.com/program/${id}`);
    const text = encodeURIComponent("Check out this amazing travel program!");
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }

    // Close modal after sharing
    setTimeout(() => closeShareModal(), 500);
  };

  const handleExpandItem = (id) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrintProgram = (item) => {
    const printWindow = window.open("", "_blank");
    const programHTML = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <title>فسحة ${item.type_trip}</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .program { line-height: 1.6; white-space: pre-line; }
          .details { margin: 20px 0; }
          .detail { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>فسحة ${item.type_trip}</h1>
          <p>موقع: ${item.location}</p>
        </div>
        <div class="details">
          <p class="detail">عدد الأشخاص: ${item.person_num}</p>
          <p class="detail">المدة: ${item.duration || "7 أيام"}</p>
          <p class="detail">الميزانية: ${item.budget} جنية</p>
          <p class="detail">التقييم: ${item.rate}/5</p>
        </div>
        <div class="program">
          ${item.program}
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(programHTML);
    printWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // Get unique locations for filter
  const locations = ["all", ...new Set(items.map((item) => item.location))];

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
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const badgeCount = Object.values(bookmarked).filter(Boolean).length;

  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0
              rgba(${darkMode ? "246, 177, 122" : "74, 114, 172"}, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px
              rgba(${darkMode ? "246, 177, 122" : "74, 114, 172"}, 0);
          }
          100% {
            box-shadow: 0 0 0 0
              rgba(${darkMode ? "246, 177, 122" : "74, 114, 172"}, 0);
          }
        }
        .bookmark-pulse {
          animation: pulse 1s ease-out;
        }
        .image-hover-zoom {
          transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .image-hover-zoom:hover img {
          transform: scale(1.1);
        }
        .share-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
        }
        .skeleton-shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          right: -150%;
          width: 150%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            ${darkMode
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(255, 255, 255, 0.3)"},
            transparent
          );
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% {
            right: -150%;
          }
          100% {
            right: 100%;
          }
        }
      `}</style>

      {/* Filter and Search Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            backgroundColor: darkMode
              ? `${theme.colors.card}CC` // Adding transparency
              : `${theme.colors.surface}CC`,
            backdropFilter: "blur(10px)",
            p: 2,
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
            position: "sticky",
            top: "80px",
            zIndex: 10,
            border: `1px solid ${
              darkMode ? theme.colors.border : "rgba(0,0,0,0.03)"
            }`,
            transition: "all 0.3s ease",
          }}
        >
          {/* Enhanced Search Component with Voice Search */}
          <TextField
            placeholder="ابحث عن برنامج..."
            variant="outlined"
            value={filter.search}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, search: e.target.value }))
            }
            sx={{
              width: { xs: "100%", sm: "40%" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: darkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.9)",
                transition: "background-color 0.3s ease",
                color: darkMode ? "white" : "inherit", // Set text color to white in dark mode
              },
              direction: "rtl",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleVoiceSearch()}
                    >
                      <MicIcon sx={{ color: theme.colors.accent }} />
                    </IconButton>
                    <SearchIcon sx={{ color: theme.colors.primary }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Enhanced Filter Container with Animation */}
          <Box
            sx={{ display: "flex", gap: 2, width: { xs: "100%", sm: "auto" } }}
          >
            {/* Add Budget Range Filter */}
            <FormControl
              sx={{
                minWidth: 120,
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: darkMode
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.9)",
                  transition: "background-color 0.3s ease",
                },
              }}
            >
              <Select
                sx={{ color: theme.colors.text }}
                value={filter.budget || "all"}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, budget: e.target.value }))
                }
                displayEmpty
                IconComponent={() => null}
                startAdornment={
                  <MonetizationOnOutlinedIcon
                    sx={{ color: theme.colors.accent, mr: 1 }}
                  />
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "25px",
                      minWidth: "0 !important",
                      color: theme.colors.text,
                      bgcolor: darkMode
                        ? theme.colors.background
                        : theme.colors.surface,
                    },
                  },
                  MenuListProps: {
                    sx: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "5px 15px",
                    },
                  },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                }}
              >
                <MenuItem value="all">كل الأسعار</MenuItem>
                <MenuItem value="budget">إقتصادي</MenuItem>
                <MenuItem value="moderate">متوسط</MenuItem>
                <MenuItem value="luxury">فاخر</MenuItem>
              </Select>
            </FormControl>

            {/* Existing Location Filter */}
            <FormControl
              sx={{
                minWidth: 120,
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: darkMode
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.9)",
                  transition: "background-color 0.3s ease",
                },
              }}
            >
              <Select
                sx={{ color: theme.colors.text }}
                value={filter.location}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, location: e.target.value }))
                }
                displayEmpty
                IconComponent={() => null}
                startAdornment={
                  <LocationOnIcon sx={{ color: "var(--error-color)", mr: 1 }} />
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "25px",
                      minWidth: "0 !important",
                      bgcolor: darkMode
                        ? theme.colors.background
                        : theme.colors.surface,
                    },
                  },
                  MenuListProps: {
                    sx: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "5px 15px",
                    },
                  },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                }}
              >
                {locations.map((location) => (
                  <MenuItem
                    key={location}
                    value={location}
                    sx={{ color: theme.colors.text }}
                  >
                    {location === "all" ? "جميع المواقع" : location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort Filter */}
            <FormControl
              sx={{
                minWidth: 120,
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: darkMode
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.9)",
                  transition: "background-color 0.3s ease",
                },
              }}
            >
              <Select
                sx={{ color: theme.colors.text }}
                value={filter.sort}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, sort: e.target.value }))
                }
                displayEmpty
                IconComponent={() => null}
                startAdornment={
                  <SortIcon sx={{ color: theme.colors.primary, mr: 1 }} />
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "25px",
                      minWidth: "0 !important",
                      color: theme.colors.text,
                      bgcolor: darkMode
                        ? theme.colors.background
                        : theme.colors.surface,
                    },
                  },
                  MenuListProps: {
                    sx: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "5px 15px",
                    },
                  },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                }}
              >
                <MenuItem value="rating">الأعلى تقييماً</MenuItem>
                <MenuItem value="budget-low">الأقل تكلفة</MenuItem>
                <MenuItem value="budget-high">الأعلى تكلفة</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Enhanced Bookmarks Display */}
          <Badge
            badgeContent={badgeCount}
            color="secondary"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Tooltip
              title={
                badgeCount > 0 ? "عرض البرامج المحفوظة" : "البرامج المحفوظة"
              }
            >
              <IconButton
                onClick={() => handleShowSavedPrograms()}
                sx={{
                  bgcolor:
                    badgeCount > 0 ? `${theme.colors.accent}33` : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                <BookmarkIcon
                  sx={{
                    fontSize: 28,
                    color:
                      badgeCount > 0
                        ? theme.colors.accent
                        : theme.colors.textSecondary,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Badge>
        </Box>
      </motion.div>

      {/* Results Count */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="عرض القائمة">
            <IconButton
              onClick={() => setViewMode("list")}
              sx={{
                bgcolor:
                  viewMode === "list"
                    ? `${theme.colors.primary}33`
                    : "transparent",
                color:
                  viewMode === "list"
                    ? theme.colors.text
                    : theme.colors.textSecondary,
                transition: "all 0.3s ease",
              }}
            >
              <ViewListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="عرض البطاقات">
            <IconButton
              onClick={() => setViewMode("grid")}
              sx={{
                bgcolor:
                  viewMode === "grid"
                    ? `${theme.colors.primary}33`
                    : "transparent",
                color:
                  viewMode === "grid"
                    ? theme.colors.text
                    : theme.colors.textSecondary,
                transition: "all 0.3s ease",
              }}
            >
              <ViewModuleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="عرض الخريطة">
            <IconButton
              onClick={() => setViewMode("map")}
              sx={{
                bgcolor:
                  viewMode === "map"
                    ? `${theme.colors.primary}33`
                    : "transparent",
                color:
                  viewMode === "map"
                    ? theme.colors.text
                    : theme.colors.textSecondary,
                transition: "all 0.3s ease",
              }}
            >
              <MapIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: theme.colors.text,
            bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            borderRadius: "8px",
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            transition: "all 0.3s ease",
          }}
        >
          <InfoOutlinedIcon fontSize="small" />
          {filteredItems.length} برنامج متاح
        </Typography>
      </Box>

      {/* Programs List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="programs-container"
      >
        {loading ? (
          // Skeleton Loaders
          Array.from(new Array(3)).map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              variants={itemVariants}
              className="program-card skeleton-shimmer"
            >
              <Box
                sx={{
                  fontFamily: "Amiri, serif",
                  padding: { xs: "1.5rem", md: "2.5rem" },
                  backgroundColor: theme.colors.card,
                  mt: "2rem",
                  borderRadius: "16px",
                  position: "relative",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                  border: `1px solid ${theme.colors.border}`,
                  transition: "all 0.3s ease",
                }}
              >
                {/* Header Skeleton */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    flexDirection: "row-reverse",
                  }}
                >
                  <Box>
                    <Skeleton
                      variant="text"
                      width={200}
                      height={40}
                      sx={{
                        bgcolor: darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        mt: 1,
                        flexDirection: "row-reverse",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={24}
                        sx={{
                          bgcolor: darkMode
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                        }}
                      />
                    </Box>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{
                        bgcolor: darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      }}
                    />
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{
                        bgcolor: darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      }}
                    />
                  </Stack>
                </Box>

                {/* Rest of skeleton content */}
                {/* ... */}
              </Box>
            </motion.div>
          ))
        ) : filteredItems.length === 0 ? (
          // No results state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: "center",
              padding: "40px",
              backgroundColor: theme.colors.card,
              borderRadius: "16px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
              marginTop: "20px",
              border: `1px solid ${theme.colors.border}`,
              transition: "all 0.3s ease",
            }}
          >
            <Box
              component="img"
              src="/no-results.svg"
              alt="No results"
              sx={{
                width: "200px",
                height: "200px",
                mb: 3,
                opacity: 0.7,
              }}
            />
            <Typography
              variant="h5"
              sx={{ mb: 1, fontWeight: 600, color: theme.colors.text }}
            >
              لم يتم العثور على برامج
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, color: theme.colors.textSecondary }}
            >
              حاول تغيير معايير البحث أو تصفية النتائج بطريقة مختلفة
            </Typography>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setFilter({ search: "", location: "all", sort: "rating" })
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})`,
                color: theme.colors.button,
                border: "none",
                padding: "12px 24px",
                borderRadius: "30px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "16px",
                fontWeight: 600,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                margin: "0 auto",
                transition: "all 0.3s ease",
              }}
            >
              <span>إعادة ضبط الفلتر</span>
            </motion.button>
          </motion.div>
        ) : (
          // Actual Program Cards
          filteredItems.map((item) => (
            <motion.div
              key={item._id}
              id={`program-${item._id}`}
              variants={itemVariants}
              className="program-card"
            >
              <Box
                sx={{
                  fontFamily: "Amiri, serif",
                  padding: { xs: "1.5rem", md: "2.5rem" },
                  backgroundColor: theme.colors.card,
                  mt: "2rem",
                  borderRadius: "16px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  border: `1px solid ${theme.colors.border}`,
                  "&:hover": {
                    boxShadow: darkMode
                      ? "0 15px 40px rgba(0, 0, 0, 0.4)"
                      : "0 15px 40px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-5px)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})`,
                    opacity: bookmarked[item._id] ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  },
                }}
              >
                {/* Badge for high ratings */}
                {Number(item.rate) >= 4.5 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bgcolor: theme.colors.accent,
                      color: theme.colors.text,
                      px: 2,
                      py: 0.5,
                      borderBottomRightRadius: 10,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      zIndex: 2,
                    }}
                  >
                    الأعلى تقييماً
                  </Box>
                )}

                {/* Header Section */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 3,
                    flexDirection: "row-reverse",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        background: darkMode
                          ? `linear-gradient(45deg, ${theme.colors.text} 30%, ${theme.colors.primary} 90%)`
                          : `linear-gradient(45deg, ${theme.colors.primary} 30%, ${theme.colors.accent} 90%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: { xs: "1.5rem", md: "1.8rem" },
                        display: "inline-block",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {`فسحة ${item.type_trip}`}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        flexDirection: "row-reverse",
                      }}
                    >
                      <Rating
                        name="rating"
                        value={Number(item.rate)}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{
                          color: theme.colors.accent,
                          opacity: 0.9,
                          "& .MuiRating-iconFilled": {
                            filter: darkMode
                              ? "drop-shadow(0 0 1px rgba(255,255,255,0.3))"
                              : "none",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: theme.colors.textSecondary,
                          fontWeight: 400,
                          mr: 1,
                          opacity: 0.8,
                        }}
                      >
                        {`(${item.rate})`}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Tooltip
                      title={
                        bookmarked[item._id]
                          ? "إزالة من المحفوظات"
                          : "حفظ البرنامج"
                      }
                    >
                      <IconButton
                        onClick={() => handleBookmarkClick(item._id)}
                        aria-label="bookmark"
                        sx={{
                          borderRadius: "12px",
                          bgcolor: bookmarked[item._id]
                            ? `${theme.colors.accent}33`
                            : darkMode
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.05)",
                          color: bookmarked[item._id]
                            ? theme.colors.accent
                            : theme.colors.textSecondary,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: bookmarked[item._id]
                              ? theme.colors.accent
                              : darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.1)",
                            transform: "translateY(-3px)",
                          },
                          width: "42px",
                          height: "42px",
                        }}
                      >
                        {bookmarked[item._id] ? (
                          <BookmarkIcon
                            sx={{
                              color: theme.colors.accent,
                              animation: bookmarked[item._id]
                                ? "pulse 0.5s ease-in-out"
                                : "none",
                            }}
                          />
                        ) : (
                          <BookmarkBorderIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="مشاركة البرنامج">
                      <IconButton
                        onClick={() => handleShare(item._id)}
                        aria-label="share"
                        sx={{
                          borderRadius: "12px",
                          bgcolor: darkMode
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.05)",
                          color: theme.colors.textSecondary,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.1)",
                            transform: "translateY(-3px)",
                            color: theme.colors.primary,
                          },
                          width: "42px",
                          height: "42px",
                          position: "relative",
                        }}
                      >
                        <ShareIcon />
                        {shareTooltip === item._id && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: "calc(100% + 5px)",
                              right: "50%",
                              transform: "translateX(50%)",
                              bgcolor: theme.colors.accent,
                              color: theme.colors.text,
                              py: 0.5,
                              px: 1.5,
                              borderRadius: "6px",
                              fontSize: "0.8rem",
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                              zIndex: 10,
                              animation: "fadeInUp 0.3s ease",
                              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: "-6px",
                                right: "50%",
                                transform: "translateX(50%)",
                                width: 0,
                                height: 0,
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderBottom: `6px solid ${theme.colors.accent}`,
                              },
                            }}
                          >
                            تم نسخ الرابط!
                          </Box>
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>

                {/* Info Chips - Reorganized and improved */}
                <Stack
                  direction={{ xs: "column", sm: "row-reverse" }}
                  spacing={2}
                  sx={{
                    mb: 3,
                    flexWrap: { sm: "wrap" },
                    "& > *": { flexGrow: { xs: 1, sm: 0 } },
                  }}
                >
                  <Chip
                    icon={<LocationOnOutlinedIcon />}
                    label={item.location}
                    variant="filled"
                    sx={{
                      bgcolor: darkMode
                        ? `${theme.colors.primary}33`
                        : `${theme.colors.primary}1A`,
                      color: darkMode
                        ? theme.colors.text
                        : theme.colors.primary,
                      fontWeight: 500,
                      borderRadius: "12px",
                      border: "1px solid",
                      borderColor: darkMode
                        ? `${theme.colors.primary}4D`
                        : "transparent",
                      "& .MuiChip-icon": {
                        color: theme.colors.primary,
                      },
                      py: 0.8,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
                      },
                    }}
                  />
                  <Chip
                    icon={<PeopleAltOutlinedIcon />}
                    label={`${item.person_num} أشخاص`}
                    variant="filled"
                    sx={{
                      bgcolor: darkMode
                        ? "rgba(255, 194, 15, 0.2)"
                        : "rgba(255, 194, 15, 0.1)",
                      color: darkMode ? theme.colors.text : "#9e7700",
                      fontWeight: 500,
                      borderRadius: "12px",
                      border: "1px solid",
                      borderColor: darkMode
                        ? "rgba(255, 194, 15, 0.3)"
                        : "transparent",
                      "& .MuiChip-icon": {
                        color: theme.colors.accent,
                      },
                      py: 0.8,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
                      },
                    }}
                  />
                  <Chip
                    icon={<AttachMoneyIcon />}
                    label={`${item.budget} جنية`}
                    variant="filled"
                    sx={{
                      bgcolor: darkMode
                        ? "rgba(76, 175, 80, 0.2)"
                        : "rgba(76, 175, 80, 0.1)",
                      color: darkMode ? theme.colors.text : "#2e7d32",
                      fontWeight: 500,
                      borderRadius: "12px",
                      border: "1px solid",
                      borderColor: darkMode
                        ? "rgba(76, 175, 80, 0.3)"
                        : "transparent",
                      "& .MuiChip-icon": {
                        color: darkMode ? "#81c784" : "#4caf50",
                      },
                      py: 0.8,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
                      },
                    }}
                  />
                  <Chip
                    icon={<CalendarMonthIcon />}
                    label={item.duration || "5 أيام"}
                    variant="filled"
                    sx={{
                      bgcolor: darkMode
                        ? "rgba(33, 150, 243, 0.2)"
                        : "rgba(33, 150, 243, 0.1)",
                      color: darkMode ? theme.colors.text : "#0b5394",
                      fontWeight: 500,
                      borderRadius: "12px",
                      border: "1px solid",
                      borderColor: darkMode
                        ? "rgba(33, 150, 243, 0.3)"
                        : "transparent",
                      "& .MuiChip-icon": {
                        color: darkMode ? "#64b5f6" : "#2196f3",
                      },
                      py: 0.8,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
                      },
                    }}
                  />
                </Stack>

                {/* Program Description */}
                <Box sx={{ mb: 4, position: "relative", direction: "rtl" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.colors.text,
                      fontWeight: 400,
                      lineHeight: 1.8,
                      textAlign: "justify",
                      backgroundColor: darkMode
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(0,0,0,0.02)",
                      padding: 2,
                      borderRadius: "12px",
                      border: `1px solid ${theme.colors.border}`,
                      maxHeight: expandedItem === item._id ? "none" : "150px",
                      overflow: "hidden",
                      position: "relative",
                      transition:
                        "max-height 0.5s ease, background-color 0.3s ease, border-color 0.3s ease",
                      "&::after":
                        expandedItem !== item._id
                          ? {
                              content: '""',
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: "50px",
                              background: `linear-gradient(to top, ${
                                darkMode
                                  ? `${theme.colors.card}E6`
                                  : `${theme.colors.surface}E6`
                              }, transparent)`,
                              pointerEvents: "none",
                              transition: "background 0.3s ease",
                            }
                          : {},
                      mb: 2,
                    }}
                  >
                    {item.program}
                  </Typography>

                  {/* Read More Button */}
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 1 }}
                  >
                    <Button
                      onClick={() => handleExpandItem(item._id)}
                      sx={{
                        color: theme.colors.primary,
                        bgcolor: darkMode
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.03)",
                        fontSize: "0.85rem",
                        borderRadius: "20px",
                        py: 0.5,
                        px: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: darkMode
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.05)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 5px 10px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      {expandedItem === item._id ? "عرض أقل" : "قراءة المزيد"}
                    </Button>
                  </Box>
                </Box>

                {/* Image Gallery */}
                <Box sx={{ mb: 3, direction: "rtl" }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 2,
                      color: "var(--text-primary)",
                      fontWeight: 600,
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      "&::before": {
                        content: '""',
                        width: "6px",
                        height: "24px",
                        backgroundColor: theme.colors.primary,
                        borderRadius: "3px",
                        marginRight: "12px",
                        display: "inline-block",
                      },
                    }}
                  >
                    <LuggageIcon sx={{ mr: 1, color: theme.colors.primary }} />
                    أماكن الجولة
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "1fr 1fr 1fr 1fr",
                      },
                      gap: 2,
                    }}
                  >
                    {[
                      {
                        src: item.images?.src1 || `/placeholder-image-1.jpg`,
                        title: item.images?.title1 || `المكان 1`,
                      },
                      {
                        src: item.images?.src2 || `/placeholder-image-2.jpg`,
                        title: item.images?.title2 || `المكان 2`,
                      },
                      {
                        src: item.images?.src3 || `/placeholder-image-3.jpg`,
                        title: item.images?.title3 || `المكان 3`,
                      },
                      {
                        src: item.images?.src4 || `/placeholder-image-4.jpg`,
                        title: item.images?.title4 || `المكان 4`,
                      },
                    ].map((image, index) => (
                      <Box
                        key={`image-${index}`}
                        sx={{
                          position: "relative",
                          borderRadius: "10px",
                          overflow: "hidden",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          height: "200px",
                          backgroundColor: darkMode
                            ? "rgba(0,0,0,0.2)"
                            : "rgba(0,0,0,0.05)",
                          "&:hover": {
                            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                          },
                        }}
                        className="image-hover-zoom"
                      >
                        <Box
                          component="img"
                          src={image.src}
                          alt={image.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                            transition:
                              "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
                          }}
                          onError={(e) => {
                            console.log(
                              `Image ${index + 1} failed to load`,
                              e.target.src
                            );
                            e.target.onerror = null; // Prevent infinite loops
                            e.target.src =
                              "https://via.placeholder.com/400x300?text=صورة+غير+متوفرة";
                          }}
                        />
                        <Box
                          className="overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                        >
                          <IconButton
                            sx={{
                              color: "white",
                              bgcolor: "rgba(255,255,255,0.2)",
                              "&:hover": {
                                bgcolor: "rgba(255,255,255,0.3)",
                              },
                            }}
                            onClick={() => handleExpandItem(item._id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1.5,
                            bgcolor: "rgba(0,0,0,0.65)",
                            color: "#fff",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                            backdropFilter: "blur(4px)",
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              bgcolor: "rgba(0,0,0,0.8)",
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            component="p"
                            sx={{
                              fontWeight: 600,
                              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                              textAlign: "center",
                            }}
                          >
                            {image.title}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Action buttons - Enhanced with clear design patterns */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                  sx={{ mt: 4 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleExpandItem(item._id)}
                    sx={{
                      py: 1.2,
                      px: 3,
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                      boxShadow: "0 6px 12px rgba(59, 88, 152, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 16px rgba(59, 88, 152, 0.3)",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    عرض التفاصيل الكاملة
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={() => handlePrintProgram(item)}
                    sx={{
                      py: 1.2,
                      px: 3,
                      borderRadius: "12px",
                      color: "var(--primary-color)",
                      borderColor: "var(--primary-color)",
                      "&:hover": {
                        boxShadow: "0 5px 15px rgba(59, 88, 152, 0.15)",
                        borderColor: "var(--primary-color)",
                        background: darkMode
                          ? "rgba(59, 88, 152, 0.1)"
                          : "rgba(59, 88, 152, 0.05)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    طباعة البرنامج
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{
                      py: 1.2,
                      px: 3,
                      borderRadius: "12px",
                      color: "var(--accent-color)",
                      borderColor: "var(--accent-color)",
                      "&:hover": {
                        boxShadow: "0 5px 15px rgba(255, 194, 15, 0.15)",
                        borderColor: "var(--accent-color)",
                        background: darkMode
                          ? "rgba(255, 194, 15, 0.1)"
                          : "rgba(255, 194, 15, 0.05)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    تعديل البرنامج
                  </Button>
                </Stack>

                <AnimatePresence>
                  {expandedItem === item._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden", marginTop: "24px" }}
                    >
                      {/* Additional content - matching test.jsx */}
                      <Box
                        sx={{
                          p: 3,
                          bgcolor: darkMode
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.02)",
                          borderRadius: 2,
                          border: darkMode
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            fontWeight: 600,
                            textAlign: "right",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          معلومات تفصيلية عن البرنامج
                          <InfoOutlinedIcon
                            sx={{
                              color: theme.colors.primary,
                              fontSize: "1.2rem",
                            }}
                          />
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                          <Tabs
                            value={activeTab}
                            onChange={(e, newValue) => setActiveTab(newValue)}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="program details tabs"
                            sx={{
                              borderBottom: 1,
                              borderColor: "divider",
                              mb: 2,
                              "& .MuiTabs-indicator": {
                                backgroundColor: theme.colors.primary,
                              },
                              "& .MuiTab-root": {
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                px: { xs: 1, md: 3 },
                                minWidth: "auto",
                                color: "var(--text-secondary)",
                                "&.Mui-selected": {
                                  color: darkMode
                                    ? theme.colors.primary
                                    : "var(--primary-color)",
                                  fontWeight: 700,
                                },
                              },
                              direction: "rtl",
                            }}
                          >
                            <Tab
                              label={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <CalendarTodayIcon
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: theme.colors.primary,
                                    }}
                                  />
                                  جدول الرحلة
                                </Box>
                              }
                              id="tab-0"
                              aria-controls="tabpanel-0"
                            />
                            <Tab
                              label={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <HotelIcon
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: theme.colors.primary,
                                    }}
                                  />
                                  الإقامة
                                </Box>
                              }
                              id="tab-1"
                              aria-controls="tabpanel-1"
                            />
                            <Tab
                              label={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <DirectionsCarIcon
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: theme.colors.primary,
                                    }}
                                  />
                                  النقل
                                </Box>
                              }
                              id="tab-2"
                              aria-controls="tabpanel-2"
                            />
                            <Tab
                              label={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <CheckCircleOutlineIcon
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: theme.colors.primary,
                                    }}
                                  />
                                  المشمولات
                                </Box>
                              }
                              id="tab-3"
                              aria-controls="tabpanel-3"
                            />
                            <Tab
                              label={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <PlaylistAddCheckIcon
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: theme.colors.primary,
                                    }}
                                  />
                                  نصائح هامة
                                </Box>
                              }
                              id="tab-4"
                              aria-controls="tabpanel-4"
                            />
                          </Tabs>

                          {/* Itinerary Tab */}
                          <TabPanel value={activeTab} index={0}>
                            <Box sx={{ textAlign: "right", direction: "rtl" }}>
                              <Box
                                sx={{
                                  mb: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "row-reverse",
                                  gap: 1,
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 600,
                                    color: theme.colors.text,
                                  }}
                                >
                                  مدة البرنامج :{" "}
                                  {Math.floor(Math.random() * 5) + 1} أيام
                                </Typography>
                                <AccessTimeIcon
                                  sx={{ color: theme.colors.primary }}
                                />
                              </Box>

                              <Timeline
                                position="right"
                                sx={{
                                  p: 0,
                                  m: 0,
                                  [`& .MuiTimelineItem-root`]: {
                                    minHeight: "auto",
                                    "&::before": { display: "none" },
                                  },
                                  [`& .MuiTimelineDot-root`]: {
                                    bgcolor: darkMode
                                      ? "var(--primary-color)"
                                      : "var(--primary-color)",
                                    p: 1,
                                    m: 0,
                                    marginRight: "-8px",
                                  },
                                  [`& .MuiTimelineContent-root`]: {
                                    py: 1,
                                  },
                                }}
                              >
                                {Array.from({
                                  length: Math.floor(Math.random() * 3) + 3,
                                }).map((_, index) => (
                                  <TimelineItem key={index}>
                                    <TimelineSeparator>
                                      <TimelineDot>
                                        <EventNoteIcon
                                          sx={{
                                            fontSize: "1rem",
                                            color: "#fff",
                                          }}
                                        />
                                      </TimelineDot>
                                      {index !==
                                        Math.floor(Math.random() * 3) + 2 && (
                                        <TimelineConnector />
                                      )}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                      <Box
                                        sx={{
                                          p: 2,
                                          bgcolor: darkMode
                                            ? "rgba(0,0,0,0.2)"
                                            : "rgba(0,0,0,0.03)",
                                          borderRadius: 2,
                                          mb: 2,
                                          border: darkMode
                                            ? "1px solid rgba(255,255,255,0.05)"
                                            : "1px solid rgba(0,0,0,0.05)",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          component="h4"
                                          sx={{
                                            fontWeight: 600,
                                            mb: 1,
                                            textAlign: "right",
                                          }}
                                        >
                                          اليوم {index + 1}:{" "}
                                          {getRandomActivityTitle()}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          sx={{ textAlign: "right" }}
                                        >
                                          {getRandomDayDescription(
                                            item.location
                                          )}
                                        </Typography>
                                      </Box>
                                    </TimelineContent>
                                  </TimelineItem>
                                ))}
                              </Timeline>
                            </Box>
                          </TabPanel>

                          {/* Accommodation Tab */}
                          <TabPanel value={activeTab} index={1}>
                            <Grid
                              container
                              spacing={2}
                              sx={{ textAlign: "right" }}
                            >
                              <Grid item xs={12} md={6}>
                                <Box
                                  sx={{
                                    p: 2,
                                    bgcolor: darkMode
                                      ? "rgba(0,0,0,0.2)"
                                      : "rgba(0,0,0,0.03)",
                                    borderRadius: 2,
                                    height: "100%",
                                    border: darkMode
                                      ? "1px solid rgba(255,255,255,0.05)"
                                      : "1px solid rgba(0,0,0,0.05)",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      justifyContent: "flex-end",
                                      mb: 2,
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      تفاصيل الإقامة
                                    </Typography>
                                    <HotelIcon
                                      sx={{ color: theme.colors.primary }}
                                    />
                                  </Box>
                                  <List disablePadding>
                                    <ListItem sx={{ px: 0 }}>
                                      <ListItemIcon sx={{ minWidth: "35px" }}>
                                        <StarIcon
                                          fontSize="small"
                                          sx={{ color: theme.colors.accent }}
                                        />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={`فندق ${
                                          Math.floor(Math.random() * 2) + 4
                                        } نجوم`}
                                        sx={{
                                          "& .MuiListItemText-primary": {
                                            textAlign: "right",
                                          },
                                        }}
                                      />
                                    </ListItem>
                                    <ListItem sx={{ px: 0 }}>
                                      <ListItemIcon sx={{ minWidth: "35px" }}>
                                        <RoomServiceIcon
                                          fontSize="small"
                                          sx={{ color: theme.colors.accent }}
                                        />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="وجبة إفطار مجانية"
                                        sx={{
                                          "& .MuiListItemText-primary": {
                                            textAlign: "right",
                                          },
                                        }}
                                      />
                                    </ListItem>
                                    <ListItem sx={{ px: 0 }}>
                                      <ListItemIcon sx={{ minWidth: "35px" }}>
                                        <WifiIcon
                                          fontSize="small"
                                          sx={{ color: theme.colors.accent }}
                                        />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="واي فاي مجاني"
                                        sx={{
                                          "& .MuiListItemText-primary": {
                                            textAlign: "right",
                                          },
                                        }}
                                      />
                                    </ListItem>
                                    <ListItem sx={{ px: 0 }}>
                                      <ListItemIcon sx={{ minWidth: "35px" }}>
                                        <LocationOnIcon
                                          fontSize="small"
                                          sx={{ color: theme.colors.accent }}
                                        />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={`موقع مركزي في ${item.location}`}
                                        sx={{
                                          "& .MuiListItemText-primary": {
                                            textAlign: "right",
                                          },
                                        }}
                                      />
                                    </ListItem>
                                  </List>
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Box
                                  component="img"
                                  src="/hotel-placeholder.jpg"
                                  alt="صورة الفندق"
                                  onError={(e) => {
                                    e.target.src = "/placeholder-hotel.jpg";
                                  }}
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    minHeight: "180px",
                                    maxHeight: "230px",
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </TabPanel>

                          {/* Transportation Tab */}
                          <TabPanel value={activeTab} index={2}>
                            <Box sx={{ textAlign: "right" }}>
                              <Grid container spacing={2}>
                                {[
                                  {
                                    icon: (
                                      <FlightIcon
                                        sx={{
                                          color: theme.colors.primary,
                                          fontSize: "2rem",
                                        }}
                                      />
                                    ),
                                    title: "نقل جوي",
                                    details:
                                      "تذاكر طيران ذهاب وعودة على درجة الاقتصادية مع امكانية الترقية",
                                  },
                                  {
                                    icon: (
                                      <DirectionsBusIcon
                                        sx={{
                                          color: theme.colors.primary,
                                          fontSize: "2rem",
                                        }}
                                      />
                                    ),
                                    title: "حافلات سياحية",
                                    details:
                                      "حافلات حديثة ومكيفة للتنقل بين المواقع السياحية مع سائق محترف",
                                  },
                                  {
                                    icon: (
                                      <LocalTaxiIcon
                                        sx={{
                                          color: theme.colors.primary,
                                          fontSize: "2rem",
                                        }}
                                      />
                                    ),
                                    title: "مواصلات مطار",
                                    details:
                                      "خدمة استقبال وتوصيل من وإلى المطار مع مرشد متحدث بلغتك",
                                  },
                                  {
                                    icon: (
                                      <DirectionsWalkIcon
                                        sx={{
                                          color: theme.colors.primary,
                                          fontSize: "2rem",
                                        }}
                                      />
                                    ),
                                    title: "جولات سير",
                                    details:
                                      "جولات سير مصحوبة بمرشد سياحي في المناطق التاريخية والطبيعية",
                                  },
                                ].map((item, idx) => (
                                  <Grid item xs={12} sm={6} key={idx}>
                                    <Paper
                                      elevation={0}
                                      sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        height: "100%",
                                        bgcolor: darkMode
                                          ? "rgba(0,0,0,0.2)"
                                          : "rgba(0,0,0,0.03)",
                                        border: darkMode
                                          ? "1px solid rgba(255,255,255,0.05)"
                                          : "1px solid rgba(0,0,0,0.05)",
                                      }}
                                    >
                                      <Box sx={{ mb: 1 }}>{item.icon}</Box>
                                      <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 600, mb: 1 }}
                                      >
                                        {item.title}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          opacity: 0.8,
                                          color: theme.colors.textSecondary,
                                        }}
                                      >
                                        {item.details}
                                      </Typography>
                                    </Paper>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          </TabPanel>

                          {/* What's Included Tab */}
                          <TabPanel value={activeTab} index={3}>
                            <Grid
                              container
                              spacing={3}
                              sx={{ textAlign: "right" }}
                            >
                              <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 2 }}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      fontWeight: 600,
                                      mb: 2,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <CheckCircleIcon
                                      sx={{ color: "var(--success-color)" }}
                                    />
                                    مشمول في الباقة
                                  </Typography>
                                  <List disablePadding>
                                    {[
                                      "الإقامة الفندقية مع وجبة الإفطار",
                                      "تذاكر الدخول للمواقع السياحية",
                                      "النقل من وإلى المطار",
                                      "مواصلات بين المواقع السياحية",
                                      "مرشد سياحي متخصص",
                                      "وجبة غداء في أيام الجولات",
                                    ].map((item, idx) => (
                                      <ListItem
                                        key={idx}
                                        sx={{ py: 0.5, px: 0 }}
                                      >
                                        <ListItemIcon sx={{ minWidth: "32px" }}>
                                          <CheckIcon
                                            fontSize="small"
                                            sx={{
                                              color: "var(--success-color)",
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={item}
                                          sx={{
                                            "& .MuiListItemText-primary": {
                                              textAlign: "right",
                                            },
                                          }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 2 }}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      fontWeight: 600,
                                      mb: 2,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <NotInterestedIcon
                                      sx={{ color: "var(--error-color)" }}
                                    />
                                    غير مشمول في الباقة
                                  </Typography>
                                  <List disablePadding>
                                    {[
                                      "تذاكر الطيران الدولية",
                                      "وجبات العشاء",
                                      "المشروبات والوجبات الإضافية",
                                      "النفقات الشخصية",
                                      "تأمين السفر",
                                      "الأنشطة الاختيارية الإضافية",
                                    ].map((item, idx) => (
                                      <ListItem
                                        key={idx}
                                        sx={{ py: 0.5, px: 0 }}
                                      >
                                        <ListItemIcon sx={{ minWidth: "32px" }}>
                                          <CloseIcon
                                            fontSize="small"
                                            sx={{ color: "var(--error-color)" }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={item}
                                          sx={{
                                            "& .MuiListItemText-primary": {
                                              textAlign: "right",
                                            },
                                          }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              </Grid>
                            </Grid>
                          </TabPanel>

                          {/* Important Tips Tab */}
                          <TabPanel value={activeTab} index={4}>
                            <Box sx={{ textAlign: "right" }}>
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                قبل السفر إلى {item.location}، إليك بعض النصائح
                                المهمة لتحظى بتجربة سفر ممتعة وآمنة
                              </Typography>
                              <Accordion
                                sx={{
                                  mb: 1.5,
                                  direction: "rtl",
                                  bgcolor: darkMode
                                    ? "rgba(0,0,0,0.2)"
                                    : "rgba(0,0,0,0.03)",
                                  boxShadow: "none",
                                  "&:before": { display: "none" },
                                  border: darkMode
                                    ? "1px solid rgba(255,255,255,0.05)"
                                    : "1px solid rgba(0,0,0,0.05)",
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <LuggageIcon
                                      sx={{ color: theme.colors.primary }}
                                    />
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      ماذا تحضر معك
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List
                                    dense
                                    disablePadding
                                    sx={{
                                      color: theme.colors.text,
                                    }}
                                  >
                                    {[
                                      `ملابس مناسبة للطقس في ${item.location}`,
                                      "أحذية مريحة للمشي لمسافات طويلة",
                                      "كريم واقٍ من الشمس",
                                      "نظارات شمسية وقبعة",
                                      "مستلزمات النظافة الشخصية",
                                      "أدوية شخصية إذا كنت تستخدم أي منها",
                                    ].map((tip, idx) => (
                                      <ListItem
                                        key={idx}
                                        sx={{ py: 0.5, textAlign: "right" }}
                                      >
                                        <ListItemIcon sx={{ minWidth: "32px" }}>
                                          <ArrowLeftIcon
                                            fontSize="small"
                                            sx={{
                                              color: theme.colors.accent,
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText primary={tip} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                sx={{
                                  mb: 1.5,
                                  direction: "rtl",
                                  bgcolor: darkMode
                                    ? "rgba(0,0,0,0.2)"
                                    : "rgba(0,0,0,0.03)",
                                  boxShadow: "none",
                                  "&:before": { display: "none" },
                                  border: darkMode
                                    ? "1px solid rgba(255,255,255,0.05)"
                                    : "1px solid rgba(0,0,0,0.05)",
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <WbSunnyIcon
                                      sx={{ color: theme.colors.primary }}
                                    />
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      الطقس والمناخ
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{ flexDirection: "column" }}
                                >
                                  <Typography
                                    variant="body2"
                                    paragraph
                                    sx={{ mb: 1, color: theme.colors.text }}
                                  >
                                    يتميز الطقس في {item.location} بأنه{" "}
                                    {getRandomWeather()} خلال فترة الرحلة.
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ mb: 1, color: theme.colors.text }}
                                  >
                                    ننصح بمتابعة حالة الطقس قبل السفر والاستعداد
                                    بالملابس المناسبة لهذه الظروف.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>

                              <Accordion
                                sx={{
                                  mb: 1.5,
                                  direction: "rtl",
                                  bgcolor: darkMode
                                    ? "rgba(0,0,0,0.2)"
                                    : "rgba(0,0,0,0.03)",
                                  boxShadow: "none",
                                  "&:before": { display: "none" },
                                  border: darkMode
                                    ? "1px solid rgba(255,255,255,0.05)"
                                    : "1px solid rgba(0,0,0,0.05)",
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <TipsAndUpdatesIcon
                                      sx={{ color: theme.colors.primary }}
                                    />
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      نصائح وإرشادات عامة
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List
                                    dense
                                    disablePadding
                                    sx={{ color: theme.colors.text }}
                                  >
                                    {[
                                      "احترام العادات والتقاليد المحلية في المناطق التي تزورها",
                                      "الحفاظ على جواز سفر ساري المفعول",
                                      "الاحتفاظ بنسخ من المستندات المهمة في مكان منفصل",
                                      "التأكد من تغطية تأمين السفر",
                                      "الالتزام بتعليمات المرشد السياحي خلال الجولات",
                                    ].map((tip, idx) => (
                                      <ListItem
                                        key={idx}
                                        sx={{ py: 0.5, textAlign: "right" }}
                                      >
                                        <ListItemIcon sx={{ minWidth: "32px" }}>
                                          <ArrowLeftIcon
                                            fontSize="small"
                                            sx={{
                                              color: theme.colors.accent,
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText primary={tip} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </AccordionDetails>
                              </Accordion>
                            </Box>
                          </TabPanel>
                        </Box>

                        <Divider
                          sx={{
                            my: 3,
                            borderColor: darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.1)",
                          }}
                        />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 2,
                            mt: 3,
                            flexDirection: "row-reverse",
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<EventAvailableIcon />}
                            sx={{
                              py: 1.2,
                              px: 3,
                              borderRadius: "12px",
                              backgroundColor: "var(--accent-color)",
                              color: "#000",
                              fontWeight: 600,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "var(--accent-color-dark)",
                                transform: "translateY(-3px)",
                                boxShadow:
                                  "0 6px 15px rgba(255, 194, 15, 0.25)",
                              },
                            }}
                          >
                            حجز البرنامج
                          </Button>

                          <Button
                            variant="outlined"
                            startIcon={<PrintIcon />}
                            onClick={() => handlePrintProgram(item)}
                            sx={{
                              py: 1.2,
                              px: 3,
                              borderRadius: "12px",
                              color: "var(--primary-color)",
                              borderColor: "var(--primary-color)",
                              fontWeight: 500,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                boxShadow: "0 5px 15px rgba(59, 88, 152, 0.15)",
                                borderColor: "var(--primary-color)",
                                background: darkMode
                                  ? "rgba(59, 88, 152, 0.1)"
                                  : "rgba(59, 88, 152, 0.05)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            طباعة البرنامج
                          </Button>

                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            sx={{
                              py: 1.2,
                              px: 3,
                              borderRadius: "12px",
                              color: "var(--text-secondary)",
                              borderColor: "var(--text-secondary)",
                              fontWeight: 500,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                color: "var(--text-primary)",
                                borderColor: "var(--text-primary)",
                                background: darkMode
                                  ? "rgba(255,255,255,0.05)"
                                  : "rgba(0,0,0,0.03)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            تعديل البرنامج
                          </Button>
                        </Box>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(5px)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
            onClick={closeShareModal}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1, type: "spring" }}
              style={{
                background: darkMode ? theme.colors.card : "white",
                borderRadius: "20px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                color: darkMode ? "white" : "var(--text-primary)",
                padding: "30px",
                width: "100%",
                maxWidth: "500px",
                position: "relative",
                border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "none",
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    "linear-gradient(to right, var(--primary-color), var(--secondary-color))",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  mb: 3,
                  color: theme.colors.primary,
                }}
              >
                مشاركة البرنامج
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.colors.text,
                    textAlign: "center",
                    mb: 3,
                    fontWeight: 500,
                    lineHeight: 1.6,
                  }}
                >
                  يمكنك مشاركة هذا البرنامج الرائع مع أصدقائك من خلال إحدى
                  الوسائل التالية
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 2,
                  }}
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                    className="share-option"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px 10px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      background: darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                      border: darkMode
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.05)",
                    }}
                    onClick={() =>
                      handleShareToSocial("whatsapp", shareModalOpen)
                    }
                  >
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "#25D366",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <WhatsAppIcon sx={{ color: "white", fontSize: "28px" }} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      واتساب
                    </Typography>
                  </motion.div>
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                    className="share-option"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px 10px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      background: darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                      border: darkMode
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.05)",
                    }}
                    onClick={() =>
                      handleShareToSocial("facebook", shareModalOpen)
                    }
                  >
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "#3b5998",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <FacebookIcon sx={{ color: "white", fontSize: "28px" }} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      فيسبوك
                    </Typography>
                  </motion.div>
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                    className="share-option"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px 10px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      background: darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                      border: darkMode
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.05)",
                    }}
                    onClick={() =>
                      handleShareToSocial("twitter", shareModalOpen)
                    }
                  >
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "#1DA1F2",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <TwitterIcon sx={{ color: "white", fontSize: "28px" }} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      تويتر
                    </Typography>
                  </motion.div>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  mt: 4,
                  pt: 4,
                  borderTop: darkMode
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  أو انسخ الرابط مباشرة
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    background: darkMode
                      ? "rgba(0,0,0,0.2)"
                      : "rgba(0,0,0,0.03)",
                    borderRadius: "8px",
                    p: 1,
                    pr: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    value={`https://yourwebsite.com/program/${shareModalOpen}`}
                    variant="outlined"
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        backgroundColor: darkMode
                          ? "rgba(0,0,0,0.2)"
                          : "rgba(255,255,255,0.8)",
                      },
                      direction: "ltr",
                      fontSize: "0.9rem",
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://yourwebsite.com/program/${shareModalOpen}`
                      );
                      setShareTooltip(shareModalOpen);
                      setTimeout(() => setShareTooltip(null), 2000);
                    }}
                    sx={{
                      backgroundColor: "var(--accent-color)",
                      borderRadius: "8px",
                      px: 2,
                      py: 1.3,
                      "&:hover": {
                        backgroundColor: "var(--accent-color-dark)",
                      },
                    }}
                  >
                    <ContentCopyIcon sx={{ mr: 1 }} />
                    نسخ
                  </Button>
                </Box>
              </Box>
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeShareModal}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                    color: "var(--text-primary)",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "30px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  <CloseIcon fontSize="small" />
                  <span>إغلاق</span>
                </motion.button>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination Controls */}
      {!loading && filteredItems.length > 0 && (
        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "center",
            position: "relative",
            py: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              sx={{
                minWidth: "40px",
                height: "40px",
                p: 0,
                borderRadius: "50%",
                color:
                  currentPage === 1
                    ? "var(--text-muted)"
                    : "var(--text-primary)",
                border: "1px solid",
                borderColor:
                  currentPage === 1
                    ? darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)"
                    : darkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  transform: currentPage === 1 ? "none" : "translateY(-2px)",
                },
              }}
            >
              <NavigateBeforeIcon />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                sx={{
                  minWidth: "40px",
                  height: "40px",
                  p: 0,
                  borderRadius: "50%",
                  backgroundColor:
                    currentPage === page
                      ? `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                      : "transparent",
                  color: currentPage === page ? "white" : "var(--text-primary)",
                  fontWeight: currentPage === page ? 700 : 400,
                  transition: "all 0.3s ease",
                  border: currentPage === page ? "none" : "1px solid",
                  borderColor: darkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor:
                      currentPage === page
                        ? `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                        : darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.03)",
                    transform:
                      currentPage === page ? "none" : "translateY(-2px)",
                  },
                }}
              >
                {page}
              </Button>
            ))}

            <Button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              sx={{
                minWidth: "40px",
                height: "40px",
                p: 0,
                borderRadius: "50%",
                color:
                  currentPage === totalPages
                    ? "var(--text-muted)"
                    : "var(--text-primary)",
                border: "1px solid",
                borderColor:
                  currentPage === totalPages
                    ? darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)"
                    : darkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  transform:
                    currentPage === totalPages ? "none" : "translateY(-2px)",
                },
              }}
            >
              <NavigateNextIcon />
            </Button>
          </motion.div>
        </Box>
      )}

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: 10,
            }}
          >
            <Tooltip title="العودة للأعلى">
              <IconButton
                onClick={scrollToTop}
                aria-label="back to top"
                sx={{
                  backgroundColor: darkMode
                    ? "rgba(97, 130, 195, 0.9)"
                    : "rgba(59, 88, 152, 0.9)",
                  color: "#fff",
                  width: "50px",
                  height: "50px",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    backgroundColor: darkMode
                      ? "var(--primary-color-light)"
                      : "var(--primary-color)",
                    transform: "translateY(-5px)",
                  },
                  transition:
                    "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                <KeyboardArrowUpIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: darkMode
                ? "rgba(18, 18, 18, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(5px)",
              zIndex: 2000,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative", width: 150, height: 150, mb: 2 }}>
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: `4px solid ${
                    darkMode
                      ? "rgba(97, 130, 195, 0.1)"
                      : "rgba(59, 88, 152, 0.1)"
                  }`,
                  borderTop: `4px solid ${
                    darkMode ? theme.colors.primary : theme.colors.primary
                  }`,
                  position: "absolute",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <LuggageIcon
                  sx={{
                    fontSize: "50px",
                    color: darkMode
                      ? theme.colors.primary
                      : theme.colors.primary,
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "var(--text-primary)",
                fontWeight: 600,
                textAlign: "center",
                mb: 1,
              }}
            >
              جاري تحميل البرامج السياحية
            </Typography>
            <Box sx={{ width: "200px", mt: 1 }}></Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReadyPrograms;
