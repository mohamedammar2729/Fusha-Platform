"use client";
import NavBar from "./Components/NavBar";
import NavBarV2 from "./Components/NavbarV2";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./context/ThemeContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create a wrapper component to apply theme styles to body
function ThemeWrapper({ children }) {
  const { darkMode, theme } = useTheme();
  const [userType, setUserType] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Handle GitHub Pages SPA routing
    if (typeof window !== "undefined") {
      // Check if we have a 'route' query parameter
      const url = new URL(window.location.href);
      const route = url.searchParams.get("route");

      if (route) {
        // Remove the query parameter from the URL
        url.searchParams.delete("route");
        window.history.replaceState({}, document.title, url.toString());

        // Navigate to the requested path
        router.push(route);
      }

      // Alternative method using localStorage
      const savedPath = localStorage.getItem("spa-path");
      if (savedPath) {
        localStorage.removeItem("spa-path");
        router.push(savedPath);
      }
    }
  }, [router]);

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserType(parsedUser.userType || "user");
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserType("user");
      }
    } else {
      setUserType("user");
    }
    setMounted(true);
  }, []);

  // Choose the appropriate NavBar component
  const NavigationBar = userType === "seller" ? NavBarV2 : NavBar;

  return (
    <body
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      {mounted && userType !== "admin" && <NavigationBar />}
      {children}
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <ThemeProvider>
        <StyledEngineProvider injectFirst>
          <ThemeWrapper>{children}</ThemeWrapper>
        </StyledEngineProvider>
      </ThemeProvider>
    </html>
  );
}
