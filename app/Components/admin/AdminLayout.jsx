"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton, // Add this import
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useMediaQuery,
  Container,
  Paper,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlaceIcon from "@mui/icons-material/Place";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingIcon from "@mui/icons-material/Pending";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AdminLayout = ({ children }) => {
  const { darkMode, toggleTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [showTitle, setShowTitle] = useState(true);

  // Fix: Use a direct media query string instead of theme function
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    setMounted(true);

    // Check if user is admin
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.userType !== "admin") {
      router.push("/login");
    } else {
      setAdminUser(user);
    }

    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile, router]);

  useEffect(() => {
    // Close drawer on mobile when route changes
    if (isMobile) {
      setOpen(false);
    }
  }, [pathname, isMobile]);

  if (!mounted || !adminUser) return null;

  const handleDrawerToggle = () => {
    setOpen(!open);
    setTimeout(() => setShowTitle(!open), open ? 100 : 300);
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menuItems = [
    { text: "الرئيسية", icon: <DashboardIcon />, path: "/admin" },
    {
      text: "الطلبات المعلقة",
      icon: <PendingIcon />,
      path: "/admin/pending-places",
    },
    {
      text: "الأماكن المعتمدة",
      icon: <CheckCircleOutlineIcon />,
      path: "/admin/approved-places",
    },
    { text: "جميع الأماكن", icon: <PlaceIcon />, path: "/admin/all-places" },
    { text: "المستخدمين", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "الإعدادات", icon: <SettingsIcon />, path: "/admin/settings" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: darkMode ? theme.colors.background : "#f5f5f7",
        color: theme.colors.text,
      }}
    >
      {/* Header AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: darkMode ? theme.colors.surface : "#fff",
          color: theme.colors.text,
          boxShadow: darkMode
            ? "0 2px 10px rgba(0, 0, 0, 0.3)"
            : "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              fontWeight: "bold",
              color: theme.colors.primary,
            }}
          >
            لوحة تحكم فسحة
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Notifications */}
            <Tooltip title="الإشعارات">
              <IconButton
                color="inherit"
                onClick={handleNotificationMenu}
                size="large"
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Tooltip title="الحساب الشخصي">
              <IconButton
                onClick={handleProfileMenu}
                size="large"
                sx={{ ml: 1 }}
              >
                {adminUser?.profileImage ? (
                  <Avatar
                    src={adminUser.profileImage}
                    alt={`${adminUser.firstname} ${adminUser.lastname}`}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
            </Tooltip>

            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            backgroundColor: darkMode ? theme.colors.surface : "#fff",
            color: theme.colors.text,
            mt: 1.5,
            width: 200,
            boxShadow: darkMode
              ? "0 4px 20px rgba(0, 0, 0, 0.3)"
              : "0 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <MenuItem onClick={() => router.push("/admin/profile")}>
          <ListItemIcon>
            <AccountCircleIcon
              fontSize="small"
              sx={{ color: theme.colors.primary }}
            />
          </ListItemIcon>
          <Typography>الملف الشخصي</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: theme.colors.primary }} />
          </ListItemIcon>
          <Typography>تسجيل الخروج</Typography>
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleCloseNotificationMenu}
        PaperProps={{
          sx: {
            backgroundColor: darkMode ? theme.colors.surface : "#fff",
            color: theme.colors.text,
            mt: 1.5,
            width: 300,
            maxHeight: "80vh",
            boxShadow: darkMode
              ? "0 4px 20px rgba(0, 0, 0, 0.3)"
              : "0 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${
              darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            الإشعارات
          </Typography>
        </Box>
        <MenuItem onClick={handleCloseNotificationMenu}>
          <Typography variant="body2">
            طلب تسجيل مكان جديد من أحمد محمد
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseNotificationMenu}>
          <Typography variant="body2">
            تم تسجيل مستخدم جديد: محمد علي
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseNotificationMenu}>
          <Typography variant="body2">
            تقييم جديد بواسطة عبدالله أحمد
          </Typography>
        </MenuItem>
      </Menu>

      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: darkMode ? theme.colors.surface : "#fff",
            borderRight: `1px solid ${
              darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
            boxShadow: darkMode ? "0 0 15px rgba(0, 0, 0, 0.2)" : "none",
            paddingTop: "64px",
          },
          display: open ? "block" : "none",
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Nav Menu */}
          <List sx={{ flexGrow: 1, direction: "rtl" }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => router.push(item.path)}
                sx={{
                  backgroundColor:
                    pathname === item.path
                      ? darkMode
                        ? "rgba(246, 177, 122, 0.15)"
                        : "rgba(74, 114, 172, 0.1)"
                      : "transparent",
                  borderRight:
                    pathname === item.path
                      ? `3px solid ${theme.colors.primary}`
                      : "3px solid transparent",
                  mb: 0.5,
                  borderRadius: "0 8px 8px 0",
                  "&:hover": {
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      pathname === item.path
                        ? theme.colors.primary
                        : theme.colors.textSecondary,
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color:
                      pathname === item.path
                        ? theme.colors.primary
                        : theme.colors.text,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          {/* Logout button at bottom */}
          <List sx={{ direction: "rtl" }}>
            <Divider
              sx={{
                mb: 1,
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              }}
            />
            <ListItemButton
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: theme.colors.textSecondary, minWidth: 40 }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="تسجيل الخروج"
                sx={{ color: theme.colors.text }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Main
        open={open}
        sx={{ marginTop: "64px", width: "100%", p: { xs: 2, md: 3 } }}
      >
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </Container>
      </Main>
    </Box>
  );
};

export default AdminLayout;
