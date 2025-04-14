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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
  Tooltip,
  Container,
} from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";
import AdminLayout from "../../../Components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AccessibleIcon from "@mui/icons-material/Accessible";
import CloseIcon from "@mui/icons-material/Close";

// Add this function near the top of the file, before the PlaceDetails component

const PlaceDetails = () => {
  const { theme } = useTheme(); // Only get theme from context
  const router = useRouter();
  const params = useParams();
  const placeId = params.id;

  // State variables
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [seller, setSeller] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

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
          `https://iti-server-production.up.railway.app/api/admin/places/${placeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlace(response.data);
        if (response.data.seller_id) {
          setSeller(response.data.seller_id);
        }
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

  // Handle approve action
  const handleApprove = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `https://iti-server-production.up.railway.app/api/admin/places/${placeId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the place status in the state
      setPlace((prevPlace) => ({
        ...prevPlace,
        isApproved: true,
        rejectionReason: null,
      }));

      setActionSuccess("تمت الموافقة على المكان بنجاح");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setActionSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error approving place:", error);
      setError("فشل في الموافقة على المكان. يرجى المحاولة مرة أخرى.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle reject action
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `https://iti-server-production.up.railway.app/api/admin/places/${placeId}/reject`,
        { rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the place in the state
      setPlace((prevPlace) => ({
        ...prevPlace,
        isApproved: false,
        rejectionReason,
      }));

      setRejectDialogOpen(false);
      setRejectionReason("");
      setActionSuccess("تم رفض المكان بنجاح");

      setTimeout(() => {
        setActionSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error rejecting place:", error);
      setError("فشل في رفض المكان. يرجى المحاولة مرة أخرى.");
    } finally {
      setActionLoading(false);
    }
  };

  // Open reject dialog
  const openRejectDialog = () => {
    setRejectionReason(place.rejectionReason || "");
    setRejectDialogOpen(true);
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
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "#f44336" }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              mt: 2,
              bgcolor: theme.colors.primary,
              color: "#fff",
              "&:hover": { bgcolor: theme.colors.accent },
            }}
          >
            إعادة المحاولة
          </Button>
        </Paper>
      </AdminLayout>
    );
  }

  if (!place) {
    return (
      <AdminLayout>
        <Paper
          sx={{
            p: 3,
            textAlign: "center",
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">لم يتم العثور على هذا المكان</Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/admin/all-places")}
            sx={{
              mt: 2,
              bgcolor: theme.colors.primary,
              color: "#fff",
              "&:hover": { bgcolor: theme.colors.accent },
            }}
          >
            العودة إلى قائمة الأماكن
          </Button>
        </Paper>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Button
            endIcon={<ArrowBackIcon />} // Changed to endIcon for RTL
            onClick={() => router.back()}
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
            العودة
          </Button>

          {actionSuccess && (
            <Alert
              severity="success"
              sx={{
                mb: 2,
                "& .MuiAlert-icon": { color: "#4caf50" },
                "& .MuiAlert-message": { color: theme.colors.text },
                backgroundColor: "rgba(76, 175, 80, 0.1)",
              }}
            >
              {actionSuccess}
            </Alert>
          )}

          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
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

                  <Box>
                    {place.isApproved ? (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="تمت الموافقة"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
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
                          fontSize: "0.9rem",
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
                          fontSize: "0.9rem",
                          backgroundColor: "rgba(255, 152, 0, 0.1)",
                          color: "#ff9800",
                        }}
                      />
                    )}
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
                    backgroundColor: "rgba(0,0,0,0.05)", // Subtle background for images
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
                        alt={`${place.name} - صورة ${currentImageIndex + 1}`}
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

                {/* Seller Information */}
                {seller && (
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
                        sx={{ color: theme.colors.text }}
                      >
                        معلومات البائع
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {seller.profileImage ? (
                          <Box
                            component="img"
                            src={seller.profileImage}
                            alt={`${seller.firstname} ${seller.lastname}`}
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: theme.colors.primary,
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                          >
                            {seller.firstname.charAt(0)}
                            {seller.lastname.charAt(0)}
                          </Box>
                        )}
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ color: theme.colors.text }}
                          >
                            {seller.firstname} {seller.lastname}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.colors.textSecondary }}
                          >
                            {seller.email}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Grid>

              {/* Details */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
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

                  <Divider sx={{ my: 2, borderColor: theme.colors.border }} />

                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon sx={{ color: theme.colors.primary }} />
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
                          <LanguageIcon sx={{ color: theme.colors.primary }} />
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
                                  عطلة نهاية الأسبوع: {place.weekendHours.from}{" "}
                                  - {place.weekendHours.to}
                                </Typography>
                              )}
                            </>
                          }
                        />
                      </ListItem>
                    )}

                    {place.hasParkingSpace && (
                      <ListItem>
                        <ListItemIcon>
                          <LocalParkingIcon
                            sx={{ color: theme.colors.primary }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: theme.colors.text }}>
                              مواقف سيارات
                            </Typography>
                          }
                          secondary={
                            <Typography
                              sx={{ color: theme.colors.textSecondary }}
                            >
                              متوفر
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}

                    {place.isAccessible && (
                      <ListItem>
                        <ListItemIcon>
                          <AccessibleIcon
                            sx={{ color: theme.colors.primary }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: theme.colors.text }}>
                              مناسب لذوي الاحتياجات الخاصة
                            </Typography>
                          }
                          secondary={
                            <Typography
                              sx={{ color: theme.colors.textSecondary }}
                            >
                              نعم
                            </Typography>
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
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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

                  {/* Action buttons */}
                  <Box
                    sx={{
                      mt: 3,
                      pt: 2,
                      display: "flex",
                      justifyContent: "flex-start", // Changed to flex-start for RTL
                      gap: 2,
                      borderTop: "1px solid",
                      borderColor: theme.colors.border,
                      flexDirection: "row-reverse", // Added for RTL support
                    }}
                  >
                    {!place.isApproved && !place.rejectionReason && (
                      <Button
                        variant="outlined"
                        endIcon={<CancelIcon />} // Changed to endIcon for RTL
                        onClick={openRejectDialog}
                        disabled={actionLoading}
                        sx={{
                          color: "#f44336",
                          borderColor: "rgba(244, 67, 54, 0.5)",
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.05)",
                            borderColor: "#f44336",
                          },
                        }}
                      >
                        رفض
                      </Button>
                    )}

                    {place.rejectionReason && !place.isApproved && (
                      <Button
                        variant="contained"
                        endIcon={<CheckCircleIcon />} // Changed to endIcon for RTL
                        onClick={handleApprove}
                        disabled={actionLoading}
                        sx={{
                          backgroundColor: theme.colors.primary,
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: theme.colors.accent,
                          },
                        }}
                      >
                        الموافقة بعد التعديل
                      </Button>
                    )}

                    {!place.isApproved && !place.rejectionReason && (
                      <Button
                        variant="contained"
                        endIcon={<CheckCircleIcon />} // Changed to endIcon for RTL
                        onClick={handleApprove}
                        disabled={actionLoading}
                        sx={{
                          backgroundColor: theme.colors.primary,
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: theme.colors.accent,
                          },
                        }}
                      >
                        موافقة
                      </Button>
                    )}

                    {place.isApproved && (
                      <Button
                        variant="outlined"
                        endIcon={<CancelIcon />} // Changed to endIcon for RTL
                        onClick={openRejectDialog}
                        disabled={actionLoading}
                        sx={{
                          color: "#f44336",
                          borderColor: "rgba(244, 67, 54, 0.5)",
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.05)",
                            borderColor: "#f44336",
                          },
                        }}
                      >
                        إلغاء الموافقة
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>

      {/* Rejection Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => !actionLoading && setRejectDialogOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            maxWidth: "500px",
            width: "100%",
            border: `1px solid ${theme.colors.border}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "rgba(244, 67, 54, 0.1)",
            color: "#f44336",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {place.isApproved
            ? "إلغاء الموافقة على المكان"
            : "رفض طلب إضافة مكان"}
          <IconButton
            aria-label="close"
            onClick={() => !actionLoading && setRejectDialogOpen(false)}
            sx={{ color: theme.colors.textSecondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: theme.colors.text }}
          >
            {place.isApproved
              ? "أنت على وشك إلغاء الموافقة على المكان:"
              : "أنت على وشك رفض إضافة المكان:"}{" "}
            <strong>{place.name}</strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 3, color: theme.colors.textSecondary }}
          >
            سيتم إعلام صاحب المكان بسبب الرفض لمساعدته في تحسين الطلب للموافقة
            عليه مستقبلاً.
          </Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            id="rejection-reason"
            label="سبب الرفض"
            fullWidth
            variant="outlined"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            required
            error={!rejectionReason.trim()}
            helperText={!rejectionReason.trim() ? "حقل مطلوب" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                "& fieldset": { borderColor: theme.colors.border },
                "&:hover fieldset": { borderColor: theme.colors.primary },
                "&.Mui-focused fieldset": { borderColor: theme.colors.primary },
              },
              "& .MuiInputLabel-root": { color: theme.colors.textSecondary },
              "& .MuiInputBase-input": { color: theme.colors.text },
              "& .MuiFormHelperText-root": { color: "#f44336" },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            pt: 0,
            flexDirection: "row-reverse", // Added for RTL support
          }}
        >
          <Button
            onClick={() => !actionLoading && setRejectDialogOpen(false)}
            disabled={actionLoading}
            sx={{ color: theme.colors.textSecondary }}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleReject}
            disabled={actionLoading || !rejectionReason.trim()}
            sx={{
              backgroundColor: "#f44336",
              color: "#fff",
              "&:hover": { backgroundColor: "#d32f2f" },
              "&.Mui-disabled": {
                backgroundColor: "rgba(244, 67, 54, 0.3)",
              },
            }}
          >
            {actionLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "تأكيد"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default PlaceDetails;
