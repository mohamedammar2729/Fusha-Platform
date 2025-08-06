import React from "react";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
// Import Icons
import ExploreIcon from "@mui/icons-material/Explore";
import { Container } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StarIcon from "@mui/icons-material/Star";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Chip from "@mui/material/Chip";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Image from "next/image";
import img1 from "../../../public/1.jpg";
import img2 from "../../../public/2.jpg";
import img3 from "../../../public/3.jpg";


const images = [img1, img2, img3];
const favouritePlaces = [
  {
    icon: <ExploreIcon sx={{ fontSize: 34 }} />,
    title: "اكتشف أماكن جديدة",
    description: "أكثر من 500 وجهة سياحية رائعة في مصر والعالم العربي",
    color: "#FF725E",
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 34 }} />,
    title: "تجارب فريدة",
    description: "أنشطة وفعاليات متنوعة تناسب جميع الأذواق والاهتمامات",
    color: "#4A72AC",
  },
  {
    icon: <LocalOfferIcon sx={{ fontSize: 34 }} />,
    title: "أسعار تنافسية",
    description: "عروض وخصومات حصرية على الرحلات والأنشطة المختلفة",
    color: "#FFC15E",
  },
  {
    icon: <StarIcon sx={{ fontSize: 34 }} />,
    title: "تقييمات حقيقية",
    description: "آراء وتجارب المسافرين السابقين لتساعدك في اختيار الأفضل",
    color: "#42B883",
  },
];

const Section2 = ({ theme, darkMode }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          py: { xs: 10, md: 12 },
          background: darkMode
            ? `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.card})`
            : "linear-gradient(135deg, #f5f7fa 0%, rgba(255,255,255,0.9) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Decorative elements */}
        <Box
          component={motion.div}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: { xs: "150px", md: "300px" },
            height: { xs: "150px", md: "300px" },
            borderRadius: "50%",
            border: `2px dashed ${theme.colors.primary}40`,
            zIndex: 0,
          }}
        />

        <Box
          component={motion.div}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            bottom: "5%",
            left: "10%",
            width: { xs: "100px", md: "200px" },
            height: { xs: "100px", md: "200px" },
            borderRadius: "50%",
            border: `2px dashed ${theme.colors.primary}30`,
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{ textAlign: "right" }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.2rem", md: "3rem" },
                    color: theme.colors.primary,
                    mb: 2,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  تجربة سفر لا مثيل لها
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      left: "10%",
                      right: "10%",
                      height: 4,
                      borderRadius: 2,
                      background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`,
                    }}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    color: theme.colors.text,
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  مع فسحة، الرحلة أصبحت أسهل وأكثر متعة. نقدم لك تجربة سفر
                  متكاملة مصممة خصيصاً لتناسب اهتماماتك وتفضيلاتك.
                </Typography>

                <Grid container spacing={3} sx={{ mb: 5 }}>
                  {favouritePlaces.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        component={motion.div}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          textAlign: "right",
                          gap: 2.5,
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "16px",
                            backgroundColor: `${feature.color}15`,
                            color: feature.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            boxShadow: `0 8px 20px ${feature.color}20`,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              mb: 1,
                              color: darkMode ? "#fff" : "#000",
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.colors.textSecondary,
                              lineHeight: 1.6,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      backgroundColor: theme.colors.primary,
                      color: darkMode ? "#000" : "#fff",
                      fontSize: "1.1rem",
                      py: 1.5,
                      px: 4,
                      borderRadius: "50px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      "&:hover": {
                        backgroundColor: darkMode ? "#F6B17A" : "#3B5898",
                      },
                    }}
                    endIcon={<ArrowBackIosIcon sx={{ fontSize: "1rem" }} />}
                  >
                    استكشف الوجهات
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                sx={{ position: "relative" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "400px", md: "500px" },
                    width: "100%",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                    transform: {
                      xs: "none",
                      md: "perspective(1000px) rotateY(-5deg)",
                    },
                  }}
                >
                  <Slider
                    {...{
                      dots: true,
                      infinite: true,
                      speed: 1000,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      autoplay: true,
                      autoplaySpeed: 5000,
                      fade: true,
                    }}
                  >
                    {images.map((img, i) => (
                      <Box
                        key={i}
                        sx={{
                          height: { xs: "400px", md: "500px" },
                          position: "relative",
                        }}
                      >
                        <Image
                          src={img}
                          alt={`Travel destination ${i + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(to top, ${
                              darkMode
                                ? "rgba(45,50,80,0.8)"
                                : "rgba(0,0,0,0.5)"
                            }, transparent 70%)`,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            padding: "30px",
                            textAlign: "right",
                            color: "#fff",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {
                              [
                                "استمتع بروعة الأقصر",
                                "شواطئ الغردقة الساحرة",
                                "سحر الإسكندرية",
                              ][i]
                            }
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              gap: 1,
                            }}
                          >
                            <Typography variant="body2">
                              {
                                [
                                  "رحلة تاريخية",
                                  "استرخاء والاستجمام",
                                  "ثقافة وترفيه",
                                ][i]
                              }
                            </Typography>
                            <Chip
                              label={["تاريخية", "شاطئية", "حضرية"][i]}
                              size="small"
                              sx={{
                                bgcolor: "rgba(255,255,255,0.2)",
                                color: "#fff",
                                backdropFilter: "blur(5px)",
                                fontWeight: "bold",
                                fontSize: "0.7rem",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Slider>
                </Box>

                {/* Interactive elements overlayed on the image */}
                <Box
                  component={motion.div}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  sx={{
                    position: "absolute",
                    top: "5%",
                    right: "10%",
                    padding: "12px",
                    borderRadius: "15px",
                    background: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    width: "150px",
                    zIndex: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        color: theme.colors.text,
                      }}
                    >
                      أماكن مقترحة
                    </Typography>
                    <AutoAwesomeIcon
                      sx={{ color: theme.colors.primary, fontSize: "1.1rem" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: theme.colors.textSecondary,
                      textAlign: "right",
                    }}
                  >
                    بناءً على تفضيلاتك السابقة
                  </Typography>
                </Box>

                <Box
                  component={motion.div}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                  sx={{
                    position: "absolute",
                    bottom: "15%",
                    left: "5%",
                    padding: "12px",
                    borderRadius: "15px",
                    background: darkMode
                      ? "rgba(246, 177, 122, 0.2)"
                      : "rgba(74, 114, 172, 0.1)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    zIndex: 5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          color: theme.colors.text,
                          textAlign: "right",
                        }}
                      >
                        الطقس رائع للسفر!
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: theme.colors.textSecondary,
                          textAlign: "right",
                        }}
                      >
                        28° - مشمس ومناسب للرحلات
                      </Typography>
                    </Box>
                    <WbSunnyIcon sx={{ color: "#FFC107", fontSize: "2rem" }} />
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

export default Section2;
