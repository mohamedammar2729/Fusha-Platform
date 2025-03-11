"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  PageContainer,
  BackgroundImage,
  ProfileContainer,
  ProfileIcons,
  IconWrapper,
  ProfileHeader,
  ProfileAvatar,
  ProfileButton,
} from "../styledComponent/Profile/styledProfile";
import { FaHeart, FaUserEdit } from "react-icons/fa"; // استيراد الأيقونات
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import { StyledTextField } from "../styledComponent/Register/StyledRegister";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Trips from "./Trips";
import { useSearchParams, useRouter } from "next/navigation";
import Notifications from "./Notifications";

const Profile = () => {
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

  const [Notification, setNotification] = useState(false);
  const [trips, setTrips] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

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
    setFirstname("");
  }, []);

  const handleEditLastnameClick = useCallback(() => {
    setIsLastnameEditable((prev) => !prev);
    setLastname("");
  }, []);

const handleLogout = useCallback(() => {
  localStorage.clear();
  router.push("/");
  setUser(null);
  window.dispatchEvent(new Event("userLogout"));
}, [router]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const showTrips = searchParams.get("showTrips");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFirstname(parsedUser.firstname);
      setLastname(parsedUser.lastname);
    }
   if (showTrips === "true") {
     setTrips(true);
   } else {
     setTrips(false);
   }
  }, [searchParams]);

  return (
    <>

        <PageContainer>
          <BackgroundImage />

          <ProfileIcons trips={trips ? "true" : undefined}>
            <IconWrapper>
              <FaUserEdit className="icon" style={{ color: "orange" }} />
              <span onClick={() => {setTrips(false) ; setNotification(false)
              }}>تعديل البروفايل</span>
            </IconWrapper>
            <IconWrapper style={{ color: "red" }}>
              <FaHeart className="icon" />
              <span onClick={() => {setTrips(true); setNotification(false)}}>رحلاتي</span>
            </IconWrapper>
            <IconWrapper>
              <NotificationsTwoToneIcon
                className="icon"
                style={{ color: "#fec20f", fontSize: "38px" }}
              />
              <span onClick={()=>{setNotification(true); setTrips(false)}}>الإشعارات</span>
            </IconWrapper>
            <IconWrapper onClick={handleLogout}>
              <LogoutOutlinedIcon
                className="icon"
                style={{ color: "lightblue", fontSize: "38px" }}
              />
              <span>تسجيل خروج</span>
            </IconWrapper>
          </ProfileIcons>

          {!trips && !Notification && (
            <ProfileContainer>
              {/* قسم الأيقونات العلوية */}
        {user &&(
              <ProfileHeader>
                <ProfileAvatar />
                
                <h2 style={{ marginBottom: "0px" }}>
                   {user.firstname} {user.lastname}
                </h2>
                <h3 style={{ marginTop: "0px" }}>{user.email}</h3>

              </ProfileHeader>

              )}


              {/* قسم تغيير كلمة المرور */}
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <StyledTextField
                  fullWidth
                  margin="dense"
                  label="الاسم الأول"
                  variant="outlined"
                  value={firstname}
                  onChange={handleFirstnameChange}
                  error={firstnameError}
                  helperText={
                    firstnameError
                      ? "الاسم الأول يجب أن يحتوي على حروف فقط"
                      : ""
                  }
                  FormHelperTextProps={{
                    style: { textAlign: "right", color: "red" },
                  }}
                  required
                  autoComplete="given-name"
                  sx={{ width: "75%" }}
                  InputProps={{
                    readOnly: !isFirstnameEditable,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleEditFirstnameClick}
                          edge="end"
                        >
                          <EditIcon />
                        </IconButton>
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
                  FormHelperTextProps={{
                    style: { textAlign: "right", color: "red" },
                  }}
                  required
                  autoComplete="family-name"
                  sx={{ width: "75%" }}
                  InputProps={{
                    readOnly: !isLastnameEditable,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleEditLastnameClick}
                          edge="end"
                        >
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <StyledTextField
                  fullWidth
                  margin="dense"
                  label="الرقم السري"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? "يجب أن يحتوي الرقم السري على 8 أحرف على الأقل، حرف كبير واحد ورمز واحد"
                      : ""
                  }
                  FormHelperTextProps={{
                    style: { textAlign: "right", color: "red" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="new-password"
                  sx={{ width: "75%" }}
                />
                <ProfileButton>تأكيد</ProfileButton>
              </form>
            </ProfileContainer>
          )}
          {Notification && (
            <Notifications />
          )}
          {trips && <Trips />}
        </PageContainer>
    </>
  );
};

export default Profile;
