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
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../Components/admin/AdminLayout";
import axios from "axios";
import { motion } from "framer-motion";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CategoryIcon from "@mui/icons-material/Category";

const AllPlaces = () => {
  const { theme } = useTheme(); // Only use theme from context, not darkMode
  const router = useRouter();

  // State
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showDemoData, setShowDemoData] = useState(false);

  // Added state for details dialog
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Categories for filter
  const categories = [
    { value: "all", label: "جميع الفئات" },
    { value: "restaurants", label: "مطاعم وكافيهات" },
    { value: "tourism", label: "أماكن سياحية" },
    { value: "hotels", label: "فنادق ومنتجعات" },
    { value: "shopping", label: "تسوق ومولات" },
    { value: "entertainment", label: "أنشطة ترفيهية" },
    { value: "museums", label: "متاحف ومعارض" },
  ];

  // Demo data for testing and presentation
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
    // Rejected Places
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
    // Pending Places
    {
      _id: "pending1",
      name: "حديقة الفردوس",
      description:
        "حديقة عامة واسعة توفر مساحات خضراء ومناطق للعائلات والأطفال ومسارات للمشي والجري وبحيرة صناعية ومناطق للشواء.",
      category: "entertainment",
      address: "شارع الهرم، بعد ميدان الرماية",
      city: "الجيزة",
      phone: "+20 155 667 7889",
      email: "info@paradisepark.example.com",
      images: [
        "https://images.pexels.com/photos/531602/pexels-photo-531602.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      isApproved: false,
    },
    {
      _id: "pending2",
      name: "معرض الفنون المعاصرة",
      description:
        "معرض فني يقدم أعمال فنانين مصريين وعالميين معاصرين، مع تنظيم معارض متغيرة وورش عمل فنية ومحاضرات ثقافية.",
      category: "museums",
      address: "شارع المعز، الجمالية",
      city: "القاهرة",
      phone: "+20 127 889 9001",
      email: "gallery@contemporaryarts.example.org",
      images: [
        "https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      ],
      isApproved: false,
    },
    {
      _id: "pending3",
      name: "مقهى ومطعم الشاطئ",
      description:
        "مقهى ومطعم على الشاطئ يقدم المأكولات البحرية الطازجة والمشروبات المتنوعة في أجواء مريحة مع إطلالة مباشرة على البحر.",
      category: "restaurants",
      address: "كورنيش الإسكندرية، محطة الرمل",
      city: "الإسكندرية",
      phone: "+20 110 223 4455",
      email: "info@beachcafe.example.com",
      images: [
        "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      isApproved: false,
    },
    {
      _id: "pending4",
      name: "المركز التجاري الذكي",
      description:
        "مركز تسوق حديث يجمع بين التكنولوجيا والتسوق، حيث يوفر تجربة تسوق ذكية مع تطبيقات للتسوق الإلكتروني والدفع الرقمي.",
      category: "shopping",
      address: "شارع التسعين، التجمع الخامس",
      city: "القاهرة",
      phone: "+20 111 454 8989",
      email: "contact@smartmall.example.com",
      images: [
        "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      isApproved: false,
    },
  ];

  // Fetch all places or use demo data
  useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        if (showDemoData) {
          setPlaces(demoPlaces);
          setFilteredPlaces(demoPlaces);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          "https://iti-server-production.up.railway.app//api/admin/places/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.length === 0) {
          // Automatically use demo data if API returns empty
          setShowDemoData(true);
          setPlaces(demoPlaces);
          setFilteredPlaces(demoPlaces);
        } else {
          setPlaces(response.data);
          setFilteredPlaces(response.data);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        // Use demo data on error
        setShowDemoData(true);
        setPlaces(demoPlaces);
        setFilteredPlaces(demoPlaces);
        setError("تم تحميل بيانات توضيحية لأغراض العرض");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlaces();
  }, [router, showDemoData]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    filterPlaces(newValue, searchQuery, categoryFilter);
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterPlaces(tabValue, query, categoryFilter);
  };

  // Handle category filter
  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    filterPlaces(tabValue, query, category);
  };

  // Filter places based on status, search query, and category
  const filterPlaces = (status, query, category) => {
    let filtered = [...places];

    // Filter by status
    if (status !== "all") {
      if (status === "approved") {
        filtered = filtered.filter((place) => place.isApproved === true);
      } else if (status === "pending") {
        filtered = filtered.filter(
          (place) => place.isApproved === false && !place.rejectionReason
        );
      } else if (status === "rejected") {
        filtered = filtered.filter(
          (place) => place.isApproved === false && place.rejectionReason
        );
      }
    }

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (place) =>
          place.name.toLowerCase().includes(lowercaseQuery) ||
          (place.address &&
            place.address.toLowerCase().includes(lowercaseQuery)) ||
          (place.city && place.city.toLowerCase().includes(lowercaseQuery))
      );
    }

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((place) => place.category === category);
    }

    setFilteredPlaces(filtered);
  };

  // Get status chip for each place
  const getStatusChip = (place) => {
    if (place.isApproved) {
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="تمت الموافقة"
          color="success"
          size="small"
          sx={{
            fontWeight: "bold",
            backgroundColor: "rgba(46, 125, 50, 0.8)",
            color: "#FFFFFF",
          }}
        />
      );
    } else if (place.rejectionReason) {
      return (
        <Chip
          icon={<CancelIcon />}
          label="مرفوض"
          color="error"
          size="small"
          sx={{
            fontWeight: "bold",
            backgroundColor: "rgba(211, 47, 47, 0.8)",
            color: "#FFFFFF",
          }}
        />
      );
    } else {
      return (
        <Chip
          icon={<PendingIcon />}
          label="قيد المراجعة"
          color="warning"
          size="small"
          sx={{
            fontWeight: "bold",
            backgroundColor: "rgba(237, 108, 2, 0.8)",
            color: "#FFFFFF",
          }}
        />
      );
    }
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const foundCategory = categories.find((cat) => cat.value === category);
    return foundCategory ? foundCategory.label : category;
  };

  // Toggle demo data
  const toggleDemoData = () => {
    setLoading(true);
    setShowDemoData((prev) => !prev);
  };

  // View place details dialog
  const viewPlaceDetails = (placeId) => {
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
      <Box sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
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
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2,
              color: theme.colors.text,
            }}
          >
            <div>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                color="inherit"
              >
                جميع الأماكن
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 1, color: theme.colors.textSecondary }}
              >
                عرض وإدارة جميع الأماكن المُسجلة من قِبل البائعين
              </Typography>
            </div>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Button
                variant={showDemoData ? "contained" : "outlined"}
                onClick={toggleDemoData}
                size="small"
                sx={{
                  bgcolor: showDemoData ? theme.colors.primary : "transparent",
                  color: showDemoData ? "#fff" : theme.colors.text,
                  borderColor: theme.colors.border,
                  "&:hover": {
                    bgcolor: showDemoData
                      ? theme.colors.accent
                      : "rgba(74, 114, 172, 0.05)",
                  },
                }}
              >
                {showDemoData ? "عرض البيانات الحقيقية" : "عرض بيانات توضيحية"}
              </Button>

              <TextField
                placeholder="بحث..."
                value={searchQuery}
                onChange={handleSearch}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.colors.textSecondary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: 200 },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    "& fieldset": { borderColor: theme.colors.border },
                    "&:hover fieldset": { borderColor: theme.colors.primary },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.colors.primary,
                    },
                    "& input::placeholder": {
                      color: theme.colors.textSecondary,
                    },
                  },
                }}
              />

              <FormControl
                size="small"
                sx={{
                  minWidth: 160,
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
                <InputLabel id="category-filter-label">
                  تصفية حسب الفئة
                </InputLabel>
                <Select
                  labelId="category-filter-label"
                  value={categoryFilter}
                  label="تصفية حسب الفئة"
                  onChange={handleCategoryFilter}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon
                        sx={{ color: theme.colors.textSecondary }}
                      />
                    </InputAdornment>
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Paper
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              mb: 4,
              backgroundColor: theme.colors.surface,
              boxShadow: "none",
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": {
                  py: 2,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: theme.colors.text,
                  opacity: 0.7,
                  "&.Mui-selected": {
                    color: theme.colors.primary,
                    opacity: 1,
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.colors.primary,
                },
              }}
            >
              <Tab
                value="all"
                label={`الكل (${places.length})`}
                sx={{
                  flexDirection: "row-reverse",
                  "& .MuiTab-iconWrapper": { ml: 1 },
                }}
              />
              <Tab
                value="approved"
                label={`تمت الموافقة (${
                  places.filter((p) => p.isApproved).length
                })`}
                icon={<CheckCircleIcon />}
                iconPosition="start"
                sx={{
                  flexDirection: "row-reverse",
                  "& .MuiTab-iconWrapper": { ml: 1 },
                }}
              />
              <Tab
                value="pending"
                label={`قيد المراجعة (${
                  places.filter((p) => !p.isApproved && !p.rejectionReason)
                    .length
                })`}
                icon={<PendingIcon />}
                iconPosition="start"
                sx={{
                  flexDirection: "row-reverse",
                  "& .MuiTab-iconWrapper": { ml: 1 },
                }}
              />
              <Tab
                value="rejected"
                label={`مرفوضة (${
                  places.filter((p) => !p.isApproved && p.rejectionReason)
                    .length
                })`}
                icon={<CancelIcon />}
                iconPosition="start"
                sx={{
                  flexDirection: "row-reverse",
                  "& .MuiTab-iconWrapper": { ml: 1 },
                }}
              />
            </Tabs>
          </Paper>

          {filteredPlaces.length === 0 ? (
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
                لا توجد أماكن مطابقة لمعايير البحث!
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                جرب تغيير معايير التصفية أو البحث للعثور على النتائج
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredPlaces.map((place) => (
                <Grid item xs={12} md={6} lg={4} key={place._id}>
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

                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          <Chip
                            label={getCategoryLabel(place.category)}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(74, 114, 172, 0.8)",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                          }}
                        >
                          {getStatusChip(place)}
                        </Box>
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

                        {place.rejectionReason && (
                          <Box
                            sx={{
                              mb: 2,
                              p: 1.5,
                              borderRadius: 1,
                              border: "1px solid rgba(211, 47, 47, 0.3)",
                              bgcolor: "rgba(211, 47, 47, 0.05)",
                              color: theme.colors.textSecondary,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              color="error.main"
                              sx={{ mb: 0.5 }}
                            >
                              سبب الرفض:
                            </Typography>
                            <Typography variant="body2">
                              {place.rejectionReason}
                            </Typography>
                          </Box>
                        )}

                        <Button
                          variant="contained"
                          endIcon={<VisibilityIcon sx={{ mr: 1 }} />}
                          onClick={() => viewPlaceDetails(place._id)}
                          fullWidth
                          sx={{
                            mt: "auto",
                            backgroundColor: theme.colors.primary,
                            color: "#FFFFFF",
                            "&:hover": {
                              backgroundColor: theme.colors.accent,
                            },
                            flexDirection: "row-reverse",
                          }}
                        >
                          عرض التفاصيل
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

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
                <Typography
                  variant="h6"
                  sx={{ ml: 1, color: theme.colors.text }}
                >
                  {selectedPlace.name}
                </Typography>
                <CategoryIcon sx={{ color: theme.colors.primary }} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {getStatusChip(selectedPlace)}
                <IconButton
                  aria-label="close"
                  onClick={() => setDetailsDialogOpen(false)}
                  sx={{ color: theme.colors.textSecondary }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
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

                  {selectedPlace.rejectionReason && (
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
                        color="error.main"
                        sx={{ mb: 0.5 }}
                      >
                        سبب الرفض:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.colors.textSecondary }}
                      >
                        {selectedPlace.rejectionReason}
                      </Typography>
                    </Box>
                  )}

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

export default AllPlaces;
