"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useTheme } from "../context/ThemeContext";
import {
  Container,
  LeftSection,
  RightSection,
  FormContainer,
  StyledButton,
  StyledTextField,
  StyledLink,
  ProgressContainer,
  ProgressStep,
  StepConnector,
  UploadContainer,
  ImagePreviewContainer,
  SuccessCard,
  FormPageContainer,
  FormHeader,
} from "../styledComponent/Register/StyledRegister";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Fade,
  Avatar,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  CloudUpload,
  Check,
  KeyboardBackspace,
  AccountCircle,
  PersonOutline,
  EmailOutlined,
  LocationCityOutlined,
  LockOutlined,
  Person,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Component for showing success message after registration
const RegistrationSuccess = ({ userType, darkMode, theme, onClose }) => (
  <SuccessCard $darkMode={darkMode} theme={theme}>
    <div className="success-icon">
      <Check fontSize="large" />
    </div>
    <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
      تم إنشاء حسابك بنجاح!
    </Typography>
    <Typography sx={{ mt: 1, mb: 3, textAlign: "center" }}>
      {userType.isSeller
        ? "سيتم مراجعة حسابك والتواصل معك قريباً لاستكمال بيانات المكان"
        : "يمكنك الآن استخدام حسابك للاستمتاع بخدمات فسحة"}
    </Typography>
    <StyledButton
      onClick={onClose}
      variant="contained"
      theme={theme}
      $darkMode={darkMode}
    >
      تسجيل الدخول
    </StyledButton>
  </SuccessCard>
);

