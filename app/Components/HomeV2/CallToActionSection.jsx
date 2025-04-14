import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Chip,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExploreIcon from "@mui/icons-material/Explore";


const CallToActionSection = ({ theme, darkMode, prefersReducedMotion }) => {
  // Use MUI's useTheme instead of relying on a function passed to useMediaQuery
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          position: "relative",
          padding: { xs: "120px 20px", md: "180px 40px" },
          background: darkMode
            ? `linear-gradient(135deg, ${theme.colors.primary}CC 0%, #2c4975ee 100%)`
            : `linear-gradient(135deg, ${theme.colors.primary}CC 0%, #2c4975ee 100%)`,
          textAlign: "center",
          overflow: "hidden",
          isolation: "isolate",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: darkMode ? 0.2 : 0.15,
            zIndex: -2,
          },
        }}
      >
        {/* Floating decorative elements */}
        <Box sx={{ position: "absolute", top: "10%", right: "5%", zIndex: 0 }}>
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <LocationOnIcon
              sx={{
                fontSize: { xs: 40, md: 60 },
                color: darkMode
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.3)",
                filter: `drop-shadow(0 0 5px ${
                  darkMode
                    ? "rgba(246, 177, 122, 0.3)"
                    : "rgba(74, 114, 172, 0.3)"
                })`,
              }}
            />
          </motion.div>
        </Box>

        <Box
          sx={{ position: "absolute", bottom: "15%", left: "7%", zIndex: 0 }}
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ExploreIcon
              sx={{
                fontSize: { xs: 35, md: 50 },
                color: darkMode
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.3)",
                filter: `drop-shadow(0 0 5px ${
                  darkMode
                    ? "rgba(246, 177, 122, 0.3)"
                    : "rgba(74, 114, 172, 0.3)"
                })`,
              }}
            />
          </motion.div>
        </Box>

        <Box
          sx={{
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
            backdropFilter: "blur(3px)",
            padding: { xs: "25px 15px", md: "40px 20px" },
            borderRadius: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Glowing text effect for heading */}
            <Typography
              variant="h2"
              component={motion.h2}
              animate={{
                textShadow: [
                  "0 0 5px rgba(255, 255, 255, 0.3)",
                  "0 0 15px rgba(255, 255, 255, 0.5)",
                  "0 0 5px rgba(255, 255, 255, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: "800",
                marginBottom: "1.5rem",
                color: "#ffffff",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: { xs: "80px", md: "120px" },
                  height: "4px",
                  background: "rgba(255, 255, 255, 0.8)",
                  bottom: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: "2px",
                },
              }}
            >
              ابدأ رحلتك مع فسحة اليوم
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                color: "rgba(255,255,255,0.95)",
                marginBottom: "2.5rem",
                lineHeight: 1.8,
                maxWidth: "750px",
                mx: "auto",
                fontWeight: "400",
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                انضم إلى شبكتنا المتنامية من أصحاب الأماكن واحصل على المزيد من
                الزوار. سجل مكانك الآن واستفد من منصة فسحة لزيادة عدد زوارك!
              </motion.span>
            </Typography>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button
                sx={{
                  backgroundColor: theme.colors.primary,
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: `0 8px 20px ${theme.colors.primary}40`,
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: theme.colors.primary,
                    transform: "translateY(-3px)",
                    boxShadow: `0 12px 28px ${theme.colors.primary}60`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                سجل مكانك الآن
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            ></motion.div>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              sx={{
                display: "flex",
                gap: 1.5,
                justifyContent: "center",
                mt: 4,
                flexWrap: "wrap",
              }}
            >
              {["مطاعم", "فنادق", "متاحف", "كافيهات", "منتجعات"].map(
                (category, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.7 + idx * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                      y: -5,
                      backgroundColor: darkMode
                        ? "rgba(246, 177, 122, 0.4)"
                        : "rgba(255,255,255,0.3)",
                    }}
                  >
                    <Chip
                      label={category}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "#fff",
                        backdropFilter: "blur(10px)",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                        padding: "18px 5px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        "&:hover": {
                          color: "#ffffff",
                        },
                      }}
                    />
                  </motion.div>
                )
              )}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default CallToActionSection;
