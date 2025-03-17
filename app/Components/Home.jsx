"use client";
import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Pagination } from "swiper/modules";

import img1 from "../../public/1.jpg";
import img2 from "../../public/2.jpg";
import img3 from "../../public/3.jpg";
import img4 from "../../public/4.jpeg";
import { FaApple } from "react-icons/fa";
import downloadImg from "../../public/downloadImgbg.png";
import googlePlayIcon from "../../public/logo.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Feedback from "../../public/feedback.png";
import {
  CardsGrid,
  CardTitle,
  CategoriesContainer,
  CategoriesTitle,
  MainBox,
  RipponBox,
  SecondBox,
  SecondTextBox,
  SliderBox,
  TextBox,
  StyledCard,
  DownloadContainer,
  ImageContent,
  TextContent,
  StyledButtons,
  Title,
  DownloadBtn,
  StyledCard2,
} from "../styledComponent/home/styledHome";
import {
  CircleButton,
  StyledButton,
} from "../styledComponent/NavBar/StyledNavBar";

const images = [img1, img2, img3];

const MemoizedIconButton = React.memo(({ children, ...props }) => (
  <IconButton {...props}>{children}</IconButton>
));

const MemoizedTypography = React.memo(({ children, ...props }) => (
  <Typography {...props}>{children}</Typography>
));

