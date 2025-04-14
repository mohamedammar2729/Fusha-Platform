import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import StorefrontIcon from "@mui/icons-material/Storefront";
import InsightsIcon from "@mui/icons-material/Insights";
import RateReviewIcon from "@mui/icons-material/RateReview";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const BenefitsSection = ({
  theme,
  darkMode,
  prefersReducedMotion,
}) => {
const muiTheme = useMuiTheme();
const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

const sellerBenefits = [
  {
    title: "إدارة الأماكن",
    description: "سجل وأدر أماكنك بسهولة من خلال لوحة تحكم متكاملة",
    icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
    color: "#4A72AC",
  },
  {
    title: "التحليلات والإحصائيات",
    description: "تابع أداء أماكنك والزيارات بتقارير مفصلة",
    icon: <InsightsIcon sx={{ fontSize: 40 }} />,
    color: "#F6B17A",
  },
  {
    title: "تقييمات العملاء",
    description: "استقبل تقييمات من الزوار وحسن من خدماتك",
    icon: <RateReviewIcon sx={{ fontSize: 40 }} />,
    color: "#4CAF50",
  },
  {
    title: "فرص أرباح أكثر",
    description: "زد من فرص عرض مكانك واستقبال المزيد من الزوار",
    icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
    color: "#FEC20F",
  },
];

  return (
    <>
      <Box
        id="benefits"
        sx={{
          py: { xs: 10, md: 16 },
          px: { xs: 2, md: 4 },
          backgroundColor: darkMode ? "rgba(40, 45, 70, 0.7)" : "#f8f9fa",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        }}
      >
        {/* Animated background patterns */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: darkMode ? 0.07 : 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${
              darkMode ? "ffffff" : "000000"
            }' fill-opacity='0.25' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                mb: 2,
                color: theme.colors.primary,
                textAlign: "center",
                position: "relative",
                textShadow: darkMode
                  ? "0 0 15px rgba(246, 177, 122, 0.3)"
                  : "none",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "80px", md: "120px" },
                  height: "4px",
                  background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`,
                  borderRadius: "4px",
                  opacity: 0.9,
                },
              }}
            >
              مميزات التسجيل كبائع
            </Typography>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  color: theme.colors.textSecondary,
                  textAlign: "center",
                  maxWidth: 800,
                  mx: "auto",
                  mb: 8,
                  lineHeight: 1.8,
                  position: "relative",
                  "&::before, &::after": {
                    content: '""',
                    position: "absolute",
                    width: { xs: "40px", md: "60px" },
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${theme.colors.primary}80)`,
                    top: "50%",
                  },
                  "&::before": {
                    left: { xs: "5%", md: "15%" },
                    transform: "translateX(-50%) scaleX(-1)",
                  },
                  "&::after": {
                    right: { xs: "5%", md: "15%" },
                    transform: "translateX(50%)",
                  },
                }}
              >
                انضم إلى آلاف البائعين واستفد من المزايا الحصرية التي تقدمها
                منصة فسحة
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: { xs: 4, md: 5 },
              }}
            >
              {sellerBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -10,
                    transition: {
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                    },
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card
                    sx={{
                      p: 0,
                      height: "100%",
                      backgroundColor: darkMode
                        ? "rgba(66, 71, 105, 0.6)"
                        : "#fff",
                      borderRadius: "24px",
                      boxShadow: darkMode
                        ? `0 15px 35px rgba(0,0,0,0.2), 0 0 20px ${benefit.color}20`
                        : "0 15px 35px rgba(0,0,0,0.06)",
                      transition:
                        "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      overflow: "hidden",
                      position: "relative",
                      backdropFilter: "blur(8px)",
                      border: darkMode
                        ? `1px solid ${benefit.color}40`
                        : `1px solid rgba(0,0,0,0.03)`,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: darkMode
                          ? `linear-gradient(135deg, ${benefit.color}20, transparent 80%)`
                          : `linear-gradient(135deg, ${benefit.color}10, transparent 80%)`,
                        opacity: 0.8,
                        transition: "opacity 0.5s ease",
                        zIndex: 0,
                      },
                      "&:hover": {
                        transform: "translateY(-15px) scale(1.03)",
                        boxShadow: `0 25px 45px rgba(0,0,0,0.1), 0 0 35px ${benefit.color}30`,
                        "&::before": {
                          opacity: 1,
                        },
                        "& .benefit-icon": {
                          transform: "scale(1.15) rotate(10deg)",
                          backgroundColor: `${benefit.color}40`,
                          boxShadow: `0 15px 35px ${benefit.color}40, 0 0 20px ${benefit.color}60`,
                        },
                        "& .benefit-title": {
                          color: darkMode ? benefit.color : benefit.color,
                          transform: "translateY(-5px)",
                        },
                        "& .benefit-description": {
                          color: darkMode
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(0,0,0,0.8)",
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
                        position: "relative",
                        zIndex: 2,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        height: "100%",
                      }}
                    >
                      <Box
                        className="benefit-icon"
                        sx={{
                          backgroundColor: darkMode
                            ? `${benefit.color}25`
                            : `${benefit.color}15`,
                          color: benefit.color,
                          borderRadius: "20px",
                          width: 90,
                          height: 90,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 3,
                          transition:
                            "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                          transform: "scale(1) rotate(0deg)",
                          boxShadow: darkMode
                            ? `0 10px 20px rgba(0,0,0,0.1), 0 0 15px ${benefit.color}30`
                            : `0 10px 25px ${benefit.color}20`,
                          position: "relative",
                          border: `1px solid ${benefit.color}20`,
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            borderRadius: "20px",
                            padding: "2px",
                            background: `linear-gradient(135deg, ${benefit.color}60, transparent)`,
                            WebkitMask:
                              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0, 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                          },
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0, -5, 0],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{ fontSize: 40 }}
                        >
                          {benefit.icon}
                        </motion.div>
                      </Box>

                      <Typography
                        className="benefit-title"
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: "bold",
                          marginBottom: 2,
                          color: darkMode ? "#ffffff" : theme.colors.text,
                          transition: "all 0.4s ease",
                          fontSize: "1.35rem",
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            right: 0,
                            width: "40px",
                            height: "3px",
                            background: benefit.color,
                            borderRadius: "3px",
                            transition: "all 0.4s ease",
                          },
                          "&:hover::after": {
                            width: "100%",
                          },
                        }}
                      >
                        {benefit.title}
                      </Typography>

                      <Typography
                        className="benefit-description"
                        variant="body1"
                        sx={{
                          color: darkMode
                            ? "rgba(255,255,255,0.7)"
                            : theme.colors.textSecondary,
                          lineHeight: 1.8,
                          fontSize: "1rem",
                          transition: "all 0.4s ease",
                          textAlign: "right",
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              ))}
            </Box>

            <Box sx={{ mt: 10, textAlign: "center" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="#how-to-register"
                  sx={{
                    borderWidth: 2,
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary,
                    px: 5,
                    py: 1.5,
                    borderRadius: "16px",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                    transition: "all 0.4s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(90deg, ${theme.colors.primary}10, ${theme.colors.primary}30, ${theme.colors.primary}10)`,
                      opacity: 0,
                      transition: "opacity 0.5s ease",
                      zIndex: -1,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                      transition: "all 0.6s ease",
                      zIndex: -1,
                    },
                    "&:hover": {
                      borderColor: theme.colors.primary,
                      backgroundColor: "transparent",
                      transform: "translateY(-7px)",
                      boxShadow: `0 10px 25px ${theme.colors.primary}40`,
                      color: theme.colors.primary,
                      "&::before": {
                        opacity: 1,
                      },
                      "&::after": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(-3px)",
                      boxShadow: `0 5px 15px ${theme.colors.primary}30`,
                    },
                  }}
                >
                  <motion.span style={{ display: "inline-block" }}>
                    تعرف على كيفية التسجيل
                  </motion.span>
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default BenefitsSection;
