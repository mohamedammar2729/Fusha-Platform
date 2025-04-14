"use client"
import React, {useMemo} from "react";
import {  Typography, Container, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import { motion } from "framer-motion";

// Import Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import googlePlayIcon from "../../../public/logo.svg";
import AppleIcon from "@mui/icons-material/Apple";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";



import img1 from "../../../public/1.jpg";
import img2 from "../../../public/2.jpg";
import img3 from "../../../public/3.jpg";

const images = [
  "https://images.unsplash.com/photo-1652258943679-1516be59461f?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1644517270263-4112379d97ca?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const MobileSection = ({ theme, darkMode }) => {

  const renderImages = useMemo(
    () =>
      images.map((src, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt={`Slide ${index}`}
            priority={index === 0}
            width={600}
            height={600}
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
            }}
          />
        </Box>
      )),
    []
  );

  return (
    <>
      <Box
        sx={{
          py: { xs: 10, md: 12 },
          px: { xs: 2, md: 4 },
          background: darkMode
            ? `linear-gradient(135deg, ${theme.colors.card} 0%, ${theme.colors.background} 100%)`
            : `linear-gradient(135deg, #F0F4FF 0%, #FFFFFF 100%)`,
          position: "relative",
          overflow: "hidden",
          borderRadius: "30px",
          mb: 8,
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background decorative elements */}
        <Box
          component={motion.div}
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          sx={{
            position: "absolute",
            top: "15%",
            right: "5%",
            width: { xs: "150px", md: "250px" },
            height: { xs: "150px", md: "250px" },
            borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
            background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.primary}05)`,
            zIndex: 0,
          }}
        />

        <Box
          component={motion.div}
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: { xs: "120px", md: "200px" },
            height: { xs: "120px", md: "200px" },
            borderRadius: "63% 37% 30% 70% / 50% 45% 55% 50%",
            background: `linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.primary}02)`,
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "500px", md: "600px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "30px",
                  }}
                >
                  {/* Phone mockup */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: { xs: "250px", md: "300px" },
                      height: { xs: "500px", md: "610px" },
                      borderRadius: "40px",
                      background: "#111",
                      boxShadow: "0 50px 100px rgba(0,0,0,0.25)",
                      overflow: "hidden",
                      border: "10px solid #111",
                      zIndex: 1,
                    }}
                  >
                    {/* Phone notch */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "120px",
                        height: "25px",
                        background: "#111",
                        borderBottomLeftRadius: "14px",
                        borderBottomRightRadius: "14px",
                        zIndex: 10,
                      }}
                    />

                    {/* App screenshot */}
                    <Box
                      component={motion.div}
                      initial={{ y: 590 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "30px",
                        background: darkMode
                          ? theme.colors.background
                          : "#f5f7fa",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {/* App UI mockup */}
                      <Box
                        sx={{
                          padding: "35px 5px 60px",
                          height: "100%",
                          overflowY: "scroll",
                          msOverflowStyle: "none", // IE and Edge
                          scrollbarWidth: "none", // Firefox
                          "&::-webkit-scrollbar": {
                            // Chrome, Safari, Opera
                            display: "none",
                          },
                        }}
                      >
                        {/* App header */}
                        <Box sx={{ textAlign: "right", mb: 2 }}>
                          <Typography
                            sx={{
                              fontSize: "1.4rem",
                              fontWeight: "bold",
                              color: theme.colors.text,
                            }}
                          >
                            مرحبا بك في فسحة 👋
                          </Typography>
                        </Box>

                        {/* Search box */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "12px 15px",
                            borderRadius: "15px",
                            background: darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.05)",
                            mb: 2.5,
                          }}
                        >
                          <SearchIcon
                            sx={{ color: darkMode ? "#bbb" : "#777" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              color: darkMode ? "#bbb" : "#777",
                              flex: 1,
                              textAlign: "right",
                              mr: 1,
                            }}
                          >
                            ابحث عن وجهتك...
                          </Typography>
                        </Box>

                        {/* Destination section */}
                        <Box sx={{ mb: 2.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                color: theme.colors.primary,
                                fontWeight: 500,
                              }}
                            >
                              عرض الكل
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: theme.colors.text,
                              }}
                            >
                              وجهات مميزة
                            </Typography>
                          </Box>

                          {/* Scrollable destinations */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1.5,
                              overflowX: "auto",
                              pb: 1,
                              msOverflowStyle: "none",
                              scrollbarWidth: "none",
                              "&::-webkit-scrollbar": { display: "none" },
                            }}
                          >
                            {images.map((src, i) => (
                              <Box
                                key={i}
                                component={motion.div}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                sx={{
                                  width: "130px",
                                  flexShrink: 0,
                                  borderRadius: "18px",
                                  overflow: "hidden",
                                  position: "relative",
                                  height: "180px",
                                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                }}
                              >
                                <Image
                                  src={src}
                                  alt="Destination"
                                  fill
                                  sizes="130px"
                                  style={{ objectFit: "cover" }}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: "40px 15px 15px",
                                    background:
                                      "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                                    textAlign: "right",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: "#fff",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {["الأقصر", "الغردقة", "الإسكندرية"][i]}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                      gap: 0.5,
                                    }}
                                  >
                                    <Typography
                                      sx={{ fontSize: "0.7rem", color: "#fff" }}
                                    >
                                      {["4.9", "4.8", "4.7"][i]}
                                    </Typography>
                                    <StarIcon
                                      sx={{
                                        fontSize: "0.8rem",
                                        color: "#FFC107",
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Box>

                        {/* Trip section */}
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: "0.7rem",
                                color: theme.colors.primary,
                                fontWeight: "500",
                              }}
                            >
                              عرض الكل
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: darkMode ? "#fff" : "#000",
                              }}
                            >
                              رحلاتك القادمة
                            </Typography>
                          </Box>

                          <Box
                            component={motion.div}
                            whileInView={{ y: [20, 0], opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            sx={{
                              padding: "12px",
                              borderRadius: "16px",
                              background: darkMode
                                ? "rgba(246, 177, 122, 0.15)"
                                : "rgba(74, 114, 172, 0.1)",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "0.75rem",
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.7)",
                                }}
                              >
                                2 أيام متبقية
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  fontWeight: "bold",
                                  color: darkMode ? "#fff" : "#000",
                                }}
                              >
                                رحلة إلى الغردقة
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  sx={{
                                    fontSize: "0.7rem",
                                    color: darkMode
                                      ? "rgba(255,255,255,0.8)"
                                      : "rgba(0,0,0,0.8)",
                                  }}
                                >
                                  5 أماكن · 3 أيام
                                </Typography>
                              </Box>
                              <CalendarTodayIcon
                                sx={{
                                  fontSize: "1rem",
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.6)",
                                }}
                              />
                            </Box>
                          </Box>

                          <Box
                            component={motion.div}
                            whileInView={{ y: [20, 0], opacity: [0, 1] }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            sx={{
                              padding: "12px",
                              borderRadius: "16px",
                              background: darkMode
                                ? "rgba(66, 71, 105, 0.5)"
                                : "rgba(0,0,0,0.05)",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "0.75rem",
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.7)",
                                }}
                              >
                                بعد أسبوعين
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  fontWeight: "bold",
                                  color: darkMode ? "#fff" : "#000",
                                }}
                              >
                                رحلة إلى الأقصر
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  sx={{
                                    fontSize: "0.7rem",
                                    color: darkMode
                                      ? "rgba(255,255,255,0.8)"
                                      : "rgba(0,0,0,0.8)",
                                  }}
                                >
                                  8 أماكن · 5 أيام
                                </Typography>
                              </Box>
                              <CalendarTodayIcon
                                sx={{
                                  fontSize: "1rem",
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.6)",
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: "0.7rem",
                                color: theme.colors.primary,
                                fontWeight: "500",
                              }}
                            >
                              عرض الكل
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: darkMode ? "#fff" : "#000",
                              }}
                            >
                              اكتشف المطاعم
                            </Typography>
                          </Box>

                          <Box
                            component={motion.div}
                            whileInView={{ x: [-50, 0] }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            sx={{
                              display: "flex",
                              gap: 1.5,
                              overflowX: "auto",
                              pb: 1,
                              msOverflowStyle: "none",
                              scrollbarWidth: "none",
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
                            }}
                          >
                            {[1, 2, 3].map((i) => (
                              <Box
                                key={i}
                                sx={{
                                  width: "130px",
                                  flexShrink: 0,
                                  borderRadius: "16px",
                                  overflow: "hidden",
                                  background: darkMode
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(0,0,0,0.03)",
                                  padding: "8px",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: "90px",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    mb: 1,
                                    position: "relative",
                                  }}
                                >
                                  <Image
                                    src={[img1, img2, img3][i - 1]}
                                    alt="Restaurant"
                                    fill
                                    sizes="140px"
                                    style={{ objectFit: "cover" }}
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    textAlign: "right",
                                    mb: 0.5,
                                    color: darkMode ? "#fff" : "#000",
                                  }}
                                >
                                  {
                                    [
                                      "مطعم النيل",
                                      "كافيه البحر",
                                      "وادي الريحان",
                                    ][i - 1]
                                  }
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "0.7rem",
                                      color: darkMode
                                        ? "rgba(255,255,255,0.7)"
                                        : "rgba(0,0,0,0.7)",
                                    }}
                                  >
                                    $$
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: "0.65rem",
                                        color: darkMode
                                          ? "rgba(255,255,255,0.8)"
                                          : "rgba(0,0,0,0.8)",
                                      }}
                                    >
                                      {["4.8", "4.7", "4.9"][i - 1]}
                                    </Typography>
                                    <StarIcon
                                      sx={{
                                        fontSize: "0.7rem",
                                        color: "#FFC107",
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Box>

                        {/* Bottom navigation */}
                        <Box
                          sx={{
                            position: "absolute",
                            borderRadius: "25px",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "55px",
                            background: darkMode
                              ? "rgba(45, 50, 80, 0.95)"
                              : "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            borderTop: `1px solid ${
                              darkMode
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(0,0,0,0.05)"
                            }`,
                          }}
                        >
                          {[
                            { icon: <PersonIcon />, label: "حسابي" },
                            { icon: <FavoriteIcon />, label: "المفضلة" },
                            {
                              icon: <AddIcon sx={{ mt: 1.5 }} />,
                              label: "",
                              primary: true,
                            },
                            {
                              icon: <ExploreIcon />,
                              label: "استكشف",
                              active: true,
                            },
                            { icon: <HomeIcon />, label: "الرئيسية" },
                          ].map((item, i) => (
                            <Box
                              key={i}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: item.active
                                  ? theme.colors.primary
                                  : darkMode
                                  ? "rgba(255,255,255,0.5)"
                                  : "rgba(0,0,0,0.4)",
                                ...(item.primary && {
                                  width: "45px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  background: theme.colors.primary,
                                  color: darkMode ? "#000" : "#fff",
                                  transform: "translateY(-10px)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                }),
                              }}
                            >
                              <Box
                                sx={{
                                  fontSize: item.primary ? "1.3rem" : "1.1rem",
                                }}
                              >
                                {item.icon}
                              </Box>
                              {!item.primary && (
                                <Typography sx={{ fontSize: "0.65rem" }}>
                                  {item.label}
                                </Typography>
                              )}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* Decorative dots */}
                  <Box
                    component={motion.div}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    sx={{
                      position: "absolute",
                      top: "-10%",
                      left: 0,
                      width: "100px",
                      height: "100px",
                      opacity: 0.5,
                      zIndex: -1,
                    }}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <pattern
                        id="dots"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle
                          cx="5"
                          cy="5"
                          r="2"
                          fill={theme.colors.primary}
                        />
                      </pattern>
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#dots)"
                      />
                    </svg>
                  </Box>

                  {/* Decorative circle */}
                  <Box
                    component={motion.div}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    sx={{
                      position: "absolute",
                      bottom: "-5%",
                      right: "5%",
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: `2px solid ${theme.colors.primary}20`,
                      zIndex: -1,
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{ textAlign: "right", px: { xs: 2, md: 4 } }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    mb: 3,
                    color: theme.colors.primary,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  قم بتحميل تطبيق فسحة
                  <span
                    style={{
                      display: "block",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    لتجربة رحلة لا تُنسى
                  </span>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -10,
                      right: 0,
                      width: "60%",
                      height: 4,
                      borderRadius: 2,
                      background: theme.colors.primary,
                    }}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 400,
                    color: theme.colors.textSecondary,
                    mb: 4,
                    maxWidth: "600px",
                    lineHeight: 1.7,
                  }}
                >
                  تطبيق فسحة سهل الاستخدام يتيح لك التخطيط لرحلاتك والحجز بسهولة
                  من أي مكان. اكتشف أماكن جديدة ونظم جدول رحلاتك وتمتع بتجربة
                  سفر لا تنسى!
                </Typography>

                <Grid container spacing={3} sx={{ mb: 5 }}>
                  {[
                    {
                      icon: <TravelExploreIcon sx={{ fontSize: 30 }} />,
                      title: "اكتشاف وتخطيط",
                      desc: "استكشف الوجهات السياحية المميزة ونظم جدول رحلتك بسهولة",
                      color: "#FF725E",
                    },
                    {
                      icon: <LocationOnIcon sx={{ fontSize: 30 }} />,
                      title: "خرائط وإرشادات",
                      desc: "خرائط تفاعلية مع إرشادات تفصيلية للوصول إلى أي مكان",
                      color: "#4A72AC",
                    },
                    {
                      icon: <NotificationsIcon sx={{ fontSize: 30 }} />,
                      title: "إشعارات وتذكيرات",
                      desc: "تنبيهات مخصصة عن الرحلات والعروض والتجارب الجديدة",
                      color: "#FFC15E",
                    },
                    {
                      icon: <BookmarkIcon sx={{ fontSize: 30 }} />,
                      title: "حفظ التجارب",
                      desc: "احفظ الأماكن المفضلة والتجارب التي تنوي زيارتها مستقبلاً",
                      color: "#42B883",
                    },
                  ].map((feature, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box
                        component={motion.div}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * i }}
                        viewport={{ once: true }}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                          textAlign: "right",
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: "15px",
                            background: `${feature.color}15`,
                            color: feature.color,
                            mt: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "1.1rem",
                              fontWeight: "bold",
                              mb: 1,
                              color: theme.colors.text,
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.9rem",
                              color: theme.colors.textSecondary,
                              lineHeight: 1.5,
                            }}
                          >
                            {feature.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box
                  component={motion.div}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.15rem",
                        mb: 2.5,
                        color: theme.colors.text,
                      }}
                    >
                      حمل التطبيق الآن واستمتع بتجربة سفر فريدة!
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        component={motion.a}
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                          backgroundColor: "#000",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          padding: "12px 20px",
                          borderRadius: "15px",
                          textTransform: "none",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          "&:hover": {
                            backgroundColor: "#000",
                          },
                        }}
                      >
                        <AppleIcon sx={{ fontSize: 40 }} />
                        <Box sx={{ textAlign: "right" }}>
                          <Typography sx={{ fontSize: "0.7rem", opacity: 0.8 }}>
                            حمل التطبيق من
                          </Typography>
                          <Typography
                            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                          >
                            أبل ستور
                          </Typography>
                        </Box>
                      </Button>

                      <Button
                        component={motion.a}
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                          backgroundColor: "#4285F4",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          padding: "12px 20px",
                          borderRadius: "15px",
                          textTransform: "none",
                          boxShadow: "0 8px 25px rgba(66,133,244,0.25)",
                          "&:hover": {
                            backgroundColor: "#4285F4",
                          },
                        }}
                      >
                        <Image
                          src={googlePlayIcon}
                          alt="Google Play"
                          width={28}
                          height={28}
                          style={{ width: "auto", height: "auto" }}
                        />
                        <Box sx={{ textAlign: "left" }}>
                          <Typography sx={{ fontSize: "0.7rem", opacity: 0.8 }}>
                            حمل التطبيق من
                          </Typography>
                          <Typography
                            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                          >
                            جوجل بلاي
                          </Typography>
                        </Box>
                      </Button>
                    </Box>
                  </Box>
                  {/* User feedback tags */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 3,
                      mt: 4,
                      p: 3,
                      borderRadius: "20px",
                      background: darkMode
                        ? "rgba(66, 71, 105, 0.3)"
                        : "rgba(245, 247, 250, 0.7)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            color: theme.colors.text,
                          }}
                        >
                          تقييم المستخدمين
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.9rem",
                              fontWeight: "bold",
                              color: theme.colors.text,
                            }}
                          >
                            4.8/5
                          </Typography>
                          <Rating
                            value={4.8}
                            precision={0.1}
                            readOnly
                            size="small"
                          />
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: theme.colors.textSecondary,
                            }}
                          >
                            (2.8k+)
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: darkMode
                            ? "rgba(246, 177, 122, 0.2)"
                            : "rgba(74, 114, 172, 0.1)",
                          color: theme.colors.primary,
                        }}
                      >
                        <StarIcon sx={{ fontSize: 30 }} />
                      </Box>
                    </Box>

                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          mb: 1,
                          textAlign: "right",
                          color: theme.colors.text,
                        }}
                      >
                        ماذا يقول المستخدمون عن التطبيق؟
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "flex-end",
                        }}
                      >
                        {[
                          "سهل الاستخدام",
                          "تصميم رائع",
                          "عروض مميزة",
                          "توصيات دقيقة",
                          "دعم فني ممتاز",
                        ].map((tag, i) => (
                          <Chip
                            key={i}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: darkMode
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(74, 114, 172, 0.1)",
                              color: theme.colors.text,
                              fontWeight: "medium",
                              backdropFilter: "blur(5px)",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MobileSection;
