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

export const MainBox = styled(Box)`
  display: flex;
  top: 0;
  flex-direction: column;
  @media (min-width: 960px) {
    flex-direction: row-reverse;
    height: 80vh;
  }
  height: auto;
  overflow: hidden;
  background-color: #f4fafd;
  /* padding-left: 5px; */
  /* padding-right: 5px; */
  border-radius: 20px;
  width: 100%;
  animation: ${fadeIn} 1s ease-in-out;
  .css-1vvgi7 {
    height: 800px;
    align-items: center;
  }
`;

export const TextBox = styled(Box)`
  flex: 1;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  margin: 0 5rem;
  justify-content: center;
  align-items: end;
  @media (min-width: 960px) {
    flex: 3.8;
  }
  animation: ${slideIn} 1s ease-in-out;
`;

export const SliderBox = styled(Box)`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 24px;
  border-radius: 20px;
  @media (min-width: 960px) {
    flex: 8;
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
  min-height: 400px;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  justify-content: center;
  align-items: end;
  @media (min-width: 960px) {
    flex: 3.8;
  }
  animation: ${slideIn} 1s ease-in-out;
`;

export const SecondBox = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  @media (min-width: 960px) {
    flex-direction: row;
  }
  align-items: center;
  justify-content: center;
  box-shadow: 3;
  padding: 3px;
  gap: 6px;
  border-radius: 20px;
  width: 95%;
  margin: 0px auto;
`;
export const RipponBox = styled(Box)`
  position: absolute;
  top: 39px;
  right: -78px;
  background-color: red;
  color: white;
  padding: 10px 119px;
  transform: rotate(30deg);
  font-weight: bold;
  font-size: 20px;
  white-space: nowrap;
  box-shadow: 2;
`;
/* -------------------------2-------------------------------------- */

export const CategoriesContainer = stf.div`
  text-align: center;
  padding: 60px 20px;
  background-color: #f4fafd;
`;

export const CategoriesTitle = stf.h2`
  font-size: 2rem;
  color: #1e3a8a;
  margin-bottom: 50px;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

export const CardsGrid = stf.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-content: center;
  padding: 40px 10px;
  margin: 0 auto;
  max-width: 1200px;
`;

export const StyledCard = stf.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  height: 250px;
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

export const DownloadContainer = stf.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 40px;
  padding: 60px 20px;
  background-color: #f4fafd;
  border-radius: 15px;

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
  font-size: 2rem;
  color: #1e3a8a;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const StyledButtons = stf.div`
  display: flex;
  gap: 45px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const DownloadBtn = stf.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 40px;
  text-decoration: none;
  transition: all 0.1s ease-in-out;

  &:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
  }
`;

export const ImageContent = stf.div`
  img {
    width: 550px;
    max-width: 100%;
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

export const swiperSettings = {
  modules: [Pagination],
  pagination: { clickable: true },
  spaceBetween: 20,
  slidesPerView: 3,
  centeredSlides: true,
  loop: true,
};
