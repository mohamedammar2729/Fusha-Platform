import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";

// Import Icons
import ExploreIcon from "@mui/icons-material/Explore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MapIcon from "@mui/icons-material/Map";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const features = [
  {
    icon: <ExploreIcon sx={{ fontSize: 40 }} />,
    title: "اختر وجهتك",
    desc: "حدد المكان الذي ترغب في زيارته من بين مجموعة متنوعة من الوجهات",
  },
  {
    icon: <DateRangeIcon sx={{ fontSize: 40 }} />,
    title: "حدد التاريخ",
    desc: "اختر تاريخ سفرك وعدد الأيام التي تخطط لقضائها",
  },
  {
    icon: <MapIcon sx={{ fontSize: 40 }} />,
    title: "خطط مسارك",
    desc: "قم بإضافة الأماكن التي ترغب في زيارتها إلى جدول رحلتك",
  },
  {
    icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
    title: "احجز تجاربك",
    desc: "احجز الأماكن والتجارب مباشرة خلال رحلتك بضغطة زر واحدة",
  },
];

const FeaturesSection = ({ theme, darkMode }) => {
  return (
    <>
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          margin: "60px auto",
          padding: { xs: "30px 20px", md: "50px 30px" },
          borderRadius: "20px",
          background: darkMode
            ? "rgba(66, 71, 105, 0.3)"
            : "rgba(245, 247, 250, 0.8)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
          position: "relative",
        }}
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.colors.primary}33, ${theme.colors.primary}11)`,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.colors.primary}22, ${theme.colors.primary}05)`,
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: theme.colors.primary,
              fontWeight: "bold",
              mb: 5,
              fontSize: { xs: "1.8rem", md: "2.3rem" },
            }}
          >
            ابتكر رحلة أحلامك في دقائق
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {features.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    padding: 3,
                    borderRadius: "16px",
                    height: "100%",
                    background: darkMode
                      ? "rgba(66, 71, 105, 0.3)"
                      : "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(5px)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      color: theme.colors.primary,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.5,
                      fontWeight: "bold",
                      color: theme.colors.text,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: darkMode ? theme.colors.textSecondary : "#555",
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.colors.primary,
                color: "#fff",
                fontSize: "1.1rem",
                py: 1.5,
                px: 5,
                borderRadius: "50px",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: theme.colors.primary,
                  boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
                  transform: "translateY(-3px)",
                },
              }}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              ابدأ خطتك الآن
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FeaturesSection;
