"use client";
import styled, { keyframes, css } from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Link from "next/link";

// Animations
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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(246, 177, 122, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(246, 177, 122, 0);
  }
  100% {
    transform: scale(1);
  }
`;

// Main container
export const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 95%;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  background: ${(props) => props.theme?.colors?.surface || "#ffffff"};
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    height: auto;
    min-height: 600px;
    border-radius: 25px;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 1024px) {
    min-height: 700px;
    height: auto; /* Changed from fixed height to auto */
    margin-top: 6rem;
  }
`;

// Left section with image and branding
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
    flex: 1.2;
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

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.7) 100%
      );
      backdrop-filter: blur(1px);
    }
  }

  .left-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    color: white;
    text-align: center;

    @media (min-width: 768px) {
      padding: 40px;
      align-items: center;
      text-align: right;
      justify-content: flex-start;
    }

    .logo {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
      margin-bottom: 20px;

      @media (min-width: 768px) {
        margin-bottom: 40px;
      }
    }

    .promo-content {
      display: none;

      @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
      }

      .promo-title {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      }

      .promo-text {
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      .benefits {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
        direction: rtl;

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;

          .benefit-icon {
            border-radius: 50%;
            padding: 4px;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;

// Right section with form
export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme?.colors?.surface || "#ffffff"};
  border-radius: 0 0 15px 15px;
  margin: 0;
  padding: 20px 0;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
  overflow-y: auto; /* Add overflow-y: auto */
  max-height: 100vh; /* Limit max height */

  @media (min-width: 768px) {
    flex: 1.8;
    border-radius: 0 25px 25px 0;
    padding: 30px 0;
  }
`;

// Form container
export const FormContainer = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme?.colors?.surface || "#ffffff"};
  border-radius: 0 0 15px 15px;
  text-align: center;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
  overflow-y: visible; /* Ensure content is visible */

  @media (min-width: 480px) {
    padding: 25px;
  }

  @media (min-width: 768px) {
    padding: 30px 40px;
    border-radius: 0 25px 25px 0;
  }

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
    color: ${(props) => props.theme?.colors?.text || "#333"};
    font-weight: 600;

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
    padding-bottom: 10px;
  }
`;

// Form page container for each step
export const FormPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;

  .form-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    gap: 10px;

    & > button {
      flex: 1;
    }
  }

  .user-type-selection {
    margin: 20px 0;

    .user-type-options {
      display: flex;
      flex-direction: column;
      gap: 15px;

      @media (min-width: 600px) {
        flex-direction: row;
        gap: 20px;
      }

      .type-option {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px;
        border-radius: 12px;
        border: 2px solid #eaeaea;
        transition: all 0.3s ease;
        cursor: pointer;

        &.active {
          border-color: ${(props) => props.theme?.colors?.primary || "#3b5998"};
          background-color: ${(props) =>
            props.theme?.darkMode
              ? "rgba(246, 177, 122, 0.1)"
              : "rgba(75, 114, 173, 0.05)"};
        }

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
`;

// Form header
export const FormHeader = styled(Typography)`
  text-align: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme?.colors?.primary || "#3b5998"};
  position: relative;
  font-weight: 600;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background-color: ${(props) => props.theme?.colors?.primary || "#3b5998"};
  }
`;

// Progress tracker container
export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  width: 90%;
  max-width: 300px;
`;

// Progress step indicator
export const ProgressStep = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.$active
      ? props.$darkMode
        ? "#000"
        : "#fff"
      : props.$darkMode
      ? props.theme?.colors?.textSecondary
      : "#777"};
  background-color: ${(props) =>
    props.$active
      ? props.$darkMode
        ? props.theme?.colors?.accent
        : props.theme?.colors?.primary
      : "transparent"};
  border: 2px solid
    ${(props) =>
      props.$active
        ? props.$darkMode
          ? props.theme?.colors?.accent
          : props.theme?.colors?.primary
        : props.$darkMode
        ? props.theme?.colors?.textSecondary
        : "#ddd"};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  transition: all 0.3s ease;
  z-index: 1;

  ${(props) =>
    props.$active &&
    css`
      animation: ${pulse} 1s ease-in-out;
    `}
`;

// Connector between steps
export const StepConnector = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${(props) =>
    props.$active
      ? props.$darkMode
        ? props.theme?.colors?.accent
        : props.theme?.colors?.primary
      : props.$darkMode
      ? props.theme?.colors?.textSecondary
      : "#ddd"};
  transition: background-color 0.3s ease;
  margin: 0 5px;
`;

// Button styling
export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  background-color: ${(props) =>
    props.$secondary
      ? "transparent"
      : props.$darkMode
      ? props.theme?.colors?.accent
      : props.theme?.colors?.primary};
  color: ${(props) =>
    props.$secondary
      ? props.$darkMode
        ? props.theme?.colors?.accent
        : props.theme?.colors?.primary
      : "white"};
  border: ${(props) =>
    props.$secondary
      ? `1px solid ${
          props.$darkMode
            ? props.theme?.colors?.accent
            : props.theme?.colors?.primary
        }`
      : "none"};
  font-size: 16px;
  border-radius: 10px;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  padding: 10px 16px;
  font-weight: 500;
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${(props) =>
      props.$secondary
        ? props.$darkMode
          ? "rgba(246, 177, 122, 0.1)"
          : "rgba(75, 114, 173, 0.05)"
        : props.$darkMode
        ? "#f7c093"
        : "#3b5998"};
    transform: translateY(-3px);
    box-shadow: ${(props) =>
      props.$secondary ? "none" : "0 4px 8px rgba(0, 0, 0, 0.15)"};
  }

  &:disabled {
    background-color: ${(props) => (props.$secondary ? "transparent" : "#ccc")};
    color: ${(props) => (props.$secondary ? "#999" : "#fff")};
    border-color: ${(props) => (props.$secondary ? "#ccc" : "transparent")};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (min-width: 480px) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

// TextField styling
export const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
  transition: all 0.3s ease;


  & .MuiInputBase-input {
    text-align: right;
    font-size: 0.95rem;
    color: ${(props) => (props.$darkMode ? "#FFFFFF" : "#000000")};
    padding: 14px 16px;

    /* Target autofill state */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-internal-autofill-selected {
      -webkit-text-fill-color: ${(props) =>
        props.$darkMode ? "#FFFFFF" : "#000000"};
      -webkit-box-shadow: 0 0 0px 1000px
        ${(props) =>
          props.$darkMode
            ? "rgba(66, 71, 105, 0)"
            : "rgba(247, 249, 252, 0)"}
        inset;
      transition: background-color 5000s ease-in-out 0s;
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }
  }

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

    &:hover fieldset {
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }

    &.Mui-focused fieldset {
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }

    /* Ensure fieldset border spacing works with RTL */
    & .MuiOutlinedInput-notchedOutline {
      text-align: right;
    }
  }

  & .MuiInputLabel-root {
    color: ${(props) => (props.$darkMode ? "#AAB2D5" : "#555")};
    font-size: 0.95rem;

    /* Position label for RTL with proper transform origin */
    transform-origin: right top;
    transform: translate(0, 16px) scale(1);
    right: 16px;
    left: auto;

    &.Mui-focused {
      color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }
  }

  & .MuiInputLabel-shrink {
    /* Adjust shrunk label position for RTL */
    transform: translate(0, -6px) scale(0.75);
    transform-origin: right top;
  }

  & .MuiFormHelperText-root {
    margin-top: 4px;
    text-align: right;
    color: ${(props) => (props.$darkMode ? "#f6b17a" : "#d32f2f")};
  }

  /* Adjustments for input adornment to appear on right side */
  & .MuiInputAdornment-root {
    margin-left: 8px;
    margin-right: 0;
  }

  /* Override any positioning that might interfere with RTL */
  & .MuiInputAdornment-positionStart,
  & .MuiInputAdornment-positionEnd {
    margin-left: 8px;
    margin-right: 0;
  }

  /* Ensure proper spacing between icon and input text */
  & .MuiOutlinedInput-input {
    padding-right: 0;
    padding-left: 14px;
  }
