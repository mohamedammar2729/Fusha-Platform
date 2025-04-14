"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";
import SellerLayout from "../../../Components/admin/AdminLayout";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

const PlaceDetail = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useParams();
  const placeId = params.id;

  // State variables
  const [place, setPlace] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Fetch place details on component mount
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          `https://iti-server-production.up.railway.app/api/seller-places/my-places/${placeId}/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlace(response.data);

        // Fetch statistics
        const statsResponse = await axios.get(
          `https://iti-server-production.up.railway.app/api/seller-places/my-places/${placeId}/statistics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(statsResponse.data);
      } catch (error) {
        console.error("Error fetching place details:", error);
        setError("فشل في تحميل بيانات المكان. يرجى المحاولة مرة أخرى.");
        if (error.response && error.response.status === 403) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (placeId) {
      fetchPlaceDetails();
    }
  }, [placeId, router]);

  // Handle image navigation
  const handleNextImage = () => {
    if (place && place.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === place.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (place && place.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? place.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Convert category to readable format
  const getCategoryLabel = (category) => {
    const categories = {
      restaurants: "مطاعم وكافيهات",
      tourism: "أماكن سياحية",
      hotels: "فنادق ومنتجعات",
      shopping: "تسوق ومولات",
      entertainment: "أنشطة ترفيهية",
      museums: "متاحف ومعارض",
    };

    return categories[category] || category;
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <SellerLayout>
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
      </SellerLayout>
    );
  }

  if (error) {
    return (
      <SellerLayout>
        <Box sx={{ p: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </SellerLayout>
    );
  }

  if (!place) {
    return (
      <SellerLayout>
        <Box sx={{ p: 3 }}>
          <Alert severity="info">لم يتم العثور على المكان المطلوب</Alert>
        </Box>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Button
            endIcon={<ArrowBackIcon />} // For RTL
            onClick={() => router.push("/seller/places")}
            variant="outlined"
            sx={{
              mb: 2,
              color: theme.colors.text,
              borderColor: theme.colors.border,
              "&:hover": {
                borderColor: theme.colors.primary,
                backgroundColor: "rgba(74, 114, 172, 0.05)",
              },
            }}
          >
            العودة إلى قائمة الأماكن
          </Button>

          <Paper
            elevation={1}
            sx={{
              borderRadius: 2,
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
              overflow: "hidden",
            }}
          >
            <Box sx={{ borderBottom: `1px solid ${theme.colors.border}` }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="inherit"
                indicatorColor="primary"
                sx={{
                  "& .MuiTab-root": { color: theme.colors.textSecondary },
                  "& .Mui-selected": { color: theme.colors.primary },
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.colors.primary,
                  },
                }}
              >
                <Tab label="التفاصيل" />
                <Tab label="الإحصائيات" />
              </Tabs>
            </Box>

            {activeTab === 0 ? (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row-reverse", // For RTL support
                        }}
                      >
                        <Typography
                          variant="h4"
                          component="h1"
                          fontWeight="bold"
                          sx={{ color: theme.colors.text, ml: 1 }}
                        >
                          {place.name}
                        </Typography>
                        <CategoryIcon sx={{ color: theme.colors.primary }} />
                      </Box>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        {place.isApproved ? (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label="تمت الموافقة"
                            sx={{
                              fontWeight: "bold",
                              backgroundColor: "rgba(76, 175, 80, 0.1)",
                              color: "#4caf50",
                            }}
                          />
                        ) : place.rejectionReason ? (
                          <Chip
                            icon={<CancelIcon />}
                            label="مرفوض"
                            sx={{
                              fontWeight: "bold",
                              backgroundColor: "rgba(244, 67, 54, 0.1)",
                              color: "#f44336",
                            }}
                          />
                        ) : (
                          <Chip
                            icon={<HistoryIcon />}
                            label="قيد المراجعة"
                            sx={{
                              fontWeight: "bold",
                              backgroundColor: "rgba(255, 152, 0, 0.1)",
                              color: "#ff9800",
                            }}
                          />
                        )}

                        <Tooltip title="تعديل المكان">
                          <IconButton
                            onClick={() =>
                              router.push(`/seller/places/${place._id}/edit`)
                            }
                            sx={{
                              color: theme.colors.textSecondary,
                              border: `1px solid ${theme.colors.border}`,
                              "&:hover": { color: theme.colors.primary },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Images */}
                  <Grid item xs={12} md={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        position: "relative",
                        height: 400,
                        backgroundColor: "rgba(0,0,0,0.05)",
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      {place.images && place.images.length > 0 ? (
                        <>
                          <img
                            src={place.images[currentImageIndex]}
                            alt={`${place.name} - صورة ${
                              currentImageIndex + 1
                            }`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                          {place.images.length > 1 && (
                            <>
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  right: 8,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                  },
                                }}
                                onClick={handleNextImage}
                              >
                                <ArrowForwardIcon />
                              </IconButton>
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  left: 8,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                  },
                                }}
                                onClick={handlePreviousImage}
                              >
                                <ArrowBackIcon />
                              </IconButton>
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 8,
                                  right: 8,
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: "4px",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {currentImageIndex + 1} / {place.images.length}
                              </Box>
                            </>
                          )}
                        </>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ color: theme.colors.textSecondary }}
                        >
                          لا توجد صور متاحة
                        </Typography>
                      )}
                    </Paper>

                    {/* Image thumbnails */}
                    {place.images && place.images.length > 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          mt: 2,
                          gap: 1,
                          overflowX: "auto",
                          pb: 1,
                        }}
                      >
                        {place.images.map((img, idx) => (
                          <Box
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            sx={{
                              width: 60,
                              height: 60,
                              flexShrink: 0,
                              borderRadius: "4px",
                              overflow: "hidden",
                              cursor: "pointer",
                              border:
                                idx === currentImageIndex
                                  ? "2px solid"
                                  : "2px solid transparent",
                              borderColor:
                                idx === currentImageIndex
                                  ? theme.colors.primary
                                  : "transparent",
                            }}
                          >
                            <img
                              src={img}
                              alt={`${place.name} - صورة ${idx + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}

                    {/* Statistics summary for this view */}
                    <Card
                      sx={{
                        mt: 3,
                        borderRadius: 2,
                        backgroundColor: theme.colors.card,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: theme.colors.text, fontWeight: "bold" }}
                        >
                          نظرة عامة
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1.5,
                              }}
                            >
                              <VisibilityIcon
                                sx={{
                                  color: theme.colors.primary,
                                  mr: 1,
                                  fontSize: 20,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                المشاهدات: <b>{stats?.views || 0}</b>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1.5,
                              }}
                            >
                              <PeopleIcon
                                sx={{
                                  color: theme.colors.primary,
                                  mr: 1,
                                  fontSize: 20,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                الزيارات: <b>{stats?.visits || 0}</b>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <StarIcon
                                sx={{ color: "#FFC107", mr: 1, fontSize: 20 }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                التقييم:{" "}
                                <b>
                                  {stats?.rating
                                    ? stats.rating.toFixed(1)
                                    : "0.0"}
                                </b>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <BarChartIcon
                                sx={{
                                  color: theme.colors.primary,
                                  mr: 1,
                                  fontSize: 20,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                المراجعات: <b>{stats?.reviewsCount || 0}</b>
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Details */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ color: theme.colors.text }}
                      >
                        تفاصيل المكان
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Chip
                          icon={<CategoryIcon />}
                          label={getCategoryLabel(place.category)}
                          sx={{
                            backgroundColor: "rgba(74, 114, 172, 0.1)",
                            color: theme.colors.primary,
                            fontWeight: "bold",
                            mb: 2,
                          }}
                        />

                        <Typography
                          variant="body1"
                          paragraph
                          sx={{ color: theme.colors.text }}
                        >
                          {place.description}
                        </Typography>
                      </Box>

                      <Divider
                        sx={{ my: 2, borderColor: theme.colors.border }}
                      />

                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <LocationOnIcon
                              sx={{ color: theme.colors.primary }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography sx={{ color: theme.colors.text }}>
                                العنوان
                              </Typography>
                            }
                            secondary={
                              <Typography
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                {`${place.address}، ${place.city}`}
                              </Typography>
                            }
                          />
                        </ListItem>

                        {place.phone && (
                          <ListItem>
                            <ListItemIcon>
                              <PhoneIcon sx={{ color: theme.colors.primary }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography sx={{ color: theme.colors.text }}>
                                  رقم الهاتف
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{ color: theme.colors.textSecondary }}
                                >
                                  {place.phone}
                                </Typography>
                              }
                            />
                          </ListItem>
                        )}

                        {place.email && (
                          <ListItem>
                            <ListItemIcon>
                              <EmailIcon sx={{ color: theme.colors.primary }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography sx={{ color: theme.colors.text }}>
                                  البريد الإلكتروني
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{ color: theme.colors.textSecondary }}
                                >
                                  {place.email}
                                </Typography>
                              }
                            />
                          </ListItem>
                        )}

                        {place.website && (
                          <ListItem>
                            <ListItemIcon>
                              <LanguageIcon
                                sx={{ color: theme.colors.primary }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography sx={{ color: theme.colors.text }}>
                                  الموقع الإلكتروني
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{ color: theme.colors.textSecondary }}
                                >
                                  {place.website}
                                </Typography>
                              }
                            />
                          </ListItem>
                        )}

                        {place.priceRange && (
                          <ListItem>
                            <ListItemIcon>
                              <AttachMoneyIcon
                                sx={{ color: theme.colors.primary }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography sx={{ color: theme.colors.text }}>
                                  متوسط الأسعار
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{ color: theme.colors.textSecondary }}
                                >
                                  {place.priceRange}
                                </Typography>
                              }
                            />
                          </ListItem>
                        )}

                        {(place.weekdayHours || place.weekendHours) && (
                          <ListItem>
                            <ListItemIcon>
                              <AccessTimeIcon
                                sx={{ color: theme.colors.primary }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography sx={{ color: theme.colors.text }}>
                                  مواعيد العمل
                                </Typography>
                              }
                              secondary={
                                <>
                                  {place.weekdayHours && (
                                    <Typography
                                      variant="body2"
                                      component="span"
                                      display="block"
                                      sx={{ color: theme.colors.textSecondary }}
                                    >
                                      أيام الأسبوع: {place.weekdayHours.from} -{" "}
                                      {place.weekdayHours.to}
                                    </Typography>
                                  )}
                                  {place.weekendHours && (
                                    <Typography
                                      variant="body2"
                                      component="span"
                                      sx={{ color: theme.colors.textSecondary }}
                                    >
                                      عطلة نهاية الأسبوع:{" "}
                                      {place.weekendHours.from} -{" "}
                                      {place.weekendHours.to}
                                    </Typography>
                                  )}
                                </>
                              }
                            />
                          </ListItem>
                        )}
                      </List>

                      {/* Amenities */}
                      {place.amenities && place.amenities.length > 0 && (
                        <Box sx={{ mb: 3, mt: 2 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            fontWeight="bold"
                            sx={{ color: theme.colors.text }}
                          >
                            المرافق والخدمات
                          </Typography>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {place.amenities.map((amenity, idx) => (
                              <Chip
                                key={idx}
                                label={
                                  typeof amenity === "string"
                                    ? amenity
                                    : amenity.label
                                }
                                size="small"
                                sx={{
                                  backgroundColor: "rgba(74, 114, 172, 0.1)",
                                  color: theme.colors.text,
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Rejection reason if place is rejected */}
                      {place.rejectionReason && (
                        <Alert
                          severity="error"
                          sx={{
                            mt: 2,
                            "& .MuiAlert-icon": { color: "#f44336" },
                            "& .MuiAlert-message": { color: theme.colors.text },
                            backgroundColor: "rgba(244, 67, 54, 0.1)",
                          }}
                        >
                          <Typography variant="subtitle2" fontWeight="bold">
                            سبب الرفض:
                          </Typography>
                          <Typography variant="body2">
                            {place.rejectionReason}
                          </Typography>
                        </Alert>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  sx={{ color: theme.colors.text, mb: 3 }}
                >
                  إحصائيات المكان
                </Typography>

                {/* Here you can add charts and statistics displays */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        backgroundColor: theme.colors.card,
                        border: `1px solid ${theme.colors.border}`,
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: theme.colors.text, fontWeight: "bold" }}
                        >
                          إحصائيات الزوار
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                textAlign: "center",
                                backgroundColor: "rgba(74, 114, 172, 0.1)",
                                borderRadius: 2,
                              }}
                            >
                              <VisibilityIcon
                                sx={{
                                  color: theme.colors.primary,
                                  fontSize: 40,
                                  mb: 1,
                                }}
                              />
                              <Typography
                                variant="h4"
                                sx={{
                                  color: theme.colors.text,
                                  fontWeight: "bold",
                                }}
                              >
                                {stats?.views || 0}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                مشاهدة
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                textAlign: "center",
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                                borderRadius: 2,
                              }}
                            >
                              <PeopleIcon
                                sx={{ color: "#4caf50", fontSize: 40, mb: 1 }}
                              />
                              <Typography
                                variant="h4"
                                sx={{
                                  color: theme.colors.text,
                                  fontWeight: "bold",
                                }}
                              >
                                {stats?.visits || 0}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                زيارة
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        backgroundColor: theme.colors.card,
                        border: `1px solid ${theme.colors.border}`,
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: theme.colors.text, fontWeight: "bold" }}
                        >
                          التقييمات
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                textAlign: "center",
                                backgroundColor: "rgba(255, 193, 7, 0.1)",
                                borderRadius: 2,
                              }}
                            >
                              <StarIcon
                                sx={{ color: "#FFC107", fontSize: 40, mb: 1 }}
                              />
                              <Typography
                                variant="h4"
                                sx={{
                                  color: theme.colors.text,
                                  fontWeight: "bold",
                                }}
                              >
                                {stats?.rating
                                  ? stats.rating.toFixed(1)
                                  : "0.0"}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                متوسط التقييم
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                textAlign: "center",
                                backgroundColor: "rgba(33, 150, 243, 0.1)",
                                borderRadius: 2,
                              }}
                            >
                              <BarChartIcon
                                sx={{ color: "#2196F3", fontSize: 40, mb: 1 }}
                              />
                              <Typography
                                variant="h4"
                                sx={{
                                  color: theme.colors.text,
                                  fontWeight: "bold",
                                }}
                              >
                                {stats?.reviewsCount || 0}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.colors.textSecondary }}
                              >
                                مراجعة
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </SellerLayout>
  );
};

export default PlaceDetail;
