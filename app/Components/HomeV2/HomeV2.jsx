"use client";
import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useTheme } from "../../context/ThemeContext";

import "swiper/css";
import "swiper/css/effect-cards";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// Import Icons

import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const FooterSection = lazy(() => import("./FooterSection"));
const FAQSection = lazy(() => import("./FAQSection"));
const CallToActionSection = lazy(() => import("./CallToActionSection"));
const TestimonialsSection = lazy(() => import("./TestimonialsSection"));
const PlansSection = lazy(() => import("./PlansSection"));
const CategoriesSection = lazy(() => import("./CategoriesSection"));
const RegistrationSection = lazy(() => import("./RegistrationSection"));
const StaticsSection = lazy(() => import("./StaticsSection"));
const BenefitsSection = lazy(() => import("./BenefitsSection"));
const HeroSection = lazy(() => import("./HeroSection"));

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

const HomeV2 = () => {
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
      if (window.scrollY > 300) {
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
    <Box
      sx={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        paddingTop: "60px",
        transition: "all 0.3s ease",
      }}
    >
    
      {/* Hero Section - Fixed Version */}
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection
          theme={theme}
          darkMode={darkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>

      {/* How to Register Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <RegistrationSection
          theme={theme}
          darkMode={darkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>

      {/* Categories Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <CategoriesSection
          theme={theme}
          darkMode={darkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>

      {/* Subscription Plans Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <PlansSection
          theme={theme}
          darkMode={darkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>
      {/* Testimonials Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection
          theme={theme}
          darkMode={darkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>

      {/* Enhanced CTA Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <CallToActionSection
          theme={theme}
          darkMode={darkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>

      {/* Benefits Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <BenefitsSection
          theme={theme}
          darkMode={darkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>

      {/* New Statistics Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <StaticsSection
          theme={theme}
          darkMode={darkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>

      {/* FAQs Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection theme={theme} darkMode={darkMode} />
      </Suspense>

      {/* Footer Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <FooterSection theme={theme} darkMode={darkMode} />
      </Suspense>

    </Box>
  );
};


export default HomeV2;
