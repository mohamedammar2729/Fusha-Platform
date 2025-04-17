"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";
import { motion } from "framer-motion";

// Material UI components - optimized imports
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

// Material UI icons
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";

// Styled components
import {
  NavBarWrapper,
  NavItem,
  StyledButton,
  CircleButton,
  DarkmodeButton,
  Menu,
  MenuItem,
} from "../styledComponent/NavBar/StyledNavBar";

// Memoized components for performance optimization
const MemoizedIconButton = React.memo(({ children, ...props }) => (
  <IconButton {...props}>{children}</IconButton>
));
MemoizedIconButton.displayName = "MemoizedIconButton";

const MemoizedNavItem = React.memo(({ children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <NavItem {...props}>{children}</NavItem>
  </motion.div>
));
MemoizedNavItem.displayName = "MemoizedNavItem";

const NavBar = () => {
  // Navigation links configuration
  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/create", label: "إبدأ رحلتك", authRequired: true },
    { href: "/explore", label: "إستكشف", authRequired: true },
    { href: "/contact", label: "تواصل معنا" },
  ];

  // Hooks and state
  const router = useRouter();
  const pathname = usePathname();
  const { darkMode, toggleTheme, theme } = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElSignIn, setAnchorElSignIn] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effects
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

  // Menu handlers - memoized for performance
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

  // Navigation handlers
  const handleProfileClick = useCallback(() => {
    handleCloseSignInMenu();
    router.push("/profile");
  }, [router, handleCloseSignInMenu]);

  const handleMainProfileClick = useCallback(() => {
    router.push("/profile");
  }, [router]);

  // Authentication handlers
  const handleLogout = useCallback(() => {
    setUser(null);
    handleCloseSignInMenu();
    localStorage.removeItem("user");
    router.push("/");
  }, [router, handleCloseSignInMenu]);

  // Theme toggle handler
  const handleDarkModeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // Initialize component and load user data from localStorage
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

    const isLinkActive = (linkHref) => {
      if (linkHref === "/") {
        // For home page, require exact match to avoid matching all paths
        return pathname === "/" || pathname === "";
      }
      // For other pages, check if pathname starts with the link href
      return pathname.startsWith(linkHref);
    };

  // Prevent hydration mismatch
  if (!mounted) return null;

  // Navbar styling based on theme
  const navbarStyle = {
    background: darkMode
      ? `${theme.colors.surface}E6`
      : "rgba(255, 255, 255, 0.1)",
    color: theme.colors.text,
    borderBottomColor: darkMode
      ? theme.colors.border
      : "rgba(255, 255, 255, 0.3)",
  };

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
        zIndex: 9999,
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
              $darkMode={darkMode}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  borderRadius: "15px",
                  background: darkMode
                    ? "rgba(45, 50, 80, 0.95)"
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
              {/* Mobile Menu Items */}
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
                              ? `${theme.colors.primary}33`
                              : `${theme.colors.primary}1A`
                            : "transparent",
                        fontWeight: pathname === link.href ? "600" : "400",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: darkMode
                            ? `${theme.colors.primary}4D`
                            : `${theme.colors.primary}26`,
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

              {/* Dark Mode Toggle for mobile */}
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
                      id="input"
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleDarkModeToggle();
                        setTimeout(() => {
                          handleCloseNavMenu();
                        }, 400);
                      }}
                    />
                    <div className="slider round">
                      <div className="sun-moon">
                        <svg
                          id="moon-dot-1"
                          className="moon-dot"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="moon-dot-2"
                          className="moon-dot"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="moon-dot-3"
                          className="moon-dot"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="light-ray-1"
                          className="light-ray"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="light-ray-2"
                          className="light-ray"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="light-ray-3"
                          className="light-ray"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-1"
                          className="cloud-dark"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-2"
                          className="cloud-dark"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-3"
                          className="cloud-dark"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-4"
                          className="cloud-light"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-5"
                          className="cloud-light"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-6"
                          className="cloud-light"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                      </div>
                      <div className="stars">
                        <svg id="star-1" className="star" viewBox="0 0 20 20">
                          <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                        </svg>
                        <svg id="star-2" className="star" viewBox="0 0 20 20">
                          <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                        </svg>
                        <svg id="star-3" className="star" viewBox="0 0 20 20">
                          <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                        </svg>
                        <svg id="star-4" className="star" viewBox="0 0 20 20">
                          <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                        </svg>
                      </div>
                    </div>
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
                  transform: "scale(0.75)",
                  mr: -1.5,
                  ml: -1,
                },
              }}
            >
              {/* SVG Logo - code omitted for brevity */}
              <svg
                width="150"
                height="50"
                viewBox="0 0 298 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG paths */}
                {/* ... SVG content ... */}
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
                            ? theme.colors.primary
                            : darkMode
                            ? "white"
                            : "inherit",
                        fontWeight: pathname === link.href ? "700" : "600",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: theme.colors.primary,
                        },
                        "&::after":
                          pathname === link.href
                            ? {
                                content: '""',
                                position: "absolute",
                                width: "100%",
                                height: "3px",
                                bottom: "-8px",
                                left: 0,
                                backgroundColor: theme.colors.primary,
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
              gap: { xs: 1, md: 2, lg: 5 },
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
                      id="input"
                      type="checkbox"
                      checked={darkMode}
                      onChange={handleDarkModeToggle}
                    />
                    <div className="slider round">
                      <div className="sun-moon">
                        <svg
                          id="moon-dot-1"
                          className="moon-dot"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="moon-dot-2"
                          className="moon-dot"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="moon-dot-3"
                          className="moon-dot"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="light-ray-1"
                          className="light-ray"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="light-ray-2"
                          className="light-ray"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="light-ray-3"
                          className="light-ray"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-1"
                          className="cloud-dark"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-2"
                          className="cloud-dark"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-3"
                          className="cloud-dark"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-4"
                          className="cloud-light"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-5"
                          className="cloud-light"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                        <svg
                          id="cloud-6"
                          className="cloud-light"
                          viewBox="0 0 100 100"
                        >
                          <circle cx={50} cy={50} r={50} />
                        </svg>
                      </div>
                      <div className="stars">
                        <svg id="star-1" className="star" viewBox="0 0 20 20">
                          <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                        </svg>
                        <svg id="star-2" className="star" viewBox="0 0 20 20">
                          <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                        </svg>
                        <svg id="star-3" className="star" viewBox="0 0 20 20">
                          <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                        </svg>
                        <svg id="star-4" className="star" viewBox="0 0 20 20">
                          <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </DarkmodeButton>
              </motion.div>
            </Box>

            {/* User Profile or Auth Buttons */}
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
                  {/* User avatar and name for small screens */}
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
                    {/* User avatar display code */}
                    {/* ... Avatar content ... */}
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
              /* Login/Register buttons for desktop */
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

export default React.memo(NavBar);
