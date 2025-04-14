"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { StyledTextField } from "../styledComponent/Register/StyledRegister";
import { useTheme } from "../context/ThemeContext";
import axios from "axios"; // Make sure to import axios

// Icons
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import StoreIcon from "@mui/icons-material/Store";

// Components
import Trips from "./Trips";
import Notifications from "./Notifications";
import MyPlaces from "./MyPlaces";

const Profile = () => {
  const { darkMode, theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [isFirstnameEditable, setIsFirstnameEditable] = useState(false);
  const [isLastnameEditable, setIsLastnameEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userRole, setUserRole] = useState("user"); // Default to regular user

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle file input change
  const processImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        // Get the image data
        const img = new window.Image();
        img.onload = () => {
          // Create canvas to resize and convert image
          const canvas = document.createElement("canvas");

          // Max dimensions
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;

          let width = img.width;
          let height = img.height;

          // Resize the image if it's larger than max dimensions
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

          // Convert to data URL (base64)
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
        setUploadingImage(true);
        const file = e.target.files[0];

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("الصورة كبيرة جدًا. يرجى اختيار صورة أقل من 5 ميجابايت.");
          setUploadingImage(false);
          return;
        }

        // Process and resize the image
        const processedImage = await processImage(file);

        // Update user state with new image
        setUser((prev) => ({
          ...prev,
          profileImage: processedImage,
        }));

        setUploadingImage(false);
      } catch (error) {
        console.error("Error processing image:", error);
        alert("فشل معالجة الصورة. يرجى المحاولة مرة أخرى.");
        setUploadingImage(false);
      }
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFirstnameChange = useCallback((e) => {
    const value = e.target.value;
    setFirstname(value);
    const regex = /^[a-zA-Z\u0600-\u06FF\s]+$/; // Regular expression for Arabic and English letters
    setFirstnameError(!regex.test(value));
  }, []);

  const handleLastnameChange = useCallback((e) => {
    const value = e.target.value;
    setLastname(value);
    const regex = /^[a-zA-Z\u0600-\u06FF\s]+$/; // Regular expression for Arabic and English letters
    setLastnameError(!regex.test(value));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const value = e.target.value;
    setPassword(value);
    const regex = /^(?=.*[A-Z])(?=.*[@#*+-]).{8,}$/; // Regular expression for password validation
    setPasswordError(!regex.test(value));
  }, []);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleEditFirstnameClick = useCallback(() => {
    setIsFirstnameEditable((prev) => !prev);
    if (!isFirstnameEditable) {
      // Focus the input when enabling edit
      setTimeout(() => {
        const input = document.getElementById("firstname-input");
        if (input) input.focus();
      }, 0);
    }
  }, [isFirstnameEditable]);

  const handleEditLastnameClick = useCallback(() => {
    setIsLastnameEditable((prev) => !prev);
    if (!isLastnameEditable) {
      // Focus the input when enabling edit
      setTimeout(() => {
        const input = document.getElementById("lastname-input");
        if (input) input.focus();
      }, 0);
    }
  }, [isLastnameEditable]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    router.push("/");
    setUser(null);
    window.dispatchEvent(new Event("userLogout"));
  }, [router]);

  // Fetch user data from backend
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `https://iti-server-production.up.railway.app/api/user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validation check
      if (firstnameError || lastnameError || passwordError) {
        return;
      }

      setIsLoading(true);
      console.log(user);

      try {
        // Get user ID from stored user
        if (user && user._id) {
          // Prepare payload with all updated fields
          const payload = {
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            city: user.city,
            email: user.email,
            password: password || user.password,
            userType: user.userType,
            profileImage: user.profileImage || "",
          };

          // Send update request to backend
          const response = await axios.put(
            `https://iti-server-production.up.railway.app/api/user/${user._id}`,
            payload
          );

          // Update user data in localStorage
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);

          // Show success message
          setUpdateSuccess(true);
          setPassword("");

          // Reset editable states
          setIsFirstnameEditable(false);
          setIsLastnameEditable(false);

          // Hide success message after 3 seconds
          setTimeout(() => {
            setUpdateSuccess(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("حدث خطأ أثناء تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.");
      } finally {
        setIsLoading(false);
      }
    },
    [
      firstname,
      lastname,
      password,
      firstnameError,
      lastnameError,
      passwordError,
      user,
    ]
  );

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = localStorage.getItem("user");
      const showTrips = searchParams.get("showTrips");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFirstname(parsedUser.firstname || "");
        setLastname(parsedUser.lastname || "");

        // Fetch latest user data from backend if we have an ID
        if (parsedUser._id) {
          const freshUserData = await fetchUserData(parsedUser._id);
          if (freshUserData) {
            setUser(freshUserData);
            setFirstname(freshUserData.firstname || "");
            setLastname(freshUserData.lastname || "");

            // Update localStorage with fresh data
            localStorage.setItem("user", JSON.stringify(freshUserData));
          }
        }
      }
      if (showTrips === "true") {
        setActiveTab(1);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log(parsedUser.userType);
        if (parsedUser.userType == "seller") {
          setUserRole("seller");
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.userType === "seller") {
          setUserRole("seller");
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // Define animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  // Get user initials for avatar placeholder
  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstname?.charAt(0) || ""}${
      user.lastname?.charAt(0) || ""
    }`;
  };

  return (
    <PageContainer $theme={{ darkMode, colors: theme.colors }}>
      {/* Add the file input element at the top level of your component */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      {/* Background with parallax effect */}
      <BackgroundParallax
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        $theme={{ darkMode, colors: theme.colors }}
      />

      <ProfileContentWrapper>
        {/* Custom Material UI Tabs */}
        <CustomTabs
          value={activeTab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          centered
          $theme={{ darkMode, colors: theme.colors }}
        >
          <CustomTab
            label={
              <TabContent>
                <PersonIcon /> الملف الشخصي
              </TabContent>
            }
            $isActive={activeTab === 0}
            $theme={{ darkMode, colors: theme.colors }}
          />
          <CustomTab
            label={
              <TabContent>
                {userRole === "seller" ? <StoreIcon /> : <FlightTakeoffIcon />}
                {userRole === "seller" ? "الأماكن المسجلة" : "رحلاتي"}
              </TabContent>
            }
            $isActive={activeTab === 1}
            $theme={{ darkMode, colors: theme.colors }}
          />
          <CustomTab
            label={
              <TabContent>
                <NotificationsIcon /> الإشعارات
              </TabContent>
            }
            $isActive={activeTab === 2}
            $theme={{ darkMode, colors: theme.colors }}
          />
        </CustomTabs>

        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="profile"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <ProfilePanel $theme={{ darkMode, colors: theme.colors }}>
                <ProfileHeader>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AvatarContainer onClick={handleAvatarClick}>
                      {uploadingImage ? (
                        <ProfileAvatarInitials
                          $theme={{ darkMode, colors: theme.colors }}
                        >
                          <CircularProgress size={40} color="inherit" />
                        </ProfileAvatarInitials>
                      ) : user?.profileImage ? (
                        <ProfileAvatar>
                          <img
                            src={user.profileImage}
                            alt={`${user.firstname} ${user.lastname}`}
                          />
                          <AvatarEditOverlay>
                            <CameraAltIcon />
                          </AvatarEditOverlay>
                        </ProfileAvatar>
                      ) : (
                        <ProfileAvatarInitials
                          $theme={{ darkMode, colors: theme.colors }}
                        >
                          <span>{getUserInitials()}</span>
                          <AvatarEditOverlay>
                            <CameraAltIcon />
                          </AvatarEditOverlay>
                        </ProfileAvatarInitials>
                      )}
                    </AvatarContainer>
                  </motion.div>

                  <ProfileDetails>
                    <ProfileName $theme={{ darkMode, colors: theme.colors }}>
                      {user.firstname} {user.lastname}
                    </ProfileName>
                    <ProfileEmail $theme={{ darkMode, colors: theme.colors }}>
                      {user.email}
                    </ProfileEmail>
                    <UserTypeBadge
                      $userType={userRole}
                      $theme={{ darkMode, colors: theme.colors }}
                    >
                      {userRole === "seller" ? (
                        <>
                          <StoreIcon /> بائع
                        </>
                      ) : (
                        <>
                          <PersonIcon /> مستخدم عادي
                        </>
                      )}
                    </UserTypeBadge>
                  </ProfileDetails>
                </ProfileHeader>

                <form onSubmit={handleSubmit}>
                  <motion.div variants={itemVariants}>
                    <SectionCard $theme={{ darkMode, colors: theme.colors }}>
                      <SectionTitle $theme={{ darkMode, colors: theme.colors }}>
                        <BadgeIcon /> المعلومات الشخصية
                      </SectionTitle>

                      <FormRow>
                        <FormField>
                          <ProfileTextField
                            id="firstname-input"
                            fullWidth
                            label="الاسم الأول"
                            variant="outlined"
                            value={firstname}
                            onChange={handleFirstnameChange}
                            $theme={{ darkMode, colors: theme.colors }}
                            error={firstnameError}
                            helperText={
                              firstnameError
                                ? "الاسم الأول يجب أن يحتوي على حروف فقط"
                                : ""
                            }
                            required
                            autoComplete="given-name"
                            InputProps={{
                              readOnly: !isFirstnameEditable,

                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleEditFirstnameClick}
                                    edge="end"
                                    color={
                                      isFirstnameEditable
                                        ? "primary"
                                        : "default"
                                    }
                                  >
                                    <EditIcon
                                      sx={{ color: theme.colors.primary }}
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormField>

                        <FormField>
                          <ProfileTextField
                            id="lastname-input"
                            fullWidth
                            label="اسم العائلة"
                            variant="outlined"
                            value={lastname}
                            onChange={handleLastnameChange}
                            $theme={{ darkMode, colors: theme.colors }}
                            error={lastnameError}
                            helperText={
                              lastnameError
                                ? "إسم العائلة يجب أن يحتوي علي حروف فقط"
                                : ""
                            }
                            required
                            autoComplete="family-name"
                            InputProps={{
                              readOnly: !isLastnameEditable,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleEditLastnameClick}
                                    edge="end"
                                    color={
                                      isLastnameEditable ? "primary" : "default"
                                    }
                                  >
                                    <EditIcon
                                      sx={{ color: theme.colors.primary }}
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormField>
                      </FormRow>

                      <FormRow>
                        <FormField>
                          <ProfileTextField
                            fullWidth
                            label="البريد الإلكتروني"
                            variant="outlined"
                            value={user.email || ""}
                            $theme={{ darkMode, colors: theme.colors }}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon
                                    sx={{ color: theme.colors.primary }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormField>
                      </FormRow>
                    </SectionCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <SectionCard $theme={{ darkMode, colors: theme.colors }}>
                      <SectionTitle $theme={{ darkMode, colors: theme.colors }}>
                        <LockIcon /> الأمان
                      </SectionTitle>

                      <FormRow>
                        <FormField>
                          <ProfileTextField
                            fullWidth
                            label="كلمة المرور"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                            $theme={{ darkMode, colors: theme.colors }}
                            error={passwordError}
                            helperText={
                              passwordError
                                ? "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، حرف كبير واحد ورمز واحد"
                                : ""
                            }
                            autoComplete="new-password"
                            InputLabelProps={{
                              style: { marginRight: "10px" },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOutlinedIcon
                                        sx={{ color: theme.colors.primary }}
                                      />
                                    ) : (
                                      <VisibilityOffOutlinedIcon
                                        sx={{ color: theme.colors.primary }}
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormField>
                      </FormRow>
                    </SectionCard>
                  </motion.div>

                  <ButtonContainer>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      variants={itemVariants}
                    >
                      <SubmitButton
                        type="submit"
                        disabled={
                          isLoading ||
                          firstnameError ||
                          lastnameError ||
                          passwordError
                        }
                        $theme={{ darkMode, colors: theme.colors }}
                      >
                        {isLoading ? (
                          <>
                            <CircularProgress size={20} color="inherit" />
                            <span>جاري الحفظ...</span>
                          </>
                        ) : (
                          <>حفظ التغييرات</>
                        )}
                      </SubmitButton>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      variants={itemVariants}
                    >
                      <LogoutButton
                        type="button"
                        onClick={() => setShowLogoutConfirm(true)}
                        $theme={{ darkMode, colors: theme.colors }}
                      >
                        <LogoutIcon />
                        تسجيل الخروج
                      </LogoutButton>
                    </motion.div>
                  </ButtonContainer>
                </form>
              </ProfilePanel>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key={userRole === "seller" ? "places" : "trips"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              {userRole === "seller" ? <MyPlaces /> : <Trips />}
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="notifications"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <Notifications />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {updateSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessToast $theme={{ darkMode, colors: theme.colors }}>
                <CheckCircleOutlineIcon />
                تم تحديث البيانات بنجاح
              </SuccessToast>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Confirmation Dialog */}
        <AnimatePresence>
          {showLogoutConfirm && (
            <DialogOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              $theme={{ darkMode, colors: theme.colors }}
            >
              <DialogContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                $theme={{ darkMode, colors: theme.colors }}
              >
                <DialogTitle $theme={{ darkMode, colors: theme.colors }}>
                  تأكيد تسجيل الخروج
                </DialogTitle>
                <DialogText $theme={{ darkMode, colors: theme.colors }}>
                  هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
                </DialogText>
                <DialogActions>
                  <CancelButton
                    onClick={() => setShowLogoutConfirm(false)}
                    $theme={{ darkMode, colors: theme.colors }}
                  >
                    إلغاء
                  </CancelButton>
                  <ConfirmButton
                    onClick={() => {
                      handleLogout();
                      setShowLogoutConfirm(false);
                    }}
                    $theme={{ darkMode, colors: theme.colors }}
                  >
                    تسجيل الخروج
                  </ConfirmButton>
                </DialogActions>
              </DialogContent>
            </DialogOverlay>
          )}
        </AnimatePresence>
      </ProfileContentWrapper>
    </PageContainer>
  );
};

// Styled Components

export const ProfileTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  & .MuiInputBase-input {
    text-align: right;
    font-size: 0.95rem;
    color: ${(props) => (props.$theme?.darkMode ? "#FFFFFF" : "#000000")};
    padding: 14px 16px;

    /* Target autofill state */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-internal-autofill-selected {
      -webkit-text-fill-color: ${(props) =>
        props.$theme?.darkMode ? "#FFFFFF" : "#000000"};
      -webkit-box-shadow: 0 0 0px 1000px
        ${(props) =>
          props.$theme?.darkMode
            ? "rgba(66, 71, 105, 0)"
            : "rgba(247, 249, 252, 0)"}
        inset;
      transition: background-color 5000s ease-in-out 0s;
      border-color: ${(props) =>
        props.$theme?.darkMode
          ? props.$theme?.colors?.primary
          : props.$theme?.colors?.primary};
    }
  }

  & .MuiOutlinedInput-root {
    border-radius: 10px;
    transition: all 0.3s ease;
    background-color: ${(props) =>
      props.$theme?.darkMode ? "rgba(255, 255, 255, 0.05)" : "#f7f9fc"};

    /* Configure layout direction for proper RTL display */
    flex-direction: row-reverse;
    padding-right: 16px;

    &:hover {
      background-color: ${(props) =>
        props.$theme?.darkMode ? "rgba(255, 255, 255, 0.08)" : "#f0f4f8"};
    }

    &.Mui-focused {
      background-color: ${(props) =>
        props.$theme?.darkMode ? "rgba(255, 255, 255, 0.1)" : "#e8f0fe"};
    }

    &:hover fieldset {
      border-color: ${(props) => props.$theme?.colors?.primary};
    }

    &.Mui-focused fieldset {
      border-color: ${(props) => props.$theme?.colors?.primary};
    }

    /* Ensure fieldset border spacing works with RTL */
    & .MuiOutlinedInput-notchedOutline {
      text-align: right;
    }
  }

  & .MuiInputLabel-root {
    color: ${(props) => (props.$theme?.darkMode ? "#AAB2D5" : "#555")};
    font-size: 0.95rem;

    /* Position label for RTL with proper transform origin */
    transform-origin: right top;
    right: 16px;
    left: auto;

    &.Mui-focused {
      color: ${(props) => props.$theme?.colors?.primary};
    }
  }

  & .MuiInputLabel-shrink {
    /* Adjust shrunk label position for RTL */
    transform: translate(0, -6px) scale(0.75);
    transform-origin: right top;
  }

  & .MuiFormHelperText-root {
    margin-top: 4px;
    text-align: right;
    color: ${(props) => (props.$theme?.darkMode ? "#f6b17a" : "#d32f2f")};
    position: relative;
    min-height: 1.25em;
  }

  /* Adjustments for input adornment to appear on right side */
  & .MuiInputAdornment-root {
    margin-left: 8px;
    margin-right: 0;
  }

  /* Override any positioning that might interfere with RTL */
  & .MuiInputAdornment-positionStart,
  & .MuiInputAdornment-positionEnd {
    margin-left: 8px;
    margin-right: 0;
  }

  /* Ensure proper spacing between icon and input text */
  & .MuiOutlinedInput-input {
    padding-right: 0;
    padding-left: 14px;
  }

  /* Adjust icon button position and styling */
  & .MuiIconButton-root {
    color: ${(props) => props.$theme?.colors?.primary};

    &:hover {
      background-color: ${(props) =>
        props.$theme?.darkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.04)"};
    }
  }

  /* Hide the asterisk for required fields to match styling */
  & .MuiFormLabel-asterisk {
    display: none;
  }
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
  padding: 100px 20px 40px;
  background-color: ${({ $theme }) => $theme.colors.background};
  color: ${({ $theme }) => $theme.colors.text};
  transition: background-color 0.3s, color 0.3s;

  @media (max-width: 768px) {
    padding: 80px 15px 30px;
  }
`;

const BackgroundParallax = styled(motion.div)`
  width: 100%;
  height: 280px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
    url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")
      no-repeat center center/cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;

  @media (max-width: 768px) {
    height: 220px;
  }
`;

const ProfileContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const CustomTabs = styled(Tabs)`
  background: ${({ $theme }) =>
    $theme.darkMode ? "rgba(45, 50, 80, 0.85)" : "rgba(255, 255, 255, 0.9)"};
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px
    rgba(0, 0, 0, ${({ $theme }) => ($theme.darkMode ? "0.3" : "0.1")});

  .MuiTabs-indicator {
    display: none;
  }

  @media (max-width: 768px) {
    border-radius: 40px;
    margin-bottom: 20px;
  }
`;

const CustomTab = styled(Tab)`
  border-radius: 50px !important;
  min-height: 48px !important;
  padding: 6px 24px !important;
  font-family: "Amiri", serif !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  color: ${(props) =>
    props.$isActive ? "#fff" : props.$theme.colors.text} !important;
  background: ${(props) =>
    props.$isActive
      ? `linear-gradient(135deg, ${props.$theme.colors.primary}, ${props.$theme.colors.accent})`
      : "transparent"} !important;
  transition: all 0.3s ease !important;
  margin: 0 5px !important;
  box-shadow: ${(props) =>
    props.$isActive
      ? `0 4px 15px rgba(${
          props.$theme.darkMode ? "246, 177, 122" : "74, 114, 172"
        }, 0.3)`
      : "none"} !important;
  opacity: 1 !important;

  &:hover {
    background: ${(props) =>
      props.$isActive
        ? `linear-gradient(135deg, ${props.$theme.colors.primary}, ${props.$theme.colors.accent})`
        : props.$theme.darkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.05)"} !important;
  }

  @media (max-width: 768px) {
    padding: 5px 16px !important;
    font-size: 14px !important;
    min-height: 42px !important;
  }

  @media (max-width: 480px) {
    padding: 4px 12px !important;
    font-size: 13px !important;
    min-height: 38px !important;
  }
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const ProfilePanel = styled.div`
  background: ${({ $theme }) => $theme.colors.card};
  border-radius: 24px;
  box-shadow: 0 10px 40px
    rgba(0, 0, 0, ${({ $theme }) => ($theme.darkMode ? "0.3" : "0.1")});
  padding: 32px;
  width: 100%;
  overflow: hidden;
  transition: background-color 0.3s, box-shadow 0.3s;

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const AvatarContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ProfileAvatarInitials = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ $theme }) => $theme.colors.primary},
    ${({ $theme }) => $theme.colors.accent}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;

  span {
    font-size: 42px;
    font-weight: 600;
    color: white;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;

    span {
      font-size: 36px;
    }
  }
