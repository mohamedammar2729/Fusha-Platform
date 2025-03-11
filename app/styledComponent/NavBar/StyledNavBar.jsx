import {
  styled,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
} from "@mui/material";

import Button from "@mui/material/Button";
import { styled as stf } from "styled-components";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

export const NavBarWrapper = styled(AppBar)`
  background: rgba(255, 255, 255, 0.1); /* More transparent */
  backdrop-filter: blur(4px); /* Slight blur effect */
  box-shadow: none; /* Remove shadow */
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: #000;
  position: fixed;
  width: 100%;
  z-index: 10; /* Ensure navbar is on top */
  top: 0;
`;

export const NavItem = styled(Typography)`
  margin: 0 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f57c00;
  }
`;

export const StyledButton = styled(Button)`
  background: radial-gradient(
    circle,
    rgba(227, 142, 73, 1) 55%,
    rgba(246, 177, 122, 1) 91%
  );
  border-radius: 25px;
  border: 1px solid #f57c00;
  color: #fff;
  font-size: 20px;
  padding: 5px 1rem;
  margin: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease, background 0.5s ease, color 0.5s ease;
  animation: fadeIn 0.8s ease-out;

  &:hover {
    background: #ffffff;
    color: #f57c00;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const CircleButton = styled(Button)`
  background-color: #ffffff;
  border-radius: 25px;
  border: 1px solid #f57c00;
  color: #f57c00;
  font-size: 20px;
  padding: 5px 1rem;
  margin: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease, background 0.5s ease, color 0.5s ease;
  animation: fadeIn 0.8s ease-out;

  &:hover {
    background: radial-gradient(
      circle,
      rgba(227, 142, 73, 1) 55%,
      rgba(246, 177, 122, 1) 91%
    );
    color: #fff;
    transform: scale(1.05);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const DarkmodeButton = stf.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch #input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2196f3;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    z-index: 0;
    overflow: hidden;
  }

  .sun-moon {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: yellow;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  #input:checked + .slider {
    background-color: black;
  }

  #input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  #input:checked + .slider .sun-moon {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    background-color: white;
    -webkit-animation: rotate-center 0.6s ease-in-out both;
    animation: rotate-center 0.6s ease-in-out both;
  }

  .moon-dot {
    opacity: 0;
    transition: 0.4s;
    fill: gray;
  }

  #input:checked + .slider .sun-moon .moon-dot {
    opacity: 1;
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round .sun-moon {
    border-radius: 50%;
  }

  #moon-dot-1 {
    left: 10px;
    top: 3px;
    position: absolute;
    width: 6px;
    height: 6px;
    z-index: 4;
  }

  #moon-dot-2 {
    left: 2px;
    top: 10px;
    position: absolute;
    width: 10px;
    height: 10px;
    z-index: 4;
  }

  #moon-dot-3 {
    left: 16px;
    top: 18px;
    position: absolute;
    width: 3px;
    height: 3px;
    z-index: 4;
  }

  #light-ray-1 {
    left: -8px;
    top: -8px;
    position: absolute;
    width: 43px;
    height: 43px;
    z-index: -1;
    fill: white;
    opacity: 10%;
  }

  #light-ray-2 {
    left: -50%;
    top: -50%;
    position: absolute;
    width: 55px;
    height: 55px;
    z-index: -1;
    fill: white;
    opacity: 10%;
  }

  #light-ray-3 {
    left: -18px;
    top: -18px;
    position: absolute;
    width: 60px;
    height: 60px;
    z-index: -1;
    fill: white;
    opacity: 10%;
  }

  .cloud-light {
    position: absolute;
    fill: #eee;
    animation-name: cloud-move;
    animation-duration: 6s;
    animation-iteration-count: infinite;
  }

  .cloud-dark {
    position: absolute;
    fill: #ccc;
    animation-name: cloud-move;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-delay: 1s;
  }

  #cloud-1 {
    left: 30px;
    top: 15px;
    width: 40px;
  }

  #cloud-2 {
    left: 44px;
    top: 10px;
    width: 20px;
  }

  #cloud-3 {
    left: 18px;
    top: 24px;
    width: 30px;
  }

  #cloud-4 {
    left: 36px;
    top: 18px;
    width: 40px;
  }

  #cloud-5 {
    left: 48px;
    top: 14px;
    width: 20px;
  }

  #cloud-6 {
    left: 22px;
    top: 26px;
    width: 30px;
  }

  @keyframes cloud-move {
    0% {
      transform: translateX(0px);
    }

    40% {
      transform: translateX(4px);
    }

    80% {
      transform: translateX(-4px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  .stars {
    transform: translateY(-32px);
    opacity: 0;
    transition: 0.4s;
  }

  .star {
    fill: white;
    position: absolute;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    animation-name: star-twinkle;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  #input:checked + .slider .stars {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }

  #star-1 {
    width: 20px;
    top: 2px;
    left: 3px;
    animation-delay: 0.3s;
  }

  #star-2 {
    width: 6px;
    top: 16px;
    left: 3px;
  }

  #star-3 {
    width: 12px;
    top: 20px;
    left: 10px;
    animation-delay: 0.6s;
  }

  #star-4 {
    width: 18px;
    top: 0px;
    left: 18px;
    animation-delay: 1.3s;
  }

  @keyframes star-twinkle {
    0% {
      transform: scale(1);
    }

    40% {
      transform: scale(1.2);
    }

    80% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
    }
  }
`;

export const Menu = styled(MuiMenu)`
  .MuiPaper-root {
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-out;
    transform-origin: top right !important;
    border-radius: 25px; /* Moved here from the ephemeral .css-1tktgsa*** selector */
  }

  .MuiMenuItem-root {
    justify-content: flex-end; /* Moved from the ephemeral .css-1iivvvj*** selector */
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 20px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
// export const Menu = styled(MuiMenu)`
//   .MuiPaper-root {
//     background-color: #fff;
//     border: 1px solid #ddd;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     animation: fadeIn 0.3s ease-out;
//     transform-origin: top right !important;
//   }
//   .css-1iivvvj-MuiButtonBase-root-MuiMenuItem-root {
//     justify-content: flex-end;
//     padding-left: 5px;
//     padding-right: 5px;
//     border-radius: 20px;
//   }

//   .css-1tktgsa-MuiPaper-root-MuiPopover-paper-MuiMenu-paper {
//     border-radius: 25px;
//     background-color: #ddd;
//   }
//   @keyframes fadeIn {
//     from {
//       opacity: 0;
//       transform: translateY(-10px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;

export const MenuItem = styled(MuiMenuItem)`
  font-size: 1rem;
  color: #333;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f57b0040;
    color: #fff;
  }
`;
