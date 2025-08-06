"use client";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { styled as stf, keyframes } from "styled-components";

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const buttonHover = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledWrapper = stf.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
  justify-content: space-between;


  .card-container {
    width: 22.5%;
    height: 300px;
    position: relative;
    border-radius: 10px;
    animation: ${fadeIn} 0.6s ease-in-out;

    @media (max-width: 1200px) {
      width: 45%; /* 2 cards per row for medium screens */
      height: 280px; /* Slightly reduced height */
    }

    @media (max-width: 768px) {
      width: 100%; /* 1 card per row for small screens */
      height: 260px; /* Further reduced height */
      max-width: 450px; /* Add max-width for better appearance */
      margin: 0 auto;
    }

    @media (max-width: 480px) {
      height: 240px; /* Even smaller height for mobile */
    }
  }

  .card-container::before {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
  }

  .card {
    
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
  }

  .card .img-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card .img-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e8e8e8;
    line-height: 1.5;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(50px);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .card .content .heading {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
  }

  .card:hover .content {
    opacity: 1;
    transform: translateY(0);
  }

  .card:hover .img-content {
    filter: blur(3px);
  }

  .card:hover .img-content svg {
    fill: transparent;
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const Title = styled(Typography)`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #e1efff;
  border-radius: 15px;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const CircleButton = styled(Button)`
  background-color: #ffffff;
  border-radius: 25px;
  border: 1px solid #0a3981;
  color: #0a3981;
  font-size: 20px;
  padding: 5px 1rem;
  margin: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    animation: ${buttonHover} 0.6s ease-in-out;
  }
`;
