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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useMediaQuery,
  Container,
  Tooltip,
  Collapse,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const drawerWidth = 250;

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
      marginRight: `${drawerWidth}px`, // Add this to account for drawer width
    }),
  })
);

// Custom styled components for enhanced design
const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.colors?.border || "rgba(0,0,0,0.1)"}`,
  marginBottom: theme.spacing(2),
}));

const SidebarFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.colors?.border || "rgba(0,0,0,0.1)"}`,
  marginTop: "auto",
}));

const MenuItemButton = styled(ListItemButton)(({ theme, active }) => ({
  margin: "6px 14px",
  padding: "10px 12px",
  borderRadius: "12px",
  transition: "all 0.2s ease-in-out",
  backgroundColor: active ? `${theme.colors?.primary}15` : "transparent",
  borderRight: active ? `3px solid ${theme.colors?.primary}` : "none",
  "&:hover": {
    backgroundColor: active
      ? `${theme.colors?.primary}20`
      : `${theme.colors?.primary}10`,
  },
}));

const UserProfile = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  borderRadius: "12px",
  backgroundColor: `${theme.colors?.primary}10`,
  margin: theme.spacing(0, 2, 2, 2),
}));

const AdminLayout = ({ children }) => {
  const { darkMode, toggleTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [placesSubmenuOpen, setPlacesSubmenuOpen] = useState(false);

  // Check if path is in places section to auto-expand submenu
  useEffect(() => {
    const placesRelatedPaths = [
      "/admin/all-places",
      "/admin/pending-places",
      "/admin/approved-places",
      "/admin/rejected-places",
    ];
    if (placesRelatedPaths.some((path) => pathname?.startsWith(path))) {
      setPlacesSubmenuOpen(true);
    }
  }, [pathname]);

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

  const togglePlacesSubmenu = () => {
    setPlacesSubmenuOpen(!placesSubmenuOpen);
  };

  const mainMenuItems = [
    { text: "الرئيسية", icon: <DashboardIcon />, path: "/admin" },
    { text: "المستخدمين", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "الإعدادات", icon: <SettingsIcon />, path: "/admin/settings" },
  ];

  const placesMenuItems = [
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
    {
      text: "الأماكن المرفوضة",
      icon: <CancelIcon />,
      path: "/admin/rejected-places",
    },
    {
      text: "جميع الأماكن",
      icon: <PlaceIcon />,
      path: "/admin/all-places",
    },
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
          direction: "rtl",
          boxShadow: darkMode
            ? "0 2px 10px rgba(0, 0, 0, 0.3)"
            : "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { lg: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

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

      {/* Enhanced Right Sidebar Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          position: "relative",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: darkMode ? theme.colors.surface : "#fff",
            borderLeft: `1px solid ${
              darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
            borderRight: "none",
            boxShadow: darkMode ? "0 0 15px rgba(0, 0, 0, 0.2)" : "none",
            paddingTop: "64px",
            right: 0,
            left: "auto",
          },
          display: open ? "block" : "none",
          // Add this line to control the docked drawer width
          "& .MuiDrawer-docked": {
            width: open ? "auto" : 0,
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* User Profile Section */}
          <UserProfile>
            <Avatar
              src={adminUser?.profileImage}
              alt={adminUser?.firstname}
              sx={{
                width: 45,
                height: 45,
                mr: 2,
                bgcolor: theme.colors.primary,
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
              }}
            >
              {adminUser?.firstname?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="500">
                {adminUser?.firstname} {adminUser?.lastname}
              </Typography>
              <Typography variant="body2" color={theme.colors.textSecondary}>
                مدير النظام
              </Typography>
            </Box>
          </UserProfile>

          {/* Main Menu */}
          <List sx={{ flexGrow: 0 }}>
            {mainMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <MenuItemButton
                  active={pathname === item.path ? 1 : 0}
                  onClick={() => router.push(item.path)}
                  sx={{ direction: "rtl" }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color:
                        pathname === item.path
                          ? theme.colors.primary
                          : theme.colors.textSecondary,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiTypography-root": {
                        fontWeight: pathname === item.path ? 600 : 400,
                        color:
                          pathname === item.path
                            ? theme.colors.primary
                            : theme.colors.text,
                      },
                    }}
                  />
                </MenuItemButton>
              </ListItem>
            ))}

            {/* Places Collapsible Section */}
            <ListItem disablePadding>
              <MenuItemButton onClick={togglePlacesSubmenu}>
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: pathname?.includes("/places")
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
                  }}
                >
                  <PlaceIcon />
                </ListItemIcon>
                <ListItemText
                  primary="إدارة الأماكن"
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: pathname?.includes("/places") ? 600 : 400,
                      color: pathname?.includes("/places")
                        ? theme.colors.primary
                        : theme.colors.text,
                    },
                  }}
                />
                {placesSubmenuOpen ? (
                  <ExpandLessIcon sx={{ color: theme.colors.textSecondary }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: theme.colors.textSecondary }} />
                )}
              </MenuItemButton>
            </ListItem>

            <Collapse in={placesSubmenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {placesMenuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <MenuItemButton
                      active={pathname === item.path ? 1 : 0}
                      onClick={() => router.push(item.path)}
                      sx={{ pl: 6 }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 35,
                          color:
                            pathname === item.path
                              ? theme.colors.primary
                              : theme.colors.textSecondary,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "0.95rem",
                            fontWeight: pathname === item.path ? 600 : 400,
                            color:
                              pathname === item.path
                                ? theme.colors.primary
                                : theme.colors.text,
                          },
                        }}
                      />
                    </MenuItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>

          {/* Logout button at bottom */}
          <SidebarFooter>
            <MenuItemButton onClick={handleLogout}>
              <ListItemIcon
                sx={{ minWidth: 40, color: theme.colors.textSecondary }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="تسجيل الخروج"
                sx={{ color: theme.colors.text }}
              />
            </MenuItemButton>
          </SidebarFooter>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Main
        open={open}
        sx={{
          marginTop: "64px",
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%", // Adjust width based on drawer state
          p: { xs: 2, md: 3 },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 2,
            px: { xs: 1, sm: 2 },
            direction: "rtl", // Reduce padding on smaller screens
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Main>
    </Box>
  );
};

export default AdminLayout;
