import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";

import { useTheme as useMuiTheme } from "@mui/material/styles";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const TestimonialsSection = ({
  theme,
  darkMode,
  prefersReducedMotion,
}) => {

  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

const testimonials = [
  {
    id: 1,
    name: "أحمد ",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "صاحب مطعم",
    comment:
      "ساعدتني فسحة في زيادة الحجوزات بنسبة 40% خلال 3 أشهر فقط! منصة رائعة لأصحاب الأعمال.",
    rating: 5,
    hasVideo: false,
    // videoThumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: 2,
    name: "سارة ",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "مديرة فندق",
    comment:
      "سهولة الاستخدام والدعم الفني الممتاز جعل تجربتنا مع فسحة مميزة جداً. أنصح بها بشدة!",
    rating: 4.5,
    hasVideo: false,
  },
  {
    id: 3,
    name: "محمد ",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    role: "صاحب مقهى",
    comment:
      "الإحصائيات والتقارير ساعدتني في فهم احتياجات العملاء بشكل أفضل وتطوير خدماتي.",
    rating: 5,
    hasVideo: false,
  },
];

  return (
    <>
      <Box
        id="testimonials"
        sx={{
          padding: { xs: "60px 20px", md: "100px 40px" },
          backgroundColor: darkMode ? theme.colors.background : "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontWeight: "bold",
                marginBottom: "1rem",
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
                  bottom: -10,
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
              آراء البائعين
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
              استمع إلى تجارب أصحاب الأماكن الذين انضموا إلى منصة فسحة واستفادوا
              من خدماتنا
            </Typography>
          </motion.div>

          {/* Large quote icon */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: "70px", md: "120px" },
              left: { xs: "10px", md: "20px" },
              opacity: 0.07,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.07, 0.1, 0.07] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <FormatQuoteIcon
                sx={{
                  fontSize: { xs: "100px", md: "150px" },
                  color: theme.colors.primary,
                  transform: "rotate(180deg)",
                }}
              />
            </motion.div>
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: { xs: "50px", md: "80px" },
              right: { xs: "10px", md: "20px" },
              opacity: 0.07,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.07, 0.1, 0.07] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 4,
              }}
            >
              <FormatQuoteIcon
                sx={{
                  fontSize: { xs: "100px", md: "150px" },
                  color: theme.colors.primary,
                }}
              />
            </motion.div>
          </Box>

          <Swiper
            modules={[Pagination, Autoplay, Navigation, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            style={{ padding: "30px 10px 60px" }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: darkMode
                        ? "rgba(66, 71, 105, 0.6)"
                        : "#fff",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: darkMode
                        ? "0 15px 35px rgba(0,0,0,0.2), 0 0 20px rgba(246, 177, 122, 0.1)"
                        : "0 20px 40px rgba(0,0,0,0.08)",
                      transition:
                        "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: darkMode
                          ? `0 25px 45px rgba(0,0,0,0.25), 0 0 30px ${theme.colors.primary}30`
                          : "0 25px 50px rgba(0,0,0,0.15)",
                      },
                      display: "flex",
                      flexDirection: "column",
                      margin: "10px",
                      padding: 0,
                      minHeight: "380px",
                      position: "relative",
                      backdropFilter: "blur(10px)",
                      border: darkMode
                        ? `1px solid ${theme.colors.primary}30`
                        : `1px solid rgba(0,0,0,0.03)`,
                    }}
                  >
                    {/* Decorative corner */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "80px",
                        height: "80px",
                        background: `linear-gradient(135deg, ${theme.colors.primary}30, transparent)`,
                        borderRadius: "0 24px 0 80px",
                        opacity: 0.8,
                        zIndex: 0,
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "60px",
                        height: "60px",
                        overflow: "hidden",
                        zIndex: 0,
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          width: "200%",
                          height: "200%",
                          background: `conic-gradient(from 90deg at 0% 100%, transparent 75%, ${theme.colors.primary}30 100%)`,
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                        }}
                      />
                    </Box>

                    {/* Card content */}
                    <CardContent
                      sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {testimonial.hasVideo && (
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: 160,
                            marginBottom: 4,
                            borderRadius: "16px",
                            overflow: "hidden",
                            cursor: "pointer",
                            boxShadow: darkMode
                              ? "0 10px 25px rgba(0,0,0,0.2)"
                              : "0 10px 25px rgba(0,0,0,0.1)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.03)",
                              boxShadow: darkMode
                                ? "0 15px 35px rgba(0,0,0,0.3)"
                                : "0 15px 35px rgba(0,0,0,0.15)",
                              "& .play-button": {
                                backgroundColor: "rgba(255,255,255,0.95)",
                                transform: "scale(1.1)",
                              },
                              "& .play-icon": {
                                color: `${theme.colors.primary}`,
                                transform: "scale(1.2)",
                              },
                              "& .video-overlay": {
                                backgroundColor: "rgba(0,0,0,0.2)",
                              },
                            },
                          }}
                          onClick={() => {
                            // Here you would open the video in a modal
                            alert("This would open a video testimonial modal");
                          }}
                        >
                          <Image
                            src={testimonial.videoThumbnail}
                            alt={`${testimonial.name} video testimonial`}
                            fill
                            sizes="100%"
                            style={{ objectFit: "cover" }}
                          />
                          <Box
                            className="video-overlay"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "rgba(0,0,0,0.3)",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Box
                                className="play-button"
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: "50%",
                                  backgroundColor: "rgba(255,255,255,0.8)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                <PlayArrowIcon
                                  className="play-icon"
                                  sx={{
                                    color: theme.colors.primary,
                                    fontSize: 30,
                                    transition: "all 0.3s ease",
                                  }}
                                />
                              </Box>
                            </motion.div>
                          </Box>

                          {/* Video duration */}
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 10,
                              right: 10,
                              backgroundColor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                            }}
                          >
                            2:45
                          </Box>
                        </Box>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                          marginBottom: 3,
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.2 + index * 0.1,
                            duration: 0.6,
                          }}
                        >
                          <Box sx={{ position: "relative" }}>
                            <Avatar
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              sx={{
                                width: 90,
                                height: 90,
                                border: darkMode
                                  ? `4px solid ${theme.colors.primary}40`
                                  : `4px solid ${theme.colors.primary}30`,
                                boxShadow: darkMode
                                  ? `0 0 20px ${theme.colors.primary}30`
                                  : `0 10px 25px rgba(0,0,0,0.1)`,
                              }}
                            />
                            {/* Verification badge */}
                            <Box
                              component={motion.div}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: 0.4 + index * 0.1,
                                type: "spring",
                              }}
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                backgroundColor: darkMode
                                  ? theme.colors.primary
                                  : theme.colors.primary,
                                color: darkMode ? "#000" : "#fff",
                                width: 26,
                                height: 26,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                border: "2px solid",
                                borderColor: darkMode
                                  ? "rgba(66, 71, 105, 0.8)"
                                  : "#ffffff",
                              }}
                            >
                              <VerifiedIcon sx={{ fontSize: 14 }} />
                            </Box>
                          </Box>
                        </motion.div>

                        <Box sx={{ textAlign: "center" }}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3 + index * 0.1,
                            }}
                          >
                            <Typography
                              variant="h6"
                              component="h3"
                              sx={{
                                fontWeight: "bold",
                                color: theme.colors.text,
                                mb: 0.5,
                              }}
                            >
                              {testimonial.name}
                            </Typography>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.4 + index * 0.1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.colors.textSecondary,
                                marginBottom: 1.5,
                                fontSize: "0.85rem",
                              }}
                            >
                              {testimonial.role}
                            </Typography>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.5 + index * 0.1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <Rating
                                value={testimonial.rating}
                                precision={0.5}
                                readOnly
                                sx={{
                                  color: "#FEC20F",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.colors.textSecondary,
                                  fontWeight: "bold",
                                  fontSize: "0.9rem",
                                }}
                              >
                                ({testimonial.rating})
                              </Typography>
                            </Box>
                          </motion.div>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          position: "relative",
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FormatQuoteIcon
                          sx={{
                            position: "absolute",
                            top: -15,
                            right: -5,
                            fontSize: "2rem",
                            color: darkMode
                              ? `${theme.colors.primary}40`
                              : `${theme.colors.primary}30`,
                            transform: "rotate(180deg)",
                          }}
                        />

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.6 + index * 0.1,
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.colors.text,
                              lineHeight: 1.8,
                              textAlign: "center",
                              fontSize: "0.95rem",
                              fontStyle: "italic",
                              position: "relative",
                              zIndex: 1,
                              px: 1,
                            }}
                          >
                            "{testimonial.comment}"
                          </Typography>
                        </motion.div>

                        <FormatQuoteIcon
                          sx={{
                            position: "absolute",
                            bottom: -15,
                            left: -5,
                            fontSize: "2rem",
                            color: darkMode
                              ? `${theme.colors.primary}40`
                              : `${theme.colors.primary}30`,
                          }}
                        />
                      </Box>

                      {/* Date of testimonial */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.colors.textSecondary,
                            fontSize: "0.75rem",
                            opacity: 0.7,
                          }}
                        >
                          {new Date(
                            2023,
                            testimonial.id % 12,
                            testimonial.id + 1
                          ).toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Box
            sx={{
              textAlign: "center",
              mt: 5,
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
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
                    transform: "translateY(-5px)",
                    boxShadow: `0 10px 20px ${theme.colors.primary}30`,
                    "&::before": {
                      left: "100%",
                    },
                  },
                }}
              >
                <ArrowBackwardIcon />
                عرض المزيد من آراء البائعين
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TestimonialsSection;