`;

const AvatarEditOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
  color: white;

  svg {
    font-size: 28px;
  }

  ${AvatarContainer}:hover & {
    opacity: 1;
  }
`;

const ProfileDetails = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ $theme }) => $theme.colors.text};
  margin-bottom: 5px;
  transition: color 0.3s;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const ProfileEmail = styled.p`
  color: ${({ $theme }) => $theme.colors.textSecondary};
  font-size: 20px;
  transition: color 0.3s;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// New component for user type badge
const UserTypeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${({ $userType, $theme }) =>
    $userType === "seller"
      ? `linear-gradient(135deg, ${$theme.colors.accent}, ${$theme.colors.primary})`
      : $theme.darkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.05)"};
  color: ${({ $userType, $theme }) =>
    $userType === "seller" ? "#ffffff" : $theme.colors.textSecondary};
  border-radius: 20px;
  padding: 6px 18px;
  direction: rtl;
  font-size: 18px;
  font-weight: 600;
  margin-top: 8px;
  box-shadow: ${({ $userType }) =>
    $userType === "seller" ? "0 4px 12px rgba(246, 177, 122, 0.3)" : "none"};

  svg {
    margin-left: 6px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 10px;

    svg {
      font-size: 14px;
    }
  }
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${({ $theme }) =>
    $theme.darkMode ? $theme.colors.surface : "#f8fafd"};
  border-radius: 16px;
  padding: 15px 30px;
  transition: background-color 0.3s;

  @media (max-width: 768px) {
    padding: 12px 20px;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    gap: 5px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $theme }) => $theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ $theme }) => $theme.colors.textSecondary};
  margin-top: 3px;
  transition: color 0.3s;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 2px;
  }
`;

