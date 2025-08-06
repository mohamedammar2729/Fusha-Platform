import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import LocationOnIcon from "@mui/icons-material/LocationOn";



const registrationSteps = [
  {
    id: 1,
    title: "إنشاء حساب",
    description: "سجل كبائع في منصة فسحة بمعلوماتك الأساسية",
  },
  {
    id: 2,
    title: "أضف مكانك",
    description: "أدخل تفاصيل مكانك مع الصور والخدمات المتوفرة",
  },
  {
    id: 3,
    title: "المراجعة والتأكيد",
    description: "سيتم مراجعة معلومات مكانك والموافقة عليه",
  },
  {
    id: 4,
    title: "البدء في استقبال الزوار",
    description: "سيظهر مكانك للمستخدمين ويمكنهم إضافته لرحلاتهم",
  },
];
const RegistrationSection = ({
  theme,
  darkMode,
  prefersReducedMotion,
}) => {

  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  return (
    <>
      <Box
        id="how-to-register"
        sx={{
          padding: { xs: "70px 20px", md: "100px 40px" },
          backgroundColor: darkMode ? "rgba(45, 50, 80, 0.8)" : "#f8f9fa",
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
            opacity: darkMode ? 0.15 : 0.08, // Increased from 0.07/0.03
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${
              darkMode ? "ffffff" : "000000"
            }' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontWeight: 800,
                marginBottom: "2.5rem",
                color: theme.colors.primary,
                textAlign: "center",
                position: "relative",
                display: "inline-block",
                width: "100%",
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
              كيف تسجل مكانك في فسحة؟
            </Typography>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: theme.colors.textSecondary,
                  textAlign: "center",
                  maxWidth: 700,
                  mx: "auto",
                  mb: 6,
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                }}
              >
                اتبع الخطوات البسيطة التالية لتسجيل مكانك وبدء استقبال الزوار من
                خلال منصة فسحة
              </Typography>
            </motion.div>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 6, md: 10 },
              alignItems: "center",
            }}
          >
            <Box>
              {registrationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      mb: 5,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 40,
                        right: 19.5,
                        bottom: -20,
                        width: 1,
                        background:
                          index === registrationSteps.length - 1
                            ? "transparent"
                            : `linear-gradient(${theme.colors.primary}80, ${theme.colors.primary}10)`,
                        zIndex: 0,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 3,
                        direction: "rtl",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            boxShadow: `0 0 20px ${theme.colors.primary}60`,
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Box
                            sx={{
                              backgroundColor: darkMode
                                ? "rgba(246, 177, 122, 0.9)"
                                : theme.colors.primary,
                              color: darkMode ? "#000" : "#fff",
                              borderRadius: "50%",
                              width: 40,
                              height: 40,
                              minWidth: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              boxShadow: darkMode
                                ? `0 0 15px ${theme.colors.primary}50, 0 0 5px ${theme.colors.primary}80`
                                : `0 10px 20px ${theme.colors.primary}30`,
                              border: darkMode
                                ? `1px solid ${theme.colors.primary}`
                                : "none",
                              zIndex: 2,
                            }}
                          >
                            {step.id}
                          </Box>
                        </motion.div>
                      </Box>

                      <Box
                        sx={{
                          backgroundColor: darkMode
                            ? "rgba(66, 71, 105, 0.4)"
                            : "rgba(255, 255, 255, 0.8)",
                          borderRadius: "16px",
                          p: 3,
                          boxShadow: darkMode
                            ? "0 10px 30px rgba(0,0,0,0.2)"
                            : "0 10px 30px rgba(0,0,0,0.08)",
                          border: `1px solid ${
                            darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.03)"
                          }`,
                          transition: "all 0.3s ease",
                          backdropFilter: "blur(10px)",
                          flex: 1,
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "60px",
                            height: "60px",
                            background: `linear-gradient(135deg, ${theme.colors.primary}20, transparent)`,
                            borderRadius: "0 16px 0 60px",
                            opacity: 0.8,
                          },
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: darkMode
                              ? `0 15px 35px rgba(0,0,0,0.3), 0 0 20px ${theme.colors.primary}20`
                              : "0 15px 35px rgba(0,0,0,0.15)",
                          },
                        }}
                      >
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontWeight: "bold",
                            marginBottom: 1.5,
                            color: theme.colors.text,
                            textAlign: "right",
                            fontSize: { xs: "1.2rem", md: "1.3rem" },
                            position: "relative",
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.colors.textSecondary,
                            lineHeight: 1.7,
                            textAlign: "right",
                            fontSize: "1rem",
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 4,
                    direction: "rtl",
                  }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 15px 30px ${theme.colors.primary}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="large"
                      sx={{
                        backgroundColor: theme.colors.primary,
                        color: darkMode ? "#000" : "#fff",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        padding: "15px 35px",
                        borderRadius: "14px",
                        boxShadow: darkMode
                          ? `0 10px 25px rgba(0,0,0,0.2), 0 0 15px ${theme.colors.primary}40`
                          : `0 10px 25px ${theme.colors.primary}30`,
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                          transition: "all 0.6s ease",
                        },
                        "&:hover": {
                          color: darkMode ? "#000" : "#fff",
                          "&::before": {
                            left: "100%",
                          },
                        },
                        transition: "all 0.3s ease",
                      }}
                      component={Link}
                      href="/register?type=seller"
                    >
                      ابدأ التسجيل الآن
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Box>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 50,
              }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: darkMode
                    ? "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(246, 177, 122, 0.2)"
                    : "0 20px 60px rgba(0,0,0,0.15), 0 0 20px rgba(74, 114, 172, 0.1)",
                  transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                  transformStyle: "preserve-3d",
                  height: { xs: "350px", md: "450px" },
                  width: "100%",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: darkMode
                      ? "linear-gradient(135deg, rgba(246, 177, 122, 0.1) 0%, rgba(255,255,255,0) 100%)"
                      : "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
                    zIndex: 2,
                    borderRadius: "24px",
                  },
                }}
              >
                {/* Animated shine effect */}
                <Box
                  component={motion.div}
                  animate={{
                    x: ["0%", "100%"],
                    opacity: [0, 0.15, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                    repeatDelay: 5,
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: "skewX(-15deg) translateX(-45%)",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                    zIndex: 3,
                  }}
                />

                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  sx={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&auto=format&fit=crop"
                    alt="تسجيل الأماكن"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "24px",
                      filter: darkMode ? "brightness(0.85)" : "none",
                      transition: "all 0.5s ease",
                    }}
                  />

                  {/* Overlay gradient */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: darkMode
                        ? "linear-gradient(180deg, rgba(45, 50, 80, 0.2) 0%, rgba(45, 50, 80, 0.7) 100%)"
                        : "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)",
                      zIndex: 2,
                      borderRadius: "24px",
                    }}
                  />

                  {/* Interactive UI elements */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      right: 20,
                      zIndex: 3,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <Box
                        sx={{
                          backgroundColor: darkMode
                            ? "rgba(66, 71, 105, 0.85)"
                            : "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "16px",
                          p: 2,
                          width: { xs: "200px", md: "260px" },
                          boxShadow: darkMode
                            ? "0 10px 30px rgba(0,0,0,0.2), 0 0 15px rgba(246, 177, 122, 0.1)"
                            : "0 10px 30px rgba(0,0,0,0.1)",
                          border: darkMode
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(255,255,255,0.8)",
                          direction: "rtl",
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
                            variant="body2"
                            sx={{
                              color: darkMode ? "#fff" : "#666",
                              fontWeight: 600,
                            }}
                          >
                            مكان جديد
                          </Typography>
                          <Box
                            component={motion.div}
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "#fff",
                              px: 1,
                              py: 0.5,
                              borderRadius: "4px",
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                            }}
                          >
                            تمت الموافقة
                          </Box>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: darkMode ? "#fff" : theme.colors.text,
                            mb: 0.5,
                          }}
                        >
                          كافيه السعادة
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: darkMode
                              ? "rgba(255,255,255,0.7)"
                              : theme.colors.textSecondary,
                          }}
                        >
                          <LocationOnIcon sx={{ fontSize: "0.9rem" }} />
                          <Typography variant="caption">
                            القاهرة, مصر
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RegistrationSection;
