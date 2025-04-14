"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../Components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const RejectedPlaces = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rejectedPlaces, setRejectedPlaces] = useState([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  // Demo rejected places data (in case the API fails)
  const demoRejectedPlaces = [
    {
      _id: "rejected1",
      name: "كافيه الزاوية",
      description:
        "كافيه عصري يقدم المشروبات الساخنة والباردة والحلويات في أجواء هادئة وأنيقة، مع خدمة واي فاي مجانية وركن للقراءة والعمل.",
      category: "restaurants",
      address: "تقاطع شارع الجامعة مع شارع المنصور",
      city: "الاسكندرية",
      phone: "+20 123 456 7890",
      email: "info@cornerscafe.example.com",
      images: [
        "https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      isApproved: false,
      rejectionReason:
        "الصور المقدمة غير واضحة وذات جودة منخفضة. يرجى تقديم صور بجودة أفضل توضح المكان بشكل دقيق.",
    },
    {
      _id: "rejected2",
      name: "متحف التراث الشعبي",
      description:
        "متحف يعرض القطع الأثرية والأدوات التقليدية والأزياء الشعبية التي تعكس الحياة اليومية للمصريين عبر العصور المختلفة.",
      category: "museums",
      address: "شارع المتحف، وسط البلد",
      city: "القاهرة",
      phone: "+20 122 334 5566",
      email: "contact@folkmuseum.example.org",
      images: [
        "https://images.pexels.com/photos/3329724/pexels-photo-3329724.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      isApproved: false,
      rejectionReason:
        "عنوان المكان غير دقيق ولا يمكن تحديد موقعه. يرجى تقديم عنوان تفصيلي مع إحداثيات GPS إن أمكن.",
    },
    {
      _id: "rejected3",
      name: "فندق واحة النخيل",
      description:
        "منتجع سياحي يقع على شاطئ البحر الأحمر، يوفر غرفًا وأجنحة فاخرة وخدمات متميزة مع إطلالات خلابة على البحر.",
      category: "hotels",
      address: "طريق السياحي، خليج نعمة",
      city: "شرم الشيخ",
      phone: "+20 111 222 3333",
      email: "bookings@palmsoasis.example.com",
      images: [
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      isApproved: false,
      rejectionReason:
        "البيانات المقدمة غير كاملة. يرجى استكمال معلومات الاتصال وتفاصيل الإقامة والأسعار.",
    },
  ];

  useEffect(() => {
    const fetchRejectedPlaces = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        try {
          const response = await axios.get(
            "https://iti-server-production.up.railway.app/api/admin/places/rejected",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 5000,
            }
          );

          if (response.data.length === 0) {
            setRejectedPlaces(demoRejectedPlaces);
          } else {
            setRejectedPlaces(response.data);
          }
        } catch (apiError) {
          console.log("Using demo data due to API error", apiError);
          setRejectedPlaces(demoRejectedPlaces);
        }
      } catch (error) {
        console.error("Error fetching rejected places:", error);
        setError("فشل في تحميل الأماكن المرفوضة. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedPlaces();
  }, [router]);

  const openDetailsDialog = (place) => {
    setSelectedPlace(place);
    setCurrentImageIndex(0);
    setDetailsDialogOpen(true);
  };

  const handleNextImage = () => {
    if (selectedPlace && selectedPlace.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedPlace.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (selectedPlace && selectedPlace.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedPlace.images.length - 1 : prevIndex - 1
      );
    }
  };

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
        <Alert
          severity="error"
          sx={{
            mb: 3,
            "& .MuiAlert-icon": { color: "#f44336" },
            "& .MuiAlert-message": { color: theme.colors.text },
          }}
        >
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{
            mt: 2,
            bgcolor: theme.colors.primary,
            color: "#FFFFFF",
          }}
        >
          إعادة المحاولة
        </Button>
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
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ color: theme.colors.text }}
          >
            الأماكن المرفوضة
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1, color: theme.colors.textSecondary }}
          >
            عرض وإدارة الأماكن التي تم رفضها
          </Typography>
        </Box>

        {rejectedPlaces.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: 2,
              width: "100%",
              color: theme.colors.textSecondary,
              border: "1px dashed",
              borderColor: theme.colors.border,
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: 60, color: theme.colors.textSecondary, mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 1, color: theme.colors.text }}>
              لا توجد أماكن مرفوضة
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.colors.textSecondary }}
            >
              لم يتم رفض أي أماكن حتى الآن
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {rejectedPlaces.map((place) => (
              <Grid item key={place._id} xs={12} sm={6} lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      borderRadius: 2,
                      overflow: "hidden",
                      transition:
                        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      },
                      position: "relative",
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "180px",
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        image={
                          place.images && place.images[0]
                            ? place.images[0]
                            : "https://via.placeholder.com/300x180?text=No+Image"
                        }
                        alt={place.name}
                      />
                      <Chip
                        label={getCategoryLabel(place.category)}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          backgroundColor: "rgba(74, 114, 172, 0.8)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                      <Chip
                        label="مرفوض"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          backgroundColor: "rgba(244, 67, 54, 0.8)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 2.5,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          color: theme.colors.text,
                        }}
                      >
                        {place.name}
                      </Typography>
                      <Box
                        sx={{ mb: 2, display: "flex", alignItems: "center" }}
                      >
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ color: theme.colors.primary, ml: 0.5, mr: 0 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            color: theme.colors.textSecondary,
                          }}
                        >
                          {place.city} - {place.address}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          mb: 2,
                          p: 1.5,
                          borderRadius: 1,
                          border: "1px solid rgba(211, 47, 47, 0.3)",
                          bgcolor: "rgba(211, 47, 47, 0.05)",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#d32f2f", fontWeight: "bold", mb: 0.5 }}
                        >
                          سبب الرفض:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.colors.textSecondary }}
                        >
                          {place.rejectionReason}
                        </Typography>
                      </Box>

                      <Box sx={{ mt: "auto" }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => openDetailsDialog(place)}
                          sx={{
                            borderColor: theme.colors.border,
                            color: theme.colors.text,
                            "&:hover": {
                              borderColor: theme.colors.primary,
                              backgroundColor: `${theme.colors.primary}10`,
                            },
                          }}
                        >
                          عرض التفاصيل
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Details Dialog */}
        <Dialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              borderRadius: "12px",
              border: `1px solid ${theme.colors.border}`,
            },
          }}
        >
          {selectedPlace && (
            <>
              <DialogTitle
                sx={{
                  borderBottom: "1px solid",
                  borderColor: theme.colors.border,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {selectedPlace.name}
                  </Typography>
                  <CategoryIcon sx={{ color: theme.colors.primary }} />
                </Box>
                <IconButton
                  aria-label="close"
                  onClick={() => setDetailsDialogOpen(false)}
                  sx={{ color: theme.colors.textSecondary }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ pt: 3, pb: 1 }}>
                {/* Place details content */}
                <Grid container spacing={3}>
                  {/* Image gallery */}
                  <Grid item xs={12} md={6}>
                    {selectedPlace.images && selectedPlace.images.length > 0 ? (
                      <>
                        <Box
                          sx={{
                            position: "relative",
                            height: 300,
                            borderRadius: "8px",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: `1px solid ${theme.colors.border}`,
                            mb: 2,
                            backgroundColor: "rgba(0,0,0,0.05)",
                          }}
                        >
                          <img
                            src={selectedPlace.images[currentImageIndex]}
                            alt={`${selectedPlace.name} - صورة ${
                              currentImageIndex + 1
                            }`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                          {selectedPlace.images.length > 1 && (
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
                                {currentImageIndex + 1} /{" "}
                                {selectedPlace.images.length}
                              </Box>
                            </>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                            gap: 1,
                            overflowX: "auto",
                            pb: 1,
                          }}
                        >
                          {selectedPlace.images.map((img, idx) => (
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
                                alt={`${selectedPlace.name} - صورة ${idx + 1}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          ))}
                        </Box>
                      </>
                    ) : (
                      <Box
                        sx={{
                          height: 300,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(0,0,0,0.05)",
                          borderRadius: "8px",
                          border: `1px solid ${theme.colors.border}`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: theme.colors.textSecondary }}
                        >
                          لا توجد صور متاحة
                        </Typography>
                      </Box>
                    )}
                  </Grid>

                  {/* Place details */}
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 1,
                        border: "1px solid rgba(211, 47, 47, 0.3)",
                        bgcolor: "rgba(211, 47, 47, 0.05)",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", color: "#d32f2f", mb: 0.5 }}
                      >
                        سبب الرفض
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.colors.textSecondary }}
                      >
                        {selectedPlace.rejectionReason}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          mb: 0.5,
                          color: theme.colors.text,
                        }}
                      >
                        الفئة
                      </Typography>
                      <Chip
                        icon={<CategoryIcon />}
                        label={getCategoryLabel(selectedPlace.category)}
                        sx={{
                          backgroundColor: "rgba(74, 114, 172, 0.1)",
                          color: theme.colors.primary,
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          mb: 0.5,
                          color: theme.colors.text,
                        }}
                      >
                        الوصف
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.colors.textSecondary }}
                      >
                        {selectedPlace.description}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2, borderColor: theme.colors.border }} />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          color: theme.colors.primary,
                          ml: 1,
                          mr: 0,
                          mt: 0.3,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", color: theme.colors.text }}
                        >
                          العنوان
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.colors.textSecondary }}
                        >
                          {selectedPlace.address}, {selectedPlace.city}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Additional contact details */}
                    {/* Amenities if available */}
                    {selectedPlace.amenities &&
                      selectedPlace.amenities.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                              mb: 1,
                              color: theme.colors.text,
                            }}
                          >
                            المرافق والخدمات
                          </Typography>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {selectedPlace.amenities.map((amenity, idx) => (
                              <Chip
                                key={idx}
                                label={amenity.label}
                                size="small"
                                sx={{
                                  backgroundColor: "rgba(74, 114, 172, 0.08)",
                                  color: theme.colors.text,
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 2,
                  borderTop: "1px solid",
                  borderColor: theme.colors.border,
                }}
              >
                <Button
                  onClick={() => setDetailsDialogOpen(false)}
                  sx={{ color: theme.colors.text }}
                >
                  إغلاق
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default RejectedPlaces;
