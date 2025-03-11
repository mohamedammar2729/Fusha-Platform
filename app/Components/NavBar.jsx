"use client";
import React, { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Logo from "../../public/Frame.svg";
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

        <Link href="/" passHref>
          <Image src={Logo} alt="Logo" width={130} height={60} />
        </Link>

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
          {navLinks
            .filter((link) => !link.authRequired || user)
            .map((link) => (
              <Link key={link.href} href={link.href} passHref legacyBehavior>
                <MemoizedNavItem
                  onClick={handleCloseNavMenu}
                  sx={{ textDecoration: "none" }}
                >
                  {link.label}
                </MemoizedNavItem>
              </Link>
            ))}
        </Menu>

        <Box
          sx={{
            display: "flex",
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
                  style={{ fontSize: "20px", marginRight: "0px" }}
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
            <MenuItem onClick={()=>{handleCloseSignInMenu();handleMainProfileClick()}}>
              <Link href="/profile" passHref legacyBehavior>
            
                <MemoizedNavItem
                  sx={{ textDecoration: "none", fontWeight: 550 }}
                >
                  بروفايل
                </MemoizedNavItem>
                  </Link>
            </MenuItem>
            
            <MenuItem onClick={()=>{handleProfileClick();handleCloseSignInMenu();} }>
              <MemoizedNavItem
                onClick={handleProfileClick}
                sx={{ textDecoration: "none", fontWeight: 550 }}
              >
                رحلاتي
              </MemoizedNavItem>
            </MenuItem>
            <MenuItem onClick={()=>{handleCloseSignInMenu();handleLogout();} }>
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
          <DarkmodeButton>
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





