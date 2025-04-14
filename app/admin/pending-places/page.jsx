"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Divider,
  Container,
  Alert,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../Components/admin/AdminLayout";
import axios from "axios";
import { motion } from "framer-motion";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PendingPlaces = () => {
  const { theme } = useTheme();
  const router = useRouter();

  // Demo places data with real images from Unsplash
  const demoPlaces = [
    {
      _id: "demo1",
      name: "مطعم وكافيه البحر الأزرق",
      description:
        "مطعم فاخر يقدم المأكولات البحرية الطازجة والأطباق العالمية، مع إطلالة رائعة على البحر. يتميز بأجواءه الهادئة وخدمة متميزة للضيوف والعائلات.",
      category: "restaurants",
      address: "شارع الكورنيش، بجانب فندق السلام",
      city: "الإسكندرية",
      phone: "+20 123 456 7890",
      email: "info@bluesca.example.com",
      website: "www.bluesea-restaurant.example.com",
      weekdayHours: { from: "12:00", to: "00:00" },
      weekendHours: { from: "13:00", to: "01:00" },
      hasParkingSpace: true,
      isAccessible: true,
      amenities: [
        { label: "واي فاي مجاني" },
        { label: "خدمة صف السيارات" },
        { label: "منطقة مخصصة للعائلات" },
        { label: "إطلالة بحرية" },
      ],
      images: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      _id: "demo2",
      name: "قلعة قايتباي التاريخية",
      description:
        "قلعة أثرية تعود للعصر المملوكي، بناها السلطان قايتباي في القرن الخامس عشر. تعتبر من أهم المعالم التاريخية في مصر وتقدم للزوار جولات إرشادية وإطلالة فريدة على البحر المتوسط.",
      category: "tourism",
      address: "طريق الجيش، منطقة الأنفوشي",
      city: "الإسكندرية",
      phone: "+20 128 765 4321",
      weekdayHours: { from: "09:00", to: "17:00" },
      weekendHours: { from: "09:00", to: "18:00" },
      hasParkingSpace: true,
      isAccessible: false,
      amenities: [
        { label: "جولات إرشادية" },
        { label: "متحف داخلي" },
        { label: "مركز زوار" },
      ],
      images: [
        "https://images.pexels.com/photos/25323286/pexels-photo-25323286/free-photo-of-citadel-of-qaitbay-in-alexandria.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/25323282/pexels-photo-25323282/free-photo-of-citadel-of-qaitbay-in-alexandria-seen-from-bay.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/15374866/pexels-photo-15374866/free-photo-of-facade-of-a-castle.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
    },
    {
      _id: "demo3",
      name: "فندق النيل الفاخر",
      description:
        "فندق خمس نجوم يطل على نهر النيل مباشرة، يوفر غرف وأجنحة فاخرة مع خدمات متميزة. يضم الفندق مسبح خارجي، ومنتجع صحي، ومركز للياقة البدنية، ومطاعم متنوعة تقدم أشهى المأكولات العالمية والمحلية.",
      category: "hotels",
      address: "كورنيش النيل، وسط البلد",
      city: "القاهرة",
      phone: "+20 109 876 5432",
      email: "reservations@luxenile.example.com",
      website: "www.nile-luxuryhotel.example.com",
      hasParkingSpace: true,
      isAccessible: true,
      amenities: [
        { label: "مسبح خارجي" },
        { label: "منتجع صحي" },
        { label: "خدمة الغرف على مدار 24 ساعة" },
        { label: "واي فاي مجاني" },
        { label: "مركز أعمال" },
      ],
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      _id: "demo4",
      name: "مول العرب",
      description:
        "مركز تسوق فاخر يضم أكثر من 500 متجر عالمي ومحلي، بالإضافة إلى مطاعم ومقاهي ودور سينما ومناطق ترفيهية للأطفال. يعتبر وجهة مثالية للعائلات والأصدقاء لقضاء يوم كامل من التسوق والترفيه.",
      category: "shopping",
      address: "طريق الشيخ زايد، مدينة 6 أكتوبر",
      city: "القاهرة",
      phone: "+20 111 222 3333",
      email: "info@arabmall.example.com",
      website: "www.arabmall.example.com",
      weekdayHours: { from: "10:00", to: "22:00" },
      weekendHours: { from: "10:00", to: "00:00" },
      hasParkingSpace: true,
      isAccessible: true,
      amenities: [
        { label: "موقف سيارات مجاني" },
        { label: "دور سينما" },
        { label: "منطقة ألعاب للأطفال" },
        { label: "مطاعم عالمية" },
        { label: "خدمة صراف آلي" },
      ],
      images: [
        "https://images.unsplash.com/photo-1595064085577-7c2ef98ec311?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/9c/65/5a/photo4jpg.jpg?w=1600&h=900&s=1",
      ],
    },
    {
      _id: "demo5",
      name: "مدينة الحكايات الترفيهية",
      description:
        "مدينة ألعاب ترفيهية متكاملة تحتوي على أحدث الألعاب المائية والحركية والتفاعلية للأطفال والكبار. تتميز بتصميمها المستوحى من الحكايات الشعبية العربية وتضم مناطق مخصصة لمختلف الفئات العمرية.",
      category: "entertainment",
      address: "طريق مصر الإسماعيلية الصحراوي، التجمع الخامس",
      city: "القاهرة",
      phone: "+20 155 444 7777",
      email: "contact@talescity.example.com",
      website: "www.tales-city.example.com",
      weekdayHours: { from: "11:00", to: "20:00" },
      weekendHours: { from: "10:00", to: "22:00" },
      hasParkingSpace: true,
      isAccessible: true,
      amenities: [
        { label: "ألعاب مائية" },
        { label: "منطقة للألعاب الإلكترونية" },
        { label: "مطاعم وكافيتريات" },
        { label: "مناطق استراحة" },
        { label: "متجر للهدايا التذكارية" },
      ],
      images: [
        "https://images.pexels.com/photos/1821349/pexels-photo-1821349.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFtdXNlbWVudCUyMHBhcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ];

  const [pendingPlaces, setPendingPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("info");

  // Add a state to toggle demo data
  const [showDemoData, setShowDemoData] = useState(false);

  useEffect(() => {
    const fetchPendingPlaces = async () => {
      try {
        // If demo data is requested, use it instead of API call
        if (showDemoData) {
          setPendingPlaces(demoPlaces);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          "https://iti-server-production.up.railway.app/api/admin/places/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If API returns no places, automatically show demo places
        if (response.data && response.data.length === 0) {
          setShowDemoData(true);
          setPendingPlaces(demoPlaces);
        } else {
          setPendingPlaces(response.data);
        }
      } catch (error) {
        console.error("Error fetching pending places:", error);
        // Optional: automatically show demo data on API error
        setShowDemoData(true);
        setPendingPlaces(demoPlaces);
        setError("تم تحميل بيانات توضيحية لأغراض العرض");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPlaces();
  }, [router, showDemoData]);

  const handleApprove = async (placeId) => {
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

      // Remove the approved place from the list
      setPendingPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place._id !== placeId)
      );

      // Show success message
      setAlertMessage("تمت الموافقة على المكان بنجاح");
      setAlertType("success");

      // Clear alert after 3 seconds
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error approving place:", error);
      setAlertMessage("فشل في الموافقة على المكان. يرجى المحاولة مرة أخرى.");
      setAlertType("error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setAlertMessage("يرجى إدخال سبب الرفض");
      setAlertType("warning");
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `https://iti-server-production.up.railway.app/api/admin/places/${selectedPlace._id}/reject`,
        { rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the rejected place from the list
      setPendingPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place._id !== selectedPlace._id)
      );

      setRejectDialogOpen(false);
      setSelectedPlace(null);
      setRejectionReason("");

      // Show success message
      setAlertMessage("تم رفض المكان بنجاح");
      setAlertType("success");

      // Clear alert after 3 seconds
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error rejecting place:", error);
      setAlertMessage("فشل في رفض المكان. يرجى المحاولة مرة أخرى.");
      setAlertType("error");
    } finally {
      setActionLoading(false);
    }
  };

  const openRejectDialog = (place) => {
    setSelectedPlace(place);
    setRejectDialogOpen(true);
  };

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

  // Add this function to toggle between demo and real data
  const toggleDemoData = () => {
    setLoading(true);
    setShowDemoData((prev) => !prev);
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
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
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <Typography variant="h6" sx={{ color: "#f44336", mb: 2 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              mt: 2,
              backgroundColor: theme.colors.primary,
              color: "#fff",
              "&:hover": { backgroundColor: theme.colors.accent },
            }}
          >
            إعادة المحاولة
          </Button>
        </Paper>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: theme.colors.text,
              mb: 4,
            }}
          >
            الأماكن المعلقة في انتظار الموافقة
          </Typography>

          {alertMessage && (
            <Alert
              severity={alertType}
              sx={{
                width: "100%",
                mb: 3,
                "& .MuiAlert-message": { color: theme.colors.text },
                backgroundColor:
                  alertType === "success"
                    ? "rgba(76, 175, 80, 0.1)"
                    : alertType === "error"
                    ? "rgba(244, 67, 54, 0.1)"
                    : "rgba(255, 152, 0, 0.1)",
              }}
              onClose={() => setAlertMessage(null)}
            >
              {alertMessage}
            </Alert>
          )}

          {pendingPlaces.length === 0 ? (
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
              <StorefrontIcon
                sx={{
                  fontSize: 60,
                  color: theme.colors.textSecondary,
                  opacity: 0.5,
                  mb: 2,
                }}
              />
              <Typography variant="h6" sx={{ color: theme.colors.text }}>
                لا توجد أماكن في انتظار المراجعة!
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: theme.colors.textSecondary }}
              >
                سيظهر هنا الأماكن التي قام أصحاب الأعمال بتسجيلها عندما تكون
                متاحة للمراجعة
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {pendingPlaces.map((place) => (
                <Grid item xs={12} md={6} lg={4} key={place._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        height: "100%", // This ensures all cards have the same height
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
                          height: "180px", // Fixed height container for image
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // Makes sure image covers the area without distortion
                            objectPosition: "center", // Centers the image
                          }}
                          image={
                            place.images[0] ||
                            "https://via.placeholder.com/300x180?text=No+Image"
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
                      </Box>

                      <CardContent
                        sx={{
                          flexGrow: 1,
                          p: 2.5,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Title area */}
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

                        {/* Description with fixed height */}
                        <Box
                          sx={{
                            height: "40px",
                            mb: 2,
                            overflow: "hidden",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              color: theme.colors.text,
                            }}
                          >
                            {place.description}
                          </Typography>
                        </Box>

                        <Divider
                          sx={{ mb: 2, borderColor: theme.colors.border }}
                        />

                        {/* Push buttons to bottom */}
                        <Box sx={{ mt: "auto" }}>
                          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            <Button
                              variant="outlined"
                              endIcon={<VisibilityIcon sx={{ mr: 2 }} />}
                              onClick={() => openDetailsDialog(place)}
                              sx={{
                                flex: 1,
                                borderColor: theme.colors.primary,
                                color: theme.colors.primary,
                                flexDirection: "row-reverse",
                                "&:hover": {
                                  backgroundColor: "rgba(74, 114, 172, 0.05)",
                                },
                              }}
                            >
                              التفاصيل
                            </Button>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              flexDirection: "row-reverse",
                            }}
                          >
                            <Button
                              variant="contained"
                              endIcon={<CheckCircleIcon sx={{ mr: 1 }} />}
                              onClick={() => handleApprove(place._id)}
                              disabled={actionLoading}
                              sx={{
                                flex: 1,
                                backgroundColor: theme.colors.primary,
                                color: "#FFFFFF",
                                "&:hover": {
                                  backgroundColor: theme.colors.accent,
                                },
                                flexDirection: "row-reverse",
                                "&.Mui-disabled": {
                                  backgroundColor: "rgba(74, 114, 172, 0.3)",
                                  color: "#FFFFFF",
                                },
                              }}
                            >
                              موافقة
                            </Button>
                            <Button
                              variant="outlined"
                              endIcon={<CancelIcon sx={{ mr: 1 }} />}
                              onClick={() => openRejectDialog(place)}
                              disabled={actionLoading}
                              sx={{
                                flex: 1,
                                borderColor: "#f44336",
                                color: "#f44336",
                                "&:hover": {
                                  backgroundColor: "rgba(244, 67, 54, 0.04)",
                                },
                                flexDirection: "row-reverse",
                              }}
                            >
                              رفض
                            </Button>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
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
          رفض طلب إضافة مكان
          <IconButton
            aria-label="close"
            onClick={() => !actionLoading && setRejectDialogOpen(false)}
            sx={{
              color: theme.colors.textSecondary,
            }}
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
            أنت على وشك رفض إضافة المكان: <strong>{selectedPlace?.name}</strong>
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
            flexDirection: "row-reverse", // Added for RTL
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
              "&.Mui-disabled": { backgroundColor: "rgba(244, 67, 54, 0.3)" },
            }}
          >
            {actionLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "تأكيد الرفض"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Place Details Dialog */}
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
                {" "}
                {/* Changed for RTL */}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {selectedPlace.name}
                </Typography>{" "}
                {/* Changed mr to ml for RTL */}
                <StorefrontIcon sx={{ color: theme.colors.primary }} />
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
              <Grid container spacing={3}>
                {/* Image gallery */}
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      position: "relative",
                      height: 300,
                      backgroundColor: "rgba(0,0,0,0.05)", // Subtle background for images
                      borderRadius: "8px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    {selectedPlace.images && selectedPlace.images.length > 0 ? (
                      <>
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
                  {selectedPlace.images && selectedPlace.images.length > 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        mt: 2,
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
                  )}
                </Grid>

                {/* Place details */}
                <Grid item xs={12} md={6}>
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
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
                  >
                    <LocationOnIcon
                      sx={{
                        color: theme.colors.primary,
                        ml: 1,
                        mr: 0,
                        mt: 0.3,
                      }} // Changed for RTL
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

                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}
                  >
                    <PhoneIcon
                      sx={{
                        color: theme.colors.primary,
                        ml: 1,
                        mr: 0,
                        mt: 0.3,
                      }} // Changed for RTL
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", color: theme.colors.text }}
                      >
                        رقم الهاتف
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.colors.textSecondary }}
                      >
                        {selectedPlace.phone || "غير متاح"}
                      </Typography>
                    </Box>
                  </Box>

                  {selectedPlace.email && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <EmailIcon
                        sx={{
                          color: theme.colors.primary,
                          ml: 1,
                          mr: 0,
                          mt: 0.3,
                        }} // Changed for RTL
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", color: theme.colors.text }}
                        >
                          البريد الإلكتروني
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.colors.textSecondary }}
                        >
                          {selectedPlace.email}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {selectedPlace.website && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <LanguageIcon
                        sx={{
                          color: theme.colors.primary,
                          ml: 1,
                          mr: 0,
                          mt: 0.3,
                        }} // Changed for RTL
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", color: theme.colors.text }}
                        >
                          الموقع الإلكتروني
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.colors.textSecondary }}
                        >
                          {selectedPlace.website}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {(selectedPlace.weekdayHours ||
                    selectedPlace.weekendHours) && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{
                          color: theme.colors.primary,
                          ml: 1,
                          mr: 0,
                          mt: 0.3,
                        }} // Changed for RTL
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", color: theme.colors.text }}
                        >
                          مواعيد العمل
                        </Typography>
                        {selectedPlace.weekdayHours && (
                          <Typography
                            variant="body2"
                            sx={{ color: theme.colors.textSecondary }}
                          >
                            أيام الأسبوع: {selectedPlace.weekdayHours.from} -{" "}
                            {selectedPlace.weekdayHours.to}
                          </Typography>
                        )}
                        {selectedPlace.weekendHours && (
                          <Typography
                            variant="body2"
                            sx={{ color: theme.colors.textSecondary }}
                          >
                            عطلة نهاية الأسبوع:{" "}
                            {selectedPlace.weekendHours.from} -{" "}
                            {selectedPlace.weekendHours.to}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}

                  {selectedPlace.amenities &&
                    selectedPlace.amenities.length > 0 && (
                      <Box sx={{ mb: 1.5 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: "bold",
                            mb: 0.5,
                            color: theme.colors.text,
                          }}
                        >
                          المرافق والخدمات
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
                flexDirection: "row-reverse", // Added for RTL
              }}
            >
              <Button
                variant="outlined"
                endIcon={<CancelIcon sx={{ mr: 1 }} />} // Changed to endIcon for RTL
                onClick={() => {
                  setDetailsDialogOpen(false);
                  openRejectDialog(selectedPlace);
                }}
                sx={{
                  borderColor: "#f44336",
                  color: "#f44336",
                  flexDirection: "row-reverse", // Added for RTL
                  ml: 1,
                }}
              >
                رفض
              </Button>
              <Button
                variant="contained"
                endIcon={<CheckCircleIcon sx={{ mr: 1 }} />} // Changed to endIcon for RTL
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleApprove(selectedPlace._id);
                }}
                sx={{
                  backgroundColor: theme.colors.primary,
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: theme.colors.accent,
                  },
                  flexDirection: "row-reverse", // Added for RTL
                }}
              >
                موافقة
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AdminLayout>
  );
};

export default PendingPlaces;
