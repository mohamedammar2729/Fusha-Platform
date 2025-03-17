"use client";
import React, { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
// import Logo from "../../public/Frame.svg";
import {
  CircleButton,
  DarkmodeButton,
  Menu,
  NavBarWrapper,
  NavItem,
  StyledButton,
} from "../styledComponent/NavBar/StyledNavBar";
import Link from "next/link";
import { MenuItem } from "./../styledComponent/NavBar/StyledNavBar";

const MemoizedIconButton = React.memo(({ children, ...props }) => (
  <IconButton {...props}>{children}</IconButton>
));

const MemoizedNavItem = React.memo(({ children, ...props }) => (
  <NavItem {...props}>{children}</NavItem>
));

const NavBar = () => {
  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/create", label: "إبدأ رحلتك", authRequired: true },
    { href: "/explore", label: "إستكشف", authRequired: true },
    { href: "/review", label: "تقييم العملاء", authRequired: true },
    { href: "/contact", label: "تواصل معنا" },
  ];

  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElSignIn, setAnchorElSignIn] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    router.push("/profile?showTrips=true");
  }, [router]);
  const handleMainProfileClick = useCallback(() => {
    router.push("/profile?showTrips=false");
  }, [router]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    router.push("/");
    window.dispatchEvent(new Event("userLogout"));
  }, [router]);

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode((prev) => !prev);
    // Here you can add any additional logic for changing the theme
    const darkModeToggle = document.getElementById("input");
    if (darkModeToggle) {
      darkModeToggle.checked = !darkModeToggle.checked;
    }
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const handleUserLogout = () => {
      setUser(null);
    };

    window.addEventListener("userLogout", handleUserLogout);

    return () => {
      window.removeEventListener("userLogout", handleUserLogout);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NavBarWrapper position="Sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: { xs: "row-reverse" },
        }}
      >
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <MemoizedIconButton
            size="large"
            aria-label="open nav menu"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </MemoizedIconButton>
        </Box>

        {/* Logo with consistent display until mounted */}
        <Box>
          {mounted ? (
            <Link href="/" passHref legacyBehavior>
              <svg
                width="170"
                height="50"
                viewBox="0 0 298 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_59_429)">
                  <path
                    d="M40.017 34.4603C39.5258 35.0761 37.7495 35.9912 34.6938 37.2013C34.5339 35.4866 33.7856 33.9087 32.4377 32.4677C31.4724 31.4585 31.2783 30.5948 31.8494 29.8849C32.3063 29.3162 35.1678 28.6791 40.4339 27.9735C40.1198 28.4139 39.9827 28.9399 40.017 29.5514C40.0513 30.1629 40.1084 30.7701 40.1941 31.3687C40.274 31.9717 40.3426 32.5447 40.3825 33.0963C40.4225 33.6522 40.3026 34.1054 40.017 34.4603Z"
                    fill="#2C3250"
                  />
                  <path
                    d="M50.2807 39.0571C49.7895 39.6729 48.0132 40.588 44.9575 41.7981C44.7975 40.0834 44.0493 38.5055 42.7014 37.0645C41.7361 36.0553 41.5419 35.1916 42.1131 34.4817C42.57 33.913 45.4315 33.2759 50.6976 32.5746C50.3835 33.015 50.2464 33.541 50.2807 34.1525C50.3149 34.7639 50.3721 35.3712 50.4577 35.9698C50.5377 36.5727 50.6062 37.1457 50.6462 37.6973C50.6862 38.249 50.5663 38.7022 50.2807 39.0571Z"
                    fill="#2C3250"
                  />
                  <path
                    d="M158.761 102.429C157.619 102.959 156.174 103.224 154.432 103.224C141.752 103.224 130.963 99.5169 122.07 92.1022H79.25V81.2708H112.966L105.215 71.7394C103.29 69.379 101.308 67.6472 99.2634 66.5397C97.2187 65.4322 95.2368 64.8806 93.312 64.8806C90.7246 64.8806 88.143 65.4108 85.5613 66.4713L101.965 53.3266C105.809 50.2478 108.636 48.7041 110.441 48.7041C111.823 48.7041 113.685 50.5813 116.027 54.3357L132.882 81.2751H153.164V92.1064H140.633C143.637 95.429 147.755 98.1999 152.981 100.411C154.557 100.795 156.477 101.467 158.761 102.429Z"
                    fill="#2C3250"
                  />
                  <path
                    d="M237.004 92.1021H146.864V81.2708H159.486L158.767 80.0436C157.687 78.2134 155.762 76.7681 152.998 75.7119L164.804 66.3216L174.091 81.2708H184.189L179.5 73.8304C178.295 72.0002 176.376 70.5549 173.731 69.4987L185.537 60.1084L198.605 81.2708H208.703L200.05 67.4761C198.845 65.646 196.926 64.2006 194.281 63.1444L206.093 53.7542L223.039 81.2708H237.01V92.1021H237.004Z"
                    fill="#2C3250"
                  />
                  <path
                    d="M286.769 64.5897L278.293 51.1542C275.706 47.062 274.415 44.1243 274.415 42.3412C274.415 40.8488 274.838 38.9716 275.677 36.7096L244.212 61.9899C240.842 64.6838 239.163 67.0185 239.163 68.9898C239.163 71.7351 240.877 74.4333 244.304 77.0802L256.201 86.2524C259.862 89.0447 261.695 90.9946 261.695 92.0978C261.695 93.4491 260.525 94.1204 258.177 94.1204C257.395 94.1204 254.425 91.9824 249.25 87.6977C244.812 84.016 240.722 81.9122 236.993 81.399C236.382 81.3135 235.782 81.2708 235.188 81.2708H230.681V92.1021H235.456C237.084 92.1021 238.975 92.6323 241.134 93.6928C243.298 94.7533 245.383 96.0532 247.394 97.5926C249.41 99.132 251.163 100.757 252.671 102.467C254.173 104.174 255.104 105.709 255.464 107.051L283.862 85.0936C288.369 81.6299 290.619 77.8969 290.619 73.903C290.636 71.7864 289.345 68.6777 286.769 64.5897ZM272.61 85.3159C272.61 85.2176 272.627 85.0979 272.656 84.9567C272.69 84.8114 272.702 84.666 272.702 84.5206C272.644 83.7979 272.462 83.0154 272.165 82.173C271.868 81.3306 271.234 80.2146 270.274 78.812L263.597 68.9898C262.152 66.9202 261.433 65.1884 261.433 63.7901C261.433 61.8658 263.535 59.5097 267.744 56.7132C267.681 56.9526 267.641 57.3289 267.607 57.8335C267.578 58.3381 267.561 58.9752 267.561 59.7449C267.561 60.613 267.984 61.652 268.823 62.8494L276.397 74.3307C277.596 76.1608 278.202 77.7045 278.202 78.9531C278.202 80.4968 276.34 82.6177 272.61 85.3159Z"
                    fill="#2C3250"
                  />
                  <path
                    d="M291.23 10.3047C288.346 3.86921 279.327 -0.0990055 270.423 1.1881C264.608 2.03049 260.222 4.42082 257.452 8.33345C254.996 11.7971 254.527 15.3976 256.658 19.0964C257.84 21.1489 259.257 23.0988 260.856 24.9803C264.083 28.7774 267.761 32.3181 271.656 35.7389C272.342 36.3419 273.05 36.9362 273.77 37.5563C273.861 37.4707 273.918 37.4194 273.975 37.3681C277.397 34.4732 280.652 31.4757 283.651 28.3285C286.232 25.6174 288.654 22.838 290.465 19.7848C291.276 18.4207 291.961 17.0225 292.15 15.5258C292.372 13.7384 291.99 12.0023 291.23 10.3047ZM273.764 20.5203C268.686 20.5246 264.494 17.3859 264.506 13.593C264.523 9.77877 268.686 6.67432 273.775 6.6786C278.859 6.68715 282.983 9.77876 282.988 13.5845C283 17.4116 278.865 20.516 273.764 20.5203Z"
                    fill="url(#paint0_linear_59_429)"
                  />
                  <path
                    d="M296.062 40.0749C294.754 41.3706 292.978 42.2087 291.076 42.9142C288.009 44.0517 284.753 44.7187 281.389 45.1292C278.43 45.4927 275.449 45.6509 272.45 45.574C267.213 45.4371 262.107 44.8043 257.286 43.1922C255.224 42.5037 253.288 41.6656 251.792 40.3614C251.003 39.6729 250.461 38.899 250.387 37.9753C250.284 36.6711 251.083 35.6919 252.42 34.9265C253.836 34.114 255.493 33.6907 257.195 33.37C259.811 32.874 262.478 32.6217 265.162 32.4806C265.311 32.472 265.465 32.472 265.608 32.4421C266.111 32.3437 266.39 32.5148 266.568 32.844C265.208 33.0193 263.849 33.1647 262.512 33.3657C259.942 33.7548 257.412 34.2637 255.15 35.2985C254.436 35.6235 253.779 36.0639 253.237 36.5386C252.528 37.1586 252.591 37.8471 253.225 38.5184C253.813 39.1384 254.642 39.5404 255.516 39.891C257.635 40.742 259.925 41.1995 262.255 41.5544C267.241 42.3113 272.279 42.4866 277.345 42.2856C281.309 42.1317 285.233 41.7383 289.031 40.8232C290.402 40.494 291.733 40.0963 292.921 39.4763C293.332 39.2582 293.726 39.0102 294.069 38.7322C294.994 37.9796 295 37.1287 294.115 36.3462C293.435 35.7432 292.567 35.3284 291.636 34.9821C289.391 34.1354 286.986 33.6479 284.525 33.2973C283.342 33.1305 282.143 33.0022 280.932 32.8526C281.155 32.4848 281.475 32.3908 281.983 32.4421C284.233 32.6773 286.49 32.8483 288.734 33.1049C290.271 33.2802 291.773 33.5966 293.184 34.0969C293.818 34.3193 294.44 34.5716 295.011 34.8752C297.444 36.1623 297.861 38.2875 296.062 40.0749Z"
                    fill="url(#paint1_linear_59_429)"
                  />
                  <path
                    d="M84.3674 81.2707H72.0874C71.8361 81.2707 71.6077 81.1681 71.4992 80.9971L59.4134 62.2036C55.2097 55.6527 53.1078 51.3937 53.1078 49.4224C53.1078 47.387 53.4962 45.2831 54.2787 43.1066C54.3072 43.0211 55.9522 40.5923 55.9522 40.5923C55.9522 40.5923 61.3382 33.9258 61.5553 33.6564C61.7323 33.4384 62.0522 33.2117 62.3777 33.1433C65.0508 32.5361 65.8047 30.5349 63.9256 28.957C62.8061 28.012 60.7328 27.764 59.3163 28.4011C57.957 29.0126 57.5629 30.1714 58.1797 31.5227C58.2882 31.7664 58.2254 32.147 58.0483 32.3693C53.7989 37.6974 49.5266 43.0125 45.2487 48.3277C45.1516 48.4475 18.2157 80.7704 18.3756 80.8474L18.3699 80.856C18.7183 81.0441 22.2252 83.0026 22.2309 86.479C22.2366 89.9469 18.7697 91.9054 18.4156 92.0978H84.3731C84.7329 92.0978 85.0242 91.884 85.0242 91.6103V81.7539C84.8015 81.6 84.5844 81.4332 84.3674 81.2707ZM52.4167 81.3263C52.1254 81.3392 51.8284 81.3434 51.5314 81.3434H47.0192C46.3224 81.3434 45.5628 81.3263 44.746 81.2878C44.5119 81.2793 44.2948 81.1767 44.1977 81.0185L40.1253 74.7711C39.0459 73.1333 38.4975 71.688 38.4975 70.4351C38.4975 70.0546 38.7831 69.5329 39.36 68.8829C39.9312 68.2329 40.5594 67.583 41.2505 66.9373C41.9359 66.2873 42.587 65.7186 43.1868 65.2397C43.3181 65.1371 43.4838 65.0857 43.6551 65.0857C43.9521 65.0857 44.2491 65.2439 44.3062 65.5048C44.6261 67.0143 45.5742 68.9984 47.1563 71.4528L52.9764 80.6336C53.1649 80.9415 52.8736 81.3092 52.4167 81.3263Z"
                    fill="#2C3250"
                  />
                  <path
                    d="M46.6881 43.4743C36.3786 55.8579 26.1263 68.173 15.8169 80.5566C13.3209 79.2652 2.87441 75.0276 1.55503 72.7784C0.498385 70.9696 0.549788 69.225 1.94913 67.5402C6.12431 62.5158 10.3109 57.4999 14.4861 52.4755C17.913 48.3619 21.3686 44.2569 24.7555 40.1262C26.4062 38.1121 28.7594 37.2312 31.8151 37.4237C32.7061 37.4792 33.6428 37.6546 34.431 37.9624C36.0188 38.5868 45.0945 42.7474 46.6881 43.4743Z"
                    fill="url(#paint2_linear_59_429)"
                  />
                  <path
                    d="M20.0206 86.6372C20.0092 88.7924 17.6446 90.5413 14.7374 90.5328C11.7502 90.5242 9.35132 88.7411 9.32276 86.5004C9.2942 84.3068 11.7331 82.4552 14.6288 82.4638C17.6731 82.4809 20.032 84.3068 20.0206 86.6372Z"
                    fill="#2C3250"
                  />
                  <path
                    d="M279.818 13.7555C279.807 16.1929 277.134 18.1642 273.85 18.1556C270.474 18.1471 267.767 16.1288 267.733 13.6016C267.698 11.1257 270.451 9.03044 273.73 9.04327C277.163 9.06038 279.83 11.1214 279.818 13.7555Z"
                    fill="#2C3250"
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
            </Link>
          ) : (
            <div style={{ width: 130, height: 60 }} />
          )}
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            flexDirection: "row-reverse",
          }}
        >
          {navLinks
            .filter((link) => !link.authRequired || user)
            .map((link) => (
              <Link key={link.href} href={link.href} passHref legacyBehavior>
                <MemoizedNavItem
                  sx={{
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    color: pathname === link.href ? "#c77b3c" : "inherit",
                  }}
                >
                  {link.label}
                </MemoizedNavItem>
              </Link>
            ))}
        </Box>

        <Menu
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {/* Navigation Links */}
          {navLinks
            .filter((link) => !link.authRequired || user)
            .map((link) => (
              <MenuItem key={link.href} onClick={handleCloseNavMenu}>
                <Link
                  href={link.href}
                  passHref
                  legacyBehavior
                  style={{ width: "100%" }}
                >
                  <MemoizedNavItem
                    sx={{
                      textDecoration: "none",
                      marginTop: "10px",
                    }}
                  >
                    {link.label}
                  </MemoizedNavItem>
                </Link>
              </MenuItem>
            ))}

          {/* Language options */}
          <MenuItem>
            <MemoizedNavItem
              sx={{
                textDecoration: "none",
                marginTop: "10px",
              }}
              onClick={() => {
                handleCloseNavMenu();
                // Handle English language selection
              }}
            >
              English
            </MemoizedNavItem>
          </MenuItem>
          <MenuItem>
            <MemoizedNavItem
              sx={{ textDecoration: "none", fontWeight: 550 }}
              onClick={() => {
                handleCloseNavMenu();
                // Handle Arabic language selection
              }}
            >
              العربية
            </MemoizedNavItem>
          </MenuItem>

          {/* Login/Register buttons for mobile - without Fragment */}
          {!user && // Render the MenuItems directly without Fragment wrapper
          [
            <MenuItem key="login" onClick={handleCloseNavMenu}>
              <Link
                href="/login"
                passHref
                legacyBehavior
                style={{ width: "100%" }}
              >
                <MemoizedNavItem
                  sx={{ textDecoration: "none", fontWeight: 550 }}
                >
                  تسجيل دخول
                </MemoizedNavItem>
              </Link>
            </MenuItem>,
            <MenuItem key="register" onClick={handleCloseNavMenu}>
              <Link
                href="/register"
                passHref
                legacyBehavior
                style={{ width: "100%" }}
              >
                <MemoizedNavItem
                  sx={{ textDecoration: "none", fontWeight: 550 }}
                >
                  سجل الان
                </MemoizedNavItem>
              </Link>
            </MenuItem>,
          ]}
        </Menu>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" }, // Hide on xs screens, show on sm and up
            alignItems: "center",
            flexGrow: 0,
            gap: 2,
            flexDirection: "row-reverse",
          }}
        >
          {!user ? (
            <>
              <Link href="/register" passHref legacyBehavior>
                <CircleButton sx={{ whiteSpace: "nowrap" }}>
                  سجل الان
                </CircleButton>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <StyledButton sx={{ whiteSpace: "nowrap" }}>
                  تسجيل دخول
                </StyledButton>
              </Link>
            </>
          ) : (
            <>
              <MemoizedIconButton
                size="large"
                aria-label="open sign-in menu"
                onClick={handleOpenSignInMenu}
                color="inherit"
                sx={{ padding: "5px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#e49d67"
                  width="47px"
                  height="47px"
                  viewBox="0 0 24.00 24.00"
                  stroke="#e49d67"
                  strokeWidth="0.24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                </svg>
              </MemoizedIconButton>
              {user && (
                <span
                  variant="body1"
                  style={{
                    fontSize: "20px",
                    marginRight: "0px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.firstname} {user.lastname}
                </span>
              )}
            </>
          )}
          <Menu
            anchorEl={anchorElSignIn}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElSignIn)}
            onClose={handleCloseSignInMenu}
          >
            <MenuItem
              onClick={() => {
                handleCloseSignInMenu();
                handleMainProfileClick();
              }}
            >
              <Link href="/profile" passHref legacyBehavior>
                <MemoizedNavItem
                  sx={{ textDecoration: "none", fontWeight: 550 }}
                >
                  بروفايل
                </MemoizedNavItem>
              </Link>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleProfileClick();
                handleCloseSignInMenu();
              }}
            >
              <MemoizedNavItem
                onClick={handleProfileClick}
                sx={{ textDecoration: "none", fontWeight: 550 }}
              >
                رحلاتي
              </MemoizedNavItem>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSignInMenu();
                handleLogout();
              }}
            >
              <MemoizedNavItem
                sx={{
                  textDecoration: "none",
                  fontWeight: 550,
                  whiteSpace: "nowrap",
                }}
                onClick={handleLogout}
                component="a"
                href="/"
              >
                تسجيل خروج
              </MemoizedNavItem>
            </MenuItem>
          </Menu>

          <MemoizedIconButton
            size="large"
            aria-label="open language menu"
            onClick={handleOpenLanguageMenu}
            color="inherit"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <svg
              width="47px"
              height="47px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="iconify iconify--emojione"
              preserveAspectRatio="xMidYMid meet"
              fill="#000000"
            >
              <path
                d="M32 2C18.9 2 7.8 10.4 3.7 22h56.6C56.2 10.4 45.1 2 32 2z"
                fill="#f02438"
              ></path>
              <path
                d="M32 62c13.1 0 24.2-8.3 28.3-20H3.7C7.8 53.7 18.9 62 32 62z"
                fill="#222425"
              ></path>
              <path
                d="M3.7 22C2.6 25.1 2 28.5 2 32s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10H3.7z"
                fill="#f9f9f9"
              ></path>
              <g fill="#ffffff">
                <path d="M30.6 25.1c.3-.2.5 0 .7.2c.1.2.1.8-.1 1.5c-.1.4-.4.8-.6 1.1c.4 0 .9-.1 1.4-.3c.5.2.9.3 1.4.3c-.2-.4-.4-1.2-.3-1.8c0-.9-.1-1.2-.3-1.4c-.2-.2-.7-.3-1-.3c-.2 0-.2.1-.2.1c-.4-.1-.7-.1-.9 0c-.2.2-.2.7-.1.6"></path>
                <path d="M37.3 28.1c-.2-1.1-1.3-.8-2.2-.3c-.4.2-.8.4-1.2.4h-.3c-.5 0-1.1-.1-1.6-.3c-.5.2-1.1.3-1.6.3h-.2c-.5 0-.9-.2-1.3-.5c-.8-.4-1.9-.7-2.2.3c.2-.1.4-.3.5-.3l-.4 9.6l.2-.2l.4-9.3c.1.1.5.5.6.5l-.3 8.1l.3-.3l.3-7.7c.1.1.4.3.5.4l-.3 6.7l.8-.7l.8-2.7c-.7-1.5-.6-2.8-.6-2.8h.2c.5 0 1.6-.3 2.1-.6c.1 0 .1-.1.2-.1c0 .1.1.1.2.2c.5.3 1.6.6 2.1.6h.2s.1 1.3-.6 2.8l.7 2.6l.8.7l-.3-6.6c.1-.1.3-.3.5-.4l.3 7.5l.3.3l-.3-8c.1-.1.5-.4.6-.5l.4 9.2l.2.2l-.4-9.5c.1.1.4.3.6.4"></path>
                <path d="M31.1 29.7v3.9s0 .1.1.1c.1.2.3.3.4.5l.3.3l.3-.3l.5-.5v-3.8c-.3-.1-.6-.2-.8-.4c-.1-.1-.4 0-.8.2"></path>
              </g>
              <path
                d="M36.3 37.9c0-.5-.5-.5-.9-.4c-.1 0-.1 0-.2.1l-.6-2.2l3.3 3.2l-.4-10.4c-.1-1.6-1.4-1.2-2.3-.6c-.5.3-.9.5-1.4.5c-.7-1.2-.3-2.8-.8-3.2c-.2-.2-.9-.5-1.4-.5c-.3 0-.2.2-.2.2c-.5-.1-.9-.1-1.1.1c-.2.1 0 1.1.1.9c.3-.3.4-.2.6.1c.2.3-.2 1.5-.7 2.4c-.6 0-1.1-.2-1.6-.5c-1-.6-2.3-.9-2.3.6L26 38.5l3.3-3.1l-.6 2.1c-.1 0-.1 0-.2-.1c-.4-.1-.9-.1-.9.4c-.6-.1-.8.8-.2 1c0 .3 0 .5.4.5c.9.3 2.5.4 4.1.4s3.2-.1 4.1-.4c.4-.1.4-.3.4-.5c.8-.2.5-1.1-.1-.9m-5.1-4.3c0-.1 0-.1 0 0l-.1-.1v-3.8c.4-.1.7-.2.9-.4c.2.2.5.3.8.4v3.8c-.2.2-.3.4-.5.5l-.3.3l-.3-.3c-.2-.1-.3-.3-.5-.4m0-6.7c.2-.7.2-1.3.1-1.5c-.2-.2-.4-.4-.7-.2c-.1.1-.1-.4.1-.5c.2-.1.5-.1.9 0c0 0 0-.2.2-.1c.3 0 .9.2 1 .3c.1.1.3.5.3 1.4c0 .6.1 1.4.3 1.8c-.4 0-.9-.1-1.4-.3c-.5.2-.9.3-1.4.3c.2-.4.5-.8.6-1.2m-2.6 8.9l.3-6.7c-.1-.1-.3-.3-.5-.4l-.4 7.6l-.3.3l.3-8.1c-.1-.1-.5-.4-.6-.5l-.4 9.3l-.2.2l.4-9.6c-.1 0-.4.1-.5.3c.3-1 1.4-.7 2.2-.2c.4.3.9.4 1.3.5h.2c.5 0 1-.1 1.6-.3c.6.2 1.1.3 1.6.3h.3c.4-.1.8-.2 1.2-.4c.9-.5 2-.8 2.2.3c-.2-.1-.5-.3-.6-.3l.4 9.5l-.2-.2l-.4-9.4c-.1.1-.5.5-.6.5l.3 8l-.3-.3l-.3-7.5c-.1.1-.4.3-.5.4l.3 6.6l-.8-.7l-.7-2.6c.7-1.5.6-2.8.6-2.8h-.2c-.5 0-1.6-.2-2.1-.6c-.1 0-.1-.1-.2-.2c0 0-.1.1-.2.1c-.5.3-1.6.6-2.1.6h-.2s-.1 1.3.6 2.8l-.8 2.7l-.7.8m3.4 2h-1.1l.7-3.4c.1.1.2.2.4.3c.1-.1.3-.2.4-.3l.8 3.4H32"
                fill="#c09300"
              ></path>
            </svg>
          </MemoizedIconButton>
          <Menu
            anchorEl={anchorElLanguage}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElLanguage)}
            onClose={handleCloseLanguageMenu}
          >
            <MenuItem onClick={handleCloseLanguageMenu}>
              <MemoizedNavItem sx={{ textDecoration: "none" }}>
                English
              </MemoizedNavItem>
            </MenuItem>
            <MenuItem onClick={handleCloseLanguageMenu}>
              <MemoizedNavItem sx={{ textDecoration: "none" }}>
                العربية
              </MemoizedNavItem>
            </MenuItem>
          </Menu>
          <DarkmodeButton
            sx={{ display: { xs: "none !important", md: "flex" } }}
          >
            <label className="switch">
              <input id="input" type="checkbox" />
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
      </Toolbar>
    </NavBarWrapper>
  );
};

export default React.memo(NavBar);
