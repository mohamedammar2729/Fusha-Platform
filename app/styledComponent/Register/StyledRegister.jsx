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
  margin-top: 6rem;
  display: flex;
  height: 48rem;
  background: #ffffff;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// export const LeftSection = styled.div`
//   flex: 1;
//   background: url("https://images.pexels.com/photos/30668182/pexels-photo-30668182/free-photo-of-hot-air-balloons-sunrise-adventure-in-cappadocia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
//     center/cover;
//   align-items: center;
//   justify-content: center;
//   border-radius: 25px 0 0 25px;
//   color: white;
//   font-size: 24px;
//   font-weight: bold;
//   position: relative;
//   overflow: hidden;
//   transition: all 0.5s ease-in-out;
//   animation: ${fadeIn} 0.5s ease-in-out;

//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     border-radius: 25px 0 0 25px;
//     background: rgba(0, 0, 0, 0.3);
//     backdrop-filter: blur(3px);
//     box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
//   }

//   > svg {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: 2;
//   }
// `;

export const LeftSection = styled.div`
  flex: 1;
  position: relative;
  border-radius: 25px 0 0 25px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;

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
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 0 25px 25px 0;
  margin: 0;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px 40px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0 25px 25px 0;
  text-align: center;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  background-color: #4b72ad;
  color: white;
  font-size: 20px;
  border-radius: 25px;
  transition: transform 0.5s ease, background 0.5s ease, box-shadow 0.5s ease;

  &:hover {
    background-color: #3b5998; /* enhanced blue effect */
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const StyledTextField = styled(TextField)`
  text-align: right;
  transition: all 0.5s ease-in-out;

  & .MuiInputBase-input {
    text-align: right;
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
    margin-right: 92%;
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
  color: #3b5998;
  margin-right: 10px;
  ${(props) => props.$sx && css(props.$sx)}

  &:hover {
    text-decoration: none;
    color: #59c2f0;
  }
`;

