import React, { useMemo } from "react";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MainBox } from "../../styledComponent/home/styledHome";
// Import Icons

import FlightIcon from "@mui/icons-material/Flight";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

const Section1 = ({ theme, darkMode }) => {
const images = [
  "/1.jpg", // These should be in your public folder
  "/2.jpg",
  "/3.jpg",
];
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

  // If you still need swiperSettings for Slider component, define it here:
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  // Style overrides based on theme
  const mainBoxStyle = {
    backgroundColor: theme.colors.background,
  };

  return (
    <>
      <MainBox
        sx={{
          ...mainBoxStyle,
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: "auto", sm: "90vh" },
          marginTop: { xs: "60px", md: 0 },
          paddingBottom: { xs: 8, md: 0 },
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          {/* Main gradient background */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: darkMode
                ? `linear-gradient(135deg, rgba(45, 50, 80, 0.95) 0%, rgba(66, 71, 105, 0.85) 100%)`
                : `linear-gradient(135deg, rgba(245, 247, 250, 0.95) 0%, rgba(74, 114, 172, 0.2) 100%)`,
            }}
          />

          {/* Interactive pattern overlay */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='${
                darkMode
                  ? encodeURIComponent("#f6b17a")
                  : encodeURIComponent("#4a72ac")
              }' fill-opacity='0.03'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Floating travel elements - animated icons */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
            }}
          >
            {/* Plane Icon */}
            <Box
              component={motion.div}
              initial={{ x: -100, y: 50, opacity: 0 }}
              animate={{
                x: window.innerWidth + 100,
                y: 200,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: 2,
              }}
              sx={{
                position: "absolute",
                color: darkMode
                  ? "rgba(246, 177, 122, 0.2)"
                  : "rgba(74, 114, 172, 0.2)",
                fontSize: { xs: 40, md: 60 },
              }}
            >
              <FlightIcon sx={{ fontSize: "inherit" }} />
            </Box>
          </Box>
        </Box>

        {/* Hero content */}
        <Box
          sx={{
            width: "100%",
            zIndex: 10,
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: 4, md: 2 },
            py: { xs: 5, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Text content */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 45%" },
              textAlign: "right",
              mb: { xs: 2, md: 0 },
              order: { xs: 2, md: 1 }, // Move text below image on mobile
            }}
          >
            <Typography
              component={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                fontSize: {
                  xs: "1.75rem",
                  sm: "2.25rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                fontWeight: 800,
                color: theme.colors.primary,
                textShadow: darkMode ? "0 2px 10px rgba(0,0,0,0.3)" : "none",
                lineHeight: 1.2,
                mb: { xs: 2, md: 3 },
              }}
            >
              رحلة أحلامك
              <br />
              <Box
                component="span"
                sx={{
                  background: darkMode
                    ? "linear-gradient(90deg, #F6B17A, #FFD4AA)"
                    : "linear-gradient(90deg, #3B5898, #4a72ac)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: theme.colors.primary,
                }}
              >
                تبدأ من هنا
              </Box>
            </Typography>

            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              sx={{
                fontSize: {
                  xs: "0.95rem",
                  sm: "1.1rem",
                  md: "1.3rem",
                  lg: "1.5rem",
                },
                fontWeight: 400,
                color: theme.colors.text,
                mb: { xs: 3, md: 4 },
                maxWidth: "600px",
              }}
            >
              خطط رحلتك بسهولة واكتشف أفضل الأماكن الرائعة للاستمتاع بفسحة لا
              تُنسى
            </Typography>

            {/* Search box */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
                width: "100%",
                maxWidth: { xs: "100%", sm: "500px" },
                mb: { xs: 2, md: 3 },
                mt: { xs: 2, md: 4 },
                background: darkMode
                  ? "rgba(66, 71, 105, 0.3)"
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                borderRadius: { xs: "24px", sm: "50px" },
                p: { xs: 0.8, sm: 1 },
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: `1px solid ${
                  darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                }`,
              }}
            >
              <Select
                value={"القاهرة"}
                sx={{
                  borderRadius: { xs: "20px", sm: "50px" },
                  minWidth: { xs: "100%", sm: "180px" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  textAlign: "right",
                  pr: 2,
                  color: theme.colors.text,
                  height: { xs: "46px", sm: "auto" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "15px",
                      mt: 1,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                <MenuItem value={"القاهرة"}>القاهرة</MenuItem>
                <MenuItem value={"الإسكندرية"}>الإسكندرية</MenuItem>
                <MenuItem value={"أسوان"}> أسوان</MenuItem>
                <MenuItem value={"جنوب سيناء"}>جنوب سيناء</MenuItem>
                <MenuItem value={"مطروح "}>مطروح </MenuItem>
              </Select>

              <Button
                variant="contained"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  flex: { xs: "1 1 auto", sm: "0 0 auto" },
                  bgcolor: theme.colors.primary,
                  color: darkMode ? "#000" : "#fff",
                  borderRadius: { xs: "20px", sm: "50px" },
                  py: { xs: 1.2, sm: 1.5 },
                  px: { xs: 2, sm: 4 },
                  mt: { xs: 1, sm: 0 },
                  width: { xs: "100%", sm: "auto" },
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: darkMode ? "#F6B17A" : "#3B5898",
                  },
                }}
              >
                <SearchIcon sx={{ ml: 1 }} /> ابحث عن وجهتك
              </Button>
            </Box>
          </Box>

          {/* Hero image carousel with 3D effect */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 55%" },
              position: "relative",
              height: { xs: "250px", sm: "350px", md: "450px", lg: "500px" },
              width: "100%",
              perspective: "1000px",
              order: { xs: 1, md: 2 }, // Move image above text on mobile
              mx: "auto",
              maxWidth: { xs: "450px", md: "none" },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transform: { xs: "rotateY(-5deg)", md: "rotateY(-15deg)" },
                zIndex: 10,
              }}
            >
              <Slider
                {...{
                  ...sliderSettings,
                  autoplay: true,
                  autoplaySpeed: 4000,
                  fade: true,
                  cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: { xs: "20px", md: "30px" },
                  overflow: "hidden",
                  borderRadius: "25px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  border: `5px solid ${
                    darkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"
                  }`,
                }}
              >
                {renderImages}
              </Slider>

              {/* Decorative elements */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                sx={{
                  position: "absolute",
                  bottom: "-15px",
                  right: "-15px",
                  width: { xs: "50px", sm: "70px" },
                  height: { xs: "50px", sm: "70px" },
                  borderRadius: { xs: "15px", sm: "20px" },
                  background: theme.colors.primary,
                  zIndex: -1,
                  display: { xs: "none", sm: "block" },
                }}
              />
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                sx={{
                  position: "absolute",
                  top: "-20px",
                  left: "-20px",
                  width: { xs: "70px", sm: "100px" },
                  height: { xs: "70px", sm: "100px" },
                  borderRadius: { xs: "20px", sm: "30px" },
                  background: darkMode
                    ? "rgba(246, 177, 122, 0.2)"
                    : "rgba(74, 114, 172, 0.2)",
                  zIndex: -1,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Bottom wave separator */}
        <Box
          sx={{
            position: "absolute",
            bottom: -2,
            left: 0,
            width: "100%",
            height: "120px",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{
              position: "absolute",
              bottom: 0,
              fill: darkMode ? theme.colors.background : "#fff",
            }}
          >
            <path d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,234.7C672,235,768,213,864,208C960,203,1056,213,1152,229.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </Box>
      </MainBox>
    </>
  );
};

export default Section1;
