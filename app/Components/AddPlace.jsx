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

  // Add these custom MUI styles for form fields
  const formFieldStyles = {
    "& .MuiOutlinedInput-root": {
      transition: "all 0.2s ease-in-out",
      borderRadius: 1.5,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.colors.primary,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: 2,
      },
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.9rem",
      fontWeight: 500,
    },
    "& .MuiInputBase-input": {
      padding: "14px 16px",
    },
  };

  // Add this after your state declarations
  const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'saved'

  // Create the auto-save function
  const saveFormProgress = useCallback(
    debounce(() => {
      setSaveStatus("saving");
      try {
        // Save current form state to localStorage
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
            // We don't save images because they're Files/Blobs that can't be JSON serialized
          })
        );

        setTimeout(() => {
          setSaveStatus("saved");
          // Reset after 3 seconds
          setTimeout(() => setSaveStatus(null), 3000);
        }, 800);
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
        router.push("/my-places");
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

  // Add a function to load draft on component mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem("place_form_draft");
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);

        // Confirm before restoring
        if (confirm("هل ترغب في استعادة المسودة المحفوظة؟")) {
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
        } else {
          // If user declines, clear the draft
          localStorage.removeItem("place_form_draft");
        }
      }
    } catch (error) {
      console.error("Error loading saved draft:", error);
    }

    // Clean up draft after successful submission
    return () => {
      if (submitSuccess) {
        localStorage.removeItem("place_form_draft");
      }
    };
  }, [submitSuccess]);

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
                    <img
                      src="../../public/pay.png"
                      alt="فودافون كاش"
                      width="24"
                      height="24"
                    />
                  ),
                },
                {
                  id: "stcPay",
                  label: "InstaPay",
                  icon: (
                    <img
                      src="/icons/stcpay.svg"
                      alt="STC Pay"
                      width="24"
                      height="24"
                    />
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
      label: "المراجعة والنشر",
      description: "راجع معلومات مكانك وارسله للمراجعة",
      icon: <CheckCircleOutlineIcon />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 3, color: theme.colors.primary, fontWeight: 500 }}
            >
              <CheckCircleOutlineIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              مراجعة ونشر
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              <AlertTitle>معلومات المراجعة</AlertTitle>
              سيتم مراجعة مكانك من قبل فريقنا خلال 24-48 ساعة. سيتم إشعارك
              بالبريد الإلكتروني عند الموافقة على مكانك أو في حال الحاجة إلى
              تعديلات.
            </Alert>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: theme.colors.border,
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.01)",
                transition: "all 0.3s ease",
                boxShadow: darkMode
                  ? "0 4px 20px rgba(0, 0, 0, 0.25)"
                  : "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
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
                  </Typography>

                  {/* Existing box with category and price chips */}

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      color: darkMode ? theme.colors.text : theme.colors.text,
                      lineHeight: 1.7,
                    }}
                  >
                    {formData.description || "وصف المكان..."}
                  </Typography>

                  {/* Other existing elements */}
                </Grid>

                {/* Preview image section - unchanged */}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
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
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode
                      ? theme.colors.textSecondary
                      : theme.colors.text,
                  }}
                >
                  أوافق على شروط وأحكام المنصة وأؤكد أن جميع المعلومات المقدمة
                  صحيحة ودقيقة
                </Typography>
              }
            />
          </Grid>

          {errors.submit && (
            <Grid item xs={12}>
              <Alert severity="error">{errors.submit}</Alert>
            </Grid>
          )}
        </Grid>
      ),
    },
  ];

  // If form was successfully submitted, show success message
  if (submitSuccess) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
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
            backgroundColor: darkMode ? "#7092c4" : "#365d8d",
          },
        }}
        onClick={() => {
          // Show help dialog or redirect to help page
          alert("سيتم توجيهك إلى صفحة المساعدة");
        }}
      >
        <HelpOutlineIcon sx={{ fontSize: 28 }} />
      </IconButton>
    </Tooltip>
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
                        borderRadius: "25px",
                        px: 3.5,
                        py: 1.2,
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
                          <SendIcon sx={{ transform: "scaleX(-1)" }} />
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
