"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Switch,
  Button,
  CircularProgress,
  FormControlLabel,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import AdminLayout from "../../Components/admin/AdminLayout";
import { motion } from "framer-motion";

// Icons
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import PaletteIcon from "@mui/icons-material/Palette";
import RestoreIcon from "@mui/icons-material/Restore";

const AdminSettings = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      siteName: "فسحة",
      siteDescription: "منصة تساعد المستخدمين على إنشاء رحلات مخصصة",
      contactEmail: "support@fasaha.com",
      maxPlacesPerTrip: 10,
    },
    appearance: {
      primaryColor: theme.colors.primary,
      accentColor: theme.colors.accent,
      rtlLayout: true,
      showHeroSection: true,
      logoVariant: "default",
    },
    notifications: {
      emailNotifications: true,
      adminAlertOnNewPlace: true,
      sellerAlertOnApproval: true,
      marketingEmails: false,
    },
    security: {
      requireEmailVerification: true,
      sessionTimeout: 60,
      passwordMinLength: 8,
    },
  });

  const [originalSettings, setOriginalSettings] = useState({});

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setOriginalSettings({ ...settings });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setError("فشل في تحميل الإعدادات. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle settings change
  const handleChange = (section, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value,
      },
    }));
  };

  // Handle save settings
  const handleSaveSettings = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setOriginalSettings({ ...settings });
      setSuccess("تم حفظ الإعدادات بنجاح!");

      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setError("فشل في حفظ الإعدادات. يرجى المحاولة مرة أخرى.");
    } finally {
      setSaving(false);
    }
  };

  // Reset settings to original values
  const handleResetSettings = () => {
    setSettings({ ...originalSettings });
    setError(null);
    setSuccess("تم استعادة الإعدادات الأصلية");

    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  };

  // Check if settings have been modified
  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(originalSettings);

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ color: theme.colors.text }}
          >
            إعدادات النظام
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1, color: theme.colors.textSecondary }}
          >
            تخصيص وضبط إعدادات موقع فسحة
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}

        <Paper
          sx={{
            borderRadius: 2,
            bgcolor: theme.colors.surface,
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderBottom: 1,
              borderColor: theme.colors.border,
              px: 2,
              "& .MuiTab-root": {
                minHeight: 64,
                fontSize: "0.95rem",
                color: theme.colors.textSecondary, // Use textSecondary for non-selected tabs
                opacity: 0.8,
                "&:hover": {
                  color: theme.colors.text,
                  opacity: 1,
                },
                "& .MuiSvgIcon-root": {
                  mr: 1,
                  fontSize: "1.2rem",
                  opacity: 0.8,
                  transition:
                    "color 0.2s ease-in-out, opacity 0.2s ease-in-out",
                },
              },
              "& .Mui-selected": {
                color: `${theme.colors.primary} !important`,
                opacity: 1,
                fontWeight: "bold",
                "& .MuiSvgIcon-root": {
                  color: theme.colors.primary,
                  opacity: 1,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.colors.primary,
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
              "& .MuiTabScrollButton-root": {
                color: theme.colors.textSecondary,
                "&.Mui-disabled": {
                  opacity: 0.3,
                },
              },
            }}
          >
            <Tab
              icon={<SettingsIcon />}
              label="عام"
              iconPosition="start"
              sx={{
                flexDirection: "row", // Ensure icon and text are in a row
                alignItems: "center", // Vertical centering
                justifyContent: "center", // Center content
              }}
            />
            <Tab
              icon={<PaletteIcon />}
              label="المظهر"
              iconPosition="start"
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Tab
              icon={<NotificationsIcon />}
              label="الإشعارات"
              iconPosition="start"
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Tab
              icon={<SecurityIcon />}
              label="الأمان"
              iconPosition="start"
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* General Settings */}
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.colors.text,
                  }}
                >
                  <SettingsIcon sx={{ mr: 1, color: theme.colors.primary }} />{" "}
                  الإعدادات العامة
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textSecondary }}
                  paragraph
                >
                  الإعدادات الأساسية للموقع والتي تؤثر على عمل النظام بشكل عام
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="اسم الموقع"
                      fullWidth
                      value={settings.general.siteName}
                      onChange={(e) =>
                        handleChange("general", "siteName", e.target.value)
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: theme.colors.border },
                          "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.colors.primary,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.colors.textSecondary,
                        },
                        "& .MuiInputBase-input": { color: theme.colors.text },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="البريد الإلكتروني للتواصل"
                      fullWidth
                      value={settings.general.contactEmail}
                      onChange={(e) =>
                        handleChange("general", "contactEmail", e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ color: theme.colors.textSecondary }}
                          >
                            @
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: theme.colors.border },
                          "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.colors.primary,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.colors.textSecondary,
                        },
                        "& .MuiInputBase-input": { color: theme.colors.text },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="وصف الموقع"
                      fullWidth
                      multiline
                      rows={2}
                      value={settings.general.siteDescription}
                      onChange={(e) =>
                        handleChange(
                          "general",
                          "siteDescription",
                          e.target.value
                        )
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: theme.colors.border },
                          "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.colors.primary,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.colors.textSecondary,
                        },
                        "& .MuiInputBase-input": { color: theme.colors.text },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="الحد الأقصى للأماكن في الرحلة الواحدة"
                      fullWidth
                      type="number"
                      value={settings.general.maxPlacesPerTrip}
                      onChange={(e) =>
                        handleChange(
                          "general",
                          "maxPlacesPerTrip",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{
                        inputProps: { min: 1, max: 30 },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: theme.colors.border },
                          "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.colors.primary,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.colors.textSecondary,
                        },
                        "& .MuiInputBase-input": { color: theme.colors.text },
                      }}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Appearance Settings */}
            {activeTab === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.colors.text,
                  }}
                >
                  <PaletteIcon sx={{ mr: 1, color: theme.colors.primary }} />{" "}
                  إعدادات المظهر
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textSecondary }}
                  paragraph
                >
                  تخصيص مظهر الموقع والألوان والتصميم العام
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: theme.colors.border },
                          "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.colors.primary,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.colors.textSecondary,
                        },
                        "& .MuiInputBase-input": { color: theme.colors.text },
                        "& .MuiSelect-select": { color: theme.colors.text },
                      }}
                    >
                      <InputLabel>نوع الشعار</InputLabel>
                      <Select
                        value={settings.appearance.logoVariant}
                        label="نوع الشعار"
                        onChange={(e) =>
                          handleChange(
                            "appearance",
                            "logoVariant",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="default">الشعار الافتراضي</MenuItem>
                        <MenuItem value="minimal">الشعار المبسط</MenuItem>
                        <MenuItem value="dark">الشعار الداكن</MenuItem>
                        <MenuItem value="light">الشعار الفاتح</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="اللون الرئيسي"
                      fullWidth
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        handleChange(
                          "appearance",
                          "primaryColor",
                          e.target.value
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "4px",
                                backgroundColor:
                                  settings.appearance.primaryColor,
                                border: `1px solid ${theme.colors.border}`,
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: theme.colors.border },
                          "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.colors.primary,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.colors.textSecondary,
                        },
                        "& .MuiInputBase-input": { color: theme.colors.text },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: theme.colors.surface,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.appearance.rtlLayout}
                            onChange={(e) =>
                              handleChange(
                                "appearance",
                                "rtlLayout",
                                e.target.checked
                              )
                            }
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: theme.colors.primary,
                                "& + .MuiSwitch-track": {
                                  backgroundColor: theme.colors.primary,
                                },
                              },
                            }}
                          />
                        }
                        label="اتجاه RTL للتصفح (من اليمين لليسار)"
                        sx={{ color: theme.colors.text }}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: theme.colors.surface,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.appearance.showHeroSection}
                            onChange={(e) =>
                              handleChange(
                                "appearance",
                                "showHeroSection",
                                e.target.checked
                              )
                            }
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: theme.colors.primary,
                                "& + .MuiSwitch-track": {
                                  backgroundColor: theme.colors.primary,
                                },
                              },
                            }}
                          />
                        }
                        label="إظهار قسم الصورة الرئيسية في الصفحة الرئيسية"
                        sx={{ color: theme.colors.text }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Notification Settings */}
            {activeTab === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.colors.text,
                  }}
                >
                  <NotificationsIcon
                    sx={{ mr: 1, color: theme.colors.primary }}
                  />{" "}
                  إعدادات الإشعارات
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textSecondary }}
                  paragraph
                >
                  تكوين إشعارات النظام وتنبيهات البريد الإلكتروني
                </Typography>

                <Card
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    bgcolor: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: theme.colors.text }}
                    >
                      إشعارات النظام
                    </Typography>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "emailNotifications",
                              e.target.checked
                            )
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: theme.colors.primary,
                              "& + .MuiSwitch-track": {
                                backgroundColor: theme.colors.primary,
                              },
                            },
                          }}
                        />
                      }
                      label="تفعيل إشعارات البريد الإلكتروني"
                      sx={{ color: theme.colors.text }}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.adminAlertOnNewPlace}
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "adminAlertOnNewPlace",
                              e.target.checked
                            )
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: theme.colors.primary,
                              "& + .MuiSwitch-track": {
                                backgroundColor: theme.colors.primary,
                              },
                            },
                          }}
                        />
                      }
                      label="إشعار المشرفين عند إضافة مكان جديد"
                      sx={{ color: theme.colors.text, display: "block", mt: 1 }}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.sellerAlertOnApproval}
                          onChange={(e) =>
                            handleChange(
                              "notifications",
                              "sellerAlertOnApproval",
                              e.target.checked
                            )
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: theme.colors.primary,
                              "& + .MuiSwitch-track": {
                                backgroundColor: theme.colors.primary,
                              },
                            },
                          }}
                        />
                      }
                      label="إشعار البائعين عند الموافقة على أماكنهم"
                      sx={{ color: theme.colors.text, display: "block", mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.colors.text,
                  }}
                >
                  <SecurityIcon sx={{ mr: 1, color: theme.colors.primary }} />{" "}
                  إعدادات الأمان
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textSecondary }}
                  paragraph
                >
                  إعدادات الأمان وخيارات الحماية للمستخدمين والنظام
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: theme.colors.surface,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.security.requireEmailVerification}
                            onChange={(e) =>
                              handleChange(
                                "security",
                                "requireEmailVerification",
                                e.target.checked
                              )
                            }
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: theme.colors.primary,
                                "& + .MuiSwitch-track": {
                                  backgroundColor: theme.colors.primary,
                                },
                              },
                            }}
                          />
                        }
                        label="تأكيد البريد الإلكتروني مطلوب للتسجيل"
                        sx={{ color: theme.colors.text }}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="مدة الجلسة (دقائق)"
                      fullWidth
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) =>
                        handleChange(
                          "security",
                          "sessionTimeout",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{
                        inputProps: { min: 15, max: 480 },
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ color: theme.colors.textSecondary }}
                          >
                            دقيقة
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: theme.colors.border },
                          "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.colors.primary,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.colors.textSecondary,
                        },
                        "& .MuiInputBase-input": { color: theme.colors.text },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="الحد الأدنى لطول كلمة المرور"
                      fullWidth
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) =>
                        handleChange(
                          "security",
                          "passwordMinLength",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{
                        inputProps: { min: 6, max: 16 },
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ color: theme.colors.textSecondary }}
                          >
                            حرف
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: theme.colors.border },
                          "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.colors.primary,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.colors.textSecondary,
                        },
                        "& .MuiInputBase-input": { color: theme.colors.text },
                      }}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </Box>
        </Paper>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<RestoreIcon />}
            onClick={handleResetSettings}
            disabled={!hasChanges || saving}
            sx={{
              color:
                !hasChanges || saving
                  ? theme.colors.textSecondary
                  : "warning.main",
              borderColor:
                !hasChanges || saving ? theme.colors.border : "warning.main",
            }}
          >
            إعادة تعيين
          </Button>

          <Button
            variant="contained"
            startIcon={
              saving ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SaveIcon />
              )
            }
            onClick={handleSaveSettings}
            disabled={!hasChanges || saving}
            sx={{
              bgcolor:
                !hasChanges || saving
                  ? theme.colors.border
                  : theme.colors.primary,
              color:
                !hasChanges || saving ? theme.colors.textSecondary : "#fff",
              "&:hover": {
                bgcolor:
                  !hasChanges || saving
                    ? theme.colors.border
                    : theme.colors.accent,
              },
            }}
          >
            {saving ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
          </Button>
        </Box>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSettings;
