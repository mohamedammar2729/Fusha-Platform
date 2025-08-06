import {
  styled,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled as stf } from "styled-components";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const NavBarWrapper = styled(AppBar)`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: #000;
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0;

  ${({ theme }) => theme.breakpoints.between("md", "lg")} {
    height: 64px !important; // Smaller height on medium screens
    padding: 0 8px;
  }
`;

export const NavItem = styled(Typography)(({ theme, darkMode }) => ({
  margin: "0 20px",
  fontSize: "1.2rem",
  fontWeight: 600,
  color: darkMode ? "#FFFFFF" : "#333",
  cursor: "pointer",
  transition: "color 0.3s ease",
  "&:hover": {
    color: darkMode ? theme.colors?.primary || "#F6B17A" : "#f57c00",
  },

  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "0.95rem",
    margin: "0 10px",
  },
}));

export const StyledButton = styled(Button)(({ theme, $darkMode }) => ({
  background: $darkMode
    ? `radial-gradient(circle, ${theme.colors?.primary || "#F6B17A"} 55%, ${
        theme.colors?.primary || "#F6B17A"
      }cc 91%)`
    : `radial-gradient(circle, ${theme.colors?.primary || "#4a72ac"} 55%, ${
        theme.colors?.primary || "#4a72ac"
      }cc 91%)`,
  borderRadius: "25px",
  border: $darkMode
    ? `1px solid ${theme.colors?.primary || "#F6B17A"}`
    : `1px solid ${theme.colors?.primary || "#4a72ac"}`,
  color: "#fff",
  fontSize: "20px",
  padding: "5px 1rem",
  margin: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.5s ease, background 0.5s ease, color 0.5s ease",
  animation: "fadeIn 0.8s ease-out",
  whiteSpace: "nowrap",

  "&:hover": {
    background: "#ffffff",
    color: $darkMode
      ? theme.colors?.primary || "#F6B17A"
      : theme.colors?.primary || "#4a72ac",
    transform: "scale(1.05)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  },

  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "scale(0.8)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },

  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "0.9rem",
    padding: "3px 10px",
    margin: "3px",
  },
}));

export const CircleButton = styled(Button)(({ theme, $darkMode }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "25px",
  border: $darkMode
    ? `1px solid ${theme.colors?.primary || "#F6B17A"}`
    : `1px solid ${theme.colors?.primary || "#4a72ac"}`,
  color: $darkMode
    ? theme.colors?.primary || "#F6B17A"
    : theme.colors?.primary || "#4a72ac",
  fontSize: "20px",
  padding: "5px 1rem",
  margin: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.5s ease, background 0.5s ease, color 0.5s ease",
  animation: "fadeIn 0.8s ease-out",
  whiteSpace: "nowrap",

  "&:hover": {
    background: $darkMode
      ? `radial-gradient(circle, ${theme.colors?.primary || "#F6B17A"} 55%, ${
          theme.colors?.primary || "#F6B17A"
        }cc 91%)`
      : `radial-gradient(circle, ${theme.colors?.primary || "#4a72ac"} 55%, ${
          theme.colors?.primary || "#4a72ac"
        }cc 91%)`,
    color: "#fff",
    transform: "scale(1.05)",
  },

  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "scale(0.8)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },

  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "0.9rem",
    padding: "3px 10px",
    margin: "3px",
  },
}));

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


export const Menu = styled(MuiMenu)(({ theme, $darkMode }) => ({
  ".MuiPaper-root": {
    backgroundColor: $darkMode ? theme.colors?.surface || "#424769" : "#fff",
    border: $darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #ddd",
    color: $darkMode ? theme.colors?.text || "#FFFFFF" : "#333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.3s ease-out",
    transformOrigin: "top right !important",
    borderRadius: "25px",
  },
  ".MuiMenuItem-root": {
    justifyContent: "flex-end",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "20px",
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },

  [theme.breakpoints.between("md", "lg")]: {
    "& .MuiPaper-root": {
      minWidth: "180px",
      borderRadius: "12px",
    },
  },
}));

export const MenuItem = styled(MuiMenuItem)(({ theme, darkMode }) => ({
  fontSize: "1rem",
  color: darkMode ? theme.colors?.text || "#FFFFFF" : "#333",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: darkMode
      ? `${theme.colors?.primary || "#F6B17A"}33`
      : "#f57b0040",
    color: darkMode
      ? theme.colors?.text || "#FFFFFF"
      : theme.colors?.text || "#000000",
  },

  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "0.9rem",
    padding: "4px",
    minHeight: "auto",
  },
}));