`;

// Link styling
export const StyledLink = styled(Link).attrs(() => ({
  passHref: true,
}))`
  text-decoration: none;
  color: ${(props) => props.theme?.colors?.accent || "#e38e49"};
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: ${(props) => (props.$darkMode ? "#f7c093" : "#59c2f0")};
  }

  ${(props) => props.$sx && css(props.$sx)}
`;

// Image upload container
export const UploadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "#f7f9fc"};
  border: 2px dashed
    ${(props) => (props.$darkMode ? props.theme?.colors?.border : "#ddd")};
  margin-bottom: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.08)" : "#f0f4f8"};
    border-color: ${(props) =>
      props.$darkMode
        ? props.theme?.colors?.accent
        : props.theme?.colors?.primary};
  }

  .upload-prompt {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    svg {
      color: ${(props) =>
        props.$darkMode
          ? props.theme?.colors?.accent
          : props.theme?.colors?.primary};
      font-size: 48px;
      margin-bottom: 10px;
    }
  }
`;

// Image preview container
export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

`;

// Success card
export const SuccessCard = styled.div`
  background-color: ${(props) => props.theme?.colors?.surface || "#fff"};
  border-radius: 16px;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  .success-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.$darkMode
        ? props.theme?.colors?.accent
        : props.theme?.colors?.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 20px;
    animation: ${pulse} 1.5s infinite;
  }
`;
