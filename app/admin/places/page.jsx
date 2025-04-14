"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import SellerLayout from "../../Components/admin/AdminLayout";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";

const SellerPlaces = () => {
  const { theme } = useTheme();
  const router = useRouter();

  // State variables
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch places on component mount
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          "https://iti-server-production.up.railway.app/api/seller-places/my-places",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("فشل في تحميل الأماكن. يرجى المحاولة مرة أخرى.");
        if (error.response && error.response.status === 403) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [router]);

  // Filter places based on search query
  const filteredPlaces = places.filter((place) => {
    return (
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Get status chip based on approval status
  const getStatusChip = (place) => {
    if (place.isApproved) {
      return (
        <Chip
          size="small"
          icon={<CheckCircleIcon />}
          label="تمت الموافقة"
          sx={{
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            color: "#4caf50",
            fontWeight: "bold",
          }}
        />
      );
    } else if (place.rejectionReason) {
      return (
        <Chip
          size="small"
          icon={<CancelIcon />}
          label="مرفوض"
          sx={{
            backgroundColor: "rgba(244, 67, 54, 0.1)",
            color: "#f44336",
            fontWeight: "bold",
          }}
        />
      );
    } else {
      return (
        <Chip
          size="small"
          icon={<HistoryIcon />}
          label="قيد المراجعة"
          sx={{
            backgroundColor: "rgba(255, 152, 0, 0.1)",
            color: "#ff9800",
            fontWeight: "bold",
          }}
        />
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

  return (
    <SellerLayout>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            mb: 4,
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: theme.colors.text, fontWeight: "bold" }}
          >
            الأماكن الخاصة بك
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/seller/add-place")}
            sx={{
              backgroundColor: theme.colors.primary,
              color: "#fff",
              "&:hover": { backgroundColor: theme.colors.accent },
            }}
          >
            إضافة مكان جديد
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="البحث عن مكان بالاسم، المدينة، أو التصنيف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.colors.textSecondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.colors.card,
                "& fieldset": { borderColor: theme.colors.border },
                "&:hover fieldset": { borderColor: theme.colors.primary },
                "&.Mui-focused fieldset": { borderColor: theme.colors.primary },
              },
              "& .MuiInputBase-input": { color: theme.colors.text },
            }}
          />
        </Box>

        {filteredPlaces.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              backgroundColor: theme.colors.card,
              borderRadius: 2,
              border: `1px dashed ${theme.colors.border}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: theme.colors.textSecondary, mb: 2 }}
            >
              لا توجد أماكن مضافة
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push("/seller/add-place")}
              sx={{
                backgroundColor: theme.colors.primary,
                color: "#fff",
                "&:hover": { backgroundColor: theme.colors.accent },
              }}
            >
              إضافة مكان جديد
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredPlaces.map((place) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={place._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: theme.colors.card,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: `1px solid ${theme.colors.border}`,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={
                        place.images && place.images.length > 0
                          ? place.images[0]
                          : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                      }
                      alt={place.name}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                    >
                      {getStatusChip(place)}
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      sx={{ color: theme.colors.text, fontWeight: "bold" }}
                      noWrap
                    >
                      {place.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: theme.colors.primary }}
                      />
                      <Typography variant="body2" noWrap>
                        {place.city}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      <CategoryIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: theme.colors.primary }}
                      />
                      <Typography variant="body2" noWrap>
                        {getCategoryLabel(place.category)}
                      </Typography>
                    </Box>
                    <Divider
                      sx={{ my: 1.5, borderColor: theme.colors.border }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: theme.colors.textSecondary,
                        }}
                      >
                        <VisibilityIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: theme.colors.textSecondary }}
                        />
                        <Typography variant="body2" noWrap>
                          {place.views || 0} مشاهدة
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: theme.colors.textSecondary,
                        }}
                      >
                        <StarIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "#FFC107" }}
                        />
                        <Typography variant="body2">
                          {place.rating ? place.rating.toFixed(1) : "0.0"}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      borderTop: `1px solid ${theme.colors.border}`,
                      justifyContent: "flex-end",
                      p: 1.5,
                    }}
                  >
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => router.push(`/seller/places/${place._id}`)}
                      sx={{
                        color: theme.colors.primary,
                      }}
                    >
                      عرض التفاصيل
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() =>
                        router.push(`/seller/places/${place._id}/edit`)
                      }
                      sx={{
                        color: theme.colors.textSecondary,
                      }}
                    >
                      تعديل
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </SellerLayout>
  );
};

export default SellerPlaces;