const MemoizedBox = React.memo(({ children, ...props }) => (
  <Box {...props}>{children}</Box>
));

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://iti-server-production.up.railway.app/api/home");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("https://iti-server-production.up.railway.app/api/avatar");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchCategories();
    fetchTestimonials();
  }, []);

  const renderImages = useMemo(
    () =>
      images.map((src, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt={`Slide ${index}`}
            priority={index === 0} // Add priority to the first image (LCP)
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
            }}
          />
        </Box>
      )),
    []
  );

  const renderCategories = useMemo(
    () =>
      categories.map((category, index) => (
        <StyledCard
          className="card"
          key={index}
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <CardTitle>{category.title}</CardTitle>
        </StyledCard>
      )),
    [categories]
  );

  const renderTestimonials = useMemo(
    () =>
      testimonials?.map((testimonial, index) => (
        <SwiperSlide key={testimonial._id}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <StyledCard2 $index={index}>
              <CardContent>
                <Avatar
                  src={testimonial.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    mx: "auto",
                    border: "4px solid #004080",
                  }}
                />
                <MemoizedTypography variant="h6" sx={{ fontWeight: "bold" }}>
                  {testimonial.name}
                </MemoizedTypography>
                <Rating value={testimonial.rating} readOnly sx={{ mb: 1 }} />
                <MemoizedTypography sx={{ mt: 2 }}>
                  {testimonial.review}
                </MemoizedTypography>
              </CardContent>
            </StyledCard2>
          </motion.div>
        </SwiperSlide>
      )),
    [testimonials]
  );

  // Add this function inside your Home component
  const getSwiperSettings = (testimonialsCount) => {
    return {
      modules: [Pagination],
      pagination: { clickable: true },
      spaceBetween: 20,
      slidesPerView: 1,
      breakpoints: {
        480: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        969: {
          slidesPerView: Math.min(2, testimonialsCount || 1),
        },
        1200: {
          slidesPerView: Math.min(3, testimonialsCount || 1),
        },
      },
      centeredSlides: true,
      loop: testimonialsCount > 3, // Only enable loop when enough slides exist
    };
  };

  // If you still need swiperSettings for Slider component, define it here:
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  // Return a skeleton or simplified version during server-side rendering
  if (!mounted) {
    return (
      <MainBox>
        <Box style={{ minHeight: "100vh" }}></Box>
      </MainBox>
    );
  }

  // Your full component rendering for client-side only
  return (
    <>
      <MainBox>
        <TextBox textAlign="right" mb={4}>
          <MemoizedTypography
            variant="h3"
            fontWeight="bold"
            color="#dba15a"
            sx={{ fontSize: "2.75rem", fontWeight: 800 }}
          >
            أنشئ برنامج رحلتك المثالي
          </MemoizedTypography>
          <MemoizedTypography
            variant="h6"
            sx={{ mt: 2, fontSize: "1.5rem", fontWeight: 600 }}
          >
            خطط رحلتك بسهولة واكتشف أفضل الأماكن الرائعة للاستمتاع بفسحة جميلة
          </MemoizedTypography>
          <StyledButton sx={{ mt: 3 }}>إبدء رحلتك الأن</StyledButton>
        </TextBox>
        <SliderBox>
          <Slider
            {...sliderSettings}
            style={{ width: "100%", borderRadius: "20px" }}
          >
            {renderImages}
          </Slider>
        </SliderBox>
      </MainBox>
      <SecondBox>
        <SecondTextBox sx={{ mb: 5, mx: 5 }}>
          <MemoizedTypography
            variant="h3"
            fontWeight="bold"
            sx={{ mb: 2, fontSize: "2.75rem", fontWeight: 800 }}
            color="#dba15a"
          >
            رحلتك تبدأ هنا
          </MemoizedTypography>
          <MemoizedTypography
            variant="h5"
            sx={{ mb: 3, fontSize: "1.50rem", fontWeight: 600 }}
          >
            محتار هتروح فين؟ تعالى موجود أفضل برامج فسح ورحلات باختيار العملاء
          </MemoizedTypography>
          <CircleButton>اختر فسحتك</CircleButton>
        </SecondTextBox>
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", md: "50%" },
            borderRadius: "20px",
            overflow: "hidden",
            mx: 4,
          }}
        >
          <Image
            src={img4}
            alt="Beach Travel"
            style={{
              width: "100%",
              height: "auto", // Changed from fixed 500px height
              maxHeight: "500px", // Maximum height limit
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <RipponBox>احجز رحلتك دلوقتي</RipponBox>
        </Box>
      </SecondBox>
      <CategoriesContainer>
        <CategoriesTitle>أماكن هتفرحك وعمرك ما تنساها</CategoriesTitle>
        <CardsGrid>{renderCategories}</CardsGrid>
      </CategoriesContainer>
      <DownloadContainer>
        <ImageContent
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={downloadImg}
            alt="تحميل التطبيق"
            width={550}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "550px",
            }}
          />
        </ImageContent>
        <TextContent
          as={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title> ...حمل تطبيق فسحة متوفر الآن على </Title>
          <StyledButtons>
            <DownloadBtn
              as={motion.a}
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              <FaApple size={24} /> أبل ستور
            </DownloadBtn>
            <DownloadBtn
              as={motion.a}
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: "#4285F4",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              <Image
                src={googlePlayIcon}
                alt="Google Play"
                width={24}
                height={24}
                style={{ width: "auto", height: "auto" }} // Add this line
              />
              جوجل بلاي
            </DownloadBtn>
          </StyledButtons>
        </TextContent>
      </DownloadContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 2, sm: 4, md: 6 },
          bgcolor: "#f0f8ff",
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: "100vw",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              overflow: "hidden",
              maxWidth: { xs: "100%", sm: 400, md: 600 },
              mr: { xs: 0, md: 2 },
              ml: { xs: 0, md: 17 },
              mb: { xs: 3, md: 0 },
              px: { xs: 2, sm: 0 },
              boxSizing: "border-box",
            }}
          >
            <Image
              src={Feedback}
              alt="Customers"
              width={600}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
              }}
            />
          </Box>
        </motion.div>
        <Box
          sx={{
            flex: 3,
            maxWidth: { xs: "100%", md: "70rem" },
            textAlign: "right",
            mr: { xs: 0, md: 3 },
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <MemoizedTypography
            variant="h4"
            sx={{
              mb: 4,
              textAlign: "center",
              fontWeight: "bold",
              color: "#004080",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            تقييمات العملاء
          </MemoizedTypography>
          <Swiper
            {...getSwiperSettings(testimonials?.length || 0)}
            style={{
              padding: "15px",
              paddingBottom: "65px",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {renderTestimonials}
          </Swiper>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#144186",
          color: "white",
          py: { xs: 3, md: 1 },
          px: { xs: 2, md: 3 },
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            flexWrap: "wrap",
            maxWidth: 1700,
            mx: "auto",
            gap: { xs: 4, md: 0 },
          }}
        >
          <MemoizedBox
            sx={{
              marginBottom: 2,
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "inherit" },
              gap: 1,
            }}
          >
            <MemoizedTypography variant="h6" sx={{ fontWeight: "bold" }}>
              تواصل معنا
            </MemoizedTypography>
            <MemoizedTypography sx={{ display: "flex", gap: 2 }}>
              <PhoneIcon /> +02 255 345
            </MemoizedTypography>
            <MemoizedTypography sx={{ display: "flex", gap: 2 }}>
              <MailIcon /> Fusha@gmail.com
            </MemoizedTypography>
            <MemoizedTypography sx={{ display: "flex", gap: 2 }}>
              <LocationOnIcon /> Menofia @ ITI
            </MemoizedTypography>
          </MemoizedBox>

          <MemoizedBox sx={{ display: { xs: "none", md: "block" } }}>
            <MemoizedTypography
              variant="h4"
              sx={{ fontWeight: "bold", fontFamily: "cursive", p: 2 }}
            >
              --------------------------
            </MemoizedTypography>
          </MemoizedBox>

          <MemoizedBox>
            <MemoizedTypography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
              تابعنا على
            </MemoizedTypography>
            <MemoizedBox>
              <MemoizedIconButton sx={{ color: "white" }}>
                <FacebookIcon />
              </MemoizedIconButton>
              <MemoizedIconButton sx={{ color: "white" }}>
                <TwitterIcon />
              </MemoizedIconButton>
              <MemoizedIconButton sx={{ color: "white" }}>
                <InstagramIcon />
              </MemoizedIconButton>
              <MemoizedIconButton sx={{ color: "white" }}>
                <TelegramIcon />
              </MemoizedIconButton>
            </MemoizedBox>
          </MemoizedBox>
        </Box>
        <Box sx={{ borderTop: "1px solid white", mt: 2 }}>
          <MemoizedTypography sx={{ marginTop: 1.5, textAlign: "center" }}>
            &copy; 2024 جميع الحقوق محفوظة
          </MemoizedTypography>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Home);
