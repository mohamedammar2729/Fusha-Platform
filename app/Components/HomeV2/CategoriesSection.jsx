import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";


const placeCategories = [
  {
    id: 1,
    title: "مطاعم وكافيهات",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "أماكن سياحية",
    image:
      "https://images.unsplash.com/photo-1568452834816-43fb48b09744?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "فنادق ومنتجعات",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "تسوق ومولات",
    image:
      "https://images.unsplash.com/photo-1677321303414-f41bfd5c46d5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "أنشطة ترفيهية",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "متاحف ومعارض",
    image:
      "https://images.unsplash.com/photo-1603750003385-3342231a1ff1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


const CategoriesSection = ({
  theme,
  darkMode,
  prefersReducedMotion,
}) => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  return (
    <>
      <Box
        id="categories"
        sx={{
          padding: { xs: "60px 20px", md: "100px 40px" },
          backgroundColor: darkMode ? theme.colors.background : "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: darkMode ? 0.15 : 0.12, // Increased opacity for better visibility
            zIndex: 0,
          }}
        >
          <motion.div
            animate={{
              backgroundPosition: ["0px 0px", "100px 100px"],
            }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${
                darkMode ? "ffffff" : "000000"
              }' fill-opacity='0.3'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "100px 100px", // Explicitly set size for consistency
            }}
          />
        </Box>

        {/* Main content */}
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "1rem",
                color: theme.colors.primary,
                textAlign: "center",
                position: "relative",
                display: "inline-block",
                width: "100%",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "80px", md: "120px" },
                  height: "4px",
                  background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`,
                  borderRadius: "4px",
                  opacity: 0.8,
                },
              }}
            >
              فئات الأماكن المتاحة
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.colors.textSecondary,
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
                marginBottom: "3rem",
                fontSize: "1.1rem",
                lineHeight: 1.8,
              }}
            >
              يمكنك تسجيل مكانك ضمن أي من الفئات التالية ليتمكن المستخدمون من
              اكتشافه وإضافته لرحلاتهم
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {placeCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 },
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: darkMode
                      ? "rgba(66, 71, 105, 0.5)"
                      : "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: darkMode
                      ? "0 10px 30px rgba(0,0,0,0.2), 0 0 15px rgba(0,0,0,0.1)"
                      : "0 15px 35px rgba(0,0,0,0.08)",
                    transition:
                      "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    border: darkMode
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.03)",
                    backdropFilter: "blur(10px)",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-10px) scale(1.02)",
                      boxShadow: darkMode
                        ? `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${theme.colors.primary}30`
                        : "0 20px 40px rgba(0,0,0,0.12)",
                      "& .category-image": {
                        transform: "scale(1.1) rotate(2deg)",
                      },
                      "& .category-overlay": {
                        opacity: 0.7,
                      },
                      "& .category-title": {
                        transform: "translateY(-5px)",
                        color: darkMode
                          ? theme.colors.primary
                          : theme.colors.primary,
                      },
                      "& .card-shine": {
                        opacity: 0.2,
                        transform: "rotate(25deg) translate(-50%, -120%)",
                        transition: "all 0.6s ease",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: "220px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <motion.img
                      className="category-image"
                      src={category.image}
                      alt={category.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition:
                          "transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      }}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Image overlay gradient */}
                    <Box
                      className="category-overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: darkMode
                          ? `linear-gradient(to bottom, rgba(45, 50, 80, 0.1), rgba(45, 50, 80, 0.8))`
                          : `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5))`,
                        opacity: 0.5,
                        transition: "opacity 0.5s ease",
                        zIndex: 2,
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px",
                      textAlign: "center",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      className="category-title"
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        color: theme.colors.text,
                        mb: 1.5,
                        transition: "all 0.4s ease",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -8,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "40px",
                          height: "3px",
                          background: theme.colors.primary,
                          borderRadius: "3px",
                          transition: "width 0.4s ease",
                        },
                        "&:hover::after": {
                          width: "80%",
                        },
                      }}
                    >
                      {category.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.colors.textSecondary,
                        mt: 1,
                        opacity: 0.9,
                        fontSize: "0.9rem",
                      }}
                    >
                      اكتشف أفضل {category.title} في مصر
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* View all categories button */}
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderWidth: 2,
                  borderColor: theme.colors.primary,
                  color: theme.colors.primary,
                  borderRadius: "12px",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${theme.colors.primary}30, transparent)`,
                    transition: "all 0.6s ease",
                  },
                  "&:hover": {
                    borderColor: theme.colors.primary,
                    backgroundColor: "transparent",
                    "&::before": {
                      left: "100%",
                    },
                  },
                }}
              >
                <ArrowBackwardIcon />
                عرض جميع الفئات
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CategoriesSection;
