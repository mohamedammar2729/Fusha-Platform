"use client";
import React, { useState, useEffect, useRef, lazy, Suspense } from "react";

import { useTheme } from "../../context/ThemeContext";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const FooterSection = lazy(() => import("./FooterSection"));
const MobileSection = lazy(() => import("./MobileSection"));
const TestimonialsSection = lazy(() => import("./TestimonialsSection"));
const FeaturesSection = lazy(() => import("./FeaturesSection"));
const CategoriesSection = lazy(() => import("./CategoriesSection"));
const Section3 = lazy(() => import("./Section3"));
const Section2 = lazy(() => import("./Section2"));
const Section1 = lazy(() => import("./Section1"));

const SectionSkeleton = () => (
  <Box
    sx={{
      height: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress color="primary" />
  </Box>
);

const Home = () => {
  const { theme, darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    // Handle scroll events for back-to-top button
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  if (!mounted) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: theme?.colors?.background || "#f8f9fa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "3px solid rgba(0,0,0,0.1)",
              borderTopColor: theme?.colors?.primary || "#3b5998",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "100%": {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: theme?.colors?.textSecondary || "#666",
            }}
          >
            جاري التحميل...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* Hero Section - Fixed Version */}
      <Suspense fallback={<SectionSkeleton />}>
        <Section1 theme={theme} darkMode={darkMode} />
      </Suspense>

      {/* How to Register Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <Section2 theme={theme} darkMode={darkMode} />
      </Suspense>

      {/* Subscription Plans Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <Section3 theme={theme} darkMode={darkMode} />
      </Suspense>

      {/* Categories Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <CategoriesSection theme={theme} darkMode={darkMode} />
      </Suspense>

      {/* FeaturesSection */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturesSection theme={theme} darkMode={darkMode} />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection theme={theme} darkMode={darkMode} />
      </Suspense>

      {/* MobileSection */}
      <Suspense fallback={<SectionSkeleton />}>
        <MobileSection theme={theme} darkMode={darkMode} />
      </Suspense>

      {/* Footer Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <FooterSection theme={theme} darkMode={darkMode} />
      </Suspense>
    </>
  );
};

export default Home;