// Image upload and preview component
const ImageUploader = ({ onImageChange, userImage, darkMode, theme }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const processImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        // Get the image data
        const img = new window.Image();
        img.onload = () => {
          // Create canvas for resizing if needed
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Resize large images to reduce payload size
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

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

          // Draw and export as base64
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          resolve(dataUrl);
        };

        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };

        img.src = event.target.result;
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("Image is too large. Please select an image less than 5MB.");
          return;
        }

        // Process and resize the image
        const processedImage = await processImage(file);
        onImageChange(processedImage);
      } catch (error) {
        console.error("Error processing image:", error);
        alert("Failed to process image. Please try another image.");
      }
    }
  };

  return (
    <UploadContainer $darkMode={darkMode} theme={theme}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      {userImage ? (
        <ImagePreviewContainer $darkMode={darkMode}>
          <Avatar
            src={userImage}
            alt="صورة المستخدم"
            sx={{
              width: 120,
              height: 120,
              border: `3px solid ${
                darkMode ? theme.colors.accent : theme.colors.primary
              }`,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          />
          <Typography variant="h6">اضغط لتغيير الصورة</Typography>
          <button
            onClick={handleButtonClick}
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${
                darkMode ? theme.colors.accent : theme.colors.primary
              }`,
              color: darkMode ? theme.colors.accent : theme.colors.primary,
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textShadow: darkMode ? "0px 1px 2px rgba(0,0,0,0.3)" : "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = darkMode
                ? "rgba(246, 177, 122, 0.1)"
                : "rgba(74, 114, 172, 0.05)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            تغيير الصورة
          </button>
        </ImagePreviewContainer>
      ) : (
        <div className="upload-prompt" onClick={handleButtonClick}>
          <CloudUpload fontSize="large" />
          <Typography sx={{ mt: 2, mb: 1 }}>إضافة صورة شخصية</Typography>
          <Typography variant="body2" color="textSecondary">
            اختياري: يمكنك إضافة صورة شخصية لحسابك
          </Typography>
        </div>
      )}
    </UploadContainer>
  );
};

// Progress tracker component for multi-step form
const ProgressTracker = ({ currentStep, totalSteps, darkMode, theme }) => (
  <ProgressContainer $darkMode={darkMode}>
    {Array.from({ length: totalSteps }).map((_, index) => (
      <React.Fragment key={index}>
        <ProgressStep
          $active={index <= currentStep}
          $darkMode={darkMode}
          theme={theme}
        >
          {index + 1}
        </ProgressStep>
        {index < totalSteps - 1 && (
          <StepConnector
            $active={index < currentStep}
            $darkMode={darkMode}
            theme={theme}
          />
        )}
      </React.Fragment>
    ))}
  </ProgressContainer>
);

const Register = () => {
  const { darkMode, theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  // User data states
  const [userImage, setUserImage] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState({
    isSeller: false,
    isUser: true,
  });

  // Validation states
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Success state
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  // Ensure client-side rendering for image upload
  useEffect(() => {
    setMounted(true);
  }, []);

  // Validation handlers
  const handleFirstnameChange = useCallback((e) => {
    const value = e.target.value;
    setFirstname(value);
    const regex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    setFirstnameError(!regex.test(value));
  }, []);

  const handleLastnameChange = useCallback((e) => {
    const value = e.target.value;
    setLastname(value);
    const regex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    setLastnameError(!regex.test(value));
  }, []);

  const handleCityChange = useCallback((e) => {
    const value = e.target.value;
    setCity(value);
    const regex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    setCityError(!regex.test(value));
  }, []);

  const handleEmailChange = useCallback((e) => {
    const value = e.target.value;
    setEmail(value);
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    setEmailError(!regex.test(value));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const value = e.target.value;
    setPassword(value);
    const regex = /^(?=.*[A-Z])(?=.*[@#*+-]).{8,}$/;
    setPasswordError(!regex.test(value));
  }, []);

  const handleConfirmPasswordChange = useCallback(
    (e) => {
      const value = e.target.value;
      setConfirmPassword(value);
      setConfirmPasswordError(value !== password);
    },
    [password]
  );

  const handleClickShowPassword = useCallback((field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const handleUserTypeChange = useCallback((type) => {
    setUserType((prev) => ({
      isSeller: type === "isSeller",
      isUser: type === "isUser",
    }));
  }, []);

  const handleImageChange = useCallback((dataUrl) => {
    setUserImage(dataUrl);
  }, []);

  // Step navigation handlers
  const goToNextStep = useCallback(() => {
    if (currentStep === 0) {
      // Validate basic info
      if (
        firstname &&
        !firstnameError &&
        lastname &&
        !lastnameError &&
        city &&
        !cityError
      ) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 1) {
      // Validate credentials
      if (
        email &&
        !emailError &&
        password &&
        !passwordError &&
        confirmPassword &&
        !confirmPasswordError
      ) {
        setCurrentStep(currentStep + 1);
      }
    }
  }, [
    currentStep,
    firstname,
    firstnameError,
    lastname,
    lastnameError,
    city,
    cityError,
    email,
    emailError,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
  ]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        firstname &&
        lastname &&
        city &&
        email &&
        password &&
        password === confirmPassword
      ) {
        setLoading(true);

        // Create the payload including the image if it exists
        const payload = {
          firstname,
          lastname,
          city,
          email,
          password,
          userType: userType.isSeller ? "seller" : "user",
          profileImage: userImage || "", // Include the base64 image data
        };

        try {
          const response = await axios.post(
            "https://iti-server-production.up.railway.app/api/user",
            payload
          );
          console.log("Registration successful:", response.data.user);

          // Store user data in localStorage (optional)
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...response.data.user,
              userType: userType.isSeller ? "seller" : "user",
            })
          );

          // Show success message and redirect
          setShowSuccessCard(true);
        } catch (error) {
          console.error(
            "Registration error:",
            error.response?.data || error.message
          );
          // Here you could add error handling UI feedback
          alert(
            error.response?.data || "Registration failed. Please try again."
          );
        } finally {
          setLoading(false);
        }
      }
    },
    [
      firstname,
      lastname,
      city,
      email,
      password,
      confirmPassword,
      userType,
      userImage, // Add userImage to dependencies
      router,
    ]
  );

  const handleSuccessClose = useCallback(() => {
    setShowSuccessCard(false);
    router.push("/login");
  }, [router]);

  // Step content rendering
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Fade in={true} timeout={500}>
            <FormPageContainer>
              <FormHeader
                variant="h6"
                $darkMode={darkMode}
                theme={theme}
                sx={{
                  color: darkMode ? theme.colors.text : theme.colors.primary,
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                المعلومات الأساسية
              </FormHeader>
              <StyledTextField
                fullWidth
                margin="dense"
                label="الاسم الأول"
                variant="outlined"
                value={firstname}
                onChange={handleFirstnameChange}
                error={firstnameError}
                helperText={
                  firstnameError ? "الاسم الأول يجب أن يحتوي على حروف فقط" : ""
                }
                required
                autoComplete="given-name"
                $darkMode={darkMode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline
                        sx={{
                          color: darkMode
                            ? theme.colors.primary
                            : theme.colors.primary,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                margin="dense"
                label="اسم العائلة"
                variant="outlined"
                value={lastname}
                onChange={handleLastnameChange}
                error={lastnameError}
                helperText={
                  lastnameError ? "إسم العائلة يجب أن يحتوي علي حروف فقط" : ""
                }
                required
                autoComplete="family-name"
                $darkMode={darkMode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person
                        sx={{
                          color: darkMode
                            ? theme.colors.primary
                            : theme.colors.primary,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                margin="dense"
                label="المدينة"
                variant="outlined"
                value={city}
                onChange={handleCityChange}
                error={cityError}
                helperText={
                  cityError ? "المدينة/المحافظة يجب أن تحتوي على حروف فقط" : ""
                }
                required
                autoComplete="address-level2"
                $darkMode={darkMode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityOutlined
                        sx={{
                          color: darkMode
                            ? theme.colors.primary
                            : theme.colors.primary,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <div className="form-footer">
                <StyledButton
                  variant="contained"
                  onClick={goToNextStep}
                  theme={theme}
                  $darkMode={darkMode}
                  disabled={
                    !firstname ||
                    !lastname ||
                    !city ||
                    firstnameError ||
                    lastnameError ||
                    cityError
                  }
                >
                  التالي
                </StyledButton>
              </div>
            </FormPageContainer>
          </Fade>
        );
      case 1:
        return (
          <Fade in={true} timeout={500}>
            <FormPageContainer>
              <FormHeader
                variant="h6"
                $darkMode={darkMode}
                theme={theme}
                sx={{
                  color: darkMode ? theme.colors.text : theme.colors.primary,
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                تفاصيل الحساب
              </FormHeader>
              <StyledTextField
                fullWidth
                margin="dense"
                label="البريد الإلكتروني"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={
                  emailError ? "الرجاء قم بإدخال بريد إلكتروني صحيح" : ""
                }
                required
                autoComplete="email"
                $darkMode={darkMode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined
                        sx={{
                          color: darkMode
                            ? theme.colors.primary
                            : theme.colors.primary,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                margin="dense"
                label="الرقم السري"
                type={showPassword.password ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? "يجب أن يحتوي الرقم السري على 8 أحرف على الأقل، حرف كبير واحد ورمز واحد"
                    : ""
                }
                required
                autoComplete="new-password"
                $darkMode={darkMode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined
                        sx={{
                          color: darkMode
                            ? theme.colors.primary
                            : theme.colors.primary,
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("password")}
                        edge="end"
                        sx={{
                          color: darkMode ? "#AAB2D5" : "inherit",
                        }}
                      >
                        {showPassword.password ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                margin="dense"
                label="تأكيد الرقم السري"
                type={showPassword.confirmPassword ? "text" : "password"}
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={confirmPasswordError}
                helperText={
                  confirmPasswordError
                    ? "تأكيد الرقم السري يجب أن يطابق الرقم السري"
                    : ""
                }
                required
                autoComplete="new-password"
                $darkMode={darkMode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined
                        sx={{
                          color: darkMode
                            ? theme.colors.primary
                            : theme.colors.primary,
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        }
                        edge="end"
                        sx={{
                          color: darkMode ? "#AAB2D5" : "inherit",
                        }}
                      >
                        {showPassword.confirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="form-footer">
                <StyledButton
                  variant="outlined"
                  onClick={goToPreviousStep}
                  theme={theme}
                  $darkMode={darkMode}
                  $secondary={true}
                  startIcon={<KeyboardBackspace />}
                >
                  السابق
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={goToNextStep}
                  theme={theme}
                  $darkMode={darkMode}
                  disabled={
                    !email ||
                    !password ||
                    !confirmPassword ||
                    emailError ||
                    passwordError ||
                    confirmPasswordError
                  }
                >
                  التالي
                </StyledButton>
              </div>
            </FormPageContainer>
          </Fade>
        );
      case 2:
        return (
          <Fade in={true} timeout={500}>
            <FormPageContainer>
              <FormHeader
                variant="h6"
                $darkMode={darkMode}
                theme={theme}
                sx={{
                  color: darkMode ? theme.colors.text : theme.colors.primary,
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                الخطوة الأخيرة
              </FormHeader>

              <ImageUploader
                onImageChange={handleImageChange}
                userImage={userImage}
                darkMode={darkMode}
                theme={theme}
              />

              <div className="user-type-selection">
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", mb: 2 }}
                >
                  اختر نوع الحساب
                </Typography>
                <div className="user-type-options">
                  <div
                    className={`type-option ${userType.isUser ? "active" : ""}`}
                    onClick={() => handleUserTypeChange("isUser")}
                    style={{
                      borderColor: userType.isUser
                        ? darkMode
                          ? theme.colors.accent
                          : theme.colors.primary
                        : darkMode
                        ? theme.colors.border
                        : "#eaeaea",
                      backgroundColor: userType.isUser
                        ? darkMode
                          ? "rgba(246, 177, 122, 0.1)"
                          : "rgba(74, 114, 172, 0.05)"
                        : darkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "transparent",
                      boxShadow: userType.isUser
                        ? darkMode
                          ? "0 4px 12px rgba(246, 177, 122, 0.1)"
                          : "0 4px 12px rgba(74, 114, 172, 0.08)"
                        : "none",
                    }}
                  >
                    <AccountCircle
                      fontSize="large"
                      sx={{
                        color: darkMode
                          ? theme.colors.accent
                          : theme.colors.primary,
                      }}
                    />
                    <Typography
                      sx={{
                        color: darkMode ? theme.colors.text : theme.colors.text,
                        fontWeight: userType.isUser ? 600 : 400,
                      }}
                    >
                      مستخدم
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: darkMode
                          ? theme.colors.textSecondary
                          : theme.colors.textSecondary,
                      }}
                    >
                      استمتع بتخطيط رحلاتك واكتشاف أماكن جديدة
                    </Typography>
                  </div>
                  <div
                    className={`type-option ${
                      userType.isSeller ? "active" : ""
                    }`}
                    onClick={() => handleUserTypeChange("isSeller")}
                    style={{
                      borderColor: userType.isSeller
                        ? darkMode
                          ? theme.colors.accent
                          : theme.colors.primary
                        : darkMode
                        ? theme.colors.border
                        : "#eaeaea",
                      backgroundColor: userType.isSeller
                        ? darkMode
                          ? "rgba(246, 177, 122, 0.1)"
                          : "rgba(74, 114, 172, 0.05)"
                        : darkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "transparent",
                      boxShadow: userType.isSeller
                        ? darkMode
                          ? "0 4px 12px rgba(246, 177, 122, 0.1)"
                          : "0 4px 12px rgba(74, 114, 172, 0.08)"
                        : "none",
                    }}
                  >
                    <CloudUpload
                      fontSize="large"
                      sx={{
                        color: darkMode
                          ? theme.colors.accent
                          : theme.colors.primary,
                      }}
                    />
                    <Typography
                      sx={{
                        color: darkMode ? theme.colors.text : theme.colors.text,
                        fontWeight: userType.isSeller ? 600 : 400,
                      }}
                    >
                      بائع
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: darkMode
                          ? theme.colors.textSecondary
                          : theme.colors.textSecondary,
                      }}
                    >
                      أضف مكانك واعرضه للزوار المهتمين
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="form-footer">
                <StyledButton
                  variant="outlined"
                  onClick={goToPreviousStep}
                  theme={theme}
                  $darkMode={darkMode}
                  $secondary={true}
                  startIcon={<KeyboardBackspace />}
                >
                  السابق
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={handleSubmit}
                  theme={theme}
                  $darkMode={darkMode}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "إنشاء الحساب"
                  )}
                </StyledButton>
              </div>
            </FormPageContainer>
          </Fade>
        );
      default:
        return null;
    }
  };

  // Return loading state if not mounted
  if (!mounted) {
    return (
      <Container theme={theme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            size={40}
            color={darkMode ? "secondary" : "primary"}
          />
        </div>
      </Container>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showSuccessCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <RegistrationSuccess
              userType={userType}
              darkMode={darkMode}
              theme={theme}
              onClose={handleSuccessClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Container theme={theme}>
        <LeftSection theme={theme}>
          <div className="background-image-wrapper">
            <NextImage
              src="https://images.pexels.com/photos/30668182/pexels-photo-30668182/free-photo-of-hot-air-balloons-sunrise-adventure-in-cappadocia.jpeg"
              alt="Background"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                filter: "blur(3px) brightness(0.9)",
              }}
              quality={75}
            />
          </div>

          <div className="left-content">
            <svg
              width="200"
              height="auto"
              viewBox="0 0 533 182"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo"
            >
              {/* SVG path data from your original component */}
              <path
                d="M71.4 16C70.5 17.5 67.3 19.7 61.8 22.6C61.5 18.5 60.2 14.7 57.7 11.2C56 8.80004 55.6 6.70003 56.6 5.00003C57.4 3.60003 62.6 2.10002 72.1 0.400024C71.5 1.50002 71.3 2.70004 71.3 4.20004C71.3 5.70004 71.5 7.10004 71.6 8.60004C71.7 10.1 71.9 11.4 71.9 12.8C72.1 14 71.9 15.1 71.4 16Z"
                fill="white"
              />
              <path
                d="M89.9 27C89 28.5 85.8 30.7 80.3 33.6C80 29.5 78.7 25.7 76.2 22.2C74.5 19.8 74.1 17.7 75.1 16C75.9 14.6 81.1 13.1 90.6 11.4C90 12.5 89.8 13.7 89.8 15.2C89.8 16.7 90 18.1 90.1 19.6C90.2 21.1 90.4 22.4 90.4 23.8C90.6 25.1 90.4 26.2 89.9 27Z"
                fill="white"
              />
              <path
                d="M285.4 179.6C283.3 180.9 280.7 181.5 277.6 181.5C254.7 181.5 235.3 172.6 219.3 154.7H142.1V128.6H202.9L188.9 105.6C185.4 99.8999 181.9 95.6999 178.2 93.0999C174.5 90.3999 170.9 89.0999 167.5 89.0999C162.8 89.0999 158.2 90.3999 153.5 92.8999L183.1 61.2999C190 53.8999 195.1 50.2 198.4 50.2C200.9 50.2 204.3 54.6999 208.5 63.7999L238.9 128.7H275.5V154.8H252.9C258.3 162.8 265.7 169.5 275.2 174.8C277.9 175.7 281.3 177.3 285.4 179.6Z"
                fill="white"
              />
              <path
                d="M425.5 154.8H263V128.7H285.8L284.5 125.7C282.5 121.3 279.1 117.8 274.1 115.3L295.4 92.7L312.1 128.7H330.3L321.8 110.8C319.6 106.4 316.2 102.9 311.4 100.4L332.7 77.8L356.3 128.8H374.5L358.9 95.6C356.7 91.2 353.3 87.7 348.5 85.2L369.8 62.6L400.3 128.9H425.5C424.8 129.4 419 133.3 418.4 140.7C418 146.1 420.7 151.6 425.5 154.8Z"
                fill="white"
              />
              <path
                d="M518.5 51.8999C511.7 30.8999 490.3 17.9999 469.2 22.1999C455.4 24.9999 445 32.6999 438.4 45.4999C432.6 56.7999 431.5 68.4999 436.5 80.5999C439.3 87.2999 442.7 93.6999 446.5 99.7999C454.1 112.2 462.9 123.7 472.1 134.9C473.7 136.9 475.4 138.8 477.1 140.8C477.3 140.5 477.5 140.3 477.6 140.2C485.7 130.8 493.4 121 500.5 110.7C506.6 101.9 512.4 92.7999 516.7 82.7999C518.6 78.2999 520.2 73.7999 520.7 68.8999C521.2 63.0999 520.3 57.3999 518.5 51.8999ZM477.1 85.1999C465.1 85.1999 455.1 74.9999 455.1 62.5999C455.1 50.1999 465 39.9999 477.1 40.0999C489.2 40.0999 498.9 50.1999 499 62.5999C499 75.0999 489.2 85.1999 477.1 85.1999Z"
                fill="white"
              />
              <path
                d="M529.9 149C526.8 153.2 522.6 156 518.1 158.3C510.8 162 503.1 164.2 495.1 165.5C488.1 166.7 481 167.2 473.9 167C461.5 166.5 449.4 164.5 437.9 159.2C433 157 428.4 154.2 424.9 150C423 147.8 421.8 145.2 421.6 142.2C421.4 138 423.2 134.7 426.4 132.3C429.8 129.7 433.7 128.3 437.7 127.2C443.9 125.6 450.2 124.8 456.6 124.3C457 124.3 457.3 124.3 457.7 124.2C458.9 123.9 459.6 124.4 460 125.5C456.8 126.1 453.6 126.5 450.4 127.2C444.3 128.5 438.3 130.1 432.9 133.5C431.2 134.6 429.7 136 428.4 137.5C426.7 139.5 426.9 141.8 428.4 144C429.8 146 431.8 147.3 433.8 148.5C438.8 151.3 444.3 152.8 449.8 153.9C461.6 156.4 473.6 156.9 485.6 156.3C495 155.8 504.3 154.5 513.3 151.5C516.5 150.4 519.7 149.1 522.5 147.1C523.5 146.4 524.4 145.6 525.2 144.7C527.4 142.2 527.4 139.5 525.3 136.9C523.7 134.9 521.6 133.6 519.4 132.4C514.1 129.6 508.4 128 502.5 126.9C499.7 126.4 496.9 125.9 494 125.4C494.5 124.2 495.3 123.9 496.5 124.1C501.8 124.9 507.2 125.4 512.5 126.3C516.1 126.9 519.7 127.9 523 129.5C524.5 130.2 526 131 527.3 132C533.2 136.3 534.2 143.2 529.9 149Z"
                fill="white"
              />
              <path
                d="M151.3 128.7H129.2C128.8 128.7 128.3 128.5 128.1 128L106.3 82.7999C98.7 66.9999 94.9 56.8 94.9 52C94.9 47.1 95.6 42 97 36.7999C97.1 36.5999 100 30.7999 100 30.7999C100 30.7999 109.7 14.8 110.1 14.1C110.4 13.6 111 13 111.6 12.9C116.4 11.4 117.8 6.59995 114.4 2.79995C112.4 0.49995 108.6 -0.100038 106.1 1.49996C103.7 2.99996 102.9 5.79996 104 8.99996C104.2 9.59996 104.1 10.5 103.8 11C96.1 23.8 88.4 36.6 80.7 49.4C80.5 49.7 32 127.5 32.2 127.7C32.8 128.2 39.1 132.9 39.2 141.2C39.2 149.6 33 154.3 32.3 154.7H151.2C151.8 154.7 152.4 154.2 152.4 153.5V129.8C152.1 129.5 151.7 129.1 151.3 128.7ZM93.7 128.8C93.2 128.8 92.6 128.8 92.1 128.8H84C82.7 128.8 81.4 128.8 79.9 128.7C79.5 128.7 79.1 128.4 78.9 128.1L71.6 113.1C69.7 109.2 68.7 105.7 68.7 102.7C68.7 101.8 69.2 100.5 70.3 99C71.3 97.4 72.5 95.8999 73.7 94.2999C74.9 92.7 76.1 91.4 77.2 90.2C77.4 90 77.7 89.7999 78 89.7999C78.5 89.7999 79.1 90.2 79.2 90.7999C79.8 94.3999 81.5 99.2 84.3 105.1L94.8 127.2C95.1 127.9 94.6 128.8 93.7 128.8Z"
                fill="white"
              />
              <path
                d="M83.4 37.7C64.8 67.5 46.3 97.2 27.7 127C23.2 123.9 4.40001 113.7 2.00001 108.3C0.100014 103.9 0.200015 99.8 2.70001 95.7C10.2 83.6 17.8 71.5 25.3 59.4C31.5 49.5 37.7 39.6 43.8 29.7C46.8 24.8 51 22.7 56.5 23.2C58.1 23.3 59.8 23.7 61.2 24.5C64.2 25.9 80.5 35.9 83.4 37.7Z"
                fill="white"
              />
              <path
                d="M35.3 141.6C35.3 146.8 31 151 25.8 151C20.4 151 16.1 146.7 16 141.3C16 136 20.3 131.6 25.6 131.6C31.1 131.6 35.3 136 35.3 141.6Z"
                fill="white"
              />
              <path
                d="M491.9 63.1999C491.9 71.1999 485.3 77.5999 477.3 77.5999C469 77.5999 462.4 70.9999 462.3 62.6999C462.2 54.5999 469 47.6999 477 47.7999C485.4 47.7999 491.9 54.4999 491.9 63.1999Z"
                fill="white"
              />
              {/* Rest of SVG paths omitted for brevity */}
            </svg>

            <div className="promo-content">
              <Typography
                className="promo-title"
                sx={{
                  color: darkMode ? theme.colors.primary : theme.colors.primary,
                  textShadow: darkMode
                    ? "2px 2px 4px rgba(0, 0, 0, 0.6)"
                    : "1px 1px 3px rgba(0, 0, 0, 0.5)",
                }}
              >
                انضم إلى مجتمع فسحة
              </Typography>
              <Typography variant="body1" className="promo-text">
                اكتشف أماكن جديدة، خطط لرحلاتك، وشارك تجاربك مع الآخرين
              </Typography>

              <div className="benefits">
                <div className="benefit-item">
                  <Check
                    className="benefit-icon"
                    sx={{
                      backgroundColor: darkMode
                        ? theme.colors.accent
                        : theme.colors.primary,
                    }}
                  />
                  <Typography>إنشاء وتخطيط رحلات مخصصة</Typography>
                </div>
                <div className="benefit-item">
                  <Check
                    className="benefit-icon"
                    sx={{
                      backgroundColor: darkMode
                        ? theme.colors.accent
                        : theme.colors.primary,
                    }}
                  />
                  <Typography>
                    اكتشاف أماكن جديدة بناءً على اهتماماتك
                  </Typography>
                </div>
                <div className="benefit-item">
                  <Check
                    className="benefit-icon"
                    sx={{
                      backgroundColor: darkMode
                        ? theme.colors.accent
                        : theme.colors.primary,
                    }}
                  />
                  <Typography>مشاركة تجاربك مع مجتمع المسافرين</Typography>
                </div>
              </div>
            </div>
          </div>
        </LeftSection>

        <RightSection theme={theme}>
          <FormContainer theme={theme}>
            <h2 style={{ marginTop: "40px" }}>إنشاء حساب جديد</h2>

            <ProgressTracker
              currentStep={currentStep}
              totalSteps={totalSteps}
              darkMode={darkMode}
              theme={theme}
            />

            <form onSubmit={(e) => e.preventDefault()}>
              {renderStepContent()}
            </form>

            <Typography
              sx={{
                textAlign: "center",
                marginTop: 2,
                color: darkMode ? theme.colors.text : "inherit",
              }}
            >
              هل لديك حساب بالفعل؟{" "}
              <StyledLink href="/login" theme={theme} $darkMode={darkMode}>
                تسجيل الدخول
              </StyledLink>
            </Typography>
          </FormContainer>
        </RightSection>
      </Container>
    </>
  );
};

export default React.memo(Register);
