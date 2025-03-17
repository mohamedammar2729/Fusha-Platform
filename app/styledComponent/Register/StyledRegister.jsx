"use client";
import styled, { keyframes, css } from "styled-components";
import Button from "@mui/material/Button";
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

export const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 90%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    height: 47rem;
    border-radius: 25px;
    margin-top: 7rem;
  }
`;

export const LeftSection = styled.div`
  position: relative;
  height: 190px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (min-width: 480px) {
    height: 220px;
  }

  @media (min-width: 768px) {
    flex: 1;
    height: auto;
    border-radius: 25px 0 0 25px;
  }

  .background-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(4px);
    }
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    width: 200px;
    height: auto;

    @media (min-width: 480px) {
      width: 250px;
    }

    @media (min-width: 768px) {
      width: 300px;
    }

    @media (min-width: 992px) {
      width: 400px;
    }
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 0 0 15px 15px;
  margin: 0;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (min-width: 768px) {
    border-radius: 0 25px 25px 0;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 15px 15px;
  text-align: center;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (min-width: 480px) {
    padding: 25px;
  }

  @media (min-width: 768px) {
    padding: 30px 40px;
    border-radius: 0 25px 25px 0;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;

    @media (min-width: 480px) {
      font-size: 1.75rem;
    }

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  form {
    width: 100%;
    position: relative;
    padding-bottom: 10px; /* Add some bottom padding for absolute positioned elements */
  }

  /* Add more vertical spacing between form fields */
  .MuiTextField-root {
    margin-bottom: 20px !important; /* Increased from 1rem to account for helper text */
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  background-color: #4b72ad;
  color: white;
  font-size: 16px;
  border-radius: 25px;
  transition: transform 0.5s ease, background 0.5s ease, box-shadow 0.5s ease;
  padding: 8px 16px;

  &:hover {
    background-color: #3b5998;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 480px) {
    font-size: 18px;
    padding: 6px 20px;
  }

  @media (min-width: 768px) {
    width: 80%;
    font-size: 20px;
  }
`;

export const StyledTextField = styled(TextField)`
  text-align: right;
  transition: all 0.5s ease-in-out;
  width: 100%;
  margin-bottom: 1rem !important;
  position: relative;

  /* Keep consistent spacing regardless of helper text */
  & .MuiFormHelperText-root {
    position: absolute;
    bottom: -20px;
    right: 14px;
    margin: 0;
    min-height: 1.25em;
    line-height: 1.25;
    font-size: 0.75rem;
    visibility: ${(props) => (props.error ? "visible" : "hidden")};
  }

  & .MuiInputBase-input {
    text-align: right;
    font-size: 0.9rem;

    @media (min-width: 480px) {
      font-size: 1rem;
    }
  }

  & .MuiOutlinedInput-root {
    border-radius: 25px;
    transition: border-color 0.3s ease;
    margin-left: 8px;
    margin-right: auto;

    &:hover fieldset {
      border-color: #3b5998;
    }

    &.Mui-focused fieldset {
      border-color: #3b5998;
    }
  }

  & .MuiInputLabel-root {
    right: 0;
    transform-origin: top right;
    color: #555;
    font-size: 0.9rem;

    @media (min-width: 480px) {
      font-size: 1rem;
    }
  }

  & .MuiInputLabel-shrink {
    transform: translate(-8px, -10px) scale(0.75);
  }

  & .MuiOutlinedInput-root fieldset {
    text-align: right;
    justify-content: space-between;
  }

  & .MuiInputAdornment-positionEnd {
    margin-left: -98%;
    margin-right: 90%;
  }

  /* Hide the asterisk */
  & .MuiFormLabel-asterisk {
    display: none;
  }
`;

import Link from "next/link";

export const StyledLink = styled(Link).attrs(() => ({
  passHref: true,
}))`
  text-decoration: none;
  color: #e38e49;
  margin-right: 10px;
  font-weight: 600;
  font-size: 0.9rem;

  @media (min-width: 480px) {
    font-size: 1rem;
  }

  &:hover {
    text-decoration: underline;
    color: #59c2f0;
  }

  ${(props) => props.$sx && css(props.$sx)}
`;
