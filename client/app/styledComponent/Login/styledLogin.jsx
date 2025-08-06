import Typography from "@mui/material/Typography";
import styled, { keyframes, css } from "styled-components";
import TextField from "@mui/material/TextField";
import { FormControl, Button } from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import Link from "next/link";

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
  background: ${(props) => props.theme?.colors?.surface || "#ffffff"};
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    height: 45rem;
    border-radius: 25px;
    margin-top: 7rem;
  }
`;

export const LeftSection = styled.div`
  position: relative;
  height: 180px;
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
  background: ${(props) => props.theme?.colors?.surface || "#ffffff"};
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
  height: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme?.colors?.surface || "#ffffff"};
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
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: ${(props) => props.theme?.colors?.text || "#333"};

    @media (min-width: 480px) {
      font-size: 1.75rem;
    }

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  form {
    width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  background-color: ${(props) => props.theme?.colors?.primary || "#4b72ad"};
  color: "white";
  font-size: 16px;
  border-radius: 25px;
  transition: transform 0.5s ease, background 0.5s ease, box-shadow 0.5s ease;
  padding: 8px 16px;

  &:hover {
    background-color: ${(props) =>
      props.$darkMode ? props.theme?.colors?.accent || "#F6B17A" : "#3b5998"};
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

export const StyledTypography = styled(Typography)`
  margin-top: 15px;
  font-size: 0.9rem;
  color: ${(props) => props.theme?.colors?.text || "inherit"};

  @media (min-width: 480px) {
    margin-top: 18px;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    margin-top: 20px;
    font-size: 1.1rem;
  }

  ${(props) => props.$sx && css(props.$sx)}
`;

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
          props.$darkMode ? "rgba(66, 71, 105, 0)" : "rgba(247, 249, 252, 0)"}
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
    position: relative;
    min-height: 1.25em;
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

  /* Hide the asterisk */
  & .MuiFormLabel-asterisk {
    display: none;
  }
`;

export const StyledLink = styled(Link).attrs(() => ({
  passHref: true,
}))`
  text-decoration: none;
  color: ${(props) => props.theme?.colors?.accent || "#e38e49"};
  margin-right: 10px;
  font-weight: 600;
  font-size: 0.9rem;

  @media (min-width: 480px) {
    font-size: 1rem;
  }

  &:hover {
    text-decoration: underline;
    color: ${(props) => (props.$darkMode ? "#f7c093" : "#59c2f0")};
  }

  ${(props) => props.$sx && css(props.$sx)}
`;

// Create a styled Select component
export const StyledFormControl = styled(FormControl)`
  text-align: right;
  transition: all 0.5s ease-in-out;
  width: 100% !important; /* Force width to be 100% */
  margin-bottom: 1rem !important;
  position: relative;
  display: block; /* Ensure it behaves as a block element */
  box-sizing: border-box; /* Include padding in width calculation */

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
    color: ${(props) =>
      props.$darkMode ? "#f6b17a" : props.error ? "#d32f2f" : "#555"};
  }

  & .MuiInputBase-input {
    text-align: right;
    font-size: 0.9rem;
    color: ${(props) => (props.$darkMode ? "#FFFFFF" : "#000000")};

    @media (min-width: 480px) {
      font-size: 1rem;
    }
  }

  & .MuiOutlinedInput-root {
    border-radius: 25px;
    transition: border-color 0.3s ease;
    margin-left: 8px;
    margin-right: auto;
    background-color: ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "transparent"};

    &:hover fieldset {
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }

    &.Mui-focused fieldset {
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }

    & fieldset {
      border-color: ${(props) => (props.$darkMode ? "#7077A1" : "#c4c4c4")};
    }
  }

  & .MuiInputLabel-root {
    right: 0;
    left: auto;
    transform-origin: top right;
    margin-right: 25px;
    color: ${(props) => (props.$darkMode ? "#AAB2D5" : "#555")};
    font-size: 0.9rem;

    /* Initial positioning */
    transform: translate(0, 14px) scale(1);

    &.MuiInputLabel-shrink {
      transform: translate(8px, -10px) scale(0.75);
      color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }

    &.Mui-focused {
      color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }

    @media (min-width: 480px) {
      font-size: 1rem;
    }
  }

  & .MuiSelect-select {
    width: 100%;
    text-align: right;
    padding: 14px 16px; /* Match TextField padding */
    padding-right: 32px;
  }

  & .MuiOutlinedInput-notchedOutline {
    width: 100%;
    text-align: right;
  }

  /* Hide the asterisk */
  & .MuiFormLabel-asterisk {
    display: none;
  }

  /* Menu positioning */
  & .MuiMenu-paper {
    position: fixed !important;
    margin-top: 5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    background-color: ${(props) => (props.$darkMode ? "#424769" : "#ffffff")};
    color: ${(props) => (props.$darkMode ? "#FFFFFF" : "#000000")};
  }

  & .MuiMenuItem-root {
    color: ${(props) => (props.$darkMode ? "#FFFFFF" : "#000000")};

    &:hover {
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
    }

    &.Mui-selected {
      background-color: ${(props) =>
        props.$darkMode
          ? "rgba(246, 177, 122, 0.2)"
          : "rgba(74, 114, 172, 0.1)"};

      &:hover {
        background-color: ${(props) =>
          props.$darkMode
            ? "rgba(246, 177, 122, 0.3)"
            : "rgba(74, 114, 172, 0.2)"};
      }
    }
  }

  /* Make sure the inner elements also take full width */
  & .MuiInputBase-root {
    width: 100%;
    max-width: 100%;
  }

  /* Icon color for select dropdown */
  & .MuiSvgIcon-root {
    color: ${(props) => (props.$darkMode ? "#AAB2D5" : "rgba(0, 0, 0, 0.54)")};
  }
`;
