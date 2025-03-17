import { styled, keyframes } from "@mui/system";
import Box from "@mui/material/Box";
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

// Use proper MUI styled API for TextBox
export const TextBox = styled(Box)(({ theme, textAlign, mb }) => ({
  flex: 1,
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  margin: "3rem 1rem",
  justifyContent: "center",
  alignItems: textAlign === "right" ? "flex-end" : "flex-start",
  marginBottom: mb ? `${mb * 8}px` : "0",
  animation: `${slideIn} 1s ease-in-out`,

  [theme.breakpoints.up("sm")]: {
    margin: "0 2rem",
    minHeight: "350px",
  },

  [theme.breakpoints.up("md")]: {
    flex: 3.8,
    margin: "0 5rem",
    minHeight: "400px",
  },
}));

// Update SliderBox to prevent overflow
export const SliderBox = styled(Box)`
  flex: 1;
  min-width: 0;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.2rem;
  padding: 10px;
  border-radius: 20px;
  overflow: hidden;

  @media (min-width: 600px) {
    padding: 20px;
  }

  @media (min-width: 960px) {
    flex: 8;
    padding: 0 24px;
    justify-content: end;
  }

  animation: ${fadeIn} 1s ease-in-out;
`;

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

export const SecondTextBox = styled(Box)`
  flex: 1;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  justify-content: center;
  align-items: end;
  @media (min-width: 600px) {
    margin-right: 1.5rem;
    min-height: 350px;
  }
  @media (min-width: 960px) {
    flex: 3.8;
    margin-right: 2rem;
    min-height: 400px;
  }
  animation: ${slideIn} 1s ease-in-out;
`;

// Update SecondBox to prevent overflow
export const SecondBox = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 15px 5px;
  align-items: center;
  justify-content: center;
  box-shadow: 3;
  gap: 6px;
  border-radius: 20px;
  width: 95%;
  max-width: 100%;
  margin: 0px auto;
  overflow-x: hidden;
  box-sizing: border-box;

  @media (min-width: 600px) {
    padding: 10px;
  }

  @media (min-width: 960px) {
    flex-direction: row;
    padding: 3px;
  }
`;

export const RipponBox = styled(Box)`
  position: absolute;
  display: none;
  @media (min-width: 600px) {
    display: block;
    top: 39px;
    right: -110px;
    padding: 10px 100px;
    font-size: 16px;
  }
  @media (min-width: 960px) {
    right: -78px;
    padding: 10px 119px;
    font-size: 20px;
  }
  background-color: red;
  color: white;
  transform: rotate(30deg);
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 2;
`;

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
  height: 200px;
  margin: 0 auto;
  
  @media (min-width: 600px) {
    height: 220px;
  }
  
  @media (min-width: 960px) {
    height: 250px;
  }
  
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center center;
  will-change: transform, filter;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: inherit;
    background-size: inherit;
    background-position: inherit;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1;
    filter: brightness(0.9);
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
    
    &::after {
      filter: blur(5px) brightness(0.8);
      backdrop-filter: contrast(1.2);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CardTitle = stf.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 2;
  will-change: opacity, transform;
  letter-spacing: 1px;
  text-align: center;
  line-height: 1.3;
  padding: 8px;
  width: 100%;

  ${StyledCard}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(-10px);
  }
`;

/* -------------------------3-------------------------------------- */

// Update DownloadContainer to prevent overflow
export const DownloadContainer = stf.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;
  padding: 30px 15px;
  background-color: #f4fafd;
  border-radius: 15px;
  width: 95%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  overflow-x: hidden;

  @media (min-width: 600px) {
    gap: 30px;
    padding: 40px 20px;
  }

  @media (min-width: 960px) {
    gap: 40px;
    padding: 60px 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const TextContent = stf.div`
  text-align: right;
  max-width: 400px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Title = stf.h2`
  font-size: 1.5rem;
  color: #1e3a8a;
  font-weight: bold;
  margin-bottom: 25px;
  
  @media (min-width: 600px) {
    font-size: 1.75rem;
    margin-bottom: 35px;
  }
  
  @media (min-width: 960px) {
    font-size: 2rem;
    margin-bottom: 50px;
  }
`;

export const StyledButtons = stf.div`
  display: flex;
  gap: 20px;

  @media (min-width: 600px) {
    gap: 30px;
  }

  @media (min-width: 960px) {
    gap: 45px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const DownloadBtn = stf.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 40px;
  text-decoration: none;
  transition: all 0.1s ease-in-out;

  @media (min-width: 600px) {
    font-size: 1.3rem;
    padding: 10px 18px;
  }

  @media (min-width: 960px) {
    font-size: 1.5rem;
    padding: 12px 20px;
  }

  &:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
  }
`;

// Update ImageContent in styledHome.jsx
export const ImageContent = stf.div`
  width: 100%;
  max-width: 550px;
  
  img {
    width: 100%;
    height: auto;
    max-width: 350px;
    
    @media (min-width: 600px) {
      max-width: 450px;
    }
    
    @media (min-width: 960px) {
      max-width: 550px;
    }
  }
`;

/* -------------------------4-------------------------------------- */
export const StyledCard2 = stf.div`
  padding: 16px;
  min-height: 320px;
  min-width: 315px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  background-color: ${({ $index }) => ($index % 2 === 0 ? "white" : "#1b5fa3")};
  color: ${({ $index }) => ($index % 2 === 0 ? "#000" : "#fff")};
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

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
