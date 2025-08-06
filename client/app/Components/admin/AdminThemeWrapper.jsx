"use client";

import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useTheme } from "../../context/ThemeContext";

const AdminThemeWrapper = ({ children }) => {
  const { darkMode, theme } = useTheme();

  // Create MUI theme with RTL direction
  const muiTheme = createTheme({
    direction: 'rtl',
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: theme.colors.primary,
      },
      background: {
        default: theme.colors.background,
        paper: theme.colors.surface,
      },
      text: {
        primary: theme.colors.text,
        secondary: theme.colors.textSecondary,
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AdminThemeWrapper;