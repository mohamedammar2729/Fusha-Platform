import { styled, keyframes } from "@mui/system";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"; // Add Card import
import { styled as stf } from "styled-components";
import { Pagination } from "swiper/modules";

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Proper way to extend MUI Box
export const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  width: "100%",
  maxWidth: "100%",
  overflow: "hidden",
  boxSizing: "border-box",
  height: "auto",
  backgroundColor: "#f4fafd",
  borderRadius: "20px",
  animation: `${fadeIn} 1s ease-in-out`,

  [theme.breakpoints.up("md")]: {
    flexDirection: "row-reverse",
    height: "80vh",
    padding: 0,
  },
}));





export const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};






/* -------------------------2-------------------------------------- */

// Update CategoriesContainer for proper box sizing
export const CategoriesContainer = stf.div`
  text-align: center;
  padding: 60px 20px;
  background-color: #f4fafd;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

export const CategoriesTitle = stf.h2`
  font-size: 2rem;
  color: #1e3a8a;
  margin-bottom: 50px;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

// Update CardsGrid to prevent overflow
export const CardsGrid = stf.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  justify-content: center;
  padding: 20px 10px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    padding: 30px 10px;
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding: 40px 10px;
  }
`;

export const StyledCard = stf.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  height: 250px;
  margin: 0 auto;
  
  @media (min-width: 600px) {
    height: 280px;
  }
  
  @media (min-width: 960px) {
    height: 300px;
  }
  
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.12);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center center;
  will-change: transform, filter;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
    z-index: 1;
    opacity: 0.8;
    transition: opacity 0.5s ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: inherit;
    background-size: inherit;
    background-position: inherit;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 0;
  }

  &:hover {
    transform: scale(1.03) translateY(-10px);
    box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 0.5;
    }
    
    &::after {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CardTitle = stf.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 2;
  will-change: transform;
  text-align: right;
  padding: 8px 0;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    right: 0;
    width: 0;
    height: 3px;
    background: #F6B17A;
    transition: width 0.3s ease;
  }

  ${StyledCard}:hover & {
    transform: translateY(-5px);
    
    &::after {
      width: 70%;
    }
  }
`;


/* -------------------------4-------------------------------------- */

// Update StyledCard2 to properly access theme and dark mode
export const StyledCard2 = styled(Card)(({ theme, $index, $darkMode }) => ({
  maxWidth: 350,
  minHeight: 220,
  margin: "10px auto",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  background: $darkMode ? theme.colors?.card || "#424769" : "#ffffff",
  color: $darkMode ? theme.colors?.text || "#FFFFFF" : "#000000",
  borderRadius: "15px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
  },
}));

// Update Swiper settings to prevent overflow
export const swiperSettings = {
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
      slidesPerView: 2, // Remove dynamic Math.min with testimonials
    },
    1200: {
      slidesPerView: 3, // Remove dynamic Math.min with testimonials
    },
  },
  centeredSlides: true,
  // Remove loop setting that might reference testimonials
};

