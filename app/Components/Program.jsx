"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Rating, CircularProgress, Alert, Chip, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PlaceIcon from "@mui/icons-material/Place";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CategoryIcon from "@mui/icons-material/Category";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook
import {
  Container,
  CategoriesContainer,
  CategoryItem,
  PlacesContainer,
  PlaceList,
  ProgramSelect,
  Wrapper,
  ProgramCard,
  CardImage,
  Descriptions,
  CardTitle,
  CardText,
  PlayButton,
  MyMenuItem,
  LoadingOverlay,
  EmptyState,
  TruncatedText,
  SaveSuccessCard,
} from "../styledComponent/Program/StyledProgram";
import {
  BackButton,
  ShareButton,
} from "../styledComponent/TripType/StyledTripType";

const defaultCategories = [{ selectedType: "" }];

const Program = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [savedProgram, setSavedProgram] = useState([]);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [showUnsaveCard, setShowUnsaveCard] = useState(false);
  const [parsedTrip, setParsedTrip] = useState(null);
  const containerRef = useRef(null);
  const { darkMode, theme } = useTheme(); // Use the theme context

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://iti-server-production.up.railway.app/api/places",
          {
            timeout: 10000, // Add timeout for better error handling
          }
        );
        setPlaces(response.data);

        // Get previously saved items
        const storedData = JSON.parse(localStorage.getItem("formData")) || {};
        if (storedData.savedProgram) {
          setSavedItems(storedData.savedProgram.map((item) => item.name));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.code === "ECONNABORTED") {
          setError(
            "انتهت مهلة الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."
          );
        } else if (error.response) {
          setError(
            `فشل في تحميل البيانات. خطأ في الخادم: ${error.response.status}`
          );
        } else {
          setError(
            "فشل في تحميل البيانات. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const userOption = useMemo(() => {
    if (places.length > 0) {
      const storedData = JSON.parse(localStorage.getItem("formData")) || {};
      const filteredByPlaces = places.filter(
        (place) => place.city === storedData.destination
      );

      return filteredByPlaces.filter((place) =>
        place.cate.includes(storedData.selectedTitle)
      );
    }
    return [];
  }, [places]);

  const uniqueTypes = useMemo(
    () => [...new Set(userOption.map((option) => option.type))],
    [userOption]
  );

  const handleTypeChange = useCallback((index, newType) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, selectedType: newType } : cat
      )
    );

    // Scroll to top of container when filter changes
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const handleSave = useCallback((place) => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || {};
    if (!storedData.savedProgram) {
      storedData.savedProgram = [];
    }
    const exists = storedData.savedProgram.some(
      (item) => item.name === place.name
    );
    if (!exists) {
      storedData.savedProgram.push({
        name: place.name,
        image: place.image,
      });
      localStorage.setItem("formData", JSON.stringify(storedData));
      setSavedProgram(storedData.savedProgram);
      setSavedItems((prev) => [...prev, place.name]);
    }
    setShowSuccessCard(true);
    setTimeout(() => {
      setShowSuccessCard(false);
    }, 2000);
  }, []);

  const handleUnsave = useCallback((place) => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || {};
    if (storedData.savedProgram) {
      storedData.savedProgram = storedData.savedProgram.filter(
        (item) => item.name !== place.name
      );
      localStorage.setItem("formData", JSON.stringify(storedData));
      setSavedProgram(storedData.savedProgram);
      setSavedItems((prev) => prev.filter((name) => name !== place.name));
    }

    // Show unsave notification
    setShowUnsaveCard(true);
    setTimeout(() => {
      setShowUnsaveCard(false);
    }, 2000);
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Enhance the loading screen with better animations and dark mode support
  if (isLoading) {
    return (
      <LoadingOverlay
        style={{
          background: darkMode
            ? `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%)`
            : "linear-gradient(135deg, #f5faff 0%, #ffffff 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="loading-content"
        >
          <CircularProgress
            size={70}
            thickness={4}
            style={{ color: theme.colors.primary }}
            aria-label="جاري التحميل"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ marginTop: "20px" }}
          >
            <h3
              style={{
                color: theme.colors.text,
                fontSize: "1.8rem",
                textAlign: "center",
              }}
            >
              جاري تحميل الأماكن
            </h3>
            <p
              style={{
                color: theme.colors.textSecondary,
                fontSize: "1.2rem",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              نقوم بإعداد قائمة بأفضل الأماكن المناسبة لرحلتك
            </p>
          </motion.div>

          <div className="loading-animation">
            <motion.div
              className="loading-plane"
              animate={{
                y: [0, -15, 0],
                x: [0, 15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: "url('/plane-icon.svg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: darkMode ? "brightness(0.8) invert(1)" : "none",
              }}
            />
            <motion.div
              className="cloud cloud1"
              animate={{ x: [0, 20, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: "url('/cloud-icon.svg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: darkMode ? "brightness(0.8) invert(0.8)" : "none",
              }}
            />
            <motion.div
              className="cloud cloud2"
              animate={{ x: [0, -15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{
                backgroundImage: "url('/cloud-icon.svg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: darkMode ? "brightness(0.8) invert(0.8)" : "none",
              }}
            />
          </div>
        </motion.div>
      </LoadingOverlay>
    );
  }

  if (error) {
    return (
      <Container
        style={{
          background: darkMode
            ? theme.colors.background
            : "linear-gradient(to bottom, #f0f8ff, #f5faff 15%, #f9fcff 40%, #ffffff)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert
            severity="error"
            sx={{
              fontSize: "1.2rem",
              margin: "2rem",
              borderRadius: "12px",
              boxShadow: darkMode
                ? "0 4px 12px rgba(0,0,0,0.2)"
                : "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: darkMode ? "rgba(211, 47, 47, 0.15)" : undefined,
              color: darkMode ? "#ff8a80" : undefined,
              "& .MuiAlert-icon": {
                color: darkMode ? "#ff8a80" : undefined,
              },
            }}
            icon={
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                ⚠️
              </motion.div>
            }
          >
            {error}
          </Alert>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <BackButton
              onClick={() => router.push("/create?showTripType=true")}
              style={{
                backgroundColor: darkMode ? theme.colors.surface : undefined,
                color: darkMode ? theme.colors.text : undefined,
                borderColor: darkMode ? theme.colors.border : undefined,
              }}
            >
              عودة للخلف
            </BackButton>
          </div>
        </motion.div>
      </Container>
    );
  }

  const getTripTypeInfo = () => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || {};
    return {
      type: storedData.selectedTitle || "-",
      destination: storedData.destination || "-",
      people: storedData.people || "-",
      amount: storedData.amount || "-",
    };
  };

  const tripInfo = getTripTypeInfo();

  return (
    <>
      <Container
        style={{
          background: darkMode
            ? theme.colors.background
            : "linear-gradient(to bottom, #f0f8ff, #f5faff 15%, #f9fcff 40%, #ffffff)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: darkMode
              ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`
              : "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "20px",
            color: darkMode ? "#000000" : "white",
            boxShadow: darkMode
              ? "0 4px 20px rgba(0,0,0,0.3)"
              : "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <h1 style={{ fontSize: "1.8rem", margin: 0 }}>
              إختر الأماكن المناسبة لرحلتك
            </h1>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Chip
                icon={
                  <PlaceIcon style={{ color: darkMode ? "#ff8a80" : "red" }} />
                }
                label={` الوجهة :  ${tripInfo.destination}`}
                style={{
                  background: darkMode
                    ? "rgba(0,0,0,0.3)"
                    : "rgba(255,255,255,0.2)",
                  color: darkMode ? "#ffffff" : "white",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px 10px",
                  fontSize: "1rem",
                }}
              />
              <Chip
                icon={<CategoryIcon style={{ color: "#FFFFFF" }} />}
                label={` نوع الرحلة : ${tripInfo.type}`}
                style={{
                  background: darkMode
                    ? "rgba(0,0,0,0.3)"
                    : "rgba(255,255,255,0.2)",
                  color: darkMode ? "#ffffff" : "white",
                  fontWeight: "bold",
                  justifyContent: "center",
                  padding: "10px 10px",
                  fontSize: "1rem",
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              background: darkMode ? theme.colors.surface : "#fff",
              padding: "15px 20px",
              borderRadius: "15px",
              boxShadow: darkMode
                ? "0 2px 10px rgba(0,0,0,0.2)"
                : "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <FilterAltIcon
              style={{
                color: theme.colors.primary,
                fontSize: "28px",
                marginLeft: "10px",
              }}
            />
            <h3
              style={{
                margin: 0,
                fontSize: "1.4rem",
                color: theme.colors.primary,
              }}
            >
              تصفية الأماكن حسب النوع
            </h3>

            {categories.some((cat) => cat.selectedType) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategories(defaultCategories)}
                style={{
                  marginRight: "auto",
                  background: "transparent",
                  border: "none",
                  color: theme.colors.primary,
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                إعادة ضبط التصفية
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
              </motion.button>
            )}
          </div>

          <CategoriesContainer
            style={{
              background: darkMode ? theme.colors.surface : "#ffffff",
              boxShadow: darkMode
                ? "0 5px 15px rgba(0,0,0,0.2)"
                : "0 5px 15px rgba(0,0,0,0.05)",
              borderColor: darkMode
                ? theme.colors.border
                : "rgba(0, 0, 0, 0.04)",
            }}
          >
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                style={{
                  background: darkMode ? theme.colors.background : "#f9fafc",
                  boxShadow: darkMode
                    ? "0 2px 8px rgba(0,0,0,0.15)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <ProgramSelect
                  value={category.selectedType}
                  onChange={(e) => handleTypeChange(index, e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        borderRadius: "15px",
                        boxShadow: darkMode
                          ? "0 5px 20px rgba(0,0,0,0.3)"
                          : "0 5px 20px rgba(0,0,0,0.15)",
                        backgroundColor: darkMode
                          ? theme.colors.surface
                          : undefined,
                        color: darkMode ? theme.colors.text : undefined,
                        "&::-webkit-scrollbar": { width: "8px" },
                        "&::-webkit-scrollbar-track": {
                          background: darkMode ? "#1e1e1e" : "#f1f1f1",
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: theme.colors.primary,
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: darkMode
                            ? theme.colors.accent
                            : "var(--secondary-color)",
                        },
                      },
                    },
                  }}
                  displayEmpty
                  sx={{
                    color: darkMode ? theme.colors.text : undefined,
                    "& .MuiSelect-icon": {
                      color: darkMode ? theme.colors.primary : undefined,
                    },
                  }}
                >
                  <MyMenuItem
                    value=""
                    sx={{
                      backgroundColor: darkMode
                        ? theme.colors.surface
                        : undefined,
                      color: darkMode ? theme.colors.text : undefined,
                      borderBottom: darkMode
                        ? `1px solid ${theme.colors.border}`
                        : undefined,
                      "&:hover": {
                        backgroundColor: darkMode
                          ? `${theme.colors.primary}20`
                          : undefined,
                      },
                      "&.Mui-selected": {
                        backgroundColor: darkMode
                          ? `${theme.colors.primary}30`
                          : undefined,
                      },
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        justifyContent: "flex-start", // Add this to push content to the right
                        direction: "rtl", // Add RTL direction for Arabic text
                        width: "100%", // Ensure the div takes full width
                      }}
                    >
                      <DoneAllIcon /> جميع الأماكن
                    </motion.div>
                  </MyMenuItem>
                  {uniqueTypes.map((type) => (
                    <MyMenuItem
                      key={type}
                      value={type}
                      sx={{
                        backgroundColor: darkMode
                          ? theme.colors.surface
                          : undefined,
                        color: darkMode ? theme.colors.text : undefined,
                        borderBottom: darkMode
                          ? `1px solid ${theme.colors.border}`
                          : undefined,
                        "&:hover": {
                          backgroundColor: darkMode
                            ? `${theme.colors.primary}20`
                            : undefined,
                        },
                        "&.Mui-selected": {
                          backgroundColor: darkMode
                            ? `${theme.colors.primary}30`
                            : undefined,
                        },
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          justifyContent: "flex-start", // Add this to push content to the right
                          direction: "rtl", // Add RTL direction for Arabic text
                          width: "100%", // Ensure the div takes full width
                        }}
                      >
                        {type}
                      </motion.div>
                    </MyMenuItem>
                  ))}
                </ProgramSelect>
              </CategoryItem>
            ))}
          </CategoriesContainer>
        </motion.div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",
            background: darkMode ? theme.colors.surface : "#fff",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: darkMode
              ? "0 2px 8px rgba(0,0,0,0.15)"
              : "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Chip
              icon={<BookmarkIcon />}
              label={`تم اختيار ${savedItems.length} أماكن`}
              variant="outlined"
              sx={{
                padding: "5px 10px",
                fontWeight: "bold",
                color: darkMode ? theme.colors.text : undefined,
                borderColor: darkMode ? theme.colors.primary : undefined,
                "& .MuiChip-icon": {
                  color: darkMode ? theme.colors.primary : undefined,
                },
              }}
            />
          </div>

          {savedItems.length > 0 && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/create/final" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: darkMode
                      ? theme.colors.primary
                      : "var(--success-color)",
                    color: darkMode ? "#000000" : "white",
                    padding: "8px 15px",
                    borderRadius: "25px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: darkMode
                      ? `0 3px 10px ${theme.colors.primary}60`
                      : "0 3px 10px rgba(76, 175, 80, 0.3)",
                  }}
                >
                  <DoneAllIcon /> متابعة للخطوة التالية
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {userOption.length === 0 ? (
          <EmptyState
            style={{
              background: darkMode ? theme.colors.surface : "#fff",
              boxShadow: darkMode
                ? "0 5px 20px rgba(0,0,0,0.2)"
                : "0 5px 20px rgba(0,0,0,0.05)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="empty-illustration">
                <img
                  src="/empty-state.svg"
                  alt="لم يتم العثور على أماكن"
                  style={{
                    width: "220px",
                    height: "auto",
                    filter: darkMode ? "brightness(0.8) invert(0.8)" : "none",
                  }}
                />
              </div>
              <h3 style={{ color: theme.colors.primary }}>
                لم يتم العثور على أماكن متاحة
              </h3>
              <p style={{ color: theme.colors.textSecondary }}>
                لم نتمكن من العثور على أماكن تناسب معايير بحثك الحالية
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BackButton
                    onClick={() => router.push("/create?showTripType=true")}
                    style={{
                      backgroundColor: darkMode
                        ? theme.colors.surface
                        : undefined,
                      color: darkMode ? theme.colors.text : undefined,
                      borderColor: darkMode ? theme.colors.border : undefined,
                    }}
                  >
                    تغيير معايير البحث
                  </BackButton>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => window.location.reload()}
                    style={{
                      background: darkMode ? theme.colors.surface : "#f5f7fa",
                      color: theme.colors.primary,
                      border: `2px solid ${theme.colors.primary}`,
                      borderRadius: "8px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    إعادة المحاولة
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </EmptyState>
        ) : (
          <PlacesContainer
            ref={containerRef}
            style={{
              scrollbarColor: darkMode
                ? `${theme.colors.primary}80 transparent`
                : "rgba(75, 114, 173, 0.5) transparent",
            }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ width: "100%" }}
              >
                <PlaceList>
                  {userOption
                    .filter((option) =>
                      category.selectedType
                        ? option.type === category.selectedType
                        : true
                    )
                    .map((option) => (
                      <motion.div
                        key={option._id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                      >
                        <Tooltip
                          title={
                            savedItems.includes(option.name)
                              ? "تم حفظ هذا المكان بالفعل"
                              : "انقر لحفظ هذا المكان"
                          }
                          arrow
                          placement="top"
                        >
                          <Wrapper>
                            <ProgramCard
                              style={{
                                background: darkMode
                                  ? theme.colors.card
                                  : "#fff",
                                boxShadow: darkMode
                                  ? "0 10px 20px rgba(0,0,0,0.25)"
                                  : "0 10px 20px rgba(0,0,0,0.1)",
                              }}
                            >
                              <CardImage
                                src={option.image}
                                alt={option.name}
                                loading="lazy"
                                style={{
                                  filter: darkMode
                                    ? "brightness(0.85)"
                                    : "none",
                                }}
                              />
                              {savedItems.includes(option.name) && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    background: darkMode
                                      ? "rgba(76, 175, 80, 0.7)"
                                      : "rgba(76, 175, 80, 0.9)",
                                    borderRadius: "50%",
                                    padding: "5px",
                                    zIndex: 5,
                                    boxShadow: darkMode
                                      ? "0 2px 8px rgba(0,0,0,0.4)"
                                      : "0 2px 8px rgba(0,0,0,0.2)",
                                    width: "35px",
                                    height: "35px",
                                    cursor: "pointer",
                                  }}
                                  whileHover={{
                                    scale: 1.1,
                                    background: "rgba(211, 47, 47, 0.9)",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUnsave(option);
                                  }}
                                >
                                  <Tooltip
                                    title="انقر لإلغاء الحفظ"
                                    arrow
                                    placement="top"
                                  >
                                    <div
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <CheckCircleIcon
                                        style={{
                                          color: "white",
                                          fontSize: "24px",
                                        }}
                                      />
                                    </div>
                                  </Tooltip>
                                </motion.div>
                              )}
                              <Descriptions>
                                <CardTitle
                                  style={{ color: theme.colors.primary }}
                                >
                                  {option.name}
                                </CardTitle>
                                <CardText
                                  style={{ color: theme.colors.textSecondary }}
                                >
                                  <TruncatedText lines={3}>
                                    {option.description}
                                  </TruncatedText>
                                  <div
                                    className="details"
                                    style={{
                                      margin: "15px 0",
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "8px",
                                      textAlign: "right",
                                      direction: "rtl",
                                    }}
                                  >
                                    <div
                                      className="price"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                      }}
                                    >
                                      <PriceChangeIcon
                                        style={{
                                          color: theme.colors.primary,
                                          fontSize: "20px",
                                        }}
                                      />
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          color: darkMode
                                            ? theme.colors.text
                                            : undefined,
                                        }}
                                      >
                                        السعر:
                                      </span>{" "}
                                      <span
                                        style={{
                                          color: theme.colors.textSecondary,
                                        }}
                                      >
                                        {option.price}
                                      </span>
                                    </div>
                                    <div
                                      className="location"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                      }}
                                    >
                                      <PlaceIcon
                                        style={{
                                          color: theme.colors.primary,
                                          fontSize: "20px",
                                        }}
                                      />
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          color: darkMode
                                            ? theme.colors.text
                                            : undefined,
                                        }}
                                      >
                                        الموقع:
                                      </span>{" "}
                                      <span
                                        style={{
                                          color: theme.colors.textSecondary,
                                        }}
                                      >
                                        {option.location}
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <Rating
                                        name={`rating-${option._id}`}
                                        value={Number(option.rate)}
                                        precision={0.5}
                                        max={5}
                                        readOnly
                                        sx={{
                                          direction: "ltr",
                                          "& .MuiRating-icon": {
                                            color: darkMode
                                              ? theme.colors.primary
                                              : "#ff3838",
                                          },
                                          "& .MuiRating-iconFilled": {
                                            color: darkMode
                                              ? theme.colors.primary
                                              : "#ff3838",
                                          },
                                          "& .MuiRating-iconHover": {
                                            color: darkMode
                                              ? theme.colors.accent
                                              : "#ff4d4d",
                                          },
                                          "& .MuiRating-iconEmpty": {
                                            color: darkMode
                                              ? `${theme.colors.primary}50`
                                              : "#fae0e0",
                                          },
                                          gap: "2px",
                                        }}
                                        icon={<StarIcon fontSize="inherit" />}
                                        emptyIcon={
                                          <StarIcon fontSize="inherit" />
                                        }
                                      />
                                    </div>
                                  </div>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <PlayButton
                                      onClick={() =>
                                        savedItems.includes(option.name)
                                          ? handleUnsave(option)
                                          : handleSave(option)
                                      }
                                      style={{
                                        background: savedItems.includes(
                                          option.name
                                        )
                                          ? darkMode
                                            ? "linear-gradient(135deg, #3d8b40, #4CAF50)"
                                            : "linear-gradient(135deg, #4CAF50, #66BB6A)"
                                          : darkMode
                                          ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`
                                          : "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                                        boxShadow: savedItems.includes(
                                          option.name
                                        )
                                          ? darkMode
                                            ? "0 4px 12px rgba(76, 175, 80, 0.4)"
                                            : "0 4px 12px rgba(76, 175, 80, 0.3)"
                                          : darkMode
                                          ? `0 4px 12px ${theme.colors.primary}60`
                                          : "0 4px 12px rgba(75, 114, 173, 0.3)",
                                        cursor: "pointer",
                                        color:
                                          darkMode &&
                                          savedItems.includes(option.name)
                                            ? "#000000"
                                            : "white",
                                      }}
                                      aria-label={
                                        savedItems.includes(option.name)
                                          ? "إلغاء حفظ المكان"
                                          : "حفظ المكان"
                                      }
                                    >
                                      {savedItems.includes(option.name) ? (
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            gap: "8px",
                                            direction: "rtl",
                                          }}
                                        >
                                          <span
                                            style={{
                                              display: "inline-block",
                                            }}
                                          >
                                            انقر للإلغاء
                                          </span>
                                          <motion.div
                                            whileHover={{ rotate: 90 }}
                                            transition={{ duration: 0.3 }}
                                          >
                                            <CheckCircleIcon />
                                          </motion.div>
                                        </div>
                                      ) : (
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            gap: "8px",
                                            direction: "rtl",
                                          }}
                                        >
                                          <span
                                            style={{
                                              display: "inline-block",
                                              marginRight: "4px",
                                            }}
                                          >
                                            حفظ
                                          </span>
                                          <BookmarkIcon />
                                        </div>
                                      )}
                                    </PlayButton>
                                  </motion.div>
                                </CardText>
                              </Descriptions>
                            </ProgramCard>
                          </Wrapper>
                        </Tooltip>
                      </motion.div>
                    ))}
                </PlaceList>
              </motion.div>
            ))}
          </PlacesContainer>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            gap: "15px",
            flexDirection: "row-reverse",
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/create/final" style={{ textDecoration: "none" }}>
              <ShareButton
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  justifyContent: "center",
                  background: darkMode ? theme.colors.primary : undefined,
                  color: darkMode ? "#000000" : undefined,
                }}
              >
                <DoneAllIcon />
                إنهاء
              </ShareButton>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <BackButton
              onClick={() => router.push("/create?showTripType=true")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center",
                backgroundColor: darkMode ? theme.colors.surface : undefined,
                color: darkMode ? theme.colors.text : undefined,
                borderColor: darkMode ? theme.colors.border : undefined,
              }}
            >
              <ArrowBackIcon />
              رجوع
            </BackButton>
          </motion.div>
        </motion.div>

        {/* Enhanced SaveSuccessCard with better animation */}
        <AnimatePresence>
          {showSuccessCard && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <SaveSuccessCard
                style={{
                  background: darkMode ? theme.colors.surface : "white",
                  color: darkMode ? "#4CAF50" : "var(--success-color)",
                  borderRight: "4px solid #4CAF50",
                  boxShadow: darkMode
                    ? "0 5px 20px rgba(0,0,0,0.3)"
                    : "0 5px 20px rgba(0,0,0,0.15)",
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircleIcon
                    style={{
                      color: "#4CAF50",
                      fontSize: "28px",
                      marginTop: "10px",
                    }}
                  />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  تم الحفظ بنجاح
                </motion.span>
              </SaveSuccessCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unsave notification */}
        <AnimatePresence>
          {showUnsaveCard && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <SaveSuccessCard
                style={{
                  background: darkMode ? theme.colors.surface : "white",
                  borderRight: "4px solid #f44336",
                  color: "#f44336",
                  boxShadow: darkMode
                    ? "0 5px 20px rgba(0,0,0,0.3)"
                    : "0 5px 20px rgba(0,0,0,0.15)",
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    style={{ marginTop: "10px" }}
                  >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                  </svg>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  تم إلغاء الحفظ
                </motion.span>
              </SaveSuccessCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI suggestions section */}
        {parsedTrip && parsedTrip.tips && parsedTrip.tips.length > 0 && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              borderRadius: "16px",
              bgcolor: darkMode
                ? "rgba(246, 177, 122, 0.1)"
                : "rgba(74, 114, 172, 0.05)",
              border: "1px dashed",
              borderColor: darkMode
                ? theme.colors.primary + "40"
                : theme.colors.primary + "30",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.colors.primary,
                mb: 2,
                gap: 1,
              }}
            >
              <LightbulbIcon /> نصائح الرحلة
            </Typography>
            <List>
              {parsedTrip.tips.map((tip, index) => (
                <ListItem key={index}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: theme.colors.primary }} />
                  </ListItemIcon>
                  <ListItemText primary={tip} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Program;
