"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { StyledTextField } from "../styledComponent/Login/styledLogin";
import { StyledFormControl } from "../styledComponent/Login/styledLogin";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Stack,
  Chip,
  IconButton,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Autocomplete,
  Switch,
  FormControlLabel,
  Paper,
  Checkbox,
  Tooltip,
  Alert,
  AlertTitle,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  useMediaQuery,
  Tabs,
  Tab,
  Link,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Import icons individually instead of bundled
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WifiIcon from "@mui/icons-material/Wifi"; // Note the capitalization changed
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SpaIcon from "@mui/icons-material/Spa";
import RestoreIcon from "@mui/icons-material/Restore";
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { motion } from "framer-motion";
import axios from "axios";

// Add this to your imports
import { debounce } from "lodash";

// Add to your imports
import { styled } from "@mui/material/styles";

// Import the new component
import AutoCloseSelect from "./AutoCloseSelect";

// Create a styled Select component

// Pre-defined place categories matching the ones in HomeV2.jsx
const placeCategories = [
  { id: 1, value: "restaurants", label: "مطاعم وكافيهات" },
  { id: 2, value: "tourism", label: "أماكن سياحية" },
  { id: 3, value: "hotels", label: "فنادق ومنتجعات" },
  { id: 4, value: "shopping", label: "تسوق ومولات" },
  { id: 5, value: "entertainment", label: "أنشطة ترفيهية" },
  { id: 6, value: "museums", label: "متاحف ومعارض" },
];

// Common amenities by category
const amenitiesByCategory = {
  restaurants: [
    { id: 1, label: "واي فاي مجاني", icon: <WifiIcon fontSize="small" /> },
    {
      id: 2,
      label: "مواقف سيارات",
      icon: <LocalParkingIcon fontSize="small" />,
    },
    { id: 3, label: "قائمة نباتية", icon: <RestaurantIcon fontSize="small" /> },
    { id: 4, label: "تكييف", icon: <AcUnitIcon fontSize="small" /> },
    {
      id: 5,
      label: "مناسب للعائلات",
      icon: <FamilyRestroomIcon fontSize="small" />,
    },
    {
      id: 6,
      label: "دخول ذوي الاحتياجات",
      icon: <AccessibleIcon fontSize="small" />,
    },
  ],
  hotels: [
    { id: 1, label: "واي فاي مجاني", icon: <WifiIcon fontSize="small" /> },
    {
      id: 2,
      label: "مواقف سيارات",
      icon: <LocalParkingIcon fontSize="small" />,
    },
    { id: 3, label: "مسبح", icon: <SpaIcon fontSize="small" /> },
    { id: 4, label: "تكييف", icon: <AcUnitIcon fontSize="small" /> },
    {
      id: 5,
      label: "مناسب للعائلات",
      icon: <FamilyRestroomIcon fontSize="small" />,
    },
    {
      id: 6,
      label: "سماح بالحيوانات الأليفة",
      icon: <PetsOutlinedIcon fontSize="small" />,
    },
  ],
  // Additional categories would have their own amenities
};

// Saudi cities list
const saudiCities = ["القاهرة", "الإسكندرية", "أسوان", "جنوب سيناء", "مطروح"];

