"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  IconButton,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import StorefrontIcon from "@mui/icons-material/Sort";

const UserManagement = () => {
  const { theme } = useTheme(); // Only use theme from context, not darkMode
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Demo users data
  const demoUsers = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed.m@example.com",
      type: "user",
      status: "active",
      joinDate: "2023-09-15",
      lastLogin: "2024-04-10",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "سارة علي",
      email: "sara.a@example.com",
      type: "vendor",
      status: "active",
      joinDate: "2023-08-22",
      lastLogin: "2024-04-11",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "محمد عبدالله",
      email: "mohamed.a@example.com",
      type: "admin",
      status: "active",
      joinDate: "2023-07-10",
      lastLogin: "2024-04-12",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "ريم سعيد",
      email: "reem.s@example.com",
      type: "user",
      status: "inactive",
      joinDate: "2023-10-05",
      lastLogin: "2024-03-01",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "عمر فاروق",
      email: "omar.f@example.com",
      type: "vendor",
      status: "suspended",
      joinDate: "2023-11-18",
      lastLogin: "2024-01-20",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "نور حسن",
      email: "nour.h@example.com",
      type: "user",
      status: "active",
      joinDate: "2023-12-01",
      lastLogin: "2024-04-08",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "كريم علي",
      email: "kareem.a@example.com",
      type: "vendor",
      status: "active",
      joinDate: "2024-01-07",
      lastLogin: "2024-04-09",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "فاطمة محمود",
      email: "fatma.m@example.com",
      type: "user",
      status: "inactive",
      joinDate: "2024-02-15",
      lastLogin: "2024-03-20",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 9,
      name: "خالد راشد",
      email: "khaled.r@example.com",
      type: "vendor",
      status: "pending",
      joinDate: "2024-03-08",
      lastLogin: "2024-04-11",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: 10,
      name: "هدى عاصم",
      email: "huda.a@example.com",
      type: "user",
      status: "active",
      joinDate: "2024-01-25",
      lastLogin: "2024-04-10",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      id: 11,
      name: "طارق حسين",
      email: "tarek.h@example.com",
      type: "vendor",
      status: "active",
      joinDate: "2023-09-30",
      lastLogin: "2024-04-12",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 12,
      name: "منى سامي",
      email: "mona.s@example.com",
      type: "user",
      status: "active",
      joinDate: "2023-10-12",
      lastLogin: "2024-04-11",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 13,
      name: "أمير نادر",
      email: "amir.n@example.com",
      type: "vendor",
      status: "suspended",
      joinDate: "2023-11-05",
      lastLogin: "2023-12-15",
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      id: 14,
      name: "ليلى مجدي",
      email: "layla.m@example.com",
      type: "user",
      status: "active",
      joinDate: "2023-12-20",
      lastLogin: "2024-04-09",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 15,
      name: "ياسر محمد",
      email: "yasser.m@example.com",
      type: "admin",
      status: "active",
      joinDate: "2023-08-01",
      lastLogin: "2024-04-12",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      id: 16,
      name: "سلمى حاتم",
      email: "salma.h@example.com",
      type: "user",
      status: "pending",
      joinDate: "2024-03-20",
      lastLogin: "2024-04-10",
      avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    },
    {
      id: 17,
      name: "راشد سعيد",
      email: "rashed.s@example.com",
      type: "vendor",
      status: "active",
      joinDate: "2023-10-10",
      lastLogin: "2024-04-08",
      avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    },
    {
      id: 18,
      name: "سمية حامد",
      email: "somaya.h@example.com",
      type: "user",
      status: "inactive",
      joinDate: "2023-09-18",
      lastLogin: "2024-02-05",
      avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(demoUsers);
      setFilteredUsers(demoUsers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters whenever search or filter values change
    const filtered = users.filter((user) => {
      // Filter by search term
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by user type
      const matchesType =
        userTypeFilter === "all" || user.type === userTypeFilter;

      // Filter by status
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });

    setFilteredUsers(filtered);
    setPage(0); // Reset to first page when filters change
  }, [searchTerm, userTypeFilter, statusFilter, users]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setUserTypeFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const getUserTypeChip = (type) => {
    switch (type) {
      case "admin":
        return (
          <Chip
            icon={
              <SupervisorAccountIcon
                sx={{ fontSize: "0.8rem", mr: 0, ml: 0.5 }}
              />
            }
            label="مسؤول"
            size="small"
            sx={{
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          />
        );
      case "vendor":
        return (
          <Chip
            icon={
              <StorefrontIcon sx={{ fontSize: "0.8rem", mr: 0, ml: 0.5 }} />
            }
            label="بائع"
            size="small"
            sx={{
              backgroundColor: "rgba(46, 125, 50, 0.1)",
              color: "#2e7d32",
              fontWeight: "bold",
            }}
          />
        );
      default:
        return (
          <Chip
            icon={<PersonIcon sx={{ fontSize: "0.8rem", mr: 0, ml: 0.5 }} />}
            label="مستخدم"
            size="small"
            sx={{
              backgroundColor: "rgba(74, 114, 172, 0.1)",
              color: theme.colors.primary,
              fontWeight: "bold",
            }}
          />
        );
    }
  };

  const getUserStatusChip = (status) => {
    switch (status) {
      case "active":
        return (
          <Chip
            icon={
              <CheckCircleIcon sx={{ fontSize: "0.8rem", mr: 0, ml: 0.5 }} />
            }
            label="نشط"
            size="small"
            sx={{
              backgroundColor: "rgba(46, 125, 50, 0.1)",
              color: "#2e7d32",
              fontWeight: "bold",
            }}
          />
        );
      case "suspended":
        return (
          <Chip
            icon={<BlockIcon sx={{ fontSize: "0.8rem", mr: 0, ml: 0.5 }} />}
            label="معلق"
            size="small"
            sx={{
              backgroundColor: "rgba(211, 47, 47, 0.1)",
              color: "#d32f2f",
              fontWeight: "bold",
            }}
          />
        );
      case "pending":
        return (
          <Chip
            icon={<FilterAltIcon sx={{ fontSize: "0.8rem", mr: 0, ml: 0.5 }} />}
            label="قيد المراجعة"
            size="small"
            sx={{
              backgroundColor: "rgba(237, 108, 2, 0.1)",
              color: "#ed6c02",
              fontWeight: "bold",
            }}
          />
        );
      default:
        return (
          <Chip
            icon={<BlockIcon sx={{ fontSize: "0.8rem", mr: 0, ml: 0.5 }} />}
            label="غير نشط"
            size="small"
            sx={{
              backgroundColor: "rgba(117, 117, 117, 0.1)",
              color: "#757575",
              fontWeight: "bold",
            }}
          />
        );
    }
  };

  const viewUserDetails = (userId) => {
    console.log(`View user details for ID: ${userId}`);
    // In a real app, navigate to user detail page
    // router.push(`/admin/users/${userId}`);
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            color: theme.colors.text,
          }}
        >
          <CircularProgress sx={{ color: theme.colors.primary }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        sx={{ p: { xs: 1, sm: 2, md: 3 } }}
      >
        {/* Header with stats */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ color: theme.colors.text }}
          >
            إدارة المستخدمين
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1, color: theme.colors.textSecondary }}
          >
            عرض وإدارة حسابات المستخدمين والبائعين
          </Typography>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                boxShadow: "none",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {users.filter((user) => user.type === "user").length}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.colors.textSecondary }}
                    >
                      إجمالي المستخدمين
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(74, 114, 172, 0.1)",
                    }}
                  >
                    <PersonIcon
                      sx={{ color: theme.colors.primary, fontSize: 24 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                boxShadow: "none",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {users.filter((user) => user.type === "vendor").length}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.colors.textSecondary }}
                    >
                      إجمالي البائعين
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(46, 125, 50, 0.1)",
                    }}
                  >
                    <StorefrontIcon sx={{ color: "#2e7d32", fontSize: 24 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                boxShadow: "none",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {users.filter((user) => user.status === "active").length}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.colors.textSecondary }}
                    >
                      الحسابات النشطة
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(46, 125, 50, 0.1)",
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#2e7d32", fontSize: 24 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                boxShadow: "none",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {
                        users.filter(
                          (user) =>
                            user.status === "inactive" ||
                            user.status === "suspended"
                        ).length
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.colors.textSecondary }}
                    >
                      الحسابات المعلقة
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(211, 47, 47, 0.1)",
                    }}
                  >
                    <BlockIcon sx={{ color: "#d32f2f", fontSize: 24 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters & Search */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <TextField
              placeholder="بحث عن مستخدم..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.colors.textSecondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: { xs: "100%", sm: 250 },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  "& fieldset": { borderColor: theme.colors.border },
                  "&:hover fieldset": { borderColor: theme.colors.primary },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.colors.primary,
                  },
                  "& input::placeholder": { color: theme.colors.textSecondary },
                },
              }}
            />

            <FormControl
              size="small"
              sx={{
                minWidth: 150,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  "& fieldset": { borderColor: theme.colors.border },
                  "&:hover fieldset": { borderColor: theme.colors.primary },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.colors.primary,
                  },
                },
                "& .MuiInputLabel-root": { color: theme.colors.textSecondary },
                "& .MuiSelect-icon": { color: theme.colors.textSecondary },
              }}
            >
              <InputLabel id="user-type-filter-label">نوع المستخدم</InputLabel>
              <Select
                labelId="user-type-filter-label"
                id="user-type-filter"
                value={userTypeFilter}
                onChange={handleTypeFilterChange}
                label="نوع المستخدم"
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="user">مستخدم</MenuItem>
                <MenuItem value="vendor">بائع</MenuItem>
                <MenuItem value="admin">مدير نظام</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: 150,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  "& fieldset": { borderColor: theme.colors.border },
                  "&:hover fieldset": { borderColor: theme.colors.primary },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.colors.primary,
                  },
                },
                "& .MuiInputLabel-root": { color: theme.colors.textSecondary },
                "& .MuiSelect-icon": { color: theme.colors.textSecondary },
              }}
            >
              <InputLabel id="status-filter-label">الحالة</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="الحالة"
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
                <MenuItem value="suspended">معلق</MenuItem>
                <MenuItem value="pending">قيد المراجعة</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            size="medium"
            sx={{
              width: { xs: "100%", md: "auto" },
              backgroundColor: theme.colors.primary,
              color: "white",
              "&:hover": {
                backgroundColor: theme.colors.accent,
              },
            }}
          >
            إضافة مستخدم جديد
          </Button>
        </Box>

        {/* Users Table */}
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 2,
            boxShadow: "none",
            mb: 3,
          }}
        >
          {filteredUsers.length === 0 ? (
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                color: theme.colors.textSecondary,
              }}
            >
              <Typography variant="body1">
                لا توجد نتائج مطابقة للبحث
              </Typography>
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: "calc(100vh - 350px)" }}>
              <Table stickyHeader aria-label="users table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.colors.surface,
                        color: theme.colors.text,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      المستخدم
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.colors.surface,
                        color: theme.colors.text,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      البريد الإلكتروني
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.colors.surface,
                        color: theme.colors.text,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      النوع
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.colors.surface,
                        color: theme.colors.text,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      الحالة
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.colors.surface,
                        color: theme.colors.text,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      تاريخ التسجيل
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.colors.surface,
                        color: theme.colors.text,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      آخر دخول
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.colors.surface,
                        color: theme.colors.text,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                      align="center"
                    >
                      إجراءات
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow
                        key={user.id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.03)",
                          },
                          "& .MuiTableCell-root": {
                            borderBottom: `1px solid ${theme.colors.border}`,
                            color: theme.colors.text,
                          },
                        }}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              src={user.avatar}
                              alt={user.name}
                              sx={{ width: 36, height: 36 }}
                            />
                            <Typography variant="body2">{user.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{user.email}</Typography>
                        </TableCell>
                        <TableCell>{getUserTypeChip(user.type)}</TableCell>
                        <TableCell>{getUserStatusChip(user.status)}</TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(user.joinDate).toLocaleDateString(
                              "ar-EG"
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(user.lastLogin).toLocaleDateString(
                              "ar-EG"
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => viewUserDetails(user.id)}
                            sx={{
                              color: theme.colors.primary,
                              "&:hover": {
                                backgroundColor: "rgba(74, 114, 172, 0.1)",
                              },
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="عدد الصفوف:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`
            }
            sx={{
              borderTop: `1px solid ${theme.colors.border}`,
              color: theme.colors.text,
              ".MuiTablePagination-selectIcon": {
                color: theme.colors.textSecondary,
              },
              ".MuiTablePagination-select": {
                color: theme.colors.text,
              },
              ".MuiTablePagination-selectLabel": {
                color: theme.colors.textSecondary,
              },
              ".MuiTablePagination-displayedRows": {
                color: theme.colors.textSecondary,
              },
              ".MuiIconButton-root": {
                color: theme.colors.primary,
              },
              ".Mui-disabled": {
                color: theme.colors.textSecondary + "80",
              },
            }}
          />
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default UserManagement;
