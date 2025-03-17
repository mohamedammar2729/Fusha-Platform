import { styled } from "@mui/material/styles";
import { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const MyMyBox = styled("div")`
  padding: 2rem;
  max-width: 865px;
  margin: 8px auto 2rem;
  animation: ${fadeIn} 0.6s ease-in-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 90%;
    margin: 7rem auto 1.5rem;
  }

  @media (max-width: 568px) {
    padding: 2rem;
    max-width: 95%;
    margin: 6rem auto 1rem;
  }
`;


export const TripCard = styled("div")`
  background: white;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
`;

export const CarouselContainer = styled("div")`
  background: white;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
  height: auto;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slick-dots {
    bottom: 10px;

    li button:before {
      color: white;
      opacity: 0.7;
    }
    li.slick-active button:before {
      opacity: 1;
    }
  }
`;
export const CarouselImage = styled("div")`
  height: 400px;
  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 568px) {
    height: 220px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const GradientOverlay = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  @media (max-width: 568px) {
    height: 50px;
    padding: 10px;
  }
`;

export const StatusBadge = styled("div")`
  display: flex;
  align-items: center;
  background-color: ${({ status }) =>
    status === "completed"
      ? "#4CAF50"
      : status === "cancelled"
      ? "#F44336"
      : "#2196F3"};
  border-radius: 18px;
  padding: 6px 12px;
  color: white;

  span {
    font-size: 12px;
    margin-right: 5px;

    @media (max-width: 568px) {
      font-size: 10px;
    }
  }

  svg {
    font-size: 16px;

    @media (max-width: 568px) {
      font-size: 14px;
    }
  }

  @media (max-width: 568px) {
    padding: 4px 8px;
  }
`;

export const DetailsContainer = styled("div")`
  padding: 20px;
  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 568px) {
    padding: 12px;
  }
`;

export const DetailRow = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }
`;

export const DetailItem = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  background: rgba(74, 114, 172, 0.08);
  padding: 10px 15px;
  border-radius: 12px;
  min-width: 45%;
  transition: all 0.3s ease;

  span {
    font-size: 14px;
    color: #2d3748;
    margin-right: 10px;
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 568px) {
      font-size: 12px;
    }
  }

  svg {
    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 568px) {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
  }

  @media (max-width: 568px) {
    padding: 6px 10px;
  }
`;

export const TimelineSection = styled("div")`
  border-top: 1px solid #f0f0f0;
  padding: 20px 0;

  @media (max-width: 768px) {
    padding: 15px 0;
  }

  @media (max-width: 568px) {
    padding: 12px 0;
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3250;
    margin-bottom: 15px;
    text-align: right;
    @media (max-width: 768px) {
      font-size: 16px;
      margin-bottom: 12px;
    }

    @media (max-width: 568px) {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
`;

export const TimelineItem = styled("div")`
  position: relative;
  display: flex;
  align-items: center;

  margin-bottom: 20px;
  padding-right: 24px;
  @media (max-width: 568px) {
    margin-bottom: 15px;
    padding-right: 18px;
  }

  span {
    font-size: 14px;
    color: #4a5568;
    font-weight: 500;
    text-align: right;
    flex-grow: 1;

    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 568px) {
      font-size: 12px;
    }
  }
`;

export const TimelineDot = styled("div")`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #4a72ac;
  margin-left: 10px;
  flex-shrink: 0;
  @media (max-width: 568px) {
    width: 10px;
    height: 10px;
    margin-left: 8px;
  }
`;

export const TimelineLine = styled("div")`
  position: absolute;
  left: 6px;
  top: 20px;
  width: 2px;
  height: 25px;
  background-color: #4a72ac;
  opacity: 0.3;
  @media (max-width: 568px) {
    left: 5px;
    top: 15px;
    height: 20px;
  }
`;
