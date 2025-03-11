"use client";
import { Box, Button, Card, styled, Typography } from "@mui/material";
import { styled as stf, keyframes, css } from "styled-components";

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

const commonAnimation = css`
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const PageContainer = stf.div`
  padding: 2rem;
  margin-top: 5rem; /* Add margin to the top to not be so close to the nav bar */
`;

export const StyledWrapper = stf.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem; /* Decrease the gap between items */
  justify-content: center;

  .card-container {
    width: 20%; /* Decrease the size of the photos */
    height: 250px; /* Decrease the height of the photos */
    position: relative;
    border-radius: 15px;
    ${commonAnimation}
    transition: box-shadow 0.3s ease;
    overflow: hidden;

    @media (max-width: 1200px) {
      width: 40%;
    }
    @media (max-width: 768px) {
      width: 100%;
      margin: 0 auto;
    }
  }

  .card-container.selected {
    box-shadow: 0px 0px 15px 10px rgba(132, 224, 132, 0.7);
  }

  .card {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
    position: relative;
  }

  .img-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .img-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .checkbox {
    position: absolute;
    top: 12px;
    right: 12px; 
    width: 30px;
    height: 30px;
    z-index: 10;
    background-color: white;
    border: 3px solid green;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .checkbox::after {
    content: " ";
    font-size: 18px;
    color: green;
    display: none;
  }

  .checkbox:checked::after {
    display: block;
  }

  .checkbox:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  .content {
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

  .heading {
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
  ${commonAnimation}
`;

export const Title = styled(Typography)`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  ${commonAnimation}
`;

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-radius: 15px;
  ${commonAnimation}
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
  ${commonAnimation}
`;

export const TripTypeContainer = stf.div`
  width: 100%;
  margin: 0 auto;
`;

export const HeaderContainer = stf.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 7rem;
`;

export const HeaderTitle = stf.h1`
  color: #2C3E50;
  font-size: 44px;
  font-weight: bold;
`;

export const SearchContainer = stf.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

export const SearchInput = stf.input`
  width: 350px;
  height: 40px;
  margin-right: 13px;
  border-radius: 5px;
  border: 2px solid #FFA500;
  padding: 5px 15px;
  font-size: 28px;
  text-align: right;
`;

export const CountBadge = stf.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FFA500;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;

export const ButtonContainer = stf.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
`;

export const NextButton = stf.button`
  width: 150px;
  height: 40px;
  border-radius: 25px;
  background: #3498DB;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  ${commonAnimation}
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #2980B9;
    transform: scale(1.05);
  }
`;

export const SaveButton = stf.button`
  width: 110px;
  height: 40px;
  border-radius: 25px;
  background: #4caf50 ;
  margin-top:2rem;
  margin-right: 10px;
  margin-left: 10px;
  color: white;
  font-size: 1.5rem;
  border: 1px;
  cursor: pointer;
  ${commonAnimation}
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: white;
    color: #4caf50;
    border: 1.5px solid #4caf50;
    transform: scale(1.05);
  }
`;

export const CancelButton = stf.button`
  width: 110px;
  height: 40px;
  border-radius: 25px;
  background: #ef5350 ;
  margin-top:2rem;
  color: white;
  font-size: 1.5rem;
  border: 1px;
  cursor: pointer;
  ${commonAnimation}
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: white;
    color: #ef5350;
    border: 1.5px solid #ef5350;
    transform: scale(1.05);
  }
`;

export const BackButton = stf.button`
  width: 110px;
  height: 40px;
  border-radius: 25px;
  background: #ff9800 ;
  margin-top:2rem;
  margin-right: 10px;
  color: white;
  font-size: 1.5rem;
  border: 1px;
  cursor: pointer;
  ${commonAnimation}
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: white;
    color: #ff9800;
    border: 1.5px solid #ff9800;
    transform: scale(1.05);
  }
`;

export const ShareButton = stf.button`
  width: 110px;
  height: 40px;
  border-radius: 25px;
  background: #3498DB ;
  margin-top:2rem;
  margin-right: 10px;
  color: white;
  font-size: 1.5rem;
  border: 1px;
  cursor: pointer;
  ${commonAnimation}
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: white;
    color: #3498DB;
    border: 1.5px solid #3498DB;
    transform: scale(1.05);
  }
`;