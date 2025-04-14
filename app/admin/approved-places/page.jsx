"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Divider,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../Components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const ApprovedPlaces = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 9;

  // Added state for details dialog
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Demo approved places with verified working images
  const demoPlaces = [
    {
      _id: "approved1",
      name: "متحف الفنون الإسلامية",
      description:
        "أحد أهم المتاحف في مصر ويضم مجموعة كبيرة من القطع الأثرية الإسلامية والفنية من مختلف العصور، بما في ذلك المخطوطات والمنسوجات والسجاد والفخار والزجاج والمعادن.",
      category: "museums",
      address: "شارع بورسعيد، متفرع من ميدان الأوبرا",
      city: "القاهرة",
      phone: "+20 223 908 742",
      email: "info@islamicmuseum.example.com",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/d5/d1/60/an-outdoor-setting-at.jpg?w=1800&h=1000&s=1",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/20/59/57/caption.jpg?w=1100&h=600&s=1",
      ],
      isApproved: true,
    },
    {
      _id: "approved2",
      name: "مطعم المائدة الدمشقية",
      description:
        "مطعم يقدم أشهى المأكولات الشامية التقليدية بنكهات أصلية وأجواء دمشقية ساحرة، يتميز بتقديم المشاوي والكبة والفتة وغيرها من الأطباق الشهيرة.",
      category: "restaurants",
      address: "شارع الهرم، بجوار نادي الترسانة",
      city: "الجيزة",
      phone: "+20 112 334 5566",
      email: "contact@damascustable.example.com",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      isApproved: true,
    },
    {
      _id: "approved3",
      name: "سيتي مول",
      description:
        "مركز تسوق عصري يجمع بين التصميم الفريد والمحلات العالمية، يضم العديد من الماركات المحلية والعالمية ومنطقة مطاعم متنوعة ودور سينما حديثة.",
      category: "shopping",
      address: "طريق النصر، مدينة نصر",
      city: "القاهرة",
      phone: "+20 100 223 4455",
      email: "info@siamesemall.example.com",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/6d/a4/40/caption.jpg?w=1400&h=800&s=1",
        "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      isApproved: true,
    },
    {
      _id: "approved4",
      name: "قلعة قايتباي",
      description:
        "قلعة أثرية تعود للعصر المملوكي، بناها السلطان قايتباي في القرن الخامس عشر لحماية ساحل الإسكندرية. تقدم للزوار جولات إرشادية وإطلالة فريدة على البحر المتوسط.",
      category: "tourism",
      address: "طريق الجيش، منطقة الأنفوشي",
      city: "الإسكندرية",
      phone: "+20 122 334 5567",
      images: [
        "https://images.pexels.com/photos/25323286/pexels-photo-25323286/free-photo-of-citadel-of-qaitbay-in-alexandria.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/25323282/pexels-photo-25323282/free-photo-of-citadel-of-qaitbay-in-alexandria-seen-from-bay.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/15374866/pexels-photo-15374866/free-photo-of-facade-of-a-castle.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      isApproved: true,
    },
    {
      _id: "approved5",
      name: "فندق برج العرب",
      description:
        "فندق فاخر مطل على البحر المتوسط، يوفر غرف وأجنحة فاخرة مع إطلالة بانورامية على البحر. يضم مرافق متعددة بما في ذلك مسابح ومطاعم ومنتجع صحي.",
      category: "hotels",
      address: "طريق اسكندرية مطروح الساحلي، العجمي",
      city: "الإسكندرية",
      phone: "+20 109 876 5432",
      email: "reservations@burjalarab.example.com",
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      isApproved: true,
    },
    {
      _id: "approved6",
      name: "حديقة الأزهر",
      description:
        "حديقة رائعة في قلب القاهرة التاريخية تمتد على مساحة 30 هكتار. توفر إطلالات بانورامية على المدينة القديمة وتضم مناطق خضراء ومسطحات مائية ومسارات للمشي.",
      category: "entertainment",
      address: "شارع صلاح سالم، الدراسة",
      city: "القاهرة",
      phone: "+20 122 334 5567",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/12/60/0a/parc-al-azhar.jpg?w=800&h=500&s=1",
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      isApproved: true,
    },
    {
      _id: "approved7",
      name: "مكتبة الإسكندرية",
      description:
        "صرح ثقافي وعلمي يضم ملايين الكتب والمخطوطات، بالإضافة إلى متاحف ومعارض ومراكز بحثية وقاعات للمؤتمرات والندوات والعروض الفنية.",
      category: "museums",
      address: "طريق الجيش، الشاطبي",
      city: "الإسكندرية",
      phone: "+20 122 334 5567",
      email: "info@bibalex.example.org",
      images: [
        "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      isApproved: true,
    },
    {
      _id: "approved8",
      name: "مطعم السرايا",
      description:
        "مطعم مصري أصيل يقدم أشهى المأكولات المصرية التقليدية في أجواء تراثية مميزة. يشتهر بأطباق الملوخية والحمام المحشي والكشري وغيرها من الأطباق الشعبية.",
      category: "restaurants",
      address: "شارع المعز لدين الله، الجمالية",
      city: "القاهرة",
      phone: "+20 122 334 5567",
      email: "info@sarayarestaurant.example.com",
      images: [
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      isApproved: true,
    },
    {
      _id: "approved9",
      name: "مول مصر",
      description:
        "أكبر مركز تسوق وترفيه في مصر. يضم أكثر من 350 متجراً وصالة تزلج على الجليد ومدينة ملاهي داخلية ومنطقة مطاعم متنوعة وشاشات سينما.",
      category: "shopping",
      address: "طريق الواحات، السادس من أكتوبر",
      city: "الجيزة",
      phone: "+20 122 334 5567",
      email: "info@mallofegypt.example.com",
      images: [
        "https://images.unsplash.com/photo-1555529771-7888783a18d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1555529669-2269763671c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      isApproved: true,
    },
    {
      _id: "approved10",
      name: "دريم بارك",
      description:
        "مدينة ملاهي ترفيهية كبيرة تضم العديد من الألعاب المائية والحركية المثيرة المناسبة لجميع الأعمار، بالإضافة إلى مطاعم ومقاهي ومناطق للتسوق.",
      category: "entertainment",
      address: "طريق أكتوبر، مدخل الرماية، الهرم",
      city: "الجيزة",
      phone: "+20 122 334 5567",
      email: "info@dreampark.example.com",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/68/63/51/dream-land-park.jpg?w=1800&h=-1&s=1",
        "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      isApproved: true,
    },
  ];

  useEffect(() => {
    // Simulate API loading with demo data
    const loadData = setTimeout(() => {
      setPlaces(demoPlaces);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadData);
  }, []);

  // Add this useEffect to fetch approved places
  useEffect(() => {
    const fetchApprovedPlaces = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        try {
          const response = await axios.get(
            "https://iti-server-production.up.railway.app//api/admin/places/approved",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setPlaces(response.data);
        } catch (apiError) {
          console.log("Using demo data due to API error", apiError);
          setPlaces(demoPlaces);
        }
      } catch (error) {
        console.error("Error fetching approved places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedPlaces();
  }, [router]);

  // Filter and search functionality
  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || place.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = filteredPlaces.slice(
    indexOfFirstPlace,
    indexOfLastPlace
  );
  const pageCount = Math.ceil(filteredPlaces.length / placesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Handle viewing place details - updated to show dialog instead of navigation
  const handleViewPlace = (placeId) => {
    const place = places.find((p) => p._id === placeId);
    if (place) {
      setSelectedPlace(place);
      setCurrentImageIndex(0);
      setDetailsDialogOpen(true);
    }
  };

  // Navigation functions for image gallery
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
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              mb: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ color: theme.colors.text }}
            >
              الأماكن المقبولة
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, color: theme.colors.textSecondary }}
            >
              عرض وإدارة جميع الأماكن التي تمت الموافقة عليها
            </Typography>
          </Box>

          {/* Filters & Search */}
          <Box
            sx={{
              mb: 4,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              placeholder="بحث عن مكان..."
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                maxWidth: { xs: "100%", sm: 300 },
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.colors.textSecondary }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <FormControl
                variant="outlined"
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
                  "& .MuiInputLabel-root": {
                    color: theme.colors.textSecondary,
                  },
                  "& .MuiSelect-icon": { color: theme.colors.textSecondary },
                }}
              >
                <InputLabel id="category-filter-label">الفئة</InputLabel>
                <Select
                  labelId="category-filter-label"
                  id="category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="الفئة"
                  startAdornment={
                    <FilterListIcon
                      sx={{ color: theme.colors.textSecondary, mr: 1 }}
                    />
                  }
                >
                  <MenuItem value="all">جميع الفئات</MenuItem>
                  <MenuItem value="restaurants">مطاعم وكافيهات</MenuItem>
                  <MenuItem value="tourism">أماكن سياحية</MenuItem>
                  <MenuItem value="hotels">فنادق ومنتجعات</MenuItem>
                  <MenuItem value="shopping">تسوق ومولات</MenuItem>
                  <MenuItem value="entertainment">أنشطة ترفيهية</MenuItem>
                  <MenuItem value="museums">متاحف ومعارض</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Results Information */}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: theme.colors.textSecondary }}
            >
              إظهار {filteredPlaces.length > 0 ? indexOfFirstPlace + 1 : 0} -{" "}
              {Math.min(indexOfLastPlace, filteredPlaces.length)} من إجمالي{" "}
              {filteredPlaces.length} مكان
            </Typography>
          </Box>

          {/* Places Grid */}
          {filteredPlaces.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
                color: theme.colors.textSecondary,
                border: "1px dashed",
                borderColor: theme.colors.border,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, color: theme.colors.text }}>
                لا توجد أماكن مطابقة للبحث
              </Typography>
              <Typography variant="body2">
                حاول تغيير معايير البحث أو إزالة الفلتر
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {currentPlaces.map((place) => (
                <Grid item xs={12} sm={6} md={4} key={place._id}>
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

                        {/* Action Button */}
                        <Box sx={{ mt: "auto" }}>
                          <Button
                            variant="contained"
                            fullWidth
                            endIcon={<VisibilityIcon sx={{ mr: 1 }} />}
                            onClick={() => handleViewPlace(place._id)}
                            sx={{
                              backgroundColor: theme.colors.primary,
                              color: "#FFFFFF",
                              "&:hover": {
                                backgroundColor: theme.colors.accent,
                              },
                              flexDirection: "row-reverse", // For RTL
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

          {/* Pagination */}
          {filteredPlaces.length > 0 && (
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: theme.colors.text,
                    "&.Mui-selected": {
                      backgroundColor: theme.colors.primary,
                      color: "white",
                      "&:hover": {
                        backgroundColor: theme.colors.accent,
                      },
                    },
                    "&:hover": {
                      backgroundColor: "rgba(74, 114, 172, 0.1)",
                    },
                  },
                  "& .MuiPaginationItem-icon": {
                    color: theme.colors.text,
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Container>

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
              <Grid container spacing={3}>
                {/* Image gallery */}
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      position: "relative",
                      height: 300,
                      backgroundColor: "rgba(0,0,0,0.05)",
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
                            objectFit: "cover",
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

                  {selectedPlace.phone && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <PhoneIcon
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
                  )}

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
                        }}
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
                variant="outlined"
                onClick={() => setDetailsDialogOpen(false)}
                sx={{
                  color: theme.colors.primary,
                  borderColor: theme.colors.border,
                }}
              >
                إغلاق
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </AdminLayout>
  );
};

export default ApprovedPlaces;
