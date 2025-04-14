"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Menu,
  Badge,
  Stack,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ThumbUp as ThumbUpIcon,
  Reply as ReplyIcon,
  Share as ShareIcon,
  Flag as FlagIcon,
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  Sort as SortIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon,
  CalendarMonth as CalendarIcon,
  Download as DownloadIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import styled, {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

// Analytics chart - replace with your preferred chart library
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

// Styled components for Review page
const PageContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  direction: rtl;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StatsCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewCard = styled(Card)`
  margin-bottom: 1.5rem;
  border-radius: 16px;
  overflow: visible;
  position: relative;
  background-color: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ActionButton = styled(Button)`
  border-radius: 20px;
  text-transform: none;
  font-weight: 500;
  padding: 6px 16px;
  transition: all 0.2s ease;
  color: ${(props) => (props.$active ? "#fff" : props.theme.colors.text)};
  background-color: ${(props) =>
    props.$active ? props.theme.colors.primary : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.$active
        ? props.theme.colors.primary
        : props.theme.colors.background};
    transform: translateY(-2px);
  }
`;

const RatingChip = styled(Chip)`
  background-color: ${(props) => {
    const value = parseFloat(props.$rating);
    if (value >= 4.5) return "#4caf50";
    if (value >= 4) return "#8bc34a";
    if (value >= 3.5) return "#ffeb3b";
    if (value >= 3) return "#ffc107";
    if (value >= 2) return "#ff9800";
    return "#f44336";
  }};
  color: ${(props) => {
    const value = parseFloat(props.$rating);
    return value >= 3.5 ? "#ffffff" : "#000000";
  }};
  font-weight: bold;
  border-radius: 12px;
  padding: 0 4px;
`;

const FilterChip = styled(Chip)`
  margin: 0 4px 4px 0;
  border-radius: 16px;
  font-weight: 500;
  background-color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${(props) =>
    props.$active ? "#ffffff" : props.theme.colors.textSecondary};
  border: 1px solid
    ${(props) =>
      props.$active ? props.theme.colors.primary : props.theme.colors.border};

  &:hover {
    background-color: ${(props) =>
      props.$active ? props.theme.colors.primary : props.theme.colors.border};
  }
`;

const ReviewHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatsContainer = styled(Box)`
  margin-bottom: 2.5rem;
`;

const ChartContainer = styled(Box)`
  height: 300px;
  width: 100%;
  position: relative;
`;

const ReplyContainer = styled(Box)`
  padding: 16px;
  background-color: ${(props) =>
    props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};
  border-radius: 12px;
  margin-top: 12px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: -8px;
    right: 24px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid
      ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};
  }
