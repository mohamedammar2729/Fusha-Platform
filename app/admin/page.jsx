"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";
import AdminLayout from "../Components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ title, value, icon, color, subtitle }) => {
  const { theme } = useTheme();

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "none",
        border: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              gap: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: `${color}20`, // Use color with 20% opacity
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {React.cloneElement(icon, { sx: { color } })}
            </Box>
            <Typography variant="subtitle2" color={theme.colors.textSecondary}>
              {title}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              sx={{ color: theme.colors.text }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                sx={{ color: theme.colors.textSecondary }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        try {
          const response = await axios.get(
            "https://iti-server-production.up.railway.app/api/admin/stats",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 3000,
            }
          );

          setStats(response.data);
          setDemoMode(false);
        } catch (apiError) {
          console.log("Using demo data due to API error", apiError);
          // Use demo data if API fails
          setDemoMode(true);
          setStats({
            places: {
              total: 87,
              approved: 65,
              pending: 14,
              rejected: 8,
            },
            users: {
              total: 324,
              regular: 298,
              sellers: 24,
              admins: 2,
            },
            placesByCategory: [
              { _id: "restaurants", count: 32 },
              { _id: "tourism", count: 22 },
              { _id: "hotels", count: 13 },
              { _id: "shopping", count: 8 },
              { _id: "entertainment", count: 7 },
              { _id: "museums", count: 5 },
            ],
            placesByCity: [
              { _id: "القاهرة", count: 38 },
              { _id: "الإسكندرية", count: 21 },
              { _id: "الغردقة", count: 12 },
              { _id: "شرم الشيخ", count: 9 },
              { _id: "أسوان", count: 4 },
              { _id: "الأقصر", count: 3 },
            ],
          });
        }
      } catch (error) {
        console.error("Error in stats fetch:", error);
        setError("فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.");
        if (error.response && error.response.status === 403) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, [router]);

  // Chart configurations
  const categoryChartData = {
    labels:
      stats?.placesByCategory?.map((item) => {
        const categories = {
          restaurants: "مطاعم وكافيهات",
          tourism: "أماكن سياحية",
          hotels: "فنادق ومنتجعات",
          shopping: "تسوق ومولات",
          entertainment: "أنشطة ترفيهية",
          museums: "متاحف ومعارض",
        };
        return categories[item._id] || item._id;
      }) || [],
    datasets: [
      {
        label: "عدد الأماكن",
        data: stats?.placesByCategory?.map((item) => item.count) || [],
        backgroundColor: [
          theme.colors.primary,
          "#F6B17A",
          "#4CAF50",
          "#FEC20F",
          "#FF5722",
          "#9C27B0",
        ],
        borderWidth: 0,
      },
    ],
  };

  const cityChartData = {
    labels: stats?.placesByCity?.map((item) => item._id) || [],
    datasets: [
      {
        label: "عدد الأماكن",
        data: stats?.placesByCity?.map((item) => item.count) || [],
        backgroundColor: theme.colors.primary + "CC", // Add transparency
        borderColor: theme.colors.primary,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: theme.colors.text,
          font: {
            family: "'Amiri', serif",
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: theme.colors.surface + "F0", // Semi-transparent background
        titleColor: theme.colors.text,
        bodyColor: theme.colors.text,
        borderColor: theme.colors.border,
        borderWidth: 1,
        padding: 10,
        bodyFont: {
          family: "'Amiri', serif",
        },
        titleFont: {
          family: "'Amiri', serif",
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.colors.text,
          font: {
            family: "'Amiri', serif",
          },
        },
        grid: {
          color: theme.colors.border + "30", // More transparent grid
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: theme.colors.text,
          font: {
            family: "'Amiri', serif",
          },
        },
        grid: {
          color: theme.colors.border + "30", // More transparent grid
          drawBorder: false,
        },
      },
    },
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

  if (error) {
    return (
      <AdminLayout>
        <Paper
          sx={{
            p: 3,
            textAlign: "center",
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <Typography color="error">{error}</Typography>
          <Button
            sx={{
              mt: 2,
              backgroundColor: theme.colors.primary,
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: theme.colors.accent,
              },
            }}
            variant="contained"
            onClick={() => window.location.reload()}
          >
            إعادة المحاولة
          </Button>
        </Paper>
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
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ color: theme.colors.text }}
          >
            لوحة التحكم
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ mt: 1, color: theme.colors.textSecondary }}
            >
              نظرة عامة على إحصائيات المنصة
            </Typography>
            {demoMode && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.colors.accent,
                  backgroundColor: `${theme.colors.accent}15`,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: "bold",
                }}
              >
                بيانات توضيحية
              </Typography>
            )}
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Stats Cards - First Row */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="الأماكن المعلقة"
              value={stats?.places?.pending || 0}
              icon={<PendingIcon />}
              color="#FEC20F"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="الأماكن المقبولة"
              value={stats?.places?.approved || 0}
              icon={<CheckCircleIcon />}
              color="#4CAF50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="الأماكن المرفوضة"
              value={stats?.places?.rejected || 0}
              icon={<CancelIcon />}
              color="#F44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="إجمالي الأماكن"
              value={stats?.places?.total || 0}
              icon={<StorefrontIcon />}
              color={theme.colors.primary}
            />
          </Grid>

          {/* Stats Cards - Second Row */}
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="البائعين"
              value={stats?.users?.sellers || 0}
              icon={<StorefrontIcon />}
              color="#9C27B0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="المستخدمين العاديين"
              value={stats?.users?.regular || 0}
              icon={<PeopleIcon />}
              color="#3F51B5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="إجمالي المستخدمين"
              value={stats?.users?.total || 0}
              icon={<PeopleIcon />}
              color={theme.colors.primary}
            />
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 2,
                height: "100%",
                overflow: "hidden",
                boxShadow: "none",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
              }}
            >
              <CardContent sx={{ height: "100%", p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 1,
                  }}
                >
                  <CategoryIcon sx={{ color: theme.colors.primary }} />
                  <Typography variant="h6" sx={{ color: theme.colors.text }}>
                    الأماكن حسب الفئة
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3, borderColor: theme.colors.border }} />
                <Box sx={{ height: 300 }}>
                  <Doughnut data={categoryChartData} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 2,
                height: "100%",
                overflow: "hidden",
                boxShadow: "none",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
              }}
            >
              <CardContent sx={{ height: "100%", p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 1,
                  }}
                >
                  <LocationOnIcon sx={{ color: theme.colors.primary }} />
                  <Typography variant="h6" sx={{ color: theme.colors.text }}>
                    الأماكن حسب المدينة
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3, borderColor: theme.colors.border }} />
                <Box sx={{ height: 300 }}>
                  <Bar data={cityChartData} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "none",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: theme.colors.text }}
                >
                  روابط سريعة
                </Typography>
                <Divider sx={{ mb: 2, borderColor: theme.colors.border }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        justifyContent: "flex-start",
                        color: theme.colors.primary,
                        borderColor: theme.colors.border,
                        "&:hover": {
                          borderColor: theme.colors.primary,
                          backgroundColor: `${theme.colors.primary}10`,
                        },
                      }}
                      startIcon={<PendingIcon />}
                      onClick={() => router.push("/admin/pending-places")}
                    >
                      مراجعة الطلبات المعلقة ({stats?.places?.pending || 0})
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        justifyContent: "flex-start",
                        color: theme.colors.primary,
                        borderColor: theme.colors.border,
                        "&:hover": {
                          borderColor: theme.colors.primary,
                          backgroundColor: `${theme.colors.primary}10`,
                        },
                      }}
                      startIcon={<CheckCircleIcon />}
                      onClick={() => router.push("/admin/approved-places")}
                    >
                      الأماكن المقبولة
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        justifyContent: "flex-start",
                        color: theme.colors.primary,
                        borderColor: theme.colors.border,
                        "&:hover": {
                          borderColor: theme.colors.primary,
                          backgroundColor: `${theme.colors.primary}10`,
                        },
                      }}
                      startIcon={<CancelIcon />}
                      onClick={() => router.push("/admin/rejected-places")}
                    >
                      الأماكن المرفوضة
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        justifyContent: "flex-start",
                        color: theme.colors.primary,
                        borderColor: theme.colors.border,
                        "&:hover": {
                          borderColor: theme.colors.primary,
                          backgroundColor: `${theme.colors.primary}10`,
                        },
                      }}
                      startIcon={<PeopleIcon />}
                      onClick={() => router.push("/admin/users")}
                    >
                      إدارة المستخدمين
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