const AddPlace = () => {
  const { theme, darkMode } = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [weekdayHours, setWeekdayHours] = useState({
    from: dayjs().set("hour", 9).set("minute", 0),
    to: dayjs().set("hour", 22).set("minute", 0),
  });
  const [weekendHours, setWeekendHours] = useState({
    from: dayjs().set("hour", 10).set("minute", 0),
    to: dayjs().set("hour", 23).set("minute", 0),
  });
  const [customHours, setCustomHours] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    website: "",
    priceRange: "",
    features: [],
    isAccessible: false,
    hasParkingSpace: false,
    customSchedule: {},
  });

  // Add this after your state declarations
  const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'saved'

  // Create the auto-save function
  const saveFormProgress = useCallback(
    debounce(() => {
      setSaveStatus("saving");
      try {
        // Save current form state to localStorage with timestamp
        localStorage.setItem(
          "place_form_draft",
          JSON.stringify({
            formData,
            selectedAmenities,
            customHours,
            weekdayHours: {
              from: weekdayHours.from.format(),
              to: weekdayHours.to.format(),
            },
            weekendHours: {
              from: weekendHours.from.format(),
              to: weekendHours.to.format(),
            },
            activeStep,
            lastSaved: new Date().toISOString(), // Add timestamp
          })
        );

        setTimeout(() => {
          setSaveStatus("saved");
          // Reset after 3 seconds
          setTimeout(() => setSaveStatus(null), 3000);
        }, 2000);
      } catch (error) {
        console.error("Error auto-saving form:", error);
      }
    }, 1000),
    [
      formData,
      selectedAmenities,
      customHours,
      weekdayHours,
      weekendHours,
      activeStep,
    ]
  );

  // Handle form field changes
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }

      // Trigger auto-save
      saveFormProgress();
    },
    [errors, saveFormProgress]
  );

  // Handle checkbox changes
  const handleCheckboxChange = useCallback(
    (e) => {
      const { name, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
      // Trigger auto-save
      saveFormProgress();
    },
    [saveFormProgress]
  );

  // Handle amenities selection
  const handleAmenityToggle = useCallback(
    (amenity) => {
      setSelectedAmenities((prevSelected) => {
        if (prevSelected.some((item) => item.id === amenity.id)) {
          return prevSelected.filter((item) => item.id !== amenity.id);
        } else {
          return [...prevSelected, amenity];
        }
      });
      // Trigger auto-save
      saveFormProgress();
    },
    [saveFormProgress]
  );

  // Replace your existing handleImageUpload function

  const handleImageUpload = useCallback(
    async (e) => {
      const files = Array.from(e.target.files);
      if (files.length + images.length > 10) {
        setErrors((prev) => ({
          ...prev,
          images: "يمكنك رفع 10 صور كحد أقصى",
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, images: null }));

      try {
        // Show loading state if you want
        setSaveStatus("saving");

        // Convert each image to resized base64 and store them
        const base64Promises = files.map((file) => convertToBase64(file));
        const resizedImages = await Promise.all(base64Promises);

        // Update both arrays with the resized images
        setImages((prevImages) => [...prevImages, ...resizedImages]);
        setPreviewImages((prevPreviews) => [...prevPreviews, ...resizedImages]);

        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(null), 3000);
      } catch (error) {
        console.error("Error processing images:", error);
        setErrors((prev) => ({
          ...prev,
          images: "حدث خطأ أثناء معالجة الصور",
        }));
        setSaveStatus(null);
      }
    },
    [images, setSaveStatus]
  );

  // Replace your existing handleRemoveImage function
  const handleRemoveImage = useCallback((index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewImages((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  }, []);

  // Validate current step
  const validateStep = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (activeStep === 0) {
      if (!formData.name.trim()) {
        newErrors.name = "يرجى إدخال اسم المكان";
        isValid = false;
      }
      if (!formData.category) {
        newErrors.category = "يرجى اختيار فئة المكان";
        isValid = false;
      }
      if (!formData.description.trim() || formData.description.length < 20) {
        newErrors.description = "يرجى إدخال وصف مفصل (20 حرف على الأقل)";
        isValid = false;
      }
    } else if (activeStep === 1) {
      if (!formData.city) {
        newErrors.city = "يرجى اختيار المدينة";
        isValid = false;
      }
      if (!formData.address.trim()) {
        newErrors.address = "يرجى إدخال العنوان";
        isValid = false;
      }
      if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "يرجى إدخال رقم هاتف صحيح (10 أرقام)";
        isValid = false;
      }
      if (
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
        isValid = false;
      }
    } else if (activeStep === 2) {
      if (images.length === 0) {
        newErrors.images = "يرجى رفع صورة واحدة على الأقل";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [activeStep, formData, images]);

  // Modify the handleNext function to include animation
  const handleNext = useCallback(() => {
    if (validateStep()) {
      // Apply a fade out animation to the current step
      const stepContent = document.querySelector(`.step-${activeStep}`);
      if (stepContent) {
        stepContent.style.transition = "opacity 0.3s ease-out";
        stepContent.style.opacity = 0;

        setTimeout(() => {
          setActiveStep((prevStep) => prevStep + 1);

          // After state update and re-render, fade in the new step
          setTimeout(() => {
            const newStepContent = document.querySelector(
              `.step-${activeStep + 1}`
            );
            if (newStepContent) {
              newStepContent.style.opacity = 1;
            }
          }, 50);
        }, 300);
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  }, [validateStep, activeStep]);

  // Handle back step
  const handleBack = useCallback(() => {
    setActiveStep((prevStep) => prevStep - 1);
  }, []);

  // Replace your existing handleSubmit function
  const handleSubmit = useCallback(async () => {
    if (!validateStep()) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      // Convert images to appropriate format if needed
      const processedImages = previewImages.length > 0 ? previewImages : [];

      // Prepare data for submission
      const placeData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        address: formData.address,
        city: formData.city,
        phone: formData.phone || "",
        email: formData.email || "",
        website: formData.website || "",
        priceRange: formData.priceRange || "",
        features: formData.features || [],
        isAccessible: formData.isAccessible || false,
        hasParkingSpace: formData.hasParkingSpace || false,
        weekdayHours: customHours
          ? null
          : {
              from: weekdayHours.from.format("HH:mm"),
              to: weekdayHours.to.format("HH:mm"),
            },
        weekendHours: customHours
          ? null
          : {
              from: weekendHours.from.format("HH:mm"),
              to: weekendHours.to.format("HH:mm"),
            },
        customHours: customHours,
        customSchedule: formData.customSchedule || {},
        images: processedImages,
        amenities: selectedAmenities.map((amenity) => ({
          label: amenity.label,
        })),
      };

      // Submit to API
      const response = await axios.post(
        "https://iti-server-production.up.railway.app/api/seller-places",
        placeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Show success message and redirect
      setSubmitSuccess(true);

      // Remove draft from local storage
      localStorage.removeItem("placeDraft");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting place:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "حدث خطأ أثناء إرسال المعلومات. الرجاء المحاولة مرة أخرى.",
      }));
      setIsSubmitting(false);
    }
  }, [
    formData,
    images,
    previewImages,
    validateStep,
    selectedAmenities,
    customHours,
    weekdayHours,
    weekendHours,
    router,
  ]);

  // Replace your existing useEffect for cleanup
  useEffect(() => {
    // No longer need to revoke object URLs since we're using base64 directly
    return () => {
      // Clean up any resources if needed
    };
  }, []);

  const [draftDialogOpen, setDraftDialogOpen] = useState(false);
  const [draftDetails, setDraftDetails] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Add a function to load draft on component mount
  useEffect(() => {
    try {
      // Check if there's a saved draft
      const savedDraft = localStorage.getItem("place_form_draft");

      // Check if we navigated from navbar
      const fromNavbar = localStorage.getItem("navFrom") === "navbar";
      const navTime = parseInt(localStorage.getItem("navFromTime") || "0");

      // Only consider the navbar flag valid for 5 seconds (to prevent showing dialog if user refreshes page)
      const isRecentNavigation = Date.now() - navTime < 5000;

      if (savedDraft && fromNavbar && isRecentNavigation) {
        const parsedDraft = JSON.parse(savedDraft);

        // Calculate how long ago the draft was saved
        let lastEditedTime = "Unknown time";
        if (parsedDraft.lastSaved) {
          const lastSaved = new Date(parsedDraft.lastSaved);
          const now = new Date();
          const diffMinutes = Math.floor((now - lastSaved) / (1000 * 60));

          if (diffMinutes < 60) {
            lastEditedTime = `${diffMinutes} دقيقة مضت`;
          } else if (diffMinutes < 1440) {
            const hours = Math.floor(diffMinutes / 60);
            lastEditedTime = `${hours} ساعة مضت`;
          } else {
            const days = Math.floor(diffMinutes / 1440);
            lastEditedTime = `${days} يوم مضت`;
          }
        }

        // Store draft details for displaying in dialog
        setDraftDetails({
          formName: parsedDraft.formData.name || "مكان بدون اسم",
          progress: Math.round(
            ((parsedDraft.activeStep + 1) / steps.length) * 100
          ),
          lastEdited: lastEditedTime,
          stepName: steps[parsedDraft.activeStep]?.label || "الخطوة الأولى",
          parsedDraft: parsedDraft,
        });

        // Show the dialog
        setDraftDialogOpen(true);

        // Clear the navigation flag
        localStorage.removeItem("navFrom");
        localStorage.removeItem("navFromTime");
      }
    } catch (error) {
      console.error("Error loading saved draft:", error);
    }

    // Clean up draft after successful submission
    return () => {
      if (submitSuccess) {
        localStorage.removeItem("place_form_draft");
      }
      // Also clean up navigation flags
      localStorage.removeItem("navFrom");
      localStorage.removeItem("navFromTime");
    };
  }, [submitSuccess]);

  // Add the function to restore draft
  const handleRestoreDraft = () => {
    if (draftDetails?.parsedDraft) {
      const { parsedDraft } = draftDetails;
      setFormData(parsedDraft.formData);
      setSelectedAmenities(parsedDraft.selectedAmenities);
      setCustomHours(parsedDraft.customHours);
      setWeekdayHours({
        from: dayjs(parsedDraft.weekdayHours.from),
        to: dayjs(parsedDraft.weekdayHours.to),
      });
      setWeekendHours({
        from: dayjs(parsedDraft.weekendHours.from),
        to: dayjs(parsedDraft.weekendHours.to),
      });
      setActiveStep(parsedDraft.activeStep);

      // Close the dialog
      setDraftDialogOpen(false);
    }
  };

  // Add the function to discard draft
  const handleDiscardDraft = () => {
    localStorage.removeItem("place_form_draft");
    setDraftDialogOpen(false);
  };

  // Add the function to close dialog without action
  const handleCloseDialog = () => {
    setDraftDialogOpen(false);
  };

  // Get appropriate amenities for selected category
  const availableAmenities = formData.category
    ? amenitiesByCategory[formData.category] || amenitiesByCategory.restaurants
    : [];

  // Steps configuration
  const steps = [
    {
      label: " معلومات المكان",
      description: "أدخل المعلومات الأساسية عن مكانك",
      icon: (
        <InfoOutlinedIcon
          sx={{ color: darkMode ? theme.colors.primary : undefined }}
        />
      ),
      content: (
        <Grid
          container
          spacing={3}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                mb: 2,
                color: theme.colors.primary,
                fontWeight: 500,
                textShadow: darkMode
                  ? "0 0 15px rgba(246, 177, 122, 0.2)"
                  : "none",
              }}
            >
              <StorefrontOutlinedIcon
                sx={{
                  mr: 1,
                  verticalAlign: "middle",
                  filter: darkMode
                    ? "drop-shadow(0 0 2px rgba(246, 177, 122, 0.3))"
                    : "none",
                }}
              />
              المعلومات الأساسية
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <StyledTextField
              $darkMode={darkMode}
              fullWidth
              label="اسم المكان"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              placeholder="مثال: مطعم الضيافة، فندق النخيل"
              InputProps={{
                sx: { direction: "rtl" },
              }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <AutoCloseSelect
              $darkMode={darkMode}
              label="فئة المكان"
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
              required
              sx={{
                height: "50px",
                "& .MuiSelect-select": {
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "right",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "10px",
                },
              }}
              MenuProps={{
                disablePortal: true,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    minWidth: 200,
                  },
                },
              }}
            >
              {placeCategories.map((category) => (
                <MenuItem key={category.id} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </AutoCloseSelect>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              $darkMode={darkMode}
              fullWidth
              label="وصف المكان"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              placeholder="اكتب وصفاً تفصيلياً عن مكانك، ميزاته، وما يميزه عن غيره..."
              InputProps={{
                sx: {
                  direction: "rtl",
                  borderRadius: "15px", // Slightly less rounded for multiline
                  padding: "10px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <AutoCloseSelect
              $darkMode={darkMode}
              label="فئة الأسعار"
              labelId="price-range-label"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              sx={{
                height: "50px",
                "& .MuiSelect-select": {
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "right",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "10px",
                },
              }}
              MenuProps={{
                disablePortal: true,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    minWidth: 200,
                  },
                },
              }}
            >
              <MenuItem value="$">$ (اقتصادي)</MenuItem>
              <MenuItem value="$$">$$ (متوسط)</MenuItem>
              <MenuItem value="$$$">$$$ (مرتفع)</MenuItem>
              <MenuItem value="$$$$">$$$$ (فاخر)</MenuItem>
            </AutoCloseSelect>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              $darkMode={darkMode}
              fullWidth
              label="الموقع الإلكتروني"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="www.example.com"
              InputProps={{
                sx: { direction: "ltr" },
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "الموقع والتواصل",
      description: "أدخل معلومات موقع وتواصل مكانك",
      icon: <LocationOnOutlinedIcon />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, color: theme.colors.primary, fontWeight: 500 }}
            >
              <LocationOnOutlinedIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              الموقع ومعلومات التواصل
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <AutoCloseSelect
              $darkMode={darkMode}
              label="المحافظة"
              labelId="city-label"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              required
              sx={{
                height: "50px",
                "& .MuiSelect-select": {
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "right",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "10px",
                },
              }}
              MenuProps={{
                disablePortal: true,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    minWidth: 200,
                  },
                },
              }}
            >
              {saudiCities.map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city}
                </MenuItem>
              ))}
            </AutoCloseSelect>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              $darkMode={darkMode}
              fullWidth
              label="رقم الهاتف"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder="05XXXXXXXX"
              InputProps={{
                sx: { direction: "ltr" },
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              $darkMode={darkMode}
              fullWidth
              label="العنوان التفصيلي"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              placeholder="مثال: شارع الملك فهد، حي العليا، بجوار..."
              InputProps={{
                sx: { direction: "rtl" },
              }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              $darkMode={darkMode}
              fullWidth
              label="البريد الإلكتروني"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="example@domain.com"
              InputProps={{
                sx: { direction: "ltr" },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px dashed",
                borderColor: theme.colors.border,
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.02)",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <InfoOutlinedIcon
                  fontSize="small"
                  sx={{
                    mr: 1,
                    verticalAlign: "middle",
                    color: theme.colors.primary,
                  }}
                />
                معلومات هامة
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.colors.textSecondary }}
              >
                تأكد من إدخال معلومات التواصل الصحيحة حتى يتمكن العملاء من
                الوصول إليك بسهولة. سيتم استخدام هذه المعلومات للتحقق من المكان
                أثناء عملية المراجعة.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "الصور",
      description: "أرفع صور جذابة لمكانك",
      icon: <PhotoLibraryOutlinedIcon />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, color: theme.colors.primary, fontWeight: 500 }}
            >
              <PhotoLibraryOutlinedIcon
                sx={{ mr: 1, verticalAlign: "middle" }}
              />
              صور المكان
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box
              component={motion.div}
              whileHover={{
                scale: 1.01,
                boxShadow: darkMode
                  ? "0 8px 16px rgba(0,0,0,0.2)"
                  : "0 8px 16px rgba(0,0,0,0.1)",
              }}
              sx={{
                border: "2px dashed",
                borderColor: errors.images
                  ? "error.main"
                  : theme.colors.primary,
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.03)"
                  : `${theme.colors.primary}05`,
                transition: "all 0.3s",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                boxShadow: darkMode ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
              }}
              onClick={() => document.getElementById("image-upload").click()}
              drag
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.1)"
                  : `${theme.colors.primary}15`;
                e.currentTarget.style.borderColor = theme.colors.primary;
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.03)"
                  : `${theme.colors.primary}05`;
                e.currentTarget.style.borderColor = errors.images
                  ? "error.main"
                  : theme.colors.primary;
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.03)"
                  : `${theme.colors.primary}05`;

                const files = Array.from(e.dataTransfer.files);
                if (files.length > 0 && files[0].type.startsWith("image/")) {
                  handleImageUpload({
                    target: { files: e.dataTransfer.files },
                  });
                }
              }}
            >
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <CloudUploadIcon
                  sx={{
                    fontSize: 60,
                    color: errors.images ? "error.main" : theme.colors.primary,
                    mb: 2,
                    opacity: 0.8,
                    filter: darkMode
                      ? "drop-shadow(0 0 8px rgba(246, 177, 122, 0.3))"
                      : "none",
                  }}
                />
              </motion.div>
              <Typography variant="h6" gutterBottom fontWeight={500}>
                اسحب الصور هنا أو انقر للاختيار
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  maxWidth: 400,
                  mx: "auto",
                  color: theme.colors.textSecondary,
                }}
              >
                يمكنك رفع حتى 10 صور بحجم أقصى 5 ميجابايت للصورة الواحدة. صيغ
                الصور المدعومة: JPG, PNG, WEBP
              </Typography>
              {errors.images && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{
                    mt: 2,
                    fontWeight: 500,
                    backgroundColor: "rgba(255,0,0,0.08)",
                    p: 1,
                    borderRadius: 1,
                    display: "inline-block",
                  }}
                >
                  {errors.images}
                </Typography>
              )}
            </Box>
          </Grid>

          {previewImages.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                الصور المختارة ({previewImages.length}/10)
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {previewImages.map((preview, index) => (
                  <Box
                    key={index}
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      position: "relative",
                      height: 150,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Box
                      component="img"
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "rgba(255,0,0,0.7)",
                        },
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                    {index === 0 && (
                      <Chip
                        label="الصورة الرئيسية"
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 5,
                          left: 5,
                          backgroundColor: theme.colors.primary,
                          color: "#fff",
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Alert
              severity="info"
              icon={<HelpOutlineIcon />}
              sx={{
                backgroundColor: darkMode
                  ? "rgba(66, 71, 105, 0.6)"
                  : "rgba(229, 246, 253, 0.8)",
                color: darkMode ? theme.colors.text : "inherit",
                border: "1px solid",
                borderColor: darkMode
                  ? "rgba(112, 119, 161, 0.5)"
                  : "rgba(74, 114, 172, 0.25)",
                borderRadius: 2,
                "& .MuiAlert-icon": {
                  color: darkMode ? theme.colors.primary : "#0288d1",
                },
                "& .MuiAlert-message": {
                  color: darkMode ? theme.colors.text : "inherit",
                },
              }}
            >
              <AlertTitle
                sx={{
                  fontWeight: 600,
                  color: darkMode ? theme.colors.primary : "inherit",
                }}
              >
                نصائح للصور
              </AlertTitle>
              <ul style={{ paddingRight: 16, paddingLeft: 0, margin: 0 }}>
                <li>استخدم صوراً واضحة وعالية الجودة</li>
                <li>الصورة الأولى ستكون هي الصورة الرئيسية للمكان</li>
                <li>اعرض مختلف زوايا ومرافق المكان</li>
                <li>تجنب الصور التي تحتوي على نصوص كثيرة أو شعارات</li>
              </ul>
            </Alert>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "المرافق ومواعيد العمل",
      description: "أضف مرافق وميزات ومواعيد عمل مكانك",
      icon: <FeaturedPlayListOutlinedIcon />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, color: theme.colors.primary, fontWeight: 500 }}
            >
              <FeaturedPlayListOutlinedIcon
                sx={{ mr: 1, verticalAlign: "middle" }}
              />
              المرافق والخدمات
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                المرافق المتوفرة
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                  mt: 2,
                }}
              >
                {availableAmenities.map((amenity) => {
                  const isSelected = selectedAmenities.some(
                    (item) => item.id === amenity.id
                  );
                  return (
                    <Box
                      key={amenity.id}
                      component={motion.div}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => handleAmenityToggle(amenity)}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: isSelected
                          ? theme.colors.primary
                          : theme.colors.border,
                        backgroundColor: isSelected
                          ? darkMode
                            ? `${theme.colors.primary}33`
                            : `${theme.colors.primary}15`
                          : darkMode
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      <Box
                        sx={{
                          color: isSelected
                            ? theme.colors.primary
                            : theme.colors.text,
                          mb: 1,
                          p: 1,
                          borderRadius: "50%",
                          backgroundColor: isSelected
                            ? darkMode
                              ? `${theme.colors.primary}33`
                              : `${theme.colors.primary}15`
                            : "transparent",
                        }}
                      >
                        {amenity.icon}
                      </Box>
                      <Typography variant="body2">{amenity.label}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider
              sx={{
                my: 3,
                borderColor: darkMode
                  ? "rgba(170, 178, 213, 0.15)"
                  : "rgba(0, 0, 0, 0.08)",
                opacity: darkMode ? 0.8 : 1,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, color: theme.colors.primary, fontWeight: 500 }}
            >
              <AccessTimeOutlinedIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              مواعيد العمل
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={customHours}
                  onChange={(e) => {
                    setCustomHours(e.target.checked);
                    saveFormProgress();
                  }}
                  color="primary"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: darkMode ? theme.colors.primary : undefined,
                      "&:hover": {
                        backgroundColor: darkMode
                          ? "rgba(246, 177, 122, 0.08)"
                          : undefined,
                      },
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: darkMode
                        ? "rgba(246, 177, 122, 0.5)"
                        : undefined,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{ color: darkMode ? theme.colors.text : undefined }}
                >
                  إعداد جدول مواعيد مخصص لكل يوم
                </Typography>
              }
            />
          </Grid>

          {!customHours ? (
            <>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  أيام الأسبوع (الأحد - الخميس)
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="من"
                      value={weekdayHours.from}
                      onChange={(newValue) =>
                        setWeekdayHours((prev) => ({ ...prev, from: newValue }))
                      }
                      renderInput={(params) => (
                        <StyledTextField
                          {...params}
                          $darkMode={darkMode}
                          sx={{
                            flex: 1,
                            "& .MuiInputAdornment-root button": {
                              color: darkMode
                                ? theme.colors.textSecondary
                                : undefined,
                              "&:hover": {
                                backgroundColor: darkMode
                                  ? "rgba(255, 255, 255, 0.05)"
                                  : undefined,
                              },
                            },
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: darkMode
                                ? "rgba(255, 255, 255, 0.03)"
                                : undefined,
                            },
                          }}
                        />
                      )}
                    />
                    <TimePicker
                      label="إلى"
                      value={weekdayHours.to}
                      onChange={(newValue) =>
                        setWeekdayHours((prev) => ({ ...prev, to: newValue }))
                      }
                      renderInput={(params) => (
                        <StyledTextField
                          {...params}
                          $darkMode={darkMode}
                          sx={{
                            flex: 1,
                            "& .MuiInputAdornment-root button": {
                              color: darkMode
                                ? theme.colors.textSecondary
                                : undefined,
                              "&:hover": {
                                backgroundColor: darkMode
                                  ? "rgba(255, 255, 255, 0.05)"
                                  : undefined,
                              },
                            },
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: darkMode
                                ? "rgba(255, 255, 255, 0.03)"
                                : undefined,
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  عطلة نهاية الأسبوع (الجمعة - السبت)
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="من"
                      value={weekendHours.from}
                      onChange={(newValue) =>
                        setWeekendHours((prev) => ({ ...prev, from: newValue }))
                      }
                      sx={{ flex: 1 }}
                    />
                    <TimePicker
                      label="إلى"
                      value={weekendHours.to}
                      onChange={(newValue) =>
                        setWeekendHours((prev) => ({ ...prev, to: newValue }))
                      }
                      sx={{ flex: 1 }}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.02)",
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: darkMode
                    ? "rgba(112, 119, 161, 0.2)"
                    : "rgba(0,0,0,0.06)",
                  boxShadow: darkMode ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: darkMode
                      ? theme.colors.textSecondary
                      : "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  في وضع الجدول المخصص، يمكنك تحديد ساعات مختلفة لكل يوم من أيام
                  الأسبوع
                </Typography>

                {[
                  "الأحد",
                  "الإثنين",
                  "الثلاثاء",
                  "الأربعاء",
                  "الخميس",
                  "الجمعة",
                  "السبت",
                ].map((day, index) => (
                  <Box key={day} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!formData.customSchedule?.[day]?.closed}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                customSchedule: {
                                  ...prev.customSchedule,
                                  [day]: {
                                    ...prev.customSchedule?.[day],
                                    closed: !e.target.checked,
                                  },
                                },
                              }));
                              // Trigger auto-save
                              saveFormProgress();
                            }}
                          />
                        }
                        label={day}
                      />
                    </Box>

                    {!formData.customSchedule?.[day]?.closed && (
                      <Box sx={{ display: "flex", gap: 2, ml: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="من"
                            value={
                              formData.customSchedule?.[day]?.from
                                ? dayjs(
                                    formData.customSchedule[day].from,
                                    "HH:mm"
                                  )
                                : dayjs().set("hour", 9).set("minute", 0)
                            }
                            onChange={(newValue) => {
                              setFormData((prev) => ({
                                ...prev,
                                customSchedule: {
                                  ...prev.customSchedule,
                                  [day]: {
                                    ...prev.customSchedule?.[day],
                                    from: newValue.format("HH:mm"),
                                  },
                                },
                              }));
                              // Trigger auto-save
                              saveFormProgress();
                            }}
                            sx={{ flex: 1 }}
                          />
                          <TimePicker
                            label="إلى"
                            value={
                              formData.customSchedule?.[day]?.to
                                ? dayjs(
                                    formData.customSchedule[day].to,
                                    "HH:mm"
                                  )
                                : dayjs().set("hour", 22).set("minute", 0)
                            }
                            onChange={(newValue) => {
                              setFormData((prev) => ({
                                ...prev,
                                customSchedule: {
                                  ...prev.customSchedule,
                                  [day]: {
                                    ...prev.customSchedule?.[day],
                                    to: newValue.format("HH:mm"),
                                  },
                                },
                              }));
                              // Trigger auto-save
                              saveFormProgress();
                            }}
                            sx={{ flex: 1 }}
                          />
                        </LocalizationProvider>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider
              sx={{
                my: 3,
                borderColor: darkMode
                  ? "rgba(170, 178, 213, 0.15)"
                  : "rgba(0, 0, 0, 0.08)",
                opacity: darkMode ? 0.8 : 1,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, color: theme.colors.primary, fontWeight: 500 }}
            >
              <AttachMoneyOutlinedIcon
                sx={{ mr: 1, verticalAlign: "middle" }}
              />
              طرق الدفع المقبولة
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {[
                {
                  id: "cash",
                  label: "نقدي",
                  icon: <AttachMoneyOutlinedIcon />,
                },
                {
                  id: "credit",
                  label: "بطاقات ائتمانية",
                  icon: <CreditCardIcon />,
                },
                {
                  id: "mada",
                  label: "فودافون كاش",
                  icon: (
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 122.4 122.88"
                      style={{ enableBackground: "new 0 0 122.4 122.88" }}
                      width="24"
                      height="24"
                    >
                      <style type="text/css">{`.st0{fill:#E63329;} .st1{fill:#FFFFFF;}`}</style>
                      <g>
                        <path
                          className="st0"
                          d="M122.4,61.44c0,33.92-27.5,61.44-61.43,61.44c-31.34,0-57.2-23.47-60.97-53.79v-15.3 C3.74,23.7,29.24,0.35,60.26,0h1.41C95.28,0.38,122.4,27.74,122.4,61.44L122.4,61.44z"
                        />
                        <path
                          className="st1"
                          d="M61.45,95.69c-16.87,0.06-34.44-14.34-34.52-37.48c-0.05-15.3,8.21-30.03,18.76-38.76 C55.98,10.94,70.07,5.46,82.85,5.41c1.65,0,3.38,0.14,4.44,0.49C76.11,8.23,67.21,18.64,67.24,30.43c0,0.39,0.04,0.81,0.09,1 c18.7,4.56,27.19,15.85,27.25,31.46C94.62,78.52,82.29,95.63,61.45,95.69L61.45,95.69z"
                        />
                      </g>
                    </svg>
                  ),
                },
                {
                  id: "stcPay",
                  label: "InstaPay",
                  icon: (
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1000 1000"
                      style={{ enableBackground: "new 0 0 1000 1000" }}
                      width="70"
                      height="70"
                    >
                      <g>
                        <path
                          fill="#8B4B9F"
                          d="M684.6,485.6c-4.8,19.9-23.9,35.4-44.5,35.7c-12,0.2-24,0.1-36,0.1h-2.9c-2.4,7.3-4.8,14.5-7.2,21.7h-21.7
        c0.2-0.8,0.3-1.4,0.5-2c1.9-6,11-30.8,15-42.2c4.3,0,14.7,0.1,15.1,0.1c14.9,0,29.8,0,44.6,0c7.1,0,12.9-4.7,14.4-11.4
        c1-4.4-1.4-7.8-5.8-8.3c-1.2-0.1-2.3-0.1-3.5-0.1c-18.8,0-37.6,0-56.3,0h-3.2c7.5-7.7,14.6-15,21.9-22.5h2.2
        c13.9,0,27.9-0.1,41.8,0.1c3.5,0,7,0.3,10.4,1.2C681.9,461.2,687.9,472.2,684.6,485.6L684.6,485.6z"
                        />
                        <path
                          fill="#8B4B9F"
                          d="M734.3,456.5c2.8,0.8,5.2,3,6.7,5.4c1.8,3,2.5,6.3,3.4,9.7c1,3.7,1.8,7.5,2.8,11.3c1.8,7.5,3.7,15,5.6,22.5
        c3,12,6,24,8.9,36c0.1,0.4,0.2,0.9,0.3,1.6h-82.9c7-7.6,13.7-14.9,20.5-22.3h29.5c-2.7-10.3-5.3-20.4-8.1-31
        c-16.6,18-33,35.7-49.4,53.4h-27.1c0.9-1,1.5-1.8,2.2-2.5c21.8-23.8,43.7-47.5,65.4-71.3c2.9-3.2,6-6.2,9.5-8.7
        c3.1-2.2,6.7-4.5,10.7-4.5C732.9,456.2,733.6,456.3,734.3,456.5L734.3,456.5z"
                        />
                        <path
                          fill="#8B4B9F"
                          d="M752,456.8h28c4.9,11.6,9.8,23.1,14.9,35c12.2-11.8,24.1-23.4,36.1-35h27.3c0.2,0.2,0.4,0.5,0.6,0.7
        c-0.7,0.5-1.6,0.9-2.2,1.5c-19,18-38,36-56.9,54c-1,1-1.9,2.3-2.3,3.6c-3,8.8-5.8,17.6-8.7,26.4h-21.9c0.3-1,0.5-1.8,0.8-2.7
        c2.6-7.9,5.1-15.8,7.8-23.7c0.6-1.7,0.5-3.1-0.2-4.7c-7.5-17.6-14.9-35.2-22.4-52.9C752.6,458.5,752.4,457.8,752,456.8L752,456.8z"
                        />
                        <path
                          fill="#500B75"
                          d="M511.3,515.4c0.7,2.8,5.2,18.9,7.5,27c-0.2,0.2-0.5,0.4-0.7,0.6h-83c7-7.6,13.6-14.9,20.4-22.3h29.6
        c-2.7-10.4-5.4-20.5-8.2-31.1c-16.7,18-33.1,35.8-49.4,53.4h-26.9c0.5-0.7,0.8-1.2,1.2-1.6c23.2-25.3,46.4-50.7,69.7-75.9
        c2.2-2.4,4.7-4.4,7.4-6c4.4-2.6,10-4.9,14.7-1.5c3.7,2.6,5.3,7.1,6.2,11.3c1.2,5.5,2.7,10.9,4,16.4
        C506.4,495.6,508.9,505.5,511.3,515.4z"
                        />
                        <path
                          fill="#500B75"
                          d="M246.7,543.8c-4.3-1.3-6.9-4.3-9.3-8c-8-12.6-16.3-25.1-24.4-37.6c-0.5-0.7-1-1.4-1.7-2.4
        c-5.2,16-10.4,31.6-15.5,47.3H174c0.2-0.7,0.3-1.4,0.5-2c7.9-24.2,15.8-48.5,23.9-72.7c0.9-2.8,2.6-5.6,4.6-7.7
        c5.6-6,14-5.1,18.5,1.8c8.6,13.1,17.1,26.2,25.6,39.3c0.4,0.7,0.9,1.4,1.6,2.4c5.3-16.1,10.4-31.7,15.6-47.4h21.8
        c-0.2,0.9-0.4,1.7-0.7,2.5c-7.9,24.1-15.8,48.2-23.7,72.2c-0.2,0.7-0.5,1.5-0.8,2.2c-1.8,4.7-4.7,8.4-9.6,10.1H246.7L246.7,543.8z"
                        />
                        <path
                          fill="#500B75"
                          d="M141,542.4c2.2-6.4,4.4-12.7,6.5-19.1c7.1-21.5,14.1-43,21.1-64.5c0.2-0.6,0.4-1.2,0.7-1.9h21.9
        c-9.5,28.9-18.9,57.6-28.3,86.5H141C141,543,141,542.7,141,542.4z"
                        />
                        <path
                          fill="#500B75"
                          d="M382.9,456.7c-7.5,7.8-14.5,15.1-21.5,22.5c-5.7,0-11.3,0-16.9,0c-11,0-22,0-33,0c-3.9,0-5.6,2-5.3,6.2
        c1.1,0.2,2.4,0.6,3.7,0.6c11.3,0,22.6-0.1,33.9,0.1c3.7,0.1,7.5,0.4,11,1.5c10.2,3.1,14.8,12.4,12.2,23.7
        c-4.2,18.3-20.8,31.7-40,31.9c-21.2,0.2-42.4,0.1-63.6,0.1c-0.4,0-0.7-0.1-1.8-0.1c7.3-7.6,14.3-14.9,21.3-22.2
        c3.6,0,7.3,0,10.9,0c13,0,26,0.1,39-0.1c2.9,0,5.8-1,8.5-2c1.4-0.5,2.7-1.9,3.5-3.3c1.7-2.7,0.8-5.1-2.1-6.2
        c-1.8-0.6-3.8-0.9-5.7-0.9c-11.7-0.1-23.4,0-35.1-0.1c-2.9,0-5.8-0.3-8.5-1c-10.1-2.5-15.2-10.9-12.9-21.1
        c3.5-15.9,18.2-28.6,34.6-29.3c9.6-0.4,19.3-0.2,29-0.2c11.8,0,23.7,0,35.5,0C380.5,456.7,381.4,456.7,382.9,456.7L382.9,456.7z"
                        />
                        <path
                          fill="#500B75"
                          d="M396.4,543.1h-22c7-21.4,13.9-42.5,20.9-63.9h-29.2c7.4-7.8,14.4-15,21.4-22.4H460
        c-7.3,7.6-14.4,14.9-21.5,22.3h-21.2C410.4,500.5,403.4,521.7,396.4,543.1L396.4,543.1z"
                        />
                        <path
                          fill="#FD6E66"
                          d="M568.7,499.3c-0.6,0.4-1.2,0.8-1.8,1.3c-15.4,13.5-32.9,29-48.4,42.6c-7,0-16.5,0-23.1,0l49.9-44.2
        c-0.6-1.1-1.1-1.9-1.5-2.7c-7.6-13.3-15.2-26.6-22.7-39.9h23.4c0.3,0.8,0.6,1.6,1,2.3c7.2,12.6,14.5,25.3,21.7,37.9
        C567.6,497.3,568,498,568.7,499.3L568.7,499.3z"
                        />
                        <path
                          fill="#FB6518"
                          d="M601.8,498.7l-48.9,43.7l-0.8,0.7c-7,0.1-16.2,0-22.9-0.5c16.5-14.5,33-29.1,49.5-43.7
        c-8.2-14.3-16.3-28.5-24.4-42.6h23.4c0.3,0.6,0.5,1.3,0.9,1.9c7.4,13,14.5,25.3,21.8,38.3C600.8,497.1,600.4,496.6,601.8,498.7z"
                        />
                      </g>
                    </svg>
                  ),
                },
              ].map((method) => (
                <Chip
                  key={method.id}
                  icon={method.icon}
                  label={method.label}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      paymentMethods: prev.paymentMethods?.includes(method.id)
                        ? prev.paymentMethods.filter((m) => m !== method.id)
                        : [...(prev.paymentMethods || []), method.id],
                    }));
                    saveFormProgress();
                  }}
                  color={
                    formData.paymentMethods?.includes(method.id)
                      ? "primary"
                      : "default"
                  }
                  variant={
                    formData.paymentMethods?.includes(method.id)
                      ? "filled"
                      : "outlined"
                  }
                  sx={{
                    px: 1,
                    backgroundColor: formData.paymentMethods?.includes(
                      method.id
                    )
                      ? darkMode
                        ? "rgba(246, 177, 122, 0.2)"
                        : undefined
                      : darkMode
                      ? "rgba(255, 255, 255, 0.03)"
                      : undefined,
                    borderColor:
                      darkMode && !formData.paymentMethods?.includes(method.id)
                        ? "rgba(170, 178, 213, 0.5)"
                        : undefined,
                    color: darkMode
                      ? formData.paymentMethods?.includes(method.id)
                        ? theme.colors.primary
                        : theme.colors.text
                      : undefined,
                    "& .MuiChip-icon": {
                      color:
                        darkMode && formData.paymentMethods?.includes(method.id)
                          ? theme.colors.primary
                          : undefined,
                    },
                    "&:hover": {
                      backgroundColor: darkMode
                        ? formData.paymentMethods?.includes(method.id)
                          ? "rgba(246, 177, 122, 0.3)"
                          : "rgba(255, 255, 255, 0.08)"
                        : undefined,
                    },
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      ),
    },
    {
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderBottom: "1px solid",
                borderColor: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
                pb: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: `${theme.colors.primary}25`,
                  p: 1,
                  borderRadius: "50%",
                  display: "flex",
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 28, color: theme.colors.primary }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontWeight: 600, color: theme.colors.primary }}
                >
                  مراجعة ونشر
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textSecondary }}
                >
                  راجع معلومات مكانك بعناية قبل الإرسال
                </Typography>
              </Box>
            </Box>

            <Alert
              severity="info"
              sx={{
                mb: 4,
                borderRadius: 2,
                boxShadow: darkMode
                  ? "0 4px 20px rgba(0,0,0,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "5px",
                  height: "100%",
                  backgroundColor: "#2196f3",
                },
              }}
            >
              <AlertTitle sx={{ fontWeight: 600 }}>معلومات المراجعة</AlertTitle>
              <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                سيتم مراجعة مكانك من قبل فريقنا خلال{" "}
                <Box component="span" sx={{ fontWeight: 600 }}>
                  24-48 ساعة
                </Box>
                . سيتم إشعارك بالبريد الإلكتروني عند الموافقة على مكانك أو في
                حال الحاجة إلى تعديلات.
              </Typography>
            </Alert>
          </Grid>

          <Grid
            item
            xs={12}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: theme.colors.border,
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.01)",
                transition: "all 0.3s ease",
                boxShadow: darkMode
                  ? "0 4px 20px rgba(0, 0, 0, 0.25)"
                  : "0 4px 20px rgba(0, 0, 0, 0.05)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Add a colorful top border */}
              <Box
                sx={{
                  height: "5px",
                  width: "100%",
                  background: `linear-gradient(90deg, ${
                    theme.colors.primary
                  } 0%, ${darkMode ? "#7092c4" : "#365d8d"} 100%)`,
                }}
              />

              {/* Preview Header */}
              <Box
                sx={{
                  p: 3,
                  pb: 1.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      color: darkMode
                        ? theme.colors.primary
                        : theme.colors.text,
                      fontWeight: 600,
                    }}
                  >
                    {formData.name || "اسم المكان"}
                    {formData.name && (
                      <Chip
                        size="small"
                        label={
                          placeCategories.find(
                            (c) => c.value === formData.category
                          )?.label || "فئة المكان"
                        }
                        sx={{
                          mr: 1.5,
                          backgroundColor: darkMode
                            ? `${theme.colors.primary}20`
                            : `${theme.colors.primary}15`,
                          color: theme.colors.primary,
                          fontWeight: 500,
                          borderRadius: "8px",
                        }}
                      />
                    )}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      gap: 2,
                    }}
                  >
                    {formData.city && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: theme.colors.textSecondary,
                        }}
                      >
                        <LocationOnOutlinedIcon
                          fontSize="small"
                          sx={{ mr: 0.5 }}
                        />
                        <Typography variant="body2">{formData.city}</Typography>
                      </Box>
                    )}

                    {formData.priceRange && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: theme.colors.textSecondary,
                        }}
                      >
                        <AttachMoneyOutlinedIcon
                          fontSize="small"
                          sx={{ mr: 0.5 }}
                        />
                        <Typography variant="body2">
                          {formData.priceRange.length} مستوى أسعار
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Button
                  startIcon={<ArrowForwardIcon />}
                  onClick={() => setActiveStep(0)}
                  size="small"
                  sx={{
                    color: theme.colors.primary,
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  تعديل المعلومات الأساسية
                </Button>
              </Box>

              {/* Tab navigation for different sections */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: darkMode ? "rgba(255,255,255,0.1)" : "divider",
                  px: 3,
                }}
              >
                <Tabs
                  value={0}
                  sx={{
                    "& .MuiTab-root": {
                      minWidth: { xs: "30%", sm: "auto" },
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      py: 1.5,
                      fontWeight: 500,
                      color: darkMode
                        ? theme.colors.textSecondary
                        : "text.secondary",
                      "&.Mui-selected": {
                        color: theme.colors.primary,
                        fontWeight: 600,
                      },
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: theme.colors.primary,
                      height: 3,
                      borderRadius: "3px 3px 0 0",
                    },
                  }}
                >
                  <Tab
                    key="overview"
                    icon={<InfoOutlinedIcon fontSize="small" />}
                    iconPosition="start"
                    label="نظرة عامة"
                  />
                  <Tab
                    key="photos"
                    icon={<PhotoLibraryOutlinedIcon fontSize="small" />}
                    iconPosition="start"
                    label="الصور"
                  />
                  <Tab
                    key="amenities"
                    icon={<FeaturedPlayListOutlinedIcon fontSize="small" />}
                    iconPosition="start"
                    label="المرافق"
                  />
                </Tabs>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* Preview Content - Main Overview */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={7}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: darkMode ? theme.colors.text : "text.primary",
                      }}
                    >
                      <DescriptionOutlinedIcon fontSize="small" />
                      وصف المكان
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        color: darkMode ? theme.colors.text : theme.colors.text,
                        lineHeight: 1.8,
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                        p: 2,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: darkMode
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                      }}
                    >
                      {formData.description || "وصف المكان..."}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: darkMode ? theme.colors.text : "text.primary",
                        }}
                      >
                        <LocationOnOutlinedIcon fontSize="small" />
                        الموقع ومعلومات الاتصال
                        <Button
                          size="small"
                          onClick={() => setActiveStep(1)}
                          sx={{
                            ml: "auto",
                            color: theme.colors.primary,
                            minWidth: "auto",
                            borderRadius: "8px",
                            p: "3px 8px",
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </Typography>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: darkMode
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.06)",
                          backgroundColor: darkMode
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(0,0,0,0.01)",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.04)",
                                  borderRadius: "50%",
                                  p: 0.5,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <LocationOnOutlinedIcon fontSize="small" />
                              </Box>
                              <Typography variant="body2">
                                {formData.address || "العنوان التفصيلي"}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.04)",
                                  borderRadius: "50%",
                                  p: 0.5,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <PhoneIcon fontSize="small" />
                              </Box>
                              <Typography variant="body2">
                                {formData.phone || "رقم الهاتف"}
                              </Typography>
                            </Box>
                          </Grid>

                          {formData.email && (
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  mb: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: darkMode
                                      ? "rgba(255,255,255,0.05)"
                                      : "rgba(0,0,0,0.04)",
                                    borderRadius: "50%",
                                    p: 0.5,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <EmailIcon fontSize="small" />
                                </Box>
                                <Typography variant="body2">
                                  {formData.email}
                                </Typography>
                              </Box>
                            </Grid>
                          )}

                          {formData.website && (
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  mb: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: darkMode
                                      ? "rgba(255,255,255,0.05)"
                                      : "rgba(0,0,0,0.04)",
                                    borderRadius: "50%",
                                    p: 0.5,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <LanguageIcon fontSize="small" />
                                </Box>
                                <Typography variant="body2">
                                  {formData.website}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      </Paper>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: darkMode ? theme.colors.text : "text.primary",
                        }}
                      >
                        <AccessTimeOutlinedIcon fontSize="small" />
                        مواعيد العمل
                        <Button
                          size="small"
                          onClick={() => setActiveStep(3)}
                          sx={{
                            ml: "auto",
                            color: theme.colors.primary,
                            minWidth: "auto",
                            borderRadius: "8px",
                            p: "3px 8px",
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </Typography>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: darkMode
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.06)",
                          backgroundColor: darkMode
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(0,0,0,0.01)",
                        }}
                      >
                        {!customHours ? (
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <span>أيام الأسبوع (الأحد - الخميس):</span>
                              <Box component="span" sx={{ fontWeight: 500 }}>
                                {weekdayHours.from.format("h:mm A")} -{" "}
                                {weekdayHours.to.format("h:mm A")}
                              </Box>
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>عطلة نهاية الأسبوع (الجمعة - السبت):</span>
                              <Box component="span" sx={{ fontWeight: 500 }}>
                                {weekendHours.from.format("h:mm A")} -{" "}
                                {weekendHours.to.format("h:mm A")}
                              </Box>
                            </Typography>
                          </Box>
                        ) : (
                          <Box>
                            {/* Show custom hours per day */}
                            {[
                              "الأحد",
                              "الإثنين",
                              "الثلاثاء",
                              "الأربعاء",
                              "الخميس",
                              "الجمعة",
                              "السبت",
                            ].map((day) => (
                              <Typography
                                key={day}
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  mb: 0.5,
                                }}
                              >
                                <span>{day}:</span>
                                <Box
                                  component="span"
                                  sx={{
                                    fontWeight: 500,
                                    color: formData.customSchedule?.[day]
                                      ?.closed
                                      ? "error.main"
                                      : "inherit",
                                  }}
                                >
                                  {formData.customSchedule?.[day]?.closed
                                    ? "مغلق"
                                    : `${
                                        formData.customSchedule?.[day]?.from ||
                                        "9:00"
                                      } - ${
                                        formData.customSchedule?.[day]?.to ||
                                        "22:00"
                                      }`}
                                </Box>
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Paper>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={5}>
                    {/* Preview image carousel */}
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: darkMode ? theme.colors.text : "text.primary",
                      }}
                    >
                      <PhotoLibraryOutlinedIcon fontSize="small" />
                      صور المكان
                      <Button
                        size="small"
                        onClick={() => setActiveStep(2)}
                        sx={{
                          ml: "auto",
                          color: theme.colors.primary,
                          minWidth: "auto",
                          borderRadius: "8px",
                          p: "3px 8px",
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </Typography>

                    {previewImages.length > 0 ? (
                      <Box
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                        sx={{
                          position: "relative",
                          height: 240,
                          borderRadius: 3,
                          overflow: "hidden",
                          mb: 1,
                          boxShadow: darkMode
                            ? "0 10px 30px rgba(0, 0, 0, 0.25)"
                            : "0 10px 30px rgba(0, 0, 0, 0.1)",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "30%",
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))",
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={previewImages[0]}
                          alt="صورة المكان"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            zIndex: 2,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 5,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        >
                          {previewImages.length} صورة
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: 240,
                          borderRadius: 3,
                          border: "1px dashed",
                          borderColor: "error.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          backgroundColor: darkMode
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(0,0,0,0.02)",
                          color: "error.main",
                        }}
                      >
                        <ErrorOutlineIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="body2">
                          لا توجد صور. يرجى إضافة صور للمكان
                        </Typography>
                      </Box>
                    )}

                    {previewImages.length > 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {previewImages.slice(1, 4).map((img, idx) => (
                          <Box
                            component={motion.div}
                            whileHover={{ scale: 1.05 }}
                            key={idx}
                            sx={{
                              width: "32%",
                              height: 70,
                              borderRadius: 2,
                              overflow: "hidden",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Box
                              component="img"
                              src={img}
                              alt={`صورة ${idx + 2}`}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        ))}
                        {previewImages.length > 4 && (
                          <Box
                            component={motion.div}
                            whileHover={{ scale: 1.05 }}
                            sx={{
                              width: "32%",
                              height: 70,
                              borderRadius: 2,
                              overflow: "hidden",
                              position: "relative",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Box
                              component="img"
                              src={previewImages[4]}
                              alt="صورة إضافية"
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "brightness(0.6)",
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "1.2rem",
                              }}
                            >
                              +{previewImages.length - 4}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}

                    {/* Amenities */}
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: darkMode ? theme.colors.text : "text.primary",
                      }}
                    >
                      <FeaturedPlayListOutlinedIcon fontSize="small" />
                      المرافق والخدمات
                      <Button
                        size="small"
                        onClick={() => setActiveStep(3)}
                        sx={{
                          ml: "auto",
                          color: theme.colors.primary,
                          minWidth: "auto",
                          borderRadius: "8px",
                          p: "3px 8px",
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {selectedAmenities.length > 0 ? (
                        selectedAmenities.map((amenity) => (
                          <Chip
                            key={amenity.id}
                            icon={React.cloneElement(amenity.icon, {
                              fontSize: "small",
                              sx: {
                                color: darkMode
                                  ? theme.colors.primary
                                  : theme.colors.primary,
                              },
                            })}
                            label={amenity.label}
                            sx={{
                              borderRadius: "10px",
                              backgroundColor: darkMode
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(0,0,0,0.04)",
                              border: "1px solid",
                              borderColor: darkMode
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(0,0,0,0.08)",
                              "& .MuiChip-label": {
                                px: 1,
                                py: 0.5,
                              },
                            }}
                          />
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          لم يتم تحديد مرافق
                        </Typography>
                      )}
                    </Box>

                    {/* Payment methods */}
                    {formData.paymentMethods &&
                      formData.paymentMethods.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2,
                              fontWeight: 500,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color: darkMode
                                ? theme.colors.text
                                : "text.primary",
                            }}
                          >
                            <AttachMoneyOutlinedIcon fontSize="small" />
                            طرق الدفع المقبولة
                          </Typography>

                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {formData.paymentMethods.map((method) => (
                              <Chip
                                key={method}
                                label={
                                  method === "cash"
                                    ? "نقدي"
                                    : method === "credit"
                                    ? "بطاقات ائتمانية"
                                    : method === "mada"
                                    ? "فودافون كاش"
                                    : "InstaPay"
                                }
                                size="small"
                                sx={{
                                  borderRadius: "10px",
                                  backgroundColor: darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.04)",
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Submission Agreement Section */}
          <Grid
            item
            xs={12}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: formData.termsAccepted
                  ? `${theme.colors.primary}40`
                  : errors.submit
                  ? "error.main"
                  : theme.colors.border,
                backgroundColor: formData.termsAccepted
                  ? darkMode
                    ? `${theme.colors.primary}15`
                    : `${theme.colors.primary}08`
                  : darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.01)",
                transition: "all 0.3s ease",
                boxShadow: formData.termsAccepted
                  ? darkMode
                    ? "0 4px 20px rgba(246, 177, 122, 0.15)"
                    : "0 4px 20px rgba(74, 114, 172, 0.1)"
                  : darkMode
                  ? "0 4px 20px rgba(0, 0, 0, 0.25)"
                  : "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Checkbox
                  required
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      termsAccepted: e.target.checked,
                    }));
                    // Trigger auto-save
                    saveFormProgress();
                  }}
                  checked={formData.termsAccepted}
                  sx={{
                    color: darkMode ? theme.colors.textSecondary : undefined,
                    "&.Mui-checked": {
                      color: darkMode ? theme.colors.primary : undefined,
                    },
                    mt: -0.5,
                  }}
                />
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: darkMode ? theme.colors.text : theme.colors.text,
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    الموافقة على الشروط والأحكام
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode
                        ? theme.colors.textSecondary
                        : theme.colors.text,
                      lineHeight: 1.6,
                    }}
                  >
                    أوافق على{" "}
                    <Link href="#" sx={{ color: theme.colors.primary }}>
                      شروط وأحكام المنصة
                    </Link>{" "}
                    وأؤكد أن جميع المعلومات المقدمة صحيحة ودقيقة وأن لدي الحق في
                    نشر هذه المعلومات. أفهم أن تقديم معلومات كاذبة أو مضللة قد
                    يؤدي إلى رفض المكان.
                  </Typography>
                </Box>
              </Box>

              {/* Add a completion checklist */}
              <Box
                sx={{
                  mt: 3,
                  pt: 2,
                  borderTop: "1px solid",
                  borderColor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <AssignmentTurnedInIcon fontSize="small" />
                  قائمة المراجعة النهائية
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      label: "معلومات المكان الأساسية",
                      complete:
                        !!formData.name &&
                        !!formData.category &&
                        !!formData.description,
                      step: 0,
                    },
                    {
                      label: "معلومات الموقع والاتصال",
                      complete:
                        !!formData.city &&
                        !!formData.address &&
                        !!formData.phone,
                      step: 1,
                    },
                    {
                      label: "صور المكان",
                      complete: previewImages.length > 0,
                      step: 2,
                    },
                    {
                      label: "المرافق ومواعيد العمل",
                      complete: true, // هذه ليست إلزامية
                      step: 3,
                    },
                    {
                      label: "الموافقة على الشروط",
                      complete: !!formData.termsAccepted,
                      step: 4,
                    },
                  ].map((item, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: item.complete
                            ? "success.main"
                            : "warning.main",
                        }}
                      >
                        {item.complete ? (
                          <CheckCircleIcon fontSize="small" />
                        ) : (
                          <ErrorOutlineIcon fontSize="small" />
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            flex: 1,
                            fontWeight: item.complete ? 400 : 500,
                          }}
                        >
                          {item.label}
                        </Typography>
                        {!item.complete && (
                          <Button
                            size="small"
                            onClick={() => setActiveStep(item.step)}
                            variant="outlined"
                            color="warning"
                            sx={{
                              minWidth: "auto",
                              height: 24,
                              borderRadius: "8px",
                              py: 0,
                              px: 1,
                              fontSize: "0.7rem",
                            }}
                          >
                            أكمل
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {errors.submit && (
            <Grid item xs={12}>
              <Alert
                severity="error"
                sx={{
                  borderRadius: 2,
                  animation: "pulse 1.5s infinite",
                }}
              >
                <AlertTitle>خطأ في الإرسال</AlertTitle>
                {errors.submit}
              </Alert>
            </Grid>
          )}
        </Grid>
      ),
    },
  ];

  // If form was successfully submitted, show success message
  if (submitSuccess) {
    return (
      <Box sx={{ p: 3, textAlign: "center", marginTop: "50px" }}>
        <Box
          component={motion.div}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            backgroundColor: darkMode
              ? "rgba(76, 175, 80, 0.1)"
              : "rgba(76, 175, 80, 0.05)",
            p: 4,
            borderRadius: 4,
            mb: 3,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 80,
              color: "#4CAF50",
            }}
          />
        </Box>
        <Typography variant="h4" gutterBottom>
          تم إرسال مكانك للمراجعة بنجاح!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
          سيقوم فريقنا بمراجعة المعلومات المقدمة والتواصل معك خلال 24-48 ساعة.
          يمكنك متابعة حالة مكانك من لوحة التحكم.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/dashboard/places")}
          sx={{
            px: 4,
            py: 1,
            borderRadius: 2,
          }}
        >
          الذهاب إلى لوحة التحكم
        </Button>
      </Box>
    );
  }

  // Add this at the end of your component, just before the final return
  const FloatingHelpButton = () => (
    <Tooltip title="مساعدة" placement="left">
      <IconButton
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: theme.colors.primary,
          color: "#fff",
          borderRadius: "50%",
          width: 56,
          height: 56,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          "&:hover": {
            backgroundColor: darkMode ? "#F6B17A" : "#365d8d",
          },
        }}
        
      >
        <HelpOutlineIcon sx={{ fontSize: 28 }} />
      </IconButton>
    </Tooltip>
  );

  // Add this Draft Recovery Dialog component before the final return statement
  const DraftRecoveryDialog = () => (
    <Dialog
      open={draftDialogOpen}
      onClose={handleCloseDialog}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 500 }}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: motion.div,
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { type: "spring", stiffness: 300, damping: 25 },
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: darkMode ? theme.colors.surface : "#ffffff",
          border: darkMode ? `1px solid ${theme.colors.border}` : "none",
          boxShadow: darkMode
            ? "0 8px 32px rgba(0,0,0,0.2)"
            : "0 8px 32px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: `linear-gradient(90deg, ${theme.colors.primary} 0%, ${
            darkMode ? "#7092c4" : "#365d8d"
          } 100%)`,
        }}
      />

      <DialogTitle
        sx={{
          pb: 1,
          pt: 3,
          display: "flex",
          direction: "rtl",
          alignItems: "center",
          gap: 1.5,
          fontWeight: 700,
          color: darkMode ? theme.colors.primary : theme.colors.primary,
        }}
      >
        <EventNoteIcon sx={{ fontSize: 28 }} />
        وجدنا مسودة محفوظة
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
              direction: "rtl",
              color: darkMode ? theme.colors.text : theme.colors.textSecondary,
            }}
          >
            هل ترغب في استعادة المسودة المحفوظة أم بدء نموذج جديد؟
          </Typography>

          <Paper
            elevation={0}
            component={motion.div}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
            sx={{
              p: 3,
              direction: "rtl",
              my: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: darkMode
                ? `${theme.colors.primary}40`
                : `${theme.colors.primary}30`,
              backgroundColor: darkMode
                ? `${theme.colors.primary}15`
                : `${theme.colors.primary}08`,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                  {draftDetails?.formName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textSecondary, mb: 1 }}
                >
                  آخر تعديل: {draftDetails?.lastEdited}
                </Typography>
              </Box>

              <Box
                component={motion.div}
                whileHover={{ rotate: 5 }}
                sx={{
                  backgroundColor: darkMode
                    ? `${theme.colors.primary}25`
                    : `${theme.colors.primary}15`,
                  px: 2,
                  py: 0.5,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={theme.colors.primary}
                >
                  {draftDetails?.progress}% مكتمل
                </Typography>
              </Box>
            </Stack>

            <Divider
              sx={{
                my: 2,
                borderColor: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.06)",
              }}
            />

            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                variant="body2"
                sx={{ color: theme.colors.textSecondary }}
              >
                توقفت عند :
              </Typography>
              <Chip
                label={draftDetails?.stepName}
                size="small"
                sx={{
                  backgroundColor: darkMode
                    ? `${theme.colors.primary}30`
                    : `${theme.colors.primary}15`,
                  color: theme.colors.primary,
                  fontWeight: 500,
                }}
              />
            </Stack>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 3, justifyContent: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDiscardDraft}
          sx={{
            borderRadius: 2,
            borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
            color: darkMode ? theme.colors.textSecondary : "text.secondary",
            px: 2,
            py: 1,
            "&:hover": {
              borderColor: darkMode
                ? "rgba(255,255,255,0.3)"
                : "rgba(0,0,0,0.2)",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.02)",
            },
          }}
        >
          {isMobile ? "نموذج جديد" : "بدء نموذج جديد"}
        </Button>

        <Button
          component={motion.button}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          variant="contained"
          startIcon={<RestoreIcon />}
          onClick={handleRestoreDraft}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1,
            backgroundColor: theme.colors.primary,
            color: darkMode ? "#000" : "#fff",
            boxShadow: darkMode
              ? "0 4px 12px rgba(246,177,122,0.3)"
              : "0 4px 12px rgba(74,114,172,0.25)",
          }}
        >
          استعادة المسودة
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: darkMode ? theme.colors.background : "#f8f9fa",
        minHeight: "100vh",
        marginTop: "50px",
        direction: "rtl",
      }}
    >
      <DraftRecoveryDialog />

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          backgroundColor: darkMode ? theme.colors.surface : "#ffffff",
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            backgroundColor: theme.colors.primary,
          }}
        />

        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 1,
            color: theme.colors.text,
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          تسجيل مكان جديد
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: theme.colors.textSecondary,
            textAlign: "right",
          }}
        >
          أضف مكانك إلى منصة فسحة وابدأ في استقبال المزيد من الزوار
        </Typography>

        <Box sx={{ mb: 4, mt: 2 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              px: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: darkMode
                  ? theme.colors.textSecondary
                  : "rgba(0,0,0,0.6)",
                fontWeight: 500,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: darkMode
                    ? "rgba(246, 177, 122, 0.15)"
                    : "rgba(74, 114, 172, 0.1)",
                  color: theme.colors.primary,
                  mr: 1,
                  fontWeight: "bold",
                }}
              >
                {activeStep + 1}
              </Box>
              من {steps.length} خطوات
            </Typography>
            <Typography
              variant="body2"
              component={motion.p}
              animate={{
                color: [
                  theme.colors.primary,
                  darkMode ? "#ffcda3" : "#6b8fc1",
                  theme.colors.primary,
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: 0,
                ease: "easeInOut",
              }}
              sx={{
                fontWeight: "bold",
                color: theme.colors.primary,
              }}
            >
              {Math.round(((activeStep + 1) / steps.length) * 100)}% مكتمل
            </Typography>
          </Box>

          <Box
            sx={{
              height: 10,
              width: "100%",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.05)",
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              p: "1px",
            }}
          >
            <Box
              component={motion.div}
              initial={{ width: `${(activeStep / steps.length) * 100}%` }}
              animate={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              whileHover={{ boxShadow: "0 0 8px rgba(246, 177, 122, 0.6)" }}
              sx={{
                height: "100%",
                background: darkMode
                  ? "linear-gradient(90deg, rgba(246, 177, 122, 0.9) 0%, rgba(246, 177, 122, 0.7) 100%)"
                  : "linear-gradient(90deg, rgba(74, 114, 172, 0.9) 0%, rgba(74, 114, 172, 0.7) 100%)",
                borderRadius: 4,
                boxShadow: darkMode
                  ? "0 0 5px rgba(246, 177, 122, 0.3)"
                  : "0 0 5px rgba(74, 114, 172, 0.3)",
              }}
            />
          </Box>
        </Box>

        {/* Add a save status indicator to your UI */}
        {/* Add this after the top progress bar */}
        {saveStatus && (
          <Box
            sx={{
              position: "fixed",
              top: 16,
              right: 16,
              zIndex: 1000,
              backgroundColor: darkMode
                ? "rgba(0,0,0,0.8)"
                : "rgba(255,255,255,0.95)",
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {saveStatus === "saving" ? (
              <>
                <CircularProgress size={16} thickness={5} />
                <Typography variant="body2">جاري الحفظ...</Typography>
              </>
            ) : (
              <>
                <CheckCircleOutlineIcon color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">
                  تم حفظ المسودة
                </Typography>
              </>
            )}
          </Box>
        )}

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            mb: 4,
            "& .MuiStepLabel-label": {
              fontWeight: "normal",
              color: darkMode ? theme.colors.textSecondary : "text.primary",
              transition: "color 0.3s ease",
            },
            "& .MuiStepLabel-label.Mui-active": {
              fontWeight: "bold",
              color: theme.colors.primary,
            },
            "& .MuiStepLabel-label.Mui-completed": {
              color: darkMode ? theme.colors.text : "text.primary",
            },
            "& .MuiStepIcon-root": {
              color: darkMode ? "rgba(246, 177, 122, 0.3)" : undefined,
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: theme.colors.primary,
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: darkMode ? theme.colors.primary : undefined,
            },
            "& .MuiStepConnector-line": {
              borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : undefined,
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {step.icon &&
                  React.cloneElement(step.icon, {
                    fontSize: "small",
                    sx: {
                      color:
                        index === activeStep
                          ? theme.colors.primary
                          : index < activeStep
                          ? darkMode
                            ? theme.colors.primary
                            : undefined
                          : darkMode
                          ? "rgba(255, 255, 255, 0.5)"
                          : "rgba(0, 0, 0, 0.3)",
                      verticalAlign: "middle",
                    },
                  })}
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{
                    fontWeight: index === activeStep ? 600 : 400,
                    color:
                      index === activeStep
                        ? theme.colors.primary
                        : darkMode
                        ? theme.colors.text
                        : "text.primary",
                    transition: "color 0.3s, font-weight 0.3s",
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color:
                    index === activeStep
                      ? darkMode
                        ? theme.colors.textSecondary
                        : "text.secondary"
                      : darkMode
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(0, 0, 0, 0.6)",
                  mb: 0.5,
                  transition: "color 0.3s",
                }}
              >
                {step.description}
              </Typography>

              <StepContent>
                <Paper
                  elevation={0}
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    mt: 2,
                    mb: 1,
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: theme.colors.border,
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.02)"
                      : "#fff",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                      pb: 2,
                      borderBottom: "1px solid",
                      borderColor: darkMode
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: `${theme.colors.primary}20`,
                        p: 1.5,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {step.icon &&
                        React.cloneElement(step.icon, {
                          sx: { fontSize: 28, color: theme.colors.primary },
                        })}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ fontWeight: 600, color: theme.colors.primary }}
                      >
                        {step.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: darkMode
                            ? theme.colors.textSecondary
                            : "text.secondary",
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className={`step-${index}`}
                    sx={{
                      mt: 2,
                      mb: 1,
                      opacity: 1,
                      transition: "opacity 0.3s ease-in",
                    }}
                  >
                    {step.content}
                  </Box>
                </Paper>
                <Box
                  sx={{
                    mb: 2,
                    mt: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                  }}
                >
                  {index > 0 && (
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBack}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        borderRadius: "10px",
                        px: 1,
                        py: 1,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        border: "1.5px solid",
                        borderColor: darkMode
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(0,0,0,0.2)",
                        color: darkMode
                          ? theme.colors.textSecondary
                          : "inherit",
                        "&:hover": {
                          borderColor: darkMode
                            ? theme.colors.primary
                            : "rgba(0,0,0,0.5)",
                          backgroundColor: darkMode
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.04)",
                          boxShadow: darkMode
                            ? "0 0 10px rgba(255,255,255,0.05)"
                            : "none",
                        },
                        transition: "all 0.2s ease",
                        "& .MuiButton-startIcon": {
                          marginLeft: 1, // Add space between icon and text for RTL layout
                        },
                      }}
                      startIcon={<ArrowForwardIcon />}
                    >
                      السابق
                    </Button>
                  )}

                  {index === steps.length - 1 ? (
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.termsAccepted}
                      sx={{
                        borderRadius: "10px",
                        px: 1,
                        py: 1,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        bgcolor: theme.colors.primary,
                        color: darkMode ? "#000" : "#fff",
                        boxShadow: darkMode
                          ? "0 4px 15px rgba(246, 177, 122, 0.3)"
                          : "0 4px 12px rgba(74, 114, 172, 0.25)",
                        "&:hover": {
                          bgcolor: darkMode ? "#f8c396" : "#365d8d",
                          boxShadow: darkMode
                            ? "0 6px 20px rgba(246, 177, 122, 0.4)"
                            : "0 6px 18px rgba(74, 114, 172, 0.35)",
                        },
                        "&:disabled": {
                          bgcolor: darkMode
                            ? "rgba(246, 177, 122, 0.5)"
                            : "rgba(74, 114, 172, 0.5)",
                          color: darkMode
                            ? "rgba(0, 0, 0, 0.6)"
                            : "rgba(255, 255, 255, 0.6)",
                        },
                        transition: "all 0.2s ease",
                      }}
                      endIcon={
                        isSubmitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SendIcon
                            sx={{
                              transform: "scaleX(-1)",
                              marginRight: "10px",
                            }}
                          />
                        )
                      }
                    >
                      {isSubmitting ? "جاري الإرسال..." : "إرسال للمراجعة"}
                    </Button>
                  ) : (
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      sx={{
                        borderRadius: "10px",
                        px: 1,
                        py: 1,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        bgcolor: theme.colors.primary,
                        color: darkMode ? "#000" : "#fff",
                        boxShadow: darkMode
                          ? "0 4px 15px rgba(246, 177, 122, 0.3)"
                          : "0 4px 12px rgba(74, 114, 172, 0.25)",
                        "&:hover": {
                          bgcolor: darkMode ? "#f8c396" : "#365d8d",
                          boxShadow: darkMode
                            ? "0 6px 20px rgba(246, 177, 122, 0.4)"
                            : "0 6px 18px rgba(74, 114, 172, 0.35)",
                        },
                        transition: "all 0.2s ease",
                        "& .MuiButton-endIcon": {
                          marginRight: 1, // Add space between icon and text for RTL layout
                        },
                      }}
                      endIcon={<ArrowBackIcon />}
                    >
                      التالي
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
      <FloatingHelpButton />
    </Box>
  );
};

// Add this function inside your AddPlace component or as a helper outside it

const convertToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Create an image element to resize the image
      const img = document.createElement("img");
      img.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement("canvas");
        // Set max width/height for the image
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;

        let width = img.width;
        let height = img.height;

        // Resize if needed
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Get the resized image as base64 with reduced quality (0.7 = 70%)
        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        resolve(resizedBase64);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
};

export default AddPlace;
