"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Divider,
  Alert,
  IconButton,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../Components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const AdminProfile = () => {
  const { theme } = useTheme(); // Get only theme from ThemeContext
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editing, setEditing] = useState(false);

  // Profile data states
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    profileImage: "",
  });

  const [editData, setEditData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // For demo purposes, simulate an API call with a timeout
        setTimeout(() => {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          if (!user || !user._id) {
            router.push("/login");
            return;
          }

          setProfileData({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            city: user.city || "",
            profileImage: user.profileImage || "",
          });

          setEditData({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            city: user.city || "",
            profileImage: user.profileImage || "",
          });

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("فشل في تحميل بيانات الملف الشخصي");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setEditing(false);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      // Simulate successful response
      setTimeout(() => {
        setProfileData({ ...editData });
        setSuccess("تم حفظ التغييرات بنجاح!");
        setEditing(false);
        setSaving(false);
      }, 1500);

      /* Actual API call - uncomment when API is ready
      const response = await axios.put(`https://iti-server-production.up.railway.app/api/admin/profile`, editData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setProfileData(response.data);
      setSuccess("تم حفظ التغييرات بنجاح!");
      setEditing(false); 
      */
    } catch (error) {
      console.error("Error saving profile data:", error);
      setError("فشل في حفظ بيانات الملف الشخصي. يرجى المحاولة مرة أخرى.");
      setSaving(false);
    }
  };

  // Shared TextField styling using the theme context
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: theme.colors.border },
      "&:hover fieldset": { borderColor: theme.colors.primary },
      "&.Mui-focused fieldset": { borderColor: theme.colors.primary },
    },
    "& .MuiInputLabel-root": { color: theme.colors.textSecondary },
    "& .MuiInputBase-input": { color: theme.colors.text },
    "&.Mui-disabled": {
      "& .MuiInputBase-input": { color: theme.colors.textSecondary },
    },
    marginY: 1.5,
  };

  return (
    <AdminLayout>
      <Box
        sx={{ padding: 2 }}
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? (
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
        ) : (
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: 2,
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: theme.colors.text,
                mb: 2,
                fontWeight: "bold",
              }}
            >
              الملف الشخصي
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  "& .MuiAlert-icon": { color: "#f44336" },
                  "& .MuiAlert-message": { color: theme.colors.text },
                  bgcolor: "rgba(244, 67, 54, 0.1)",
                }}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  "& .MuiAlert-icon": { color: "#4caf50" },
                  "& .MuiAlert-message": { color: theme.colors.text },
                  bgcolor: "rgba(76, 175, 80, 0.1)",
                }}
                onClose={() => setSuccess(null)}
              >
                {success}
              </Alert>
            )}

            <Grid container spacing={3} alignItems="center">
              <Grid
                item
                xs={12}
                sm={4}
                sx={{ textAlign: { xs: "center", sm: "right" } }}
              >
                <Avatar
                  alt={`${profileData.firstname} ${profileData.lastname}`}
                  src={editData.profileImage || profileData.profileImage}
                  sx={{
                    width: 150,
                    height: 150,
                    marginX: "auto",
                    marginBottom: 2,
                    border: `2px solid ${theme.colors.primary}`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    bgcolor: theme.colors.primary,
                  }}
                >
                  {!editData.profileImage &&
                    `${profileData.firstname.charAt(
                      0
                    )}${profileData.lastname.charAt(0)}`}
                </Avatar>

                {editing && (
                  <IconButton
                    component="label"
                    sx={{
                      color: theme.colors.primary,
                      bgcolor: "rgba(74, 114, 172, 0.1)",
                      "&:hover": {
                        bgcolor: "rgba(74, 114, 172, 0.2)",
                      },
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                    <PhotoCameraIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    "& .MuiFormControl-root": { mb: 2 },
                  }}
                >
                  <TextField
                    label="الاسم الأول"
                    name="firstname"
                    value={editData.firstname}
                    onChange={handleChange}
                    fullWidth
                    disabled={!editing}
                    sx={textFieldSx}
                  />
                  <TextField
                    label="اسم العائلة"
                    name="lastname"
                    value={editData.lastname}
                    onChange={handleChange}
                    fullWidth
                    disabled={!editing}
                    sx={textFieldSx}
                  />
                  <TextField
                    label="البريد الإلكتروني"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    fullWidth
                    disabled={!editing}
                    sx={textFieldSx}
                  />
                  <TextField
                    label="المدينة"
                    name="city"
                    value={editData.city}
                    onChange={handleChange}
                    fullWidth
                    disabled={!editing}
                    sx={textFieldSx}
                  />
                </Box>
              </Grid>
            </Grid>

            <Divider
              sx={{
                my: 3,
                borderColor: theme.colors.border,
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row-reverse", // For RTL layout
              }}
            >
              {editing ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse", // For RTL layout
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                    endIcon={
                      saving ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SaveIcon />
                      )
                    } // Changed to endIcon for RTL
                    sx={{
                      bgcolor: theme.colors.primary,
                      color: "#fff",
                      "&:hover": { bgcolor: theme.colors.accent },
                      "&.Mui-disabled": {
                        bgcolor: theme.colors.border,
                        color: theme.colors.textSecondary,
                      },
                    }}
                  >
                    {saving ? "جارٍ الحفظ..." : "حفظ"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    endIcon={<CancelIcon />} // Changed to endIcon for RTL
                    sx={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                      "&:hover": {
                        borderColor: theme.colors.primary,
                        bgcolor: "rgba(74, 114, 172, 0.1)",
                      },
                    }}
                  >
                    إلغاء
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  endIcon={<EditIcon />} // Changed to endIcon for RTL
                  sx={{
                    bgcolor: theme.colors.primary,
                    color: "#fff",
                    "&:hover": { bgcolor: theme.colors.accent },
                  }}
                >
                  تعديل
                </Button>
              )}
            </Box>
          </Paper>
        )}
      </Box>
    </AdminLayout>
  );
};

export default AdminProfile;
