"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import {
  IconButton,
  Avatar,
  Box,
  Toolbar,
  Container,
  Tooltip,
  Badge,
  useMediaQuery,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  NavBarWrapper,
  NavItem,
  StyledButton,
  CircleButton,
  DarkmodeButton,
  Menu,
  MenuItem,
} from "../styledComponent/NavBar/StyledNavBar";

const MemoizedIconButton = React.memo(({ children, ...props }) => (
  <IconButton {...props}>{children}</IconButton>
));

const MemoizedNavItem = React.memo(({ children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <NavItem {...props}>{children}</NavItem>
  </motion.div>
));

const NavBarV2 = () => {
  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/addplace", label: "إحجز مكانك", authRequired: true },
    { href: "/review", label: "تقييم العملاء", authRequired: true },
    { href: "/contact", label: "تواصل معنا" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElSignIn, setAnchorElSignIn] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme, theme } = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleOpenSignInMenu = useCallback((event) => {
    setAnchorElSignIn(event.currentTarget);
  }, []);

  const handleCloseSignInMenu = useCallback(() => {
    setAnchorElSignIn(null);
  }, []);

  const handleOpenLanguageMenu = useCallback((event) => {
    setAnchorElLanguage(event.currentTarget);
  }, []);

  const handleCloseLanguageMenu = useCallback(() => {
    setAnchorElLanguage(null);
  }, []);

  const handleProfileClick = useCallback(() => {
    handleCloseSignInMenu();
    router.push("/profile");
  }, [router]);

  const handleMainProfileClick = useCallback(() => {
    router.push("/profile");
  }, [router]);

  const handleLogout = useCallback(() => {
    setUser(null);
    handleCloseSignInMenu();
    localStorage.removeItem("user");
    router.push("/");
  }, [router]);

  const handleDarkModeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  if (!mounted) return null;


  return (
    <NavBarWrapper
      position="fixed"
      style={{
        backgroundColor: scrolled
          ? darkMode
            ? "#aab2d588"
            : "rgba(255, 255, 255, 0.468)"
          : darkMode
          ? "#aab2d58d"
          : "rgba(255, 255, 255, 0.498)",
        backdropFilter: "blur(10px)",
        boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease-in-out",
        zIndex: 9999, // Add this explicit z-index
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            [theme.breakpoints.between("md", "lg")]: {
              minHeight: "60px",
              padding: "0 8px",
            },
          }}
        >
          {/* Mobile Navigation */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "row-reverse",
            }}
          >
            <MemoizedIconButton
              size="large"
              aria-label="menu navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </MemoizedIconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              $darkMode={darkMode} // Changed from darkMode to $darkMode to match styled-component convention
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  borderRadius: "15px",
                  background: darkMode
                    ? "rgba(45, 50, 80, 0.95)" // Darker background for dark mode
                    : "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  minWidth: "200px",
                  padding: "10px 0",
                  right: 0,
                  mt: 1,
                },
              }}
            >
              {navLinks.map(
                (link) =>
                  (!link.authRequired || (link.authRequired && user)) && (
                    <MenuItem
                      key={link.href}
                      onClick={() => {
                        handleCloseNavMenu();
                        router.push(link.href);
                      }}
                      sx={{
                        justifyContent: "flex-end",
                        borderRadius: "10px",
                        mx: 1,
                        my: 0.5,
                        backgroundColor:
                          pathname === link.href
                            ? darkMode
                              ? `${theme.colors.primary}33` // With 20% opacity
                              : `${theme.colors.primary}1A` // With 10% opacity
                            : "transparent",
                        fontWeight: pathname === link.href ? "600" : "400",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: darkMode
                            ? `${theme.colors.primary}4D` // With 30% opacity
                            : `${theme.colors.primary}26`, // With 15% opacity
                        },
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          color:
                            pathname === link.href
                              ? theme.colors.primary
                              : darkMode
                              ? "white"
                              : "inherit",
                          fontSize: "1rem",
                          fontWeight: pathname === link.href ? "600" : "400",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {link.label}
                      </Box>
                    </MenuItem>
                  )
              )}

              {/* Language options for mobile */}
              <Box
                sx={{
                  borderTop: darkMode
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.05)",
                  my: 1,
                  py: 1,
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                  }}
                  sx={{
                    justifyContent: "flex-end",
                    borderRadius: "10px",
                    mx: 1,
                    my: 0.5,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: "1rem",
                      color: darkMode ? "white" : "inherit",
                    }}
                  >
                    English
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                  }}
                  sx={{
                    justifyContent: "flex-end",
                    borderRadius: "10px",
                    mx: 1,
                    my: 0.5,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: darkMode ? "white" : "inherit",
                    }}
                  >
                    العربية
                  </Box>
                </MenuItem>
              </Box>

              {/* Fixed Dark Mode Toggle for mobile */}
              <Box
                sx={{
                  borderTop: darkMode
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.05)",
                  my: 1,
                  py: 1,
                  px: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: "1rem",
                    color: darkMode ? "white" : "inherit",
                    mr: 2,
                  }}
                >
                  {darkMode ? "الوضع النهاري" : "الوضع الليلي"}
                </Box>
                <DarkmodeButton onClick={(e) => e.stopPropagation()}>
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="dark-mode-input"
                      checked={darkMode}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleDarkModeToggle();
                        // Close menu after a short delay to allow the toggle animation to show
                        setTimeout(() => {
                          handleCloseNavMenu();
                        }, 400);
                      }}
                    />
                    <span className="slider round">
                      <span className="sun-moon">
                        {[1, 2, 3].map((num) => (
                          <span
                            key={num}
                            id={`mobile-moon-dot-${num}`}
                            className="moon-dot"
                          />
                        ))}
                      </span>
                      <div className="stars">
                        {[1, 2, 3, 4].map((num) => (
                          <div
                            key={num}
                            id={`mobile-star-${num}`}
                            className="star"
                          />
                        ))}
                      </div>
                    </span>
                  </label>
                </DarkmodeButton>
              </Box>

              {/* Login/Register options for mobile */}
              {!user && (
                <Box
                  sx={{
                    borderTop: darkMode
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.05)",
                    my: 1,
                    py: 1,
                    display: "flex",
                    flexDirection: "column",
                    px: 1,
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push("/login");
                    }}
                    sx={{
                      justifyContent: "center",
                      borderRadius: "10px",
                      my: 0.5,
                      backgroundColor: "transparent",
                      border: `1px solid ${
                        darkMode ? theme.colors.primary : "#f57c00"
                      }`,
                      color: darkMode ? theme.colors.primary : "#f57c00",
                    }}
                  >
                    <Box component="span" sx={{ fontSize: "1rem" }}>
                      تسجيل الدخول
                    </Box>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push("/register");
                    }}
                    sx={{
                      justifyContent: "center",
                      borderRadius: "10px",
                      my: 0.5,
                      background: darkMode
                        ? `radial-gradient(circle, ${theme.colors.primary} 55%, ${theme.colors.primary}cc 91%)`
                        : "radial-gradient(circle, rgba(227, 142, 73, 1) 55%, rgba(246, 177, 122, 1) 91%)",
                      color: "white",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ fontSize: "1rem", whiteSpace: "nowrap" }}
                    >
                      إنشاء حساب
                    </Box>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>

          {/* Logo */}
          <Link href="/" passHref>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                [theme.breakpoints.between("md", "lg")]: {
                  transform: "scale(0.75)", // Smaller scale for medium screens (was 0.85)
                  mr: -1.5,
                  ml: -1,
                },
              }}
            >
              <svg
                width="150"
                height="50"
                viewBox="0 0 298 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_59_429)">
                  <path
                    d="M40.017 34.4603C39.5258 35.0761 37.7495 35.9912 34.6938 37.2013C34.5339 35.4866 33.7856 33.9087 32.4377 32.4677C31.4724 31.4585 31.2783 30.5948 31.8494 29.8849C32.3063 29.3162 35.1678 28.6791 40.4339 27.9735C40.1198 28.4139 39.9827 28.9399 40.017 29.5514C40.0513 30.1629 40.1084 30.7701 40.1941 31.3687C40.274 31.9717 40.3426 32.5447 40.3825 33.0963C40.4225 33.6522 40.3026 34.1054 40.017 34.4603Z"
                    fill={darkMode ? "#FFFFFF" : "#2C3250"}
                  />
                  <path
                    d="M50.2807 39.0571C49.7895 39.6729 48.0132 40.588 44.9575 41.7981C44.7975 40.0834 44.0493 38.5055 42.7014 37.0645C41.7361 36.0553 41.5419 35.1916 42.1131 34.4817C42.57 33.913 45.4315 33.2759 50.6976 32.5746C50.3835 33.015 50.2464 33.541 50.2807 34.1525C50.3149 34.7639 50.3721 35.3712 50.4577 35.9698C50.5377 36.5727 50.6062 37.1457 50.6462 37.6973C50.6862 38.249 50.5663 38.7022 50.2807 39.0571Z"
                    fill={darkMode ? "#FFFFFF" : "#2C3250"}
                  />
                  <path
                    d="M158.761 102.429C157.619 102.959 156.174 103.224 154.432 103.224C141.752 103.224 130.963 99.5169 122.07 92.1022H79.25V81.2708H112.966L105.215 71.7394C103.29 69.379 101.308 67.6472 99.2634 66.5397C97.2187 65.4322 95.2368 64.8806 93.312 64.8806C90.7246 64.8806 88.143 65.4108 85.5613 66.4713L101.965 53.3266C105.809 50.2478 108.636 48.7041 110.441 48.7041C111.823 48.7041 113.685 50.5813 116.027 54.3357L132.882 81.2751H153.164V92.1064H140.633C143.637 95.429 147.755 98.1999 152.981 100.411C154.557 100.795 156.477 101.467 158.761 102.429Z"
                    fill={darkMode ? "#FFFFFF" : "#2C3250"}
                  />
                  <path
                    d="M237.004 92.1021H146.864V81.2708H159.486L158.767 80.0436C157.687 78.2134 155.762 76.7681 152.998 75.7119L164.804 66.3216L174.091 81.2708H184.189L179.5 73.8304C178.295 72.0002 176.376 70.5549 173.731 69.4987L185.537 60.1084L198.605 81.2708H208.703L200.05 67.4761C198.845 65.646 196.926 64.2006 194.281 63.1444L206.093 53.7542L223.039 81.2708H237.01V92.1021H237.004Z"
                    fill={darkMode ? "#FFFFFF" : "#2C3250"}
                  />
                  <path
                    d="M286.769 64.5897L278.293 51.1542C275.706 47.062 274.415 44.1243 274.415 42.3412C274.415 40.8488 274.838 38.9716 275.677 36.7096L244.212 61.9899C240.842 64.6838 239.163 67.0185 239.163 68.9898C239.163 71.7351 240.877 74.4333 244.304 77.0802L256.201 86.2524C259.862 89.0447 261.695 90.9946 261.695 92.0978C261.695 93.4491 260.525 94.1204 258.177 94.1204C257.395 94.1204 254.425 91.9824 249.25 87.6977C244.812 84.016 240.722 81.9122 236.993 81.399C236.382 81.3135 235.782 81.2708 235.188 81.2708H230.681V92.1021H235.456C237.084 92.1021 238.975 92.6323 241.134 93.6928C243.298 94.7533 245.383 96.0532 247.394 97.5926C249.41 99.132 251.163 100.757 252.671 102.467C254.173 104.174 255.104 105.709 255.464 107.051L283.862 85.0936C288.369 81.6299 290.619 77.8969 290.619 73.903C290.636 71.7864 289.345 68.6777 286.769 64.5897ZM272.61 85.3159C272.61 85.2176 272.627 85.0979 272.656 84.9567C272.69 84.8114 272.702 84.666 272.702 84.5206C272.644 83.7979 272.462 83.0154 272.165 82.173C271.868 81.3306 271.234 80.2146 270.274 78.812L263.597 68.9898C262.152 66.9202 261.433 65.1884 261.433 63.7901C261.433 61.8658 263.535 59.5097 267.744 56.7132C267.681 56.9526 267.641 57.3289 267.607 57.8335C267.578 58.3381 267.561 58.9752 267.561 59.7449C267.561 60.613 267.984 61.652 268.823 62.8494L276.397 74.3307C277.596 76.1608 278.202 77.7045 278.202 78.9531C278.202 80.4968 276.34 82.6177 272.61 85.3159Z"
                    fill={darkMode ? "#FFFFFF" : "#2C3250"}
                  />
                  <path
                    d="M291.23 10.3047C288.346 3.86921 279.327 -0.0990055 270.423 1.1881C264.608 2.03049 260.222 4.42082 257.452 8.33345C254.996 11.7971 254.527 15.3976 256.658 19.0964C257.84 21.1489 259.257 23.0988 260.856 24.9803C264.083 28.7774 267.761 32.3181 271.656 35.7389C272.342 36.3419 273.05 36.9362 273.77 37.5563C273.861 37.4707 273.918 37.4194 273.975 37.3681C277.397 34.4732 280.652 31.4757 283.651 28.3285C286.232 25.6174 288.654 22.838 290.465 19.7848C291.276 18.4207 291.961 17.0225 292.15 15.5258C292.372 13.7384 291.99 12.0023 291.23 10.3047ZM273.764 20.5203C268.686 20.5246 264.494 17.3859 264.506 13.593C264.523 9.77877 268.686 6.67432 273.775 6.6786C278.859 6.68715 282.983 9.77876 282.988 13.5845C283 17.4116 278.865 20.516 273.764 20.5203Z"
                    fill={darkMode ? "#FFFFFF" : "url(#paint0_linear_59_429)"}
                  />
                  <path
                    d="M296.062 40.0749C294.754 41.3706 292.978 42.2087 291.076 42.9142C288.009 44.0517 284.753 44.7187 281.389 45.1292C278.43 45.4927 275.449 45.6509 272.45 45.574C267.213 45.4371 262.107 44.8043 257.286 43.1922C255.224 42.5037 253.288 41.6656 251.792 40.3614C251.003 39.6729 250.461 38.899 250.387 37.9753C250.284 36.6711 251.083 35.6919 252.42 34.9265C253.836 34.114 255.493 33.6907 257.195 33.37C259.811 32.874 262.478 32.6217 265.162 32.4806C265.311 32.472 265.465 32.472 265.608 32.4421C266.111 32.3437 266.39 32.5148 266.568 32.844C265.208 33.0193 263.849 33.1647 262.512 33.3657C259.942 33.7548 257.412 34.2637 255.15 35.2985C254.436 35.6235 253.779 36.0639 253.237 36.5386C252.528 37.1586 252.591 37.8471 253.225 38.5184C253.813 39.1384 254.642 39.5404 255.516 39.891C257.635 40.742 259.925 41.1995 262.255 41.5544C267.241 42.3113 272.279 42.4866 277.345 42.2856C281.309 42.1317 285.233 41.7383 289.031 40.8232C290.402 40.494 291.733 40.0963 292.921 39.4763C293.332 39.2582 293.726 39.0102 294.069 38.7322C294.994 37.9796 295 37.1287 294.115 36.3462C293.435 35.7432 292.567 35.3284 291.636 34.9821C289.391 34.1354 286.986 33.6479 284.525 33.2973C283.342 33.1305 282.143 33.0022 280.932 32.8526C281.155 32.4848 281.475 32.3908 281.983 32.4421C284.233 32.6773 286.49 32.8483 288.734 33.1049C290.271 33.2802 291.773 33.5966 293.184 34.0969C293.818 34.3193 294.44 34.5716 295.011 34.8752C297.444 36.1623 297.861 38.2875 296.062 40.0749Z"
                    fill={darkMode ? "#FFFFFF" : "url(#paint1_linear_59_429)"}
                  />
                  <path
                    d="M84.3674 81.2707H72.0874C71.8361 81.2707 71.6077 81.1681 71.4992 80.9971L59.4134 62.2036C55.2097 55.6527 53.1078 51.3937 53.1078 49.4224C53.1078 47.387 53.4962 45.2831 54.2787 43.1066C54.3072 43.0211 55.9522 40.5923 55.9522 40.5923C55.9522 40.5923 61.3382 33.9258 61.5553 33.6564C61.7323 33.4384 62.0522 33.2117 62.3777 33.1433C65.0508 32.5361 65.8047 30.5349 63.9256 28.957C62.8061 28.012 60.7328 27.764 59.3163 28.4011C57.957 29.0126 57.5629 30.1714 58.1797 31.5227C58.2882 31.7664 58.2254 32.147 58.0483 32.3693C53.7989 37.6974 49.5266 43.0125 45.2487 48.3277C45.1516 48.4475 18.2157 80.7704 18.3756 80.8474L18.3699 80.856C18.7183 81.0441 22.2252 83.0026 22.2309 86.479C22.2366 89.9469 18.7697 91.9054 18.4156 92.0978H84.3731C84.7329 92.0978 85.0242 91.884 85.0242 91.6103V81.7539C84.8015 81.6 84.5844 81.4332 84.3674 81.2707ZM52.4167 81.3263C52.1254 81.3392 51.8284 81.3434 51.5314 81.3434H47.0192C46.3224 81.3434 45.5628 81.3263 44.746 81.2878C44.5119 81.2793 44.2948 81.1767 44.1977 81.0185L40.1253 74.7711C39.0459 73.1333 38.4975 71.688 38.4975 70.4351C38.4975 70.0546 38.7831 69.5329 39.36 68.8829C39.9312 68.2329 40.5594 67.583 41.2505 66.9373C41.9359 66.2873 42.587 65.7186 43.1868 65.2397C43.3181 65.1371 43.4838 65.0857 43.6551 65.0857C43.9521 65.0857 44.2491 65.2439 44.3062 65.5048C44.6261 67.0143 45.5742 68.9984 47.1563 71.4528L52.9764 80.6336C53.1649 80.9415 52.8736 81.3092 52.4167 81.3263Z"
                    fill={darkMode ? "#FFFFFF" : "#2C3250"}
                  />
                  <path
                    d="M46.6881 43.4743C36.3786 55.8579 26.1263 68.173 15.8169 80.5566C13.3209 79.2652 2.87441 75.0276 1.55503 72.7784C0.498385 70.9696 0.549788 69.225 1.94913 67.5402C6.12431 62.5158 10.3109 57.4999 14.4861 52.4755C17.913 48.3619 21.3686 44.2569 24.7555 40.1262C26.4062 38.1121 28.7594 37.2312 31.8151 37.4237C32.7061 37.4792 33.6428 37.6546 34.431 37.9624C36.0188 38.5868 45.0945 42.7474 46.6881 43.4743Z"
                    fill={darkMode ? "#FFFFFF" : "url(#paint2_linear_59_429)"}
                  />
                  <path
                    d="M20.0206 86.6372C20.0092 88.7924 17.6446 90.5413 14.7374 90.5328C11.7502 90.5242 9.35132 88.7411 9.32276 86.5004C9.2942 84.3068 11.7331 82.4552 14.6288 82.4638C17.6731 82.4809 20.032 84.3068 20.0206 86.6372Z"
                    fill={darkMode ? "#FFFFFF" : "#2C3250"}
                  />
                  <path
                    d="M279.818 13.7555C279.807 16.1929 277.134 18.1642 273.85 18.1556C270.474 18.1471 267.767 16.1288 267.733 13.6016C267.698 11.1257 270.451 9.03044 273.73 9.04327C277.163 9.06038 279.83 11.1214 279.818 13.7555Z"
                    fill={darkMode ? "#FFFFFF" : "#2C3250"}
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_59_429"
                    x1="255.301"
                    y1="19.2536"
                    x2="292.213"
                    y2="19.2536"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F6B179" />
                    <stop offset="1" stopColor="#2C3250" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_59_429"
                    x1="250.376"
                    y1="39.0057"
                    x2="297.174"
                    y2="39.0057"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F6B179" />
                    <stop offset="1" stopColor="#2C3250" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_59_429"
                    x1="0.823603"
                    y1="58.9782"
                    x2="46.688"
                    y2="58.9782"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F6B179" />
                    <stop offset="1" stopColor="#2C3250" />
                  </linearGradient>
                  <clipPath id="clip0_59_429">
                    <rect
                      width="296.348"
                      height="106.105"
                      fill="white"
                      transform="translate(0.823486 0.946289)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              flexDirection: "row-reverse",
              whiteSpace: "nowrap",
            }}
          >
            {navLinks.map(
              (link) =>
                (!link.authRequired || (link.authRequired && user)) && (
                  <Box
                    key={link.href}
                    component={motion.div}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MemoizedNavItem
                      onClick={() => router.push(link.href)}
                      sx={{
                        position: "relative",
                        color:
                          pathname === link.href
                            ? darkMode
                              ? theme.colors.primary
                              : theme.colors.primary
                            : darkMode
                            ? "white"
                            : "inherit",
                        fontWeight: pathname === link.href ? "700" : "600",
                        "&::after":
                          pathname === link.href
                            ? {
                                content: '""',
                                position: "absolute",
                                width: "100%",
                                height: "3px",
                                bottom: "-8px",
                                left: 0,
                                backgroundColor: darkMode
                                  ? theme.colors.primary
                                  : theme.colors.primary,
                                borderRadius: "2px",
                              }
                            : {},
                      }}
                    >
                      {link.label}
                    </MemoizedNavItem>
                  </Box>
                )
            )}
          </Box>

          {/* Right-side controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2, lg: 5 }, // Responsive gap sizes
            }}
          >
            {/* Language Selector */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Tooltip title="تغيير اللغة">
                  <MemoizedIconButton
                    onClick={handleOpenLanguageMenu}
                    sx={{
                      color: darkMode ? "white" : "#333",
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                      borderRadius: "50%",
                      padding: "8px",
                    }}
                  >
                    <LanguageIcon />
                  </MemoizedIconButton>
                </Tooltip>
              </motion.div>
            </Box>

            {/* Desktop Dark Mode Toggle */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <DarkmodeButton>
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="dark-mode-input"
                      checked={darkMode}
                      onChange={handleDarkModeToggle}
                    />
                    <span className="slider round">
                      <span className="sun-moon">
                        {[1, 2, 3].map((num) => (
                          <span
                            key={num}
                            id={`moon-dot-${num}`}
                            className="moon-dot"
                          />
                        ))}
                      </span>
                      <div className="stars">
                        {[1, 2, 3, 4].map((num) => (
                          <div key={num} id={`star-${num}`} className="star" />
                        ))}
                      </div>
                    </span>
                  </label>
                </DarkmodeButton>
              </motion.div>
            </Box>

            {/* User Profile */}
            {user ? (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Box
                  component="span"
                  sx={{
                    display: { xs: "none", sm: "none", md: "inline" },
                    marginRight: "10px",
                    color: darkMode ? "white" : "#333",
                    fontSize: "1.2rem",
                    ...(isLaptop && { fontSize: "0.9rem", marginRight: "6px" }),
                  }}
                >
                  {user.firstname} {user.lastname}
                </Box>
                <Tooltip title="الملف الشخصي">
                  <MemoizedIconButton
                    onClick={handleOpenSignInMenu}
                    sx={{
                      padding: 0.5,
                      [theme.breakpoints.between("md", "lg")]: {
                        padding: 0.3,
                        "& .MuiAvatar-root": {
                          width: 40,
                          height: 40,
                        },
                      },
                    }}
                  >
                    <Badge
                      sx={{
                        "& .MuiBadge-dot": {
                          backgroundColor: theme.colors.primary,
                          color: theme.colors.primary,
                        },
                      }}
                      variant="dot"
                      invisible={!user.hasNotification}
                      overlap="circular"
                    >
                      {user.profileImage ? (
                        <Avatar
                          alt={`${user.firstname} ${user.lastname}`}
                          src={user.profileImage}
                          sx={{
                            width: 55,
                            height: 55,
                            border: `2px solid ${theme.colors.primary}`,
                            transition: "border-color 0.3s ease",
                          }}
                        />
                      ) : (
                        <Avatar
                          alt={`${user.firstname} ${user.lastname}`}
                          sx={{
                            width: 55,
                            height: 55,
                            bgcolor: "transparent",
                            border: `2px solid ${theme.colors.primary}`,
                            transition: "all 0.3s ease",
                            background: `linear-gradient(135deg, ${
                              theme.colors.primary
                            }, ${
                              darkMode
                                ? theme.colors.primary
                                : theme.colors.accent
                            })`,
                            color: "#FFFFFF",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                          }}
                        >
                          {`${user.firstname?.charAt(0) || ""}${
                            user.lastname?.charAt(0) || ""
                          }`}
                        </Avatar>
                      )}
                    </Badge>
                  </MemoizedIconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar-user"
                  anchorEl={anchorElSignIn}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElSignIn)}
                  onClose={handleCloseSignInMenu}
                >
                  {/* User name for small screens only */}
                  <Box
                    sx={{
                      display: { xs: "flex", md: "none" },
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px",
                      borderBottom: darkMode
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.05)",
                      mb: 1,
                    }}
                  >
                    {user?.profileImage ? (
                      <Avatar
                        alt={`${user.firstname} ${user.lastname}`}
                        src={user.profileImage}
                        sx={{
                          width: 50,
                          height: 50,
                          mb: 1,
                          border: `2px solid ${theme.colors.primary}`,
                        }}
                      />
                    ) : (
                      <Avatar
                        alt={`${user.firstname} ${user.lastname}`}
                        sx={{
                          width: 50,
                          height: 50,
                          mb: 1,
                          bgcolor: "transparent",
                          border: `2px solid ${theme.colors.primary}`,
                          background: `linear-gradient(135deg, ${
                            theme.colors.primary
                          }, ${
                            darkMode
                              ? theme.colors.primary
                              : theme.colors.accent
                          })`,
                          color: "#FFFFFF",
                          fontWeight: "600",
                          fontSize: "1.5rem",
                        }}
                      >
                        {`${user.firstname?.charAt(0) || ""}${
                          user.lastname?.charAt(0) || ""
                        }`}
                      </Avatar>
                    )}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: darkMode ? "white" : "#333",
                        textAlign: "center",
                      }}
                    >
                      {user.firstname} {user.lastname}
                    </Typography>
                  </Box>
                  <MenuItem onClick={handleProfileClick}>الملف الشخصي</MenuItem>
                  <MenuItem onClick={handleLogout}>تسجيل الخروج</MenuItem>
                </Menu>
              </motion.div>
            ) : (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CircleButton
                    $darkMode={darkMode}
                    onClick={() => router.push("/login")}
                    aria-label="تسجيل الدخول"
                  >
                    تسجيل الدخول
                  </CircleButton>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StyledButton
                    $darkMode={darkMode}
                    onClick={() => router.push("/register")}
                    aria-label="إنشاء حساب"
                  >
                    إنشاء حساب
                  </StyledButton>
                </motion.div>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </NavBarWrapper>
  );
};

export default React.memo(NavBarV2);