const StatDivider = styled.div`
  height: 30px;
  width: 1px;
  background-color: ${({ $theme }) => $theme.colors.border};

  @media (max-width: 480px) {
    height: 25px;
  }
`;

const SectionCard = styled.div`
  background: ${({ $theme }) => $theme.colors.card};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 10px
    rgba(0, 0, 0, ${({ $theme }) => ($theme.darkMode ? "0.2" : "0.05")});
  margin-bottom: 24px;
  border: 1px solid ${({ $theme }) => $theme.colors.border};
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 14px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h3`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: ${({ $theme }) => $theme.colors.primary};
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${({ $theme }) => $theme.colors.border};
  width: 100%;
  position: relative;
  gap: 12px;
  transition: color 0.3s, border-color 0.3s;

  svg {
    color: ${({ $theme }) => $theme.colors.accent};
    font-size: 24px;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -2px;
    right: 0;
    width: 60px;
    height: 2px;
    background: ${({ $theme }) => $theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding-bottom: 10px;
    margin-bottom: 16px;

    svg {
      font-size: 22px;
    }
  }

  @media (max-width: 480px) {
    font-size: 16px;
    gap: 8px;

    svg {
      font-size: 20px;
    }
  }
`;

const ProfileSectionCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  .form-row {
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 18px;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 12px;
  }
`;

const FormField = styled.div`
  flex: 1;
  margin-bottom: 8px;
  position: relative;

  .MuiFormHelperText-root {
    margin-right: 14px;
    font-size: 12px;
    opacity: 0.9;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const EditAvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  svg {
    color: white;
    font-size: 28px;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
  }

  ${ProfileAvatar}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    svg {
      font-size: 20px;
    }
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${({ $theme }) =>
    `linear-gradient(135deg, ${$theme.colors.primary}, ${$theme.colors.accent})`};
  color: ${({ $theme }) => ($theme.darkMode ? "#000" : "#fff")};
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-family: "Amiri", serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px
    ${({ $theme }) =>
      `rgba(${$theme.darkMode ? "246, 177, 122" : "74, 114, 172"}, 0.3)`};
  width: 100%;

  &:hover:not(:disabled) {
    box-shadow: 0 6px 20px
      ${({ $theme }) =>
        `rgba(${$theme.darkMode ? "246, 177, 122" : "74, 114, 172"}, 0.4)`};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 10px
      ${({ $theme }) =>
        `rgba(${$theme.darkMode ? "246, 177, 122" : "74, 114, 172"}, 0.3)`};
  }

  &:disabled {
    background: ${({ $theme }) => ($theme.darkMode ? "#3D4266" : "#e0e0e0")};
    color: ${({ $theme }) => ($theme.darkMode ? "#7077A1" : "#a0a0a0")};
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ $theme }) => ($theme.darkMode ? "#3D4266" : "#f8f8f8")};
  color: #d32f2f;
  border: 1px solid ${({ $theme }) => $theme.colors.border};
  border-radius: 12px;
  padding: 14px 28px;
  font-family: "Amiri", serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 20px;
  }

  &:hover {
    background: ${({ $theme }) => ($theme.darkMode ? "#4a3939" : "#fff1f1")};
    border-color: ${({ $theme }) => ($theme.darkMode ? "#5a2828" : "#ffcdd2")};
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 15px;

    svg {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;

    svg {
      font-size: 16px;
    }
  }
`;

const SuccessToast = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${({ $theme }) => ($theme?.darkMode ? "#2d4a30" : "#e8f5e9")};
  color: ${({ $theme }) => ($theme?.darkMode ? "#81c784" : "#2e7d32")};
  padding: 16px;
  border-radius: 12px;
  border-right: 4px solid
    ${({ $theme }) => ($theme?.darkMode ? "#4caf50" : "#4caf50")};
  box-shadow: 0 5px 15px
    rgba(0, 0, 0, ${({ $theme }) => ($theme?.darkMode ? "0.3" : "0.08")});
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
  z-index: 1000;
  font-weight: 500;
  direction: rtl;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

  svg {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    min-width: 280px;
    padding: 14px;

    svg {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    min-width: 240px;
    padding: 12px;
    bottom: 20px;
    font-size: 14px;

    svg {
      font-size: 18px;
    }
  }
`;

// Dialog components
const DialogOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ $theme }) =>
    $theme?.darkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(${({ $theme }) => ($theme?.darkMode ? "5px" : "3px")});
  padding: 20px;
  transition: background-color 0.3s;
`;

const DialogContent = styled(motion.div)`
  background: ${({ $theme }) => $theme.colors.card};
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 10px 40px
    rgba(0, 0, 0, ${({ $theme }) => ($theme.darkMode ? "0.3" : "0.1")});
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s;

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 14px;
  }
`;

const DialogTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ $theme }) => $theme.colors.primary};
  margin-bottom: 12px;
  text-align: center;
  transition: color 0.3s;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const DialogText = styled.p`
  font-size: 15px;
  color: ${({ $theme }) => $theme.colors.textSecondary};
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.5;
  transition: color 0.3s;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const CancelButton = styled.button`
  background: ${({ $theme }) => ($theme?.darkMode ? "#3D4266" : "#f5f5f5")};
  color: ${({ $theme }) =>
    $theme?.darkMode ? $theme.colors.text : "var(--text-primary)"};
  border: ${({ $theme }) => ($theme?.darkMode ? "1px solid #7077A1" : "none")};
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${({ $theme }) => ($theme?.darkMode ? "#494f77" : "#eaeaea")};
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const ConfirmButton = styled.button`
  background: ${({ $theme }) =>
    $theme?.darkMode
      ? "linear-gradient(135deg, #d32f2f, #b71c1c)"
      : "linear-gradient(135deg, #f44336, #e53935)"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 3px 10px
    ${({ $theme }) =>
      $theme?.darkMode ? "rgba(244, 67, 54, 0.3)" : "rgba(244, 67, 54, 0.2)"};

  &:hover {
    box-shadow: 0 5px 15px
      ${({ $theme }) =>
        $theme?.darkMode ? "rgba(244, 67, 54, 0.4)" : "rgba(244, 67, 54, 0.3)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export default Profile;
