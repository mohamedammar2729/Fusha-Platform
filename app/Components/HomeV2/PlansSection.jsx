import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DiamondIcon from "@mui/icons-material/Diamond";
import StarIcon from "@mui/icons-material/Star";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";

const PlansSection = ({
  theme,
  darkMode,
  prefersReducedMotion,
}) => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Sample plans data
  const plans = [
    {
      title: "المجانية",
      price: billingPeriod === "monthly" ? "0" : "0",
      duration: billingPeriod === "monthly" ? "شهرياً" : "سنوياً",
      features: [
        "تسجيل مكان واحد",
        "إحصائيات أساسية",
        "صور محدودة (5 صور)",
        "دعم فني بالبريد الإلكتروني",
        "بدون إعلانات مميزة",
        "تحديثات منتظمة",
      ],
      notIncluded: ["أولوية الظهور في نتائج البحث", "دعم فني متميز"],
      isPopular: false,
      color: "#4A72AC",
      icon: <StorefrontIcon />,
    },
    {
      title: "الأساسية",
      price: billingPeriod === "monthly" ? "199" : "1899",
      oldPrice: billingPeriod === "yearly" ? "2388" : null,
      duration: billingPeriod === "monthly" ? "شهرياً" : "سنوياً",
      features: [
        "تسجيل حتى 3 أماكن",
        "إحصائيات متقدمة",
        "صور غير محدودة",
        "أولوية الظهور في نتائج البحث",
        "دعم فني متميز",
        "إضافة عروض وفعاليات",
        "تحليل سلوك الزوار",
      ],
      badge: "الأكثر شيوعاً",
      isPopular: true,
      color: "#F6B17A",
      icon: <StarIcon />,
    },
    {
      title: "المتقدمة",
      price: billingPeriod === "monthly" ? "399" : "3799",
      oldPrice: billingPeriod === "yearly" ? "4788" : null,
      duration: billingPeriod === "monthly" ? "شهرياً" : "سنوياً",
      features: [
        "تسجيل أماكن غير محدودة",
        "إحصائيات احترافية",
        "صور وفيديوهات غير محدودة",
        "أعلى أولوية في نتائج البحث",
        "دعم فني فوري على مدار الساعة",
        "إعلانات مميزة على المنصة",
        "تقارير مخصصة وتحليلات متقدمة",
        "ميزات حصرية للشركات",
      ],
      badge: "قيمة مميزة",
      isPopular: false,
      color: "#4CAF50",
      icon: <DiamondIcon />,
    },
  ];
  return (
    <>
      <Box
        id="plans"
        sx={{
          padding: { xs: "60px 20px", md: "100px 40px" },
          backgroundColor: darkMode ? theme.colors.background : "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: darkMode ? 0.15 : 0.12, // Increased from 0.07/0.04
            zIndex: 0,
          }}
        >
          <motion.div
            animate={{
              backgroundPosition: ["0px 0px", "100px 100px"],
            }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${
                darkMode ? "ffffff" : "000000"
              }' fill-opacity='0.3'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "120px 60px", // Made pattern larger & explicitly set size
            }}
          />
        </Box>

        {/* Floating particles ********* */}

        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "1rem",
                color: theme.colors.primary,
                textAlign: "center",
                position: "relative",
                display: "inline-block",
                width: "100%",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "80px", md: "120px" },
                  height: "4px",
                  background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`,
                  borderRadius: "4px",
                  opacity: 0.8,
                  boxShadow: darkMode
                    ? `0 0 10px ${theme.colors.primary}50`
                    : "none",
                },
              }}
            >
              خطط الاشتراك المتاحة
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.colors.textSecondary,
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
                marginBottom: "2rem",
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              اختر الخطة المناسبة لاحتياجاتك وابدأ في استقبال المزيد من الزوار
              والعملاء
            </Typography>
          </motion.div>

          {/* Billing period toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mb: 5,
                mt: 2,
              }}
            >
              <Typography
                sx={{
                  color:
                    billingPeriod === "monthly"
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
                  fontWeight: billingPeriod === "monthly" ? "bold" : "normal",
                  transition: "all 0.3s ease",
                }}
              >
                شهري
              </Typography>
              <Box
                sx={{
                  width: 50,
                  height: 26,
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                  borderRadius: 13,
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: `1px solid ${
                    billingPeriod === "yearly"
                      ? theme.colors.primary
                      : "transparent"
                  }`,
                }}
                onClick={() =>
                  setBillingPeriod(
                    billingPeriod === "monthly" ? "yearly" : "monthly"
                  )
                }
              >
                <motion.div
                  animate={{
                    x: billingPeriod === "monthly" ? 0 : 24,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: theme.colors.primary,
                    position: "absolute",
                    top: 1,
                    left: 1,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    color:
                      billingPeriod === "yearly"
                        ? theme.colors.primary
                        : theme.colors.textSecondary,
                    fontWeight: billingPeriod === "yearly" ? "bold" : "normal",
                    transition: "all 0.3s ease",
                  }}
                >
                  سنوي
                </Typography>
                <Box
                  component={motion.div}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: billingPeriod === "yearly" ? [0.8, 1, 0.8] : 0,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  sx={{
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                    color: theme.colors.primary,
                    px: 1,
                    py: 0.5,
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    border: `1px solid ${theme.colors.primary}30`,
                  }}
                >
                  خصم 20%
                </Box>
              </Box>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card
                  onClick={() => setSelectedPlan(plan.title)}
                  sx={{
                    height: "100%",
                    backgroundColor: darkMode
                      ? plan.isPopular
                        ? `${plan.color}10`
                        : theme.colors.surface
                      : plan.isPopular
                      ? `${plan.color}08`
                      : "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: plan.isPopular
                      ? `0 20px 40px ${plan.color}35`
                      : darkMode
                      ? "0 10px 30px rgba(0,0,0,0.25)"
                      : "0 10px 30px rgba(0,0,0,0.1)",
                    border:
                      selectedPlan === plan.title
                        ? `3px solid ${plan.color}`
                        : plan.isPopular
                        ? `2px solid ${plan.color}`
                        : darkMode
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.03)",
                    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform:
                      selectedPlan === plan.title
                        ? "scale(1.05) translateY(-10px)"
                        : plan.isPopular
                        ? "scale(1.02)"
                        : "scale(1)",
                    position: "relative",
                    cursor: "pointer",
                    "&:hover": {
                      transform:
                        selectedPlan === plan.title
                          ? "scale(1.07) translateY(-15px)"
                          : plan.isPopular
                          ? "scale(1.04) translateY(-10px)"
                          : "scale(1.02) translateY(-8px)",
                      boxShadow:
                        plan.isPopular || selectedPlan === plan.title
                          ? `0 25px 50px ${plan.color}50`
                          : "0 20px 40px rgba(0,0,0,0.15)",
                    },
                    "&::after":
                      selectedPlan === plan.title
                        ? {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: "20px",
                            background: `linear-gradient(135deg, ${plan.color}10, ${plan.color}20)`,
                            animation: "pulse 2s infinite",
                            "@keyframes pulse": {
                              "0%": { opacity: 0.5 },
                              "50%": { opacity: 0.2 },
                              "100%": { opacity: 0.5 },
                            },
                          }
                        : {},
                  }}
                >
                  {/* Shape decorator */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "150px",
                      height: "150px",
                      borderRadius: "0 0 0 100%",
                      background: `linear-gradient(135deg, ${plan.color}20, transparent)`,
                      opacity: 0.6,
                      zIndex: 0,
                    }}
                  />

                  {/* Badge for popular plan */}
                  {plan.badge && (
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.2,
                        duration: 0.5,
                        type: "spring",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 20,
                          right: 20,
                          backgroundColor: plan.color,
                          color: "#fff",
                          padding: "6px 16px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          zIndex: 2,
                          boxShadow: `0 4px 12px ${plan.color}50`,
                        }}
                      >
                        {plan.badge}
                      </Box>
                    </motion.div>
                  )}

                  {/* Plan selected indicator */}
                  {selectedPlan === plan.title && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 20,
                          left: 20,
                          backgroundColor: darkMode
                            ? "rgba(0,0,0,0.3)"
                            : "rgba(255,255,255,0.9)",
                          color: plan.color,
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          zIndex: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          boxShadow: `0 4px 12px ${plan.color}40`,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: 16 }} />
                        مختارة
                      </Box>
                    </motion.div>
                  )}

                  <CardContent
                    sx={{
                      padding: "35px 25px",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {/* Plan icon and title */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                          delay: 0.3 + index * 0.2,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: `${plan.color}20`,
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: plan.color,
                            mb: 2,
                            transition: "all 0.3s ease",
                            transform:
                              selectedPlan === plan.title
                                ? "scale(1.1)"
                                : "scale(1)",
                            boxShadow:
                              selectedPlan === plan.title
                                ? `0 0 20px ${plan.color}50`
                                : "none",
                          }}
                        >
                          <motion.div
                            animate={{
                              rotate:
                                selectedPlan === plan.title
                                  ? [0, 10, -10, 0]
                                  : 0,
                            }}
                            transition={{
                              duration: 1.5,
                              repeat:
                                selectedPlan === plan.title ? Infinity : 0,
                              repeatDelay: 3,
                            }}
                          >
                            {React.cloneElement(plan.icon, {
                              sx: { fontSize: "1.8rem" },
                            })}
                          </motion.div>
                        </Box>
                      </motion.div>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          color: plan.color,
                          textAlign: "center",
                          position: "relative",
                          display: "inline-block",
                          transition: "all 0.4s ease",
                          transform:
                            selectedPlan === plan.title
                              ? "scale(1.1)"
                              : "scale(1)",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            height: "2px",
                            width: selectedPlan === plan.title ? "100%" : "40%",
                            backgroundColor: plan.color,
                            bottom: -6,
                            left: "50%",
                            transform: "translateX(-50%)",
                            transition: "width 0.3s ease",
                            borderRadius: "2px",
                            opacity: 0.8,
                          },
                        }}
                      >
                        {plan.title}
                      </Typography>
                    </Box>

                    {/* Price section */}
                    <Box
                      sx={{
                        textAlign: "center",
                        mb: 4,
                        position: "relative",
                        backgroundColor: darkMode
                          ? "rgba(0,0,0,0.15)"
                          : "rgba(0,0,0,0.03)",
                        p: 2,
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                        transform:
                          selectedPlan === plan.title
                            ? "scale(1.05)"
                            : "scale(1)",
                      }}
                    >
                      {plan.oldPrice && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: darkMode
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(0,0,0,0.5)",
                            fontSize: "0.9rem",
                            position: "absolute",
                            top: 0,
                            right: "50%",
                            transform: "translate(50%, -50%)",
                            backgroundColor: darkMode
                              ? "rgba(0,0,0,0.5)"
                              : "rgba(255,255,255,0.9)",
                            px: 1,
                            py: 0.5,
                            borderRadius: "4px",
                          }}
                        >
                          {plan.oldPrice} جنيه
                        </Typography>
                      )}
                      <motion.div
                        animate={{
                          scale:
                            billingPeriod === "yearly" && plan.price !== "0"
                              ? [1, 1.05, 1]
                              : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat:
                            billingPeriod === "yearly" && plan.price !== "0"
                              ? 3
                              : 0,
                          repeatDelay: 5,
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: "bold",
                            color: theme.colors.text,
                            direction: "rtl",
                            transition: "all 0.3s ease",
                            fontSize:
                              plan.price === "0"
                                ? "2.5rem"
                                : { xs: "2rem", md: "2.5rem" },
                          }}
                        >
                          {plan.price === "0" ? (
                            "مجاناً"
                          ) : (
                            <span>
                              <span style={{ fontSize: "60%" }}>جنيه</span>{" "}
                              {plan.price}
                            </span>
                          )}
                        </Typography>
                      </motion.div>

                      {plan.price !== "0" && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.colors.textSecondary,
                          }}
                        >
                          {plan.duration}
                        </Typography>
                      )}
                    </Box>

                    {/* Features list */}
                    <Box sx={{ flex: 1, mb: 3 }}>
                      {plan.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.5 + idx * 0.07 + index * 0.1,
                            duration: 0.4,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 1.5,
                              justifyContent: "flex-end",
                              opacity: selectedPlan === plan.title ? 1 : 0.9,
                              transition: `all 0.3s ease ${idx * 0.05}s`,
                              backgroundColor:
                                selectedPlan === plan.title
                                  ? darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.02)"
                                  : "transparent",
                              py: 0.7,
                              px: 1.5,
                              borderRadius: "6px",
                              "&:hover": {
                                backgroundColor: darkMode
                                  ? "rgba(255,255,255,0.07)"
                                  : "rgba(0,0,0,0.03)",
                              },
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: theme.colors.text,
                                fontSize: { xs: "0.9rem", md: "0.95rem" },
                                fontWeight: "500",
                              }}
                            >
                              {feature}
                            </Typography>
                            <motion.div
                              animate={{
                                rotate:
                                  selectedPlan === plan.title && idx === 0
                                    ? [0, 10, -10, 0]
                                    : 0,
                                scale:
                                  selectedPlan === plan.title ? [1, 1.2, 1] : 1,
                              }}
                              transition={{
                                duration: 0.5,
                                repeat:
                                  selectedPlan === plan.title && idx === 0
                                    ? 1
                                    : 0,
                                repeatDelay: 3,
                              }}
                            >
                              <CheckCircleIcon
                                sx={{
                                  color: plan.color,
                                  fontSize: "1.2rem",
                                  transition: "all 0.3s ease",
                                  filter:
                                    selectedPlan === plan.title
                                      ? `drop-shadow(0 0 3px ${plan.color}80)`
                                      : "none",
                                }}
                              />
                            </motion.div>
                          </Box>
                        </motion.div>
                      ))}

                      {/* Features not included */}
                      {plan.notIncluded &&
                        plan.notIncluded.map((feature, idx) => (
                          <motion.div
                            key={`notincluded-${idx}`}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                              delay:
                                0.5 +
                                (plan.features.length + idx) * 0.07 +
                                index * 0.1,
                              duration: 0.4,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 1.5,
                                justifyContent: "flex-end",
                                opacity: 0.5,
                                py: 0.7,
                                px: 1.5,
                                borderRadius: "6px",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  color: theme.colors.text,
                                  fontSize: { xs: "0.9rem", md: "0.95rem" },
                                  textDecoration: "line-through",
                                }}
                              >
                                {feature}
                              </Typography>
                              <CancelIcon
                                sx={{
                                  color: darkMode
                                    ? "rgba(255,255,255,0.4)"
                                    : "rgba(0,0,0,0.3)",
                                  fontSize: "1.2rem",
                                }}
                              />
                            </Box>
                          </motion.div>
                        ))}
                    </Box>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={
                          selectedPlan === plan.title || plan.isPopular
                            ? "contained"
                            : "outlined"
                        }
                        fullWidth
                        sx={{
                          padding: "14px",
                          borderRadius: "12px",
                          backgroundColor:
                            selectedPlan === plan.title
                              ? plan.color
                              : plan.isPopular
                              ? plan.color
                              : "transparent",
                          color:
                            selectedPlan === plan.title || plan.isPopular
                              ? "#fff"
                              : plan.color,
                          borderColor: plan.color,
                          borderWidth: 2,
                          fontWeight: "bold",
                          fontSize: "1rem",
                          textTransform: "none",
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "rgba(255,255,255,0.2)",
                            transition: "all 0.6s ease",
                            zIndex: 0,
                          },
                          "&:hover": {
                            backgroundColor:
                              selectedPlan === plan.title
                                ? plan.color
                                : plan.isPopular
                                ? `${plan.color}`
                                : `${plan.color}20`,
                            borderColor: plan.color,
                            color:
                              selectedPlan === plan.title || plan.isPopular
                                ? "#fff"
                                : plan.color,
                            transform: "translateY(-2px)",
                            boxShadow: `0 8px 20px ${plan.color}40`,
                            "&::before": {
                              left: "100%",
                            },
                          },
                          "& .MuiButton-startIcon": {
                            marginRight: 0,
                            marginLeft: 1,
                          },
                        }}
                        component={Link}
                        href={`/register?type=seller&plan=${plan.title.toLowerCase()}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        startIcon={
                          plan.price === "0" ? (
                            <RocketLaunchIcon />
                          ) : (
                            <LockOpenIcon />
                          )
                        }
                      >
                        {selectedPlan === plan.title
                          ? "اختيار هذه الخطة"
                          : plan.price === "0"
                          ? "ابدأ مجاناً"
                          : "اشترك الآن"}
                      </Button>
                    </motion.div>

                    {/* Additional information badge */}
                    {plan.price !== "0" && (
                      <Box
                        sx={{
                          mt: 2,
                          textAlign: "center",
                          fontSize: "0.8rem",
                          color: theme.colors.textSecondary,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.5,
                        }}
                      >
                        <InfoOutlinedIcon sx={{ fontSize: "0.9rem" }} />
                        يمكن إلغاء الاشتراك في أي وقت
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* Additional trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                mt: 6,
                pt: 3,
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: { xs: 2, md: 4 },
                borderTop: `1px solid ${
                  darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                }`,
              }}
            >
              {[
                { icon: <SecurityIcon />, text: "دفع آمن" },
                { icon: <VerifiedUserIcon />, text: "ضمان استرجاع" },
                { icon: <SupportAgentIcon />, text: "دعم على مدار الساعة" },
                { icon: <CreditCardIcon />, text: "طرق دفع متعددة" },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: theme.colors.textSecondary,
                    fontSize: "0.9rem",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: {
                      fontSize: "1.1rem",
                      color: darkMode
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(0,0,0,0.5)",
                    },
                  })}
                  {item.text}
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default PlansSection;
