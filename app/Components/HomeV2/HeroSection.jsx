import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Stack,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import StorefrontIcon from "@mui/icons-material/Storefront";
import InsightsIcon from "@mui/icons-material/Insights";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import NotificationsIcon from "@mui/icons-material/Notifications";

const HeroSection = ({ theme, darkMode, prefersReducedMotion }) => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: darkMode ? "rgba(45, 50, 80, 0.95)" : "#f0f4f8",
          pt: { xs: 6, md: 8 },
          pb: { xs: 16, md: 24 },
          borderBottom: "1px solid",
          borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Grid
            container
            spacing={{ xs: 5, md: 6 }}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Enhanced Text Content with Staggered Animations */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: "2.5rem", md: "3.8rem" },
                        fontWeight: 800,
                        mb: 3,
                        lineHeight: 1.2,
                        background: darkMode
                          ? `linear-gradient(90deg, ${theme.colors.primary}, #fff)`
                          : `linear-gradient(90deg, ${theme.colors.primary}, #333)`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: darkMode
                          ? "drop-shadow(0 0 6px rgba(246, 177, 122, 0.3))"
                          : "none",
                      }}
                    >
                      أطلق إمكانات عملك مع فسحة
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                        fontWeight: 400,
                        mb: 4,
                        color: theme.colors.textSecondary,
                        lineHeight: 1.6,
                      }}
                    >
                      منصة متكاملة تساعدك على إدارة أماكنك بسهولة واستقطاب
                      المزيد من الزوار
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Box sx={{ mt: 2, mb: 5 }}>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          justifyContent: { xs: "center", md: "flex-end" },
                        }}
                      >
                        {[
                          {
                            icon: <StorefrontIcon />,
                            text: "زيادة الوصول إلى العملاء",
                          },
                          {
                            icon: <InsightsIcon />,
                            text: "تحليلات متقدمة للأداء",
                          },
                          {
                            icon: <MonetizationOnIcon />,
                            text: "فرص أرباح أكثر",
                          },
                        ].map((item, idx) => (
                          <Grid item xs={12} sm={4} key={idx}>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.7 + idx * 0.2,
                                type: "spring",
                                stiffness: 100,
                              }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: { xs: "center", md: "flex-end" },
                                  gap: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: `${theme.colors.primary}20`,
                                    color: theme.colors.primary,
                                    boxShadow: darkMode
                                      ? `0 0 20px ${theme.colors.primary}30`
                                      : `0 8px 16px ${theme.colors.primary}20`,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                      transform: "translateY(-5px)",
                                      boxShadow: darkMode
                                        ? `0 0 30px ${theme.colors.primary}40`
                                        : `0 12px 24px ${theme.colors.primary}30`,
                                    },
                                  }}
                                >
                                  {item.icon}
                                </Box>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: theme.colors.text,
                                    fontWeight: 500,
                                  }}
                                >
                                  {item.text}
                                </Typography>
                              </Box>
                            </motion.div>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        justifyContent: { xs: "center", md: "flex-start" },
                        mt: 4,
                        direction: "rtl",
                        gap: 3,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="large"
                          startIcon={
                            <AddBusinessIcon style={{ marginLeft: "8px" }} />
                          }
                          component={Link}
                          href="/register?type=seller"
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
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                              transform: "translateX(-100%)",
                              transition: "all 0.6s ease",
                            },
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: `0 12px 28px ${theme.colors.primary}60`,
                              color: "#fff", // Keep the text color white on hover
                              "&::before": {
                                transform: "translateX(100%)",
                              },
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          سجل كبائع الآن
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          component={Link}
                          href="/learn-more"
                          size="large"
                          sx={{
                            px: 3,
                            py: 1.5,
                            color: theme.colors.primary,
                            borderRadius: "12px",
                            border: `2px solid ${theme.colors.primary}30`,
                            backdropFilter: "blur(5px)",
                            backgroundColor: darkMode
                              ? "rgba(45, 50, 80, 0.3)"
                              : "rgba(255, 255, 255, 0.5)",
                            position: "relative",
                            overflow: "hidden",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              background: `${theme.colors.primary}10`,
                              transform: "scaleX(0)",
                              transformOrigin: "right",
                              transition: "transform 0.5s ease",
                              zIndex: -1,
                            },
                            "&:hover": {
                              backgroundColor: "transparent",
                              color: theme.colors.primary,
                              borderColor: `${theme.colors.primary}60`,
                              "&::after": {
                                transform: "scaleX(1)",
                                transformOrigin: "left",
                              },
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          تعرف على المزيد
                        </Button>
                      </motion.div>
                    </Stack>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>

            {/* Enhanced Dashboard/App Preview Image */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: -5 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 50,
                }}
                whileHover={{
                  y: -10,
                  rotateY: -2,
                  transition: { duration: 0.5 },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "300px", md: "500px" },
                    width: "100%",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: darkMode
                      ? "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(246, 177, 122, 0.2)"
                      : "0 20px 60px rgba(0,0,0,0.15), 0 0 20px rgba(74, 114, 172, 0.1)",
                    transform:
                      "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                    transformStyle: "preserve-3d",
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
                      borderRadius: "20px",
                    },
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop"
                    alt="فسحة للبائعين - لوحة التحكم"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                      borderRadius: "20px",
                      filter: darkMode
                        ? "brightness(0.9) contrast(1.1)"
                        : "none",
                      transition: "all 0.5s ease",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/800x600?text=فسحة+للبائعين";
                    }}
                  />

                  {/* Animated overlay gradient */}
                  <Box
                    component={motion.div}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: darkMode
                        ? "linear-gradient(45deg, rgba(45, 50, 80, 0.4) 0%, rgba(45, 50, 80, 0) 70%)"
                        : "linear-gradient(45deg, rgba(74, 114, 172, 0.2) 0%, rgba(74, 114, 172, 0) 70%)",
                      borderRadius: "20px",
                      zIndex: 1,
                    }}
                    animate={{
                      background: darkMode
                        ? [
                            "linear-gradient(45deg, rgba(45, 50, 80, 0.4) 0%, rgba(45, 50, 80, 0) 70%)",
                            "linear-gradient(45deg, rgba(246, 177, 122, 0.2) 0%, rgba(45, 50, 80, 0) 70%)",
                            "linear-gradient(45deg, rgba(45, 50, 80, 0.4) 0%, rgba(45, 50, 80, 0) 70%)",
                          ]
                        : [
                            "linear-gradient(45deg, rgba(74, 114, 172, 0.2) 0%, rgba(74, 114, 172, 0) 70%)",
                            "linear-gradient(45deg, rgba(246, 177, 122, 0.1) 0%, rgba(74, 114, 172, 0) 70%)",
                            "linear-gradient(45deg, rgba(74, 114, 172, 0.2) 0%, rgba(74, 114, 172, 0) 70%)",
                          ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Enhanced Statistics overlay with animations */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 30,
                      right: 30,
                      zIndex: 3,
                      display: "flex",
                      gap: 2,
                      flexDirection: "column",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: darkMode
                            ? "rgba(66, 71, 105, 0.85)"
                            : "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "16px",
                          p: 2,
                          width: { xs: "200px", md: "250px" },
                          boxShadow: darkMode
                            ? "0 10px 30px rgba(0,0,0,0.2), 0 0 15px rgba(246, 177, 122, 0.1)"
                            : "0 10px 30px rgba(0,0,0,0.1)",
                          border: darkMode
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(255,255,255,0.8)",
                          transition: "all 0.3s ease",
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
                            variant="caption"
                            sx={{
                              color: darkMode ? "#fff" : "#666",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            الزيارات
                          </Typography>
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 2 }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: theme.colors.primary,
                                fontWeight: "bold",
                                background: darkMode
                                  ? "rgba(246, 177, 122, 0.15)"
                                  : "rgba(74, 114, 172, 0.15)",
                                px: 1,
                                py: 0.5,
                                borderRadius: "4px",
                              }}
                            >
                              +24%
                            </Typography>
                          </motion.div>
                        </Box>
                        <Box
                          sx={{
                            height: "30px",
                            background: "rgba(0,0,0,0.05)",
                            borderRadius: "8px",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{
                              duration: 1.5,
                              delay: 1.6,
                              type: "spring",
                              stiffness: 50,
                            }}
                            style={{
                              height: "100%",
                              background: darkMode
                                ? `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.primary}CC 100%)`
                                : `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.primary}AA 100%)`,
                              borderRadius: "8px",
                              boxShadow: darkMode
                                ? `0 0 10px ${theme.colors.primary}60`
                                : "none",
                            }}
                          />
                        </Box>
                      </Box>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 1.5 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: darkMode
                            ? "rgba(66, 71, 105, 0.85)"
                            : "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "16px",
                          p: 2,
                          width: { xs: "200px", md: "250px" },
                          boxShadow: darkMode
                            ? "0 10px 30px rgba(0,0,0,0.2), 0 0 15px rgba(246, 177, 122, 0.1)"
                            : "0 10px 30px rgba(0,0,0,0.1)",
                          border: darkMode
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(255,255,255,0.8)",
                          direction: "rtl",
                          transition: "all 0.3s ease",
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
                            variant="caption"
                            sx={{
                              color: darkMode ? "#fff" : "#666",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            التقييمات
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "#FEC20F", fontWeight: "bold" }}
                            >
                              4.8
                            </Typography>
                            <motion.div
                              animate={{
                                rotate: [0, 5, 0, -5, 0],
                                scale: [1, 1.2, 1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                delay: 2.5,
                                repeat: 1,
                                repeatType: "reverse",
                              }}
                            >
                              <Box component="span" sx={{ color: "#FEC20F" }}>
                                ★
                              </Box>
                            </motion.div>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ display: "flex", mr: 1 }}>
                              {[1, 2, 3].map((_, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: 2 + idx * 0.2,
                                    type: "spring",
                                  }}
                                >
                                  <Avatar
                                    src={`https://randomuser.me/api/portraits/${
                                      idx % 2 === 0 ? "men" : "women"
                                    }/${idx + 20}.jpg`}
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      border: darkMode
                                        ? "2px solid rgba(255,255,255,0.8)"
                                        : "2px solid white",
                                      marginLeft: -1,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        transform: "scale(1.2)",
                                        zIndex: 10,
                                      },
                                    }}
                                  />
                                </motion.div>
                              ))}
                            </Box>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 2.8 }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  mr: 2,
                                  color: darkMode
                                    ? "rgba(255,255,255,0.7)"
                                    : "#666",
                                }}
                              >
                                +24 مراجعة
                              </Typography>
                            </motion.div>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  </Box>

                  {/* Add floating notification for more interactivity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 3 }}
                    style={{
                      position: "absolute",
                      bottom: 30,
                      left: 30,
                      zIndex: 3,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: darkMode
                          ? "rgba(66, 71, 105, 0.85)"
                          : "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        p: 2,
                        boxShadow: darkMode
                          ? "0 10px 30px rgba(0,0,0,0.2), 0 0 15px rgba(246, 177, 122, 0.1)"
                          : "0 10px 30px rgba(0,0,0,0.1)",
                        border: darkMode
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(255,255,255,0.8)",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        maxWidth: "220px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: theme.colors.primary,
                          width: 40,
                          height: 40,
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        <NotificationsIcon />
                      </Box>
                      <Box sx={{ direction: "rtl" }}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: "bold",
                            color: darkMode ? "#fff" : theme.colors.text,
                            fontSize: "0.75rem",
                            display: "block",
                          }}
                        >
                          حجز جديد!
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: darkMode
                              ? "rgba(255,255,255,0.7)"
                              : theme.colors.textSecondary,
                            fontSize: "0.7rem",
                          }}
                        >
                          تم حجز مكانك من قبل عميل جديد
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
