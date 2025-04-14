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

  .switch .dark-mode-input {
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
    transition: 0.4s;
    z-index: 0;
  }

  .sun-moon {
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: yellow;
    transition: 0.4s;
    z-index: 2;
  }

  .dark-mode-input:checked + .slider {
    background-color: black;
  }

  .dark-mode-input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  .dark-mode-input:checked + .slider .sun-moon {
    transform: translateX(26px);
    background-color: white;
    animation: rotate-center 0.6s ease-in-out both;
  }

  .moon-dot {
    opacity: 0;
    transition: 0.4s;
    fill: gray;
  }

  .dark-mode-input:checked + .slider .sun-moon .moon-dot {
    opacity: 1;
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round .sun-moon {
    border-radius: 50%;
  }

  @keyframes rotate-center {
    0% {
      transform: translateX(26px) rotate(0);
    }
    100% {
      transform: translateX(26px) rotate(360deg);
    }
  }

  @keyframes rotate-center {
    0% {
      transform: translateX(26px) rotate(0);
    }
    100% {
      transform: translateX(26px) rotate(360deg);
    }
  }

  @media (min-width: 900px) and (max-width: 1200px) {
    .switch {
      width: 50px;
      height: 28px;
    }
    
    .slider .sun-moon {
      height: 22px;
      width: 22px;
      bottom: 3px;
      left: 3px;
    }
    
    .dark-mode-input:checked + .slider .sun-moon {
      transform: translateX(22px);
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
