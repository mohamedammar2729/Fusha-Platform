"use client";
import { Box, Button, Card, styled, Typography } from "@mui/material";
import { styled as stf, keyframes, css } from "styled-components";
import TextField from "@mui/material/TextField";

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
  padding: 1rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    margin-top: 2rem;
  }
`;

export const StyledWrapper = stf.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;

  .card-container {
    width: 20%;
    height: 250px;
    position: relative;
    border-radius: 15px;
    ${commonAnimation}
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    overflow: hidden;

    @media (max-width: 1200px) {
      width: 30%;
      height: 220px;
    }
    
    @media (max-width: 992px) {
      width: 45%;
    }
    
    @media (max-width: 768px) {
      width: 45%;
      height: 200px;
    }
    
    @media (max-width: 576px) {
      width: 100%;
      height: 200px;
      max-width: 320px; /* Add max-width for better appearance */
      margin: 0 auto 1rem auto; /* Add bottom margin for spacing */
    }
    
    &:hover {
      transform: translateY(-5px);
    }
  }

  .card-container.selected {
    box-shadow: 0px 0px 15px 10px ${(props) => props.themeColor};
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
    
    @media (max-width: 768px) {
      width: 25px;
      height: 25px;
    }
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
    background: rgba(0, 0, 0, 0.4);
  }

  .heading {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 768px) {
      font-size: 26px;
    }
  }

  .card:hover .content,
  .card:active .content {
    opacity: 1;
    transform: translateY(0);
  }

  .card:hover .img-content,
  .card:active .img-content {
    filter: blur(3px);
  }

  .card:hover .img-content svg,
  .card:active .img-content svg {
    fill: transparent;
  }
  
  /* Support for touch devices */
  @media (hover: none) {
    .card .content {
      opacity: 1;
      transform: translateY(0);
      background: rgba(0, 0, 0, 0.5);
    }
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
  justify-content: center;
  padding: 0 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const HeaderTitle = stf.h1`
  color: #2C3E50;
  font-size: 44px;
  font-weight: bold;
  text-align: center;
  
  @media (max-width: 992px) {
    font-size: 36px;
  }
  
  @media (max-width: 768px) {
    font-size: 30px;
  }
  
  @media (max-width: 576px) {
    font-size: 24px;
  }
`;

export const SearchContainer = stf.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 0 10px;
  }
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
  
  @media (max-width: 768px) {
    width: 250px;
    height: 35px;
    font-size: 20px;
  }
  
  @media (max-width: 576px) {
    width: 100%;
    font-size: 16px;
    margin-right: 8px;
  }
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
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`;

export const ButtonContainer = stf.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px 10px;
  }
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
  
  @media (max-width: 576px) {
    width: 120px;
    height: 35px;
    font-size: 14px;
  }
`;

export const SaveButton = stf.button`
  width: 110px;
  height: 40px;
  border-radius: 25px;
  background: #4caf50;
  margin-top: 2rem;
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
  
  @media (max-width: 768px) {
    width: 100px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  @media (max-width: 576px) {
    width: 90px;
    height: 35px;
    font-size: 1rem;
    margin-right: 5px;
    margin-left: 5px;
  }
`;

export const CancelButton = stf.button`
  width: 110px;
  height: 40px;
  border-radius: 25px;
  background: #ef5350;
  margin-top: 2rem;
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
  
  @media (max-width: 768px) {
    width: 100px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  @media (max-width: 576px) {
    width: 90px;
    height: 35px;
    font-size: 1rem;
  }
`;

export const BackButton = stf.button`
  width: 110px;
  height: 40px;
  border-radius: 25px;
  background: #ff9800;
  margin-top: 2rem;
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
  
  @media (max-width: 768px) {
    width: 100px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  @media (max-width: 576px) {
    width: 90px;
    height: 35px;
    font-size: 1rem;
    margin-right: 5px;
  }
`;

export const ShareButton = stf.button`
  width: 110px;
  height: 40px;
  border-radius: 25px;
  background: #3498DB;
  margin-top: 2rem;
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
  
  @media (max-width: 768px) {
    width: 100px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  @media (max-width: 576px) {
    width: 90px;
    height: 35px;
    font-size: 1rem;
    margin-right: 5px;
  }
`;


export const StyledTextField = styled(TextField)`
  width: 100%;
  transition: all 0.3s ease;

  & .MuiInputBase-input {
    text-align: right;
    font-size: 0.95rem;
    color: ${(props) => (props.$darkMode ? "#FFFFFF" : "#000000")};
    padding: 14px 16px;

    /* Style number input spinners */
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      opacity: 1;
      filter: ${(props) =>
        props.$darkMode ? "invert(0.7) brightness(1.2) saturate(1)" : "none"};
      color: ${(props) => (props.$darkMode ? "#AAB2D5" : "#555")};
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "#f7f9fc"};
    }

    /* Target autofill state */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-internal-autofill-selected {
      -webkit-text-fill-color: ${(props) =>
        props.$darkMode ? "#FFFFFF" : "#000000"};
      -webkit-box-shadow: 0 0 0px 1000px
        ${(props) =>
          props.$darkMode ? "rgba(66, 71, 105, 0)" : "rgba(247, 249, 252, 0)"}
        inset;
      transition: background-color 5000s ease-in-out 0s;
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }
  }

  /* Remove duplicate input props */
  & .MuiOutlinedInput-root {
    border-radius: 10px;
    transition: all 0.3s ease;
    background-color: ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "#f7f9fc"};

    /* Configure layout direction for proper RTL display */
    flex-direction: row-reverse;
    padding-right: 16px;
    &:hover {
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.08)" : "#f0f4f8"};
    }

    &.Mui-focused {
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.1)" : "#e8f0fe"};
    }

    /* Ensure fieldset border spacing works with RTL */
    & .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) =>
        props.$darkMode ? "#7077A1" : "rgba(0, 0, 0, 0.23)"};
      text-align: right;
      border-radius: 10px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }
  }

  /* Rest of the existing styling */
  & .MuiInputLabel-root {
    color: ${(props) => (props.$darkMode ? "#AAB2D5" : "#555")};
    font-size: 0.95rem;
    transform-origin: right top;
    transform: translate(0, 16px) scale(1);
    right: 16px;
    left: auto;

    &.Mui-focused {
      color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }
  }

  & .MuiInputLabel-shrink {
    transform: translate(0, -6px) scale(0.75);
    transform-origin: right top;
  }

  & .MuiFormHelperText-root {
    margin-top: 4px;
    text-align: right;
    color: ${(props) => (props.$darkMode ? "#f6b17a" : "#d32f2f")};
  }

  & .MuiInputAdornment-root {
    margin-left: 8px;
    margin-right: 0;
  }

  & .MuiInputAdornment-positionStart,
  & .MuiInputAdornment-positionEnd {
    margin-left: 8px;
    margin-right: 0;
  }

  & .MuiOutlinedInput-input {
    padding-right: 0;
    padding-left: 14px;
  }
`;