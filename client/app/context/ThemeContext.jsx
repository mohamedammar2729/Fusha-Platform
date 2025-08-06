"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.setAttribute(
        "data-theme",
        newMode ? "dark" : "light"
      );
      return newMode;
    });
  };

  // Define theme colors similar to the mobile app
  const theme = {
    colors: darkMode
      ? {
          // Dark theme with ColorHunt palette
          background: "#2D3250", // Dark navy
          surface: "#424769", // Medium navy
          primary: "#F6B17A", // Peach/orange accent
          text: "#FFFFFF", // White text
          // textSecondary: "#AAB2D5", // Lighter version of blues
          textSecondary: "rgba(255,255,255,0.7)", // Lighter version of blues
          card: "#424769", // Medium navy
          border: "#7077A1", // Muted purple/blue
          accent: "#F6B17A", // Peach accent
          button: "#F6B17A",
          print: "#f7c093", // White text for printing
        }
      : {
          // Light theme
          background: "#F5F7FA",
          surface: "#FFFFFF",
          primary: "#4a72ac",
          secondary: "#4a72ac",
          text: "#000000",
          // textSecondary: "#555555",
          textSecondary: "#555",
          card: "#FFFFFF",
          border: "#E0E0E0",
          accent: "#4a72ac",
          button: "#FFFFFF",
        },
    breakpoints: createTheme().breakpoints,
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
