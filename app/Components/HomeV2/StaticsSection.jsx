import React, {useEffect, useState, useRef} from "react";
import { Box, Typography, Button, useMediaQuery, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import ExploreIcon from "@mui/icons-material/Explore";



const StaticsSection = ({ theme, darkMode, prefersReducedMotion }) => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const statics = [
    {
      value: 1000,
      suffix: "+",
      label: "بائع مسجل",
      icon: <StorefrontIcon sx={{ fontSize: 45 }} />,
      color: "#4A72AC",
      bgGradient: darkMode
        ? "linear-gradient(145deg, #394887, #303962)"
        : "linear-gradient(145deg, #f0f8ff, #e6f0fb)",
    },
    {
      value: 5000,
      suffix: "+",
      label: "مستخدم شهرياً",
      icon: <PeopleIcon sx={{ fontSize: 45 }} />,
      color: "#F6B17A",
      bgGradient: darkMode
        ? "linear-gradient(145deg, #e59f69, #f6be91)"
        : "linear-gradient(145deg, #fff8f0, #ffeedd)",
    },
    {
      value: 3000,
      suffix: "+",
      label: "رحلة تم تخطيطها",
      icon: <MapIcon sx={{ fontSize: 45 }} />,
      color: "#4CAF50",
      bgGradient: darkMode
        ? "linear-gradient(145deg, #3e9240, #348939)"
        : "linear-gradient(145deg, #f0fff0, #e5f9e5)",
    },
    {
      value: 20000,
      suffix: "+",
      label: "زيارة للأماكن",
      icon: <ExploreIcon sx={{ fontSize: 45 }} />,
      color: "#FEC20F",
      bgGradient: darkMode
        ? "linear-gradient(145deg, #e7b00e, #ffd048)"
        : "linear-gradient(145deg, #fffbec, #fff6d8)",
    },
  ];

    const CounterCard = ({
      value,
      suffix,
      label,
      icon,
      color,
      bgGradient,
      darkMode,
      index,
    }) => {
      const [count, setCount] = useState(0);
      const countRef = useRef(null);
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );

        if (countRef.current) {
          observer.observe(countRef.current);
        }

        return () => {
          if (countRef.current) {
            observer.disconnect();
          }
        };
      }, []);

      useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const end = value;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // approx 60fps

        // If the value is large, use larger increments
        const stepSize = Math.max(1, Math.floor(end / 100));

        const timer = setInterval(() => {
          start += increment;
          setCount(Math.min(Math.floor(start), end));
          if (start >= end) {
            clearInterval(timer);
            setCount(end);
          }
        }, 16);

        return () => clearInterval(timer);
      }, [value, isVisible]);

      return (
        <Card
          ref={countRef}
          sx={{
            height: "100%",
            backgroundColor: darkMode
              ? "rgba(30, 35, 55, 0.4)"
              : "rgba(255, 255, 255, 0.75)",
            backgroundImage: darkMode
              ? `linear-gradient(145deg, rgba(40, 45, 80, 0.4), rgba(60, 70, 110, 0.3))`
              : bgGradient,
            borderRadius: "20px",
            overflow: "hidden",
            backdropFilter: "blur(8px)",
            border: darkMode
              ? `1px solid ${color}30`
              : `1px solid rgba(0,0,0,0.03)`,
            boxShadow: darkMode
              ? `0 10px 30px rgba(0,0,0,0.3), 0 0 15px ${color}20`
              : `0 10px 30px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.9)`,
            textAlign: "center",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: darkMode
                ? `linear-gradient(135deg, ${color}20, transparent)`
                : `linear-gradient(135deg, ${color}05, ${color}10)`,
              opacity: 0.6,
              transition: "opacity 0.3s ease",
            },
            "&:hover": {
              transform: "translateY(-12px) scale(1.02)",
              boxShadow: darkMode
                ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${color}40`
                : `0 20px 40px rgba(0,0,0,0.1), 0 0 20px ${color}30`,
              "&::before": {
                opacity: 1,
              },
              "& .stat-icon": {
                transform: "translateY(-5px) scale(1.1)",
                boxShadow: `0 15px 25px ${color}40`,
                backgroundColor: darkMode ? `${color}50` : `${color}15`,
              },
              "& .stat-value": {
                transform: "scale(1.05)",
                color: color,
                textShadow: darkMode ? `0 0 10px ${color}80` : "none",
              },
            },
          }}
        >
          <CardContent
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box
              className="stat-icon"
              sx={{
                backgroundColor: darkMode ? `${color}30` : `${color}15`,
                color: color,
                borderRadius: "50%",
                width: 90,
                height: 90,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2.5,
                mx: "auto",
                transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: darkMode
                  ? `0 10px 15px rgba(0,0,0,0.2), 0 0 20px ${color}30`
                  : `0 10px 15px ${color}20`,
                border: `1px solid ${color}40`,
              }}
            >
              {icon}
            </Box>

            <Box sx={{ position: "relative" }}>
              <Typography
                variant="h2"
                className="stat-value"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  fontWeight: "900",
                  color: darkMode ? "#fff" : color,
                  mb: 1,
                  transition: "all 0.3s ease",
                  lineHeight: 1.2,
                  direction: "ltr",
                  textShadow: darkMode ? `0 0 8px ${color}40` : "none",
                }}
              >
                {count.toLocaleString()}
                {suffix}
              </Typography>

              {/* Animated decorative line under the number */}
              <Box
                sx={{
                  width: "40%",
                  height: "3px",
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  position: "absolute",
                  bottom: "-5px",
                  left: "30%",
                  borderRadius: "3px",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.3 },
                    "50%": { opacity: 0.8 },
                    "100%": { opacity: 0.3 },
                  },
                }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: darkMode
                  ? "rgba(255,255,255,0.9)"
                  : theme.colors.textSecondary,
                fontWeight: "600",
                fontSize: "1.1rem",
                mt: 1.5,
              }}
            >
              {label}
            </Typography>

            {/* Add subtle animated reflection */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100%",
                background: darkMode
                  ? `linear-gradient(135deg, transparent 30%, ${color}10 50%, transparent 70%)`
                  : `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)`,
                backgroundSize: "200% 200%",
                animation: "shimmer 3s infinite linear",
                opacity: 0.4,
                pointerEvents: "none",
                "@keyframes shimmer": {
                  "0%": { backgroundPosition: "-100% -100%" },
                  "100%": { backgroundPosition: "100% 100%" },
                },
              }}
            />
          </CardContent>
        </Card>
      );
    };

  return (
    <>
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: darkMode ? "rgba(40, 45, 70, 0.7)" : "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Enhanced background decoration */}

        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 3, md: 4 },
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.7rem" },
                fontWeight: 800,
                mb: { xs: 4, md: 7 },
                color: theme.colors.primary,
                textAlign: "center",
                position: "relative",
                display: "inline-block",
                width: "100%",
                textShadow: darkMode
                  ? "0 0 15px rgba(246, 177, 122, 0.3)"
                  : "none",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "4px",
                  background: `linear-gradient(90deg, ${theme.colors.primary}30, ${theme.colors.primary}, ${theme.colors.primary}30)`,
                  borderRadius: "2px",
                  boxShadow: darkMode
                    ? "0 0 10px rgba(246, 177, 122, 0.5)"
                    : "none",
                },
              }}
            >
              إحصائيات منصة فسحة
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              gap: 4,
              mt: 4,
            }}
          >
            {statics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
              >
                <CounterCard
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                  color={stat.color}
                  bgGradient={stat.bgGradient}
                  darkMode={darkMode}
                  index={index}
                />
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StaticsSection;
