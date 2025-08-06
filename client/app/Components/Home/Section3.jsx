import React from "react";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// Import Icons
import ExploreIcon from "@mui/icons-material/Explore";
import { Container } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AttractionsIcon from "@mui/icons-material/Attractions";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import img1 from "../../../public/1.jpg";
import img2 from "../../../public/2.jpg";
import img3 from "../../../public/3.jpg";
import img4 from "../../../public/4.jpeg";

const favouritePlaces = [
  {
    num: "01",
    title: "حدد المكان",
    desc: "اختر المدينة أو الوجهة التي ترغب بزيارتها",
    color: "#FF725E",
    icon: <ExploreIcon sx={{ fontSize: 28 }} />,
  },
  {
    num: "02",
    title: "اختر الأماكن",
    desc: "تصفح واختر الأماكن التي تريد زيارتها من مختلف الفئات",
    color: "#4A72AC",
    icon: <AttractionsIcon sx={{ fontSize: 28 }} />,
  },
  {
    num: "03",
    title: "جدول الرحلة",
    desc: "احصل على خطة متكاملة لرحلتك مع الاحداثيات والتوقيتات",
    color: "#FFC15E",
    icon: <EventAvailableIcon sx={{ fontSize: 28 }} />,
  },
];

const Section3 = ({ theme, darkMode }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: darkMode
            ? `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.card})`
            : "linear-gradient(135deg, #f5f7fa 0%, rgba(255,255,255,0.8) 100%)",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box
                component={motion.div}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                sx={{ textAlign: "right" }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    mb: 3,
                    color: theme.colors.primary,
                    lineHeight: 1.2,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  رحلتك الفريدة
                  <span
                    style={{
                      display: "block",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    حسب اختيارك
                  </span>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -8,
                      right: 0,
                      width: "40%",
                      height: 4,
                      borderRadius: 2,
                      background: theme.colors.primary,
                      opacity: 0.8,
                    }}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    color: theme.colors.text,
                    mb: 5,
                  }}
                >
                  صمم رحلتك الخاصة بنقرات بسيطة. مع فسحة، اختر المدن، حدد أوقات
                  الزيارة، واكتشف الأماكن المفضلة لديك، كل ذلك في مكان واحد!
                </Typography>

                <Grid container spacing={2} sx={{ mb: 5, direction: "rtl" }}>
                  {favouritePlaces.map((step, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                      <Box
                        component={motion.div}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                        sx={{
                          p: 3,
                          borderRadius: "16px",
                          height: "100%",
                          boxShadow: darkMode
                            ? "none"
                            : "0 4px 20px rgba(0,0,0,0.05)",
                          background: darkMode
                            ? "rgba(66, 71, 105, 0.4)"
                            : "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          position: "relative",
                          overflow: "hidden",
                          border: `1px solid ${
                            darkMode
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.05)"
                          }`,
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            p: 1.5,
                            color: "#fff",
                            background: step.color,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            px: 2,
                            borderBottomLeftRadius: "8px",
                          }}
                        >
                          {step.num}
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 60,
                            height: 60,
                            borderRadius: "12px",
                            mb: 2,
                            ml: "auto",
                            mr: 0,
                            background: `${step.color}15`,
                            color: step.color,
                          }}
                        >
                          {step.icon}
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{
                            mb: 1.5,
                            fontWeight: "bold",
                            textAlign: "right",
                            color: theme.colors.text,
                          }}
                        >
                          {step.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "right",
                            color: theme.colors.textSecondary,
                          }}
                        >
                          {step.desc}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ textAlign: "right" }}>
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained"
                    sx={{
                      backgroundColor: theme.colors.primary,
                      color: darkMode ? "#000" : "#fff",
                      px: 4,
                      py: 1.5,
                      borderRadius: "50px",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                      "&:hover": {
                        backgroundColor: darkMode ? "#F6B17A" : "#3B5898",
                      },
                    }}
                    endIcon={<ArrowBackIosIcon sx={{ fontSize: 16 }} />}
                  >
                    ابدأ رحلتك الآن
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                component={motion.div}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                sx={{
                  position: "relative",
                  height: { xs: "400px", md: "500px" },
                  width: "100%",
                  perspective: "1000px",
                }}
              >
                {/* Isometric design for trip planning concept */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transform: {
                      xs: "none",
                      md: "rotateX(10deg) rotateY(-10deg)",
                    },
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Main map/background */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                      border: `8px solid ${
                        darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.8)"
                      }`,
                    }}
                  >
                    <Image
                      src={img4} // Use your map or destination image here
                      alt="Create your trip"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* Overlay with semi-transparent gradient */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${
                          darkMode
                            ? "rgba(45, 50, 80, 0.5)"
                            : "rgba(74, 114, 172, 0.3)"
                        } 0%, transparent 70%)`,
                      }}
                    />
                  </Box>

                  {/* Floating cards representing places */}
                  <Box
                    component={motion.div}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    sx={{
                      position: "absolute",
                      top: "15%",
                      right: "10%",
                      width: "160px",
                      height: "220px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                      transform: "rotate(-5deg)",
                      zIndex: 3,
                    }}
                  >
                    <Image
                      src={img1} // Use one of your destination images
                      alt="Destination"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "40px 15px 15px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                        الأقصر
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.8rem" }}>4.9</Typography>
                        <StarIcon
                          sx={{ fontSize: "0.9rem", color: "#FFC107" }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    component={motion.div}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    sx={{
                      position: "absolute",
                      bottom: "8%",
                      right: "32%",
                      width: "130px",
                      height: "180px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                      transform: "rotate(8deg)",
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src={img2} // Use one of your destination images
                      alt="Beach destination"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "40px 15px 15px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
                      >
                        الغردقة
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.7rem" }}>4.8</Typography>
                        <StarIcon
                          sx={{ fontSize: "0.8rem", color: "#FFC107" }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    component={motion.div}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    sx={{
                      position: "absolute",
                      top: "10%",
                      left: "35%",
                      width: "150px",
                      height: "200px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                      transform: "rotate(-10deg)",
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src={img3} // Use one of your destination images
                      alt="Cultural destination"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "40px 15px 15px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                        الإسكندرية
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.8rem" }}>4.7</Typography>
                        <StarIcon
                          sx={{ fontSize: "0.9rem", color: "#FFC107" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* User interface elements floating on top */}
                  <Box
                    component={motion.div}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                    sx={{
                      position: "absolute",
                      bottom: "15%",
                      left: "10%",
                      width: "180px",
                      padding: "15px",
                      borderRadius: "12px",
                      background: darkMode
                        ? "rgba(66, 71, 105, 0.8)"
                        : "rgba(255, 255, 255, 0.9)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                      backdropFilter: "blur(10px)",
                      zIndex: 5,
                      textAlign: "right",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        mb: 1,
                        color: theme.colors.text,
                      }}
                    >
                      أماكن مقترحة
                    </Typography>

                    {[1, 2, 3].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                          pb: 1,
                          borderBottom:
                            index < 2
                              ? `1px solid ${
                                  darkMode
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(0,0,0,0.05)"
                                }`
                              : "none",
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "8px",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={[img1, img2, img3][index % 3]}
                            alt="Place"
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        <Box sx={{ flex: 1, ml: "auto" }}>
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                              color: theme.colors.text,
                            }}
                          >
                            {["متحف المصري", "برج القاهرة", "الأهرامات"][index]}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <StarIcon
                              sx={{
                                fontSize: "0.6rem",
                                color: "#FFC107",
                                mr: 0.5,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "0.6rem",
                                color: theme.colors.textSecondary,
                              }}
                            >
                              {["4.8", "4.7", "4.9"][index]}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
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

export default Section3;
