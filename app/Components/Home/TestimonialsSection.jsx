import React, { useMemo, useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Feedback from "../../../public/feedback.png";
import { StyledCard2 } from "../../styledComponent/home/styledHome";
import axios from "axios";

const MemoizedTypography = React.memo(({ children, ...props }) => (
  <Typography {...props}>{children}</Typography>
));

const TestimonialsSection = ({ theme, darkMode }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "https://iti-server-production.up.railway.app/api/avatar"
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const renderTestimonials = useMemo(
    () =>
      testimonials?.map((testimonial, index) => (
        <SwiperSlide key={testimonial._id}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <StyledCard2 $index={index} $darkMode={darkMode}>
              <CardContent>
                <Avatar
                  src={testimonial.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    mx: "auto",
                    border: `4px solid ${
                      darkMode ? theme.colors.primary : "#004080"
                    }`,
                  }}
                />
                <MemoizedTypography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.colors.text }}
                >
                  {testimonial.name}
                </MemoizedTypography>
                <Rating value={testimonial.rating} readOnly sx={{ mb: 1 }} />
                <MemoizedTypography sx={{ mt: 2, color: theme.colors.text }}>
                  {testimonial.review}
                </MemoizedTypography>
              </CardContent>
            </StyledCard2>
          </motion.div>
        </SwiperSlide>
      )),
    [testimonials, theme.colors.text, theme.colors.primary, darkMode]
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          py: { xs: 8, md: 12 },
          position: "relative",
          background: darkMode
            ? "linear-gradient(180deg, rgba(45, 50, 80, 0), rgba(66, 71, 105, 0.3))"
            : "linear-gradient(180deg, rgba(245, 247, 250, 0), rgba(245, 247, 250, 0.8))",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            right: "8%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.primary}15, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Section title */}
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
            <Typography
              component={motion.h2}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 800,
                color: theme.colors.primary,
                mb: 2,
                position: "relative",
                display: "inline-block",
              }}
            >
              ماذا يقول المسافرون عنا؟
              <Box
                sx={{
                  position: "absolute",
                  bottom: -10,
                  left: "10%",
                  right: "10%",
                  height: 4,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, transparent, ${theme.colors.primary}88, transparent)`,
                }}
              />
            </Typography>

            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                color: theme.colors.textSecondary,
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              استمع إلى تجارب المسافرين الحقيقية وقصصهم الملهمة مع فسحة
            </Typography>
          </Box>

          {/* Featured video testimonial */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            sx={{
              mb: 8,
              mx: "auto",
              maxWidth: "900px",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                aspectRatio: "16/9",
                cursor: "pointer",
                "&:hover": {
                  "& .play-button": {
                    transform: "translate(-50%, -50%) scale(1.1)",
                    backgroundColor: theme.colors.primary,
                  },
                },
              }}
            >
              <Image
                src={Feedback}
                alt="Video Testimonial"
                layout="fill"
                objectFit="cover"
              />
              <Box
                className="play-button"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                }}
              >
                <PlayArrowIcon
                  sx={{
                    fontSize: "3rem",
                    color: theme.colors.primary,
                    transform: "translateX(2px)",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "100px 30px 30px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  color: "#fff",
                  textAlign: "right",
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 1 }}>
                  فسحة لا تنسي إلى أسوان
                </Typography>
                <Typography sx={{ fontSize: "1rem", opacity: 0.9 }}>
                  محمد و عائلته — لحظات رائعة لمدة 5 أيام
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Testimonials carousel */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            sx={{ position: "relative" }}
          >
            <Swiper
              {...{
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                autoplay: {
                  delay: 5000,
                  disableOnInteraction: false,
                },
                pagination: {
                  clickable: true,
                  dynamicBullets: true,
                },
                breakpoints: {
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 3,
                    centeredSlides: false,
                  },
                },
                style: { padding: "30px 10px 60px" },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={testimonial._id || index}>
                  <Box
                    component={motion.div}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    sx={{
                      bgcolor: darkMode ? "rgba(66, 71, 105, 0.4)" : "#fff",
                      borderRadius: "24px",
                      p: 3,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      border: `1px solid ${
                        darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                      }`,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 2,
                        direction: "rtl",
                      }}
                    >
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{
                          width: 60,
                          height: 60,
                          border: `2px solid ${theme.colors.primary}`,
                        }}
                      />
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            color: theme.colors.text,
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: theme.colors.textSecondary,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <LocationOnIcon sx={{ fontSize: "0.9rem" }} />
                          {testimonial.role || "القاهرة"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        borderLeft: `4px solid ${theme.colors.primary}`,
                        pl: 2,
                        py: 0.5,
                        mb: 2,
                        direction: "rtl",
                      }}
                    >
                      <Typography
                        sx={{
                          flex: 1,
                          fontSize: "1rem",
                          lineHeight: 1.6,
                          color: theme.colors.text,
                          opacity: 0.9,
                          mb: 3,
                        }}
                      >
                        {testimonial.review || testimonial.comment}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: theme.colors.textSecondary,
                        }}
                      >
                        {new Date(
                          Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("ar-EG")}
                      </Typography>
                      <Rating
                        value={testimonial.rating || 5}
                        readOnly
                        size="small"
                      />
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Add testimonial button */}
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                position: "relative",
                width: "fit-content",
                mx: "auto",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary,
                  borderRadius: "50px",
                  px: 4,
                  py: 1,
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: theme.colors.primary,
                    backgroundColor: `${theme.colors.primary}11`,
                  },
                }}
                startIcon={<RateReviewIcon />}
              >
                أضف تجربتك مع فسحة
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TestimonialsSection;