`;

const EmptyStateContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

// Dummy data for reviews (replace with your API data)
const MOCK_REVIEWS = [
  {
    id: 1,
    userName: "أحمد الشمري",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    placeId: 1,
    placeName: "كافيه الحديقة",
    rating: 4.5,
    date: "2025-03-10T14:30:00",
    comment:
      "مكان رائع للاسترخاء، القهوة ممتازة والخدمة سريعة. سأعود مرة أخرى بالتأكيد!",
    categoryId: 1,
    category: "مطاعم وكافيهات",
    likes: 12,
    images: [
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&auto=format&fit=crop",
    ],
    hasReply: true,
    reply: {
      date: "2025-03-11T10:15:00",
      text: "شكراً لزيارتك يا أحمد! نسعد دائماً بخدمتك ونتطلع لرؤيتك مرة أخرى قريباً.",
    },
  },
  {
    id: 2,
    userName: "مها العتيبي",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    placeId: 1,
    placeName: "كافيه الحديقة",
    rating: 5,
    date: "2025-03-08T16:45:00",
    comment:
      "من أفضل الأماكن التي زرتها! الديكور جميل جداً والطعام لذيذ. أنصح بتجربة كيكة الشوكولاتة.",
    categoryId: 1,
    category: "مطاعم وكافيهات",
    likes: 8,
    images: [
      "https://images.unsplash.com/photo-1622360075103-7e0efbe65967?w=600&auto=format&fit=crop",
    ],
    hasReply: false,
  },
  {
    id: 3,
    userName: "خالد الدوسري",
    userAvatar: "https://randomuser.me/api/portraits/men/46.jpg",
    placeId: 1,
    placeName: "كافيه الحديقة",
    rating: 3,
    date: "2025-03-05T19:20:00",
    comment:
      "المكان جميل لكن الخدمة بطيئة جداً. انتظرنا أكثر من 30 دقيقة لتحضير الطلب.",
    categoryId: 1,
    category: "مطاعم وكافيهات",
    likes: 2,
    images: [],
    hasReply: true,
    reply: {
      date: "2025-03-06T09:30:00",
      text: "نعتذر عن التأخير يا خالد. نحن نعمل على تحسين سرعة الخدمة. نأمل أن تمنحنا فرصة أخرى لنقدم لك تجربة أفضل.",
    },
  },
  {
    id: 4,
    userName: "نورة القحطاني",
    userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    placeId: 1,
    placeName: "كافيه الحديقة",
    rating: 5,
    date: "2025-03-01T11:15:00",
    comment:
      "تجربة رائعة! الموظفون ودودون جداً والمكان نظيف ومرتب. سعدت بوجود خيارات متنوعة للوجبات النباتية.",
    categoryId: 1,
    category: "مطاعم وكافيهات",
    likes: 15,
    images: [
      "https://images.unsplash.com/photo-1563897539633-7d6c93be5f29?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742077-0a6b3a331e5d?w=600&auto=format&fit=crop",
    ],
    hasReply: true,
    reply: {
      date: "2025-03-01T14:45:00",
      text: "شكراً لكلماتك اللطيفة يا نورة! نحن سعداء جداً أنك استمتعت بتجربتك معنا. نتطلع دائماً لتقديم خيارات متنوعة تناسب جميع الأذواق.",
    },
  },
  {
    id: 5,
    userName: "سلمان الحربي",
    userAvatar: "https://randomuser.me/api/portraits/men/72.jpg",
    placeId: 1,
    placeName: "كافيه الحديقة",
    rating: 4,
    date: "2025-02-25T16:30:00",
    comment:
      "جلسة هادئة ومريحة. أحببت الموسيقى الخلفية والإضاءة المميزة. القهوة جيدة لكن يمكن أن تكون أفضل.",
    categoryId: 1,
    category: "مطاعم وكافيهات",
    likes: 6,
    images: [],
    hasReply: false,
  },
];

// MUI components with memoization
const MemoizedTypography = React.memo(({ children, ...props }) => (
  <Typography {...props}>{children}</Typography>
));

const MemoizedRating = React.memo(({ value, ...props }) => (
  <Rating
    value={Number(value)}
    max={5}
    icon={<StarIcon fontSize="inherit" />}
    emptyIcon={<StarIcon fontSize="inherit" />}
    {...props}
    sx={{
      direction: "ltr",
      "& .MuiRating-icon": {
        color: "var(--primary-color)",
      },
      "& .MuiRating-iconFilled": {
        color: "var(--primary-color)",
      },
      "& .MuiRating-iconEmpty": {
        color: "rgba(0, 0, 0, 0.1)",
      },
      ...props.sx,
    }}
  />
));

const MemoizedChip = React.memo(({ label, ...props }) => (
  <Chip label={label} {...props} />
));

const Review = () => {
  const { theme, darkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentTab, setCurrentTab] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [timeRange, setTimeRange] = useState("month");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Add this useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data loading effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1400));

        // Validate mock data to ensure all reviews with hasReply: true have a reply object
        const validatedReviews = MOCK_REVIEWS.map((review) => {
          if (review.hasReply && !review.reply) {
            // Fix any inconsistent data by providing a default reply
            return {
              ...review,
              reply: {
                date: new Date().toISOString(),
                text: "تم الرد على هذا التقييم.",
              },
            };
          }
          return review;
        });

        // In real app, fetch from your API
        setReviews(validatedReviews);
        setFilteredReviews(validatedReviews);

        // Calculate stats
        const totalReviews = validatedReviews.length;
        const totalRating = validatedReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const averageRating = totalRating / totalReviews;

        // Rating distribution
        const ratingCounts = [0, 0, 0, 0, 0];
        validatedReviews.forEach((review) => {
          const index = Math.floor(review.rating) - 1;
          if (index >= 0 && index < 5) {
            ratingCounts[index]++;
          }
        });

        // Percentage of replies
        const repliedCount = validatedReviews.filter(
          (review) => review.hasReply && review.reply
        ).length;
        const replyRate = (repliedCount / totalReviews) * 100;

        // Set stats object
        setStats({
          totalReviews,
          averageRating,
          ratingCounts,
          replyRate,
          pendingReplies: totalReviews - repliedCount,
        });
      } catch (error) {
        console.error("Error fetching review data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter reviews based on search, rating, and category
  useEffect(() => {
    if (!reviews.length) return;

    let filtered = [...reviews];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.userName.toLowerCase().includes(term) ||
          review.comment.toLowerCase().includes(term)
      );
    }

    // Apply rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter((review) => {
        // For exact match with half star precision
        const lowerBound = selectedRating - 0.25;
        const upperBound = selectedRating + 0.25;
        return review.rating >= lowerBound && review.rating <= upperBound;
      });
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (review) => review.category === selectedCategory
      );
    }

    // Apply tab filter (0: All, 1: Pending Reply, 2: Replied)
    if (currentTab === 1) {
      filtered = filtered.filter((review) => !review.hasReply);
    } else if (currentTab === 2) {
      // Add additional check for reply object existence
      filtered = filtered.filter((review) => review.hasReply && review.reply);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return sortDirection === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      } else if (sortBy === "rating") {
        return sortDirection === "desc"
          ? b.rating - a.rating
          : a.rating - b.rating;
      } else if (sortBy === "likes") {
        return sortDirection === "desc" ? b.likes - a.likes : a.likes - b.likes;
      }
      return 0;
    });

    setFilteredReviews(filtered);
  }, [
    reviews,
    searchTerm,
    selectedRating,
    selectedCategory,
    currentTab,
    sortBy,
    sortDirection,
  ]);

  // Handle reply submission
  const handleReplySubmit = useCallback(
    (reviewId) => {
      if (!replyText.trim()) return;

      try {
        // In a real app, send the reply to your API
        setReviews((prevReviews) =>
          prevReviews.map((review) => {
            if (review.id === reviewId) {
              return {
                ...review,
                hasReply: true,
                reply: {
                  date: new Date().toISOString(),
                  text: replyText.trim(),
                },
              };
            }
            return review;
          })
        );

        setReplyingTo(null);
        setReplyText("");
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    },
    [replyText]
  );

  // Handle menu open/close
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Export reviews
  const handleExportReviews = () => {
    // In a real app, generate CSV or PDF for download
    alert("سيتم تنزيل التقييمات بصيغة CSV");
    handleMenuClose();
  };

  // Safe format date to handle potential invalid dates
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "تاريخ غير صالح";
      }
      return new Intl.DateTimeFormat("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "تاريخ غير صالح";
    }
  };

  // Chart data for ratings over time
  const ratingChartData = useMemo(() => {
    // In a real app, you would calculate this from your actual data
    // For now, we'll use dummy data
    return {
      labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
      datasets: [
        {
          label: "متوسط التقييم",
          data: [4.2, 4.3, 4.1, 4.5, 4.7, 4.6],
          borderColor: theme.colors.primary,
          backgroundColor: `${theme.colors.primary}33`,
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [theme.colors.primary]);

  // Distribution chart for rating counts
  const ratingDistributionData = useMemo(() => {
    if (!stats) return null;

    return {
      labels: ["5 نجوم", "4 نجوم", "3 نجوم", "2 نجوم", "1 نجمة"],
      datasets: [
        {
          label: "عدد التقييمات",
          data: [
            stats.ratingCounts[4],
            stats.ratingCounts[3],
            stats.ratingCounts[2],
            stats.ratingCounts[1],
            stats.ratingCounts[0],
          ],
          backgroundColor: [
            "#4caf50", // 5 stars - green
            "#8bc34a", // 4 stars - light green
            "#ffeb3b", // 3 stars - yellow
            "#ff9800", // 2 stars - orange
            "#f44336", // 1 star - red
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [stats]);

  // Get chart options based on theme
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: theme.colors.text,
        },
      },
      x: {
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: theme.colors.text,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme.colors.text,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: theme.colors.text,
        },
      },
    },
  };

  // Replace the loading return statement
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: theme.colors.background,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Background animated stars - safely access window object */}
        {mounted &&
          [...Array(20)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              sx={{
                position: "absolute",
                color:
                  i % 3 === 0
                    ? theme.colors.primary
                    : i % 3 === 1
                    ? theme.colors.accent
                    : "rgba(255, 194, 15, 0.7)",
                fontSize: Math.random() * 20 + 10,
                opacity: Math.random() * 0.6 + 0.2,
                zIndex: 1,
              }}
              initial={{
                x:
                  typeof window !== "undefined"
                    ? Math.random() * window.innerWidth
                    : 500,
                y:
                  typeof window !== "undefined"
                    ? Math.random() * window.innerHeight
                    : 300,
                scale: 0,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            >
              <StarIcon />
            </Box>
          ))}

        {/* Main loading animation */}
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            bgcolor: darkMode ? `rgba(0,0,0,0.5)` : `rgba(255,255,255,0.8)`,
            borderRadius: "24px",
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.colors.border}`,
            p: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: `0 20px 40px rgba(0,0,0,${darkMode ? 0.5 : 0.15})`,
            width: { xs: "90%", sm: "400px" },
            transition: "all 0.3s ease",
          }}
        >
          <motion.div
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                component={motion.div}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
                animate={{
                  opacity: [0, 1],
                  y: [20, 0],
                }}
                transition={{ duration: 0.8 }}
              >
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Box
                    component={motion.div}
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      color: [theme.colors.textSecondary, theme.colors.primary],
                    }}
                    transition={{
                      delay: 0.3 + index * 0.2,
                      duration: 0.8,
                    }}
                    sx={{ mx: 1 }}
                  >
                    <StarIcon
                      sx={{
                        fontSize: 40,
                        color: theme.colors.primary,
                        filter: darkMode
                          ? "drop-shadow(0 0 3px rgba(255,255,255,0.3))"
                          : "none",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  top: -30,
                  left: -30,
                  right: -30,
                  bottom: -30,
                  borderRadius: "50%",
                  border: `2px dashed ${theme.colors.border}`,
                  zIndex: 0,
                }}
              />

              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  top: -15,
                  left: -15,
                  right: -15,
                  bottom: -15,
                  borderRadius: "50%",
                  border: `2px dashed ${theme.colors.accent}`,
                  opacity: 0.7,
                  zIndex: 0,
                }}
              />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: theme.colors.text,
                textAlign: "center",
              }}
            >
              جاري تحميل التقييمات
            </Typography>
          </motion.div>

          <Box
            component={motion.div}
            sx={{
              width: "80%",
              height: 8,
              bgcolor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
              borderRadius: 4,
              overflow: "hidden",
              mt: 3,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <Box
              component={motion.div}
              sx={{
                height: "100%",
                background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                borderRadius: 4,
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </Box>

          {/* Additional loading indicators */}
          <Box
            component={motion.div}
            sx={{ display: "flex", gap: 1, mt: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {["جمع البيانات", "تحليل التقييمات", "تجهيز المحتوى"].map(
              (text, i) => (
                <Chip
                  key={i}
                  label={text}
                  size="small"
                  sx={{
                    bgcolor: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.06)",
                    color: theme.colors.text,
                    fontWeight: 500,
                    border: `1px solid ${theme.colors.border}`,
                    animation: `pulse ${
                      1.2 + i * 0.2
                    }s infinite alternate ease-in-out`,
                    "@keyframes pulse": {
                      "0%": { opacity: 0.6, transform: "scale(0.97)" },
                      "100%": { opacity: 1, transform: "scale(1)" },
                    },
                  }}
                />
              )
            )}
          </Box>
        </Box>

        {/* Preview cards - safely check for window */}
        {mounted &&
          [...Array(3)].map((_, i) => (
            <Box
              component={motion.div}
              key={`card-${i}`}
              sx={{
                position: "absolute",
                width: { xs: "280px", sm: "320px", md: "350px" },
                height: "120px",
                borderRadius: "16px",
                bgcolor: darkMode ? theme.colors.card : "white",
                boxShadow: `0 10px 30px rgba(0,0,0,${darkMode ? 0.25 : 0.1})`,
                border: `1px solid ${theme.colors.border}`,
                opacity: 0.3,
                zIndex: 0,
                overflow: "hidden",
              }}
              initial={{
                x: i % 2 === 0 ? -500 : 500,
                y: -100 + i * 200,
                rotate: i % 2 === 0 ? -10 : 10,
              }}
              animate={{
                x: i % 2 === 0 ? -800 : 800,
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 3,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  gap: 2,
                  height: "100%",
                  opacity: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: `${theme.colors.primary}33`,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      width: "60%",
                      height: 15,
                      borderRadius: 1,
                      bgcolor: `${theme.colors.textSecondary}33`,
                      mb: 1,
                    }}
                  />
                  <Box sx={{ display: "flex", mb: 2 }}>
                    {[...Array(5)].map((_, j) => (
                      <StarIcon
                        key={j}
                        sx={{
                          fontSize: 16,
                          color:
                            j < 4
                              ? theme.colors.accent
                              : `${theme.colors.textSecondary}33`,
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      width: "90%",
                      height: 10,
                      borderRadius: 1,
                      bgcolor: `${theme.colors.textSecondary}22`,
                      mb: 1,
                    }}
                  />
                  <Box
                    sx={{
                      width: "75%",
                      height: 10,
                      borderRadius: 1,
                      bgcolor: `${theme.colors.textSecondary}22`,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    );
  }

  return (
    <StyledThemeProvider theme={theme}>
      <PageContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Box mb={4} mt={5}>
            <Typography variant="h4" component="h1" fontWeight="bold" mb={1}>
              تقييمات العملاء
            </Typography>
            <Typography variant="subtitle1" color={theme.colors.textSecondary}>
              تابع تقييمات عملائك وتفاعل معهم لتحسين تجربتهم
            </Typography>
          </Box>
        </motion.div>

        {/* Stats Cards */}
        <StatsContainer>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <StatsCard>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography
                        color={theme.colors.textSecondary}
                        variant="subtitle2"
                        gutterBottom
                      >
                        متوسط التقييم
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={theme.colors.primary}
                      >
                        {stats?.averageRating.toFixed(1) || "0.0"}
                      </Typography>
                      <Box display="flex" alignItems="center" mt={1}>
                        <MemoizedRating
                          value={stats?.averageRating || 0}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="body2"
                          ml={1}
                          color={theme.colors.textSecondary}
                        >
                          ({stats?.totalReviews || 0} تقييم)
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: `${theme.colors.primary}33`,
                        color: theme.colors.primary,
                        width: 56,
                        height: 56,
                      }}
                    >
                      <StarIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </StatsCard>
            </Grid>

            <Grid item xs={12} md={3}>
              <StatsCard>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography
                        color={theme.colors.textSecondary}
                        variant="subtitle2"
                        gutterBottom
                      >
                        معدل الرد
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={theme.colors.primary}
                      >
                        {stats?.replyRate.toFixed(0) || "0"}%
                      </Typography>
                      <Typography
                        variant="body2"
                        color={theme.colors.textSecondary}
                        mt={1}
                      >
                        {stats?.pendingReplies || 0} تقييم بانتظار الرد
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: `${theme.colors.primary}33`,
                        color: theme.colors.primary,
                        width: 56,
                        height: 56,
                      }}
                    >
                      <ReplyIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </StatsCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <StatsCard>
                <CardContent sx={{ height: "100%" }}>
                  <Typography
                    color={theme.colors.textSecondary}
                    variant="subtitle2"
                    gutterBottom
                  >
                    توزيع التقييمات
                  </Typography>
                  <Box height={140} mt={1}>
                    {stats && (
                      <Bar
                        data={ratingDistributionData}
                        options={{
                          ...chartOptions,
                          indexAxis: "y",
                          scales: {
                            x: {
                              beginAtZero: true,
                              grid: {
                                color: darkMode
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.1)",
                              },
                              ticks: {
                                color: theme.colors.text,
                              },
                            },
                            y: {
                              grid: {
                                display: false,
                              },
                              ticks: {
                                color: theme.colors.text,
                              },
                            },
                          },
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </StatsCard>
            </Grid>
          </Grid>
        </StatsContainer>

        {/* Charts Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            backgroundColor: theme.colors.card,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" fontWeight="bold">
              تحليل التقييمات عبر الزمن
            </Typography>
            <Box>
              <Button
                size="small"
                variant={timeRange === "week" ? "contained" : "outlined"}
                sx={{
                  mr: 1,
                  borderRadius: 2,
                  backgroundColor:
                    timeRange === "week" ? theme.colors.primary : "transparent",
                  color: timeRange === "week" ? "#fff" : theme.colors.text,
                }}
                onClick={() => setTimeRange("week")}
              >
                أسبوع
              </Button>
              <Button
                size="small"
                variant={timeRange === "month" ? "contained" : "outlined"}
                sx={{
                  mr: 1,
                  borderRadius: 2,
                  backgroundColor:
                    timeRange === "month"
                      ? theme.colors.primary
                      : "transparent",
                  color: timeRange === "month" ? "#fff" : theme.colors.text,
                }}
                onClick={() => setTimeRange("month")}
              >
                شهر
              </Button>
              <Button
                size="small"
                variant={timeRange === "year" ? "contained" : "outlined"}
                sx={{
                  borderRadius: 2,
                  backgroundColor:
                    timeRange === "year" ? theme.colors.primary : "transparent",
                  color: timeRange === "year" ? "#fff" : theme.colors.text,
                }}
                onClick={() => setTimeRange("year")}
              >
                سنة
              </Button>
            </Box>
          </Box>
          <ChartContainer>
            <Line data={ratingChartData} options={chartOptions} />
          </ChartContainer>
        </Paper>

        {/* Reviews List */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            backgroundColor: theme.colors.card,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          {/* Review Filters */}
                <ReviewHeader>
                <Box flex="1" minWidth="280px">
                  <TextField
                  placeholder="ابحث في التقييمات..."
                  fullWidth
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: darkMode ? "#fff" : "inherit" }} />
                    </InputAdornment>
                    ),
                    sx: {
                    borderRadius: 4,
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.03)",
                    color: darkMode ? "#fff" : "inherit",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "rgba(255, 255, 255, 0.5)" : "inherit",
                    },
                    },
                  }}
                  />
                </Box>

                <Box display="flex" alignItems="center">
                  <FormControl
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 140,
                    mr: 1,
                    "& .MuiInputLabel-root": {
                    color: darkMode ? "#fff" : "inherit",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: darkMode ? "rgba(255, 255, 255, 0.5)" : "inherit",
                    },
                  }}
                  >
                  <InputLabel>ترتيب حسب</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="ترتيب حسب"
                    sx={{
                    borderRadius: 4,
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.03)",
                    color: darkMode ? "#fff" : "inherit",
                    }}
                  >
                    <MenuItem value="date">التاريخ</MenuItem>
                    <MenuItem value="rating">التقييم</MenuItem>
                    <MenuItem value="likes">الإعجابات</MenuItem>
                  </Select>
                  </FormControl>

                  <IconButton
                  onClick={() =>
                    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"))
                  }
                  sx={{
                    color: darkMode ? "#fff" : theme.colors.text,
                    transform:
                    sortDirection === "asc" ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s ease",
                  }}
                  >
                  <SortIcon />
                  </IconButton>

                  <IconButton
                  onClick={handleMenuClick}
                  sx={{ ml: 1, color: darkMode ? "#fff" : theme.colors.text }}
                  >
                  <MoreVertIcon />
                  </IconButton>

                  <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  PaperProps={{
                    sx: {
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "inherit",
                    color: darkMode ? "#fff" : "inherit",
                    },
                  }}
                  >
                  <MenuItem onClick={handleExportReviews}>
                    <DownloadIcon fontSize="small" sx={{ ml: 1 }} />
                    تصدير التقييمات
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <RefreshIcon fontSize="small" sx={{ ml: 1 }} />
                    تحديث البيانات
                  </MenuItem>
                  </Menu>
                </Box>
                </ReviewHeader>

                {/* Filter Chips */}
          {/* <Box mb={2}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <FilterChip
                key={rating}
                label={`${rating} ${
                  rating === 5 ? "نجوم" : rating > 1 ? "نجوم" : "نجمة"
                }`}
                $active={selectedRating === rating}
                onClick={() =>
                  setSelectedRating(selectedRating === rating ? 0 : rating)
                }
                icon={<StarIcon fontSize="small"/>}
                />
            ))}
          </Box> */}

          {/* Tabs for filtering */}
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{
              mb: 3,
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                minWidth: 120,
                textTransform: "none",
                fontWeight: 500,
                color: theme.colors.textSecondary,
                "&.Mui-selected": {
                  color: theme.colors.primary,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.colors.primary,
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab label={`جميع التقييمات (${reviews.length})`} wrapped />
            <Tab
              label={
                <Box display="flex" alignItems="center">
                  <span style={{paddingLeft:12}}>بانتظار الرد</span>
                  <Badge
                    badgeContent={stats?.pendingReplies}
                    color="error"
                  />
                </Box>
              }
              wrapped
            />
            <Tab label="تم الرد عليها" wrapped />
          </Tabs>

          {/* Reviews List */}
          <AnimatePresence mode="wait">
            {filteredReviews.length > 0 ? (
              <div>
                {filteredReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ReviewCard>
                      <CardContent>
                        <Box display="flex" alignItems="flex-start">
                          <Avatar
                            src={review.userAvatar}
                            alt={review.userName}
                            sx={{ width: 50, height: 50, mr: 2 }}
                          />
                          <Box flexGrow={1}>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="flex-start"
                            >
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  {review.userName}
                                </Typography>
                                <Box display="flex" alignItems="center">
                                  <MemoizedRating
                                    value={review.rating}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                  />
                                  <RatingChip
                                    label={review.rating.toFixed(1)}
                                    size="small"
                                    $rating={review.rating}
                                    sx={{ ml: 1 }}
                                  />
                                </Box>
                              </Box>
                              <Typography
                                variant="body2"
                                color={theme.colors.textSecondary}
                                display="flex"
                                alignItems="center"
                              >
                                <CalendarIcon
                                  fontSize="small"
                                  sx={{ mr: 0.5 }}
                                />
                                {formatDate(review.date)}
                              </Typography>
                            </Box>

                            <Typography variant="body1" sx={{ mt: 1, mb: 2 ,color: darkMode ? "#fff" : "inherit"}}>
                              {review.comment}
                            </Typography>

                            {/* Review Images */}
                            {review.images && review.images.length > 0 && (
                              <Box
                                display="flex"
                                gap={1}
                                mb={2}
                                sx={{ overflowX: "auto", pb: 1 }}
                              >
                                {review.images.map((img, index) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      width: 80,
                                      height: 80,
                                      borderRadius: 2,
                                      overflow: "hidden",
                                      position: "relative",
                                    }}
                                  >
                                    <Image
                                      src={img}
                                      alt={`Review image ${index + 1}`}
                                      fill
                                      style={{ objectFit: "cover" }}
                                    />
                                  </Box>
                                ))}
                              </Box>
                            )}

                            {/* Action Buttons */}
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Box>
                                <ActionButton
                                  startIcon={<ThumbUpIcon sx={{ml:1}} />}
                                  size="small"
                                  sx={{ mr: 1 }}
                                >
                                  {review.likes} إعجاب
                                </ActionButton>

                                {!review.hasReply && (
                                  <ActionButton
                                    startIcon={<ReplyIcon />}
                                    size="small"
                                    onClick={() => setReplyingTo(review.id)}
                                    $active={replyingTo === review.id}
                                  >
                                    رد
                                  </ActionButton>
                                )}
                              </Box>

                              <MemoizedChip
                                label={review.category}
                                size="small"
                                sx={{
                                  borderRadius: 4,
                                  backgroundColor: darkMode
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(0,0,0,0.05)",
                                }}
                              />
                            </Box>

                            {/* Reply Section - Fixed to check for reply object existence */}
                            {review.hasReply && review.reply && (
                              <ReplyContainer $darkMode={darkMode}>
                                <Box display="flex" alignItems="flex-start">
                                  <Avatar
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      ml: 1.5,
                                      bgcolor: theme.colors.primary,
                                    }}
                                  >
                                    <Typography variant="subtitle2">
                                      أنت
                                    </Typography>
                                  </Avatar>
                                  <Box>
                                    <Box display="flex" alignItems="center">
                                      <Typography
                                        variant="subtitle2"
                                        fontWeight="bold"
                                      >
                                        ردك
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color={theme.colors.textSecondary}
                                        sx={{ mr: 1 }}
                                      >
                                        {formatDate(review.reply.date)}
                                      </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{color: darkMode ? "#fff" : "inherit"}}>
                                      {review.reply.text}
                                    </Typography>
                                  </Box>
                                </Box>
                              </ReplyContainer>
                            )}

                            {/* Reply Input */}
                            {replyingTo === review.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <Box mt={2}>
                                  <TextField
                                    multiline
                                    rows={3}
                                    placeholder="اكتب ردك هنا..."
                                    fullWidth
                                    value={replyText}
                                    onChange={(e) =>
                                      setReplyText(e.target.value)
                                    }
                                    inputProps={{
                                      sx: {
                    borderRadius: 4,
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.03)",
                    color: darkMode ? "#fff" : "inherit",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "rgba(255, 255, 255, 0.5)" : "inherit",
                    },
                    },
                                    }}
                                    
                                  />
                                  <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    mt={1}
                                  >
                                    <Button
                                      variant="text"
                                      onClick={() => setReplyingTo(null)}
                                      sx={{
                                        mr: 1,
                                        color: theme.colors.textSecondary,
                                      }}
                                    >
                                      إلغاء
                                    </Button>
                                    <Button
                                      variant="contained"
                                      disableElevation
                                      onClick={() =>
                                        handleReplySubmit(review.id)
                                      }
                                      sx={{
                                        borderRadius: 2,
                                        bgcolor: theme.colors.primary,
                                        "&:hover": {
                                          bgcolor: darkMode
                                            ? "#d8935a"
                                            : "#3b5998",
                                        },
                                      }}
                                    >
                                      إرسال الرد
                                    </Button>
                                  </Box>
                                </Box>
                              </motion.div>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </ReviewCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyStateContainer>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      backgroundColor: `${theme.colors.primary}1A`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <StarBorderIcon
                      sx={{ fontSize: 60, color: theme.colors.primary }}
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    لا توجد تقييمات مطابقة
                  </Typography>
                  <Typography
                    color={theme.colors.textSecondary}
                    textAlign="center"
                    maxWidth={400}
                  >
                    حاول تغيير معايير البحث أو الترشيح للعثور على تقييمات أخرى
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedRating(0);
                      setSelectedCategory("");
                      setCurrentTab(0);
                    }}
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      color: theme.colors.primary,
                      borderColor: theme.colors.primary,
                    }}
                  >
                    إعادة ضبط الفلاتر
                  </Button>
                </EmptyStateContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </PageContainer>
    </StyledThemeProvider>
  );
};

export default React.memo(Review);
