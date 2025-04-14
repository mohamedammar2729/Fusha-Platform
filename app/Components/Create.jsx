"use client";
import React, { useState, useCallback, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import {
  FormContainer,
  InputBox,
  Label,
  MyOwnSelect,
  NextButton,
  NumberCircle,
  StepIndicator,
  StepText,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FieldContainer,
  RequiredStar,
  InfoTooltip,
} from "../styledComponent/Create/StyledCreate";
import { Menu, MenuItem, Tooltip, Zoom } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { StyledTextField } from "../styledComponent/Create/StyledCreate";
import { useRouter } from "next/navigation";
import TripType from "./TripType";
import { useTheme } from "../context/ThemeContext"; // Add this import
import { KeyboardArrowDown } from "@mui/icons-material";

// Add import for AI assistant feature
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Divider, Chip, Button, TextField } from "@mui/material";
import { motion } from "framer-motion";

// Add these imports if not already present
import axios from "axios";
import { set } from "date-fns";

const MemoizedTypography = React.memo(({ children, ...props }) => (
  <Typography {...props}>{children}</Typography>
));

const MemoizedInputBox = React.memo(({ children, ...props }) => (
  <InputBox {...props}>{children}</InputBox>
));

const MemoizedNumberCircle = React.memo(({ children, ...props }) => (
  <NumberCircle {...props}>{children}</NumberCircle>
));

const MemoizedLabel = React.memo(({ children, ...props }) => (
  <Label {...props}>{children}</Label>
));

const MemoizedMyOwnSelect = React.memo(({ children, ...props }) => (
  <MyOwnSelect {...props}>{children}</MyOwnSelect>
));

export default function Create() {
  const { darkMode, theme } = useTheme(); // Add theme context
  const [form, setForm] = useState({ people: "", amount: "", destination: "" });
  const [errors, setErrors] = useState({
    people: false,
    amount: false,
    destination: false,
  });
  const [create, setCreate] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Add these state variables to your component
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const validateForm = () => {
    const newErrors = {
      people: !form.people,
      amount: !form.amount,
      destination: !form.destination,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      localStorage.setItem("formData", JSON.stringify(form));
      setCreate(false);
      router.push("/create?showTripType=true");
    }
  }, [form, router]);

  useEffect(() => {
    const showProgramm = searchParams.get("showProgram");
    const showCreate = searchParams.get("showCreate");
    if (showProgramm) {
      setCreate(false);
    }

    if (showCreate) {
      setCreate(true);
    }
  }, [searchParams]);

  const handleChange = useCallback(
    (field) => (event) => {
      setForm((prevForm) => ({ ...prevForm, [field]: event.target.value }));
    },
    []
  );

  // Add AI trip generation handler
  const handleAITripGeneration = () => {
    setAiDialogOpen(true);
  };

  // Add this function to handle AI Trip generation
  const handleAiPromptSubmit = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      // Call the API with the user's prompt
      const response = await fetch(
        "https://iti-server-production.up.railway.app/api/ai/generate-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            // Pass form data and the user's prompt
            destination: form.destination || null,
            people: form.people || null,
            budget: form.amount || null,
            prompt: aiPrompt, // Include the user's prompt
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Calculate end date based on schedule length
      const startDate = new Date();
      const endDate = new Date();
      const scheduleDays = data.schedule?.length || 1;
      endDate.setDate(startDate.getDate() + scheduleDays - 1);

      // Add these additional fields for better compatibility
      const enhancedData = {
        ...data,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: "upcoming",
        isAIGenerated: true,
        metadata: {
          aiPrompt: aiPrompt,
          generationDate: new Date().toISOString(),
        },
      };

      // Store the AI-generated trip plan in localStorage
      localStorage.setItem("aiTripPlan", JSON.stringify(enhancedData));

      // Close the dialog
      setAiDialogOpen(false);

      // FinalProgram component will handle the next steps
      router.push("/create/final");
    } catch (error) {
      console.error("Error generating AI trip:", error);
      setAiError("حدث خطأ أثناء إنشاء الرحلة. يرجى المحاولة مرة أخرى.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      {create && (
        <FormContainer $darkMode={darkMode}>
          <FormHeader $darkMode={darkMode}>
            <FormTitle $darkMode={darkMode}>فصل رحلتك على مزاجك </FormTitle>
            <FormSubtitle $darkMode={darkMode}>
              أخبرنا عن تفاصيل رحلتك لنساعدك في تخطيط أفضل تجربة
            </FormSubtitle>
          </FormHeader>

          {/* Field 1 */}
          <FieldContainer $darkMode={darkMode}>
            <MemoizedInputBox $hasError={errors.people} $darkMode={darkMode}>
              <MemoizedLabel $darkMode={darkMode}>
                عدد الأشخاص <RequiredStar $darkMode={darkMode}>*</RequiredStar>
              </MemoizedLabel>
              <Tooltip
                title="عدد الأشخاص المشاركين في الرحلة للمساعدة في اقتراح أماكن مناسبة للمجموعة"
                placement="top"
                TransitionComponent={Zoom}
                arrow
              >
                <InfoTooltip
                  $darkMode={darkMode}
                  style={{ marginLeft: "10px" }}
                >
                  <InfoOutlinedIcon fontSize="medium" />
                </InfoTooltip>
              </Tooltip>
              <StyledTextField
                type="number"
                fullWidth
                placeholder="اكتب العدد هنا..."
                value={form.people}
                onChange={handleChange("people")}
                required
                error={errors.people}
                helperText={errors.people ? "هذا الحقل مطلوب" : ""}
                inputProps={{ min: 1 }}
                $darkMode={darkMode}
              />
            </MemoizedInputBox>
          </FieldContainer>

          {/* Field 2 */}
          <FieldContainer $darkMode={darkMode}>
            <MemoizedInputBox $hasError={errors.amount} $darkMode={darkMode}>
              <MemoizedLabel $darkMode={darkMode}>
                الميزانية <RequiredStar $darkMode={darkMode}>*</RequiredStar>
              </MemoizedLabel>
              <Tooltip
                title="المبلغ المتاح للإنفاق خلال الرحلة لمساعدتنا في اقتراح أماكن تناسب ميزانيتك"
                placement="top"
                TransitionComponent={Zoom}
                arrow
              >
                <InfoTooltip
                  $darkMode={darkMode}
                  style={{ marginLeft: "10px" }}
                >
                  <InfoOutlinedIcon fontSize="medium" />
                </InfoTooltip>
              </Tooltip>
              <StyledTextField
                type="number"
                fullWidth
                placeholder="اكتب المبلغ هنا..."
                value={form.amount}
                onChange={handleChange("amount")}
                required
                error={errors.amount}
                helperText={errors.amount ? "هذا الحقل مطلوب" : ""}
                inputProps={{ min: 0 }}
                InputProps={{
                  inputProps: { min: 0 },
                }}
                $darkMode={darkMode}
              />
            </MemoizedInputBox>
          </FieldContainer>

          {/* Field 3 */}
          <FieldContainer $darkMode={darkMode}>
            <MemoizedInputBox
              $hasError={errors.destination}
              $darkMode={darkMode}
            >
              <MemoizedLabel $darkMode={darkMode}>
                الوجهة <RequiredStar $darkMode={darkMode}>*</RequiredStar>
              </MemoizedLabel>
              <Tooltip
                title="اختر المحافظة التي تنوي زيارتها لنقترح عليك الأماكن المناسبة"
                placement="top"
                TransitionComponent={Zoom}
                arrow
              >
                <InfoTooltip
                  $darkMode={darkMode}
                  style={{ marginLeft: "10px" }}
                >
                  <InfoOutlinedIcon fontSize="medium" />
                </InfoTooltip>
              </Tooltip>
              <MemoizedMyOwnSelect
                fullWidth
                displayEmpty
                value={form.destination}
                onChange={handleChange("destination")}
                required
                error={errors.destination}
                $darkMode={darkMode}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "10px",
                      minWidth: "0 !important",
                      backgroundColor: darkMode
                        ? theme.colors.surface
                        : "#ffffff",
                      "& .MuiMenuItem-root": {
                        color: darkMode ? theme.colors.text : "inherit",
                        borderRadius: "10px",
                        padding: "10px 16px",
                      },
                      "& .MuiMenuItem-root:hover": {
                        backgroundColor: darkMode
                          ? `${theme.colors.primary}20`
                          : "rgba(0, 0, 0, 0.04)",
                      },
                      "& .MuiMenuItem-root.Mui-selected": {
                        borderRadius: "10px",
                        backgroundColor: darkMode
                          ? `${theme.colors.primary}40`
                          : "rgba(25, 118, 210, 0.08)",
                      },
                    },
                  },
                  MenuListProps: {
                    sx: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "8px 0",
                    },
                  },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                }}
                // Add an InputAdornment like in the StyledTextField
                IconComponent={(props) => (
                  <KeyboardArrowDown
                    {...props}
                    style={{ color: darkMode ? "#AAB2D5" : "#555" }}
                  />
                )}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ color: darkMode ? "#AAB2D5" : "gray" }}>
                    اختر المحافظة
                  </Typography>
                </MenuItem>
                <MenuItem value="القاهرة">
                  <Typography sx={{ color: darkMode ? "#FFFFFF" : "inherit" }}>
                    القاهرة 🏛
                  </Typography>
                </MenuItem>
                <MenuItem value="الإسكندرية">
                  <Typography sx={{ color: darkMode ? "#FFFFFF" : "inherit" }}>
                    الإسكندرية 🌊
                  </Typography>
                </MenuItem>
                <MenuItem value="جنوب سيناء">
                  <Typography sx={{ color: darkMode ? "#FFFFFF" : "inherit" }}>
                    جنوب سيناء ⛰
                  </Typography>
                </MenuItem>
                <MenuItem value="مطروح">
                  <Typography sx={{ color: darkMode ? "#FFFFFF" : "inherit" }}>
                    مطروح 🏖
                  </Typography>
                </MenuItem>
                <MenuItem value="أسوان">
                  <Typography sx={{ color: darkMode ? "#FFFFFF" : "inherit" }}>
                    أسوان ☀
                  </Typography>
                </MenuItem>
              </MemoizedMyOwnSelect>
              {errors.destination && (
                <Typography
                  sx={{
                    color: darkMode ? theme.colors.primary : "error.main",
                    fontSize: "0.75rem",
                    mt: 0.5,
                    mr: 2,
                  }}
                >
                  يرجى اختيار المحافظة
                </Typography>
              )}
            </MemoizedInputBox>
          </FieldContainer>

          {/* Add AI Assistant Option */}
          <Box sx={{ my: 4 }}>
            <Divider sx={{ mb: 3 }}>
              <Chip
                label="أو استخدم المساعد الذكي"
                sx={{
                  backgroundColor: darkMode
                    ? `${theme.colors.surface}`
                    : "#f5f5f5",
                  color: darkMode ? theme.colors.text : "inherit",
                  borderColor: darkMode
                    ? theme.colors.primary + "40"
                    : theme.colors.primary + "30",
                }}
              />
            </Divider>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: darkMode
                    ? theme.colors.primary + "40"
                    : theme.colors.primary + "30",
                  borderRadius: "16px",
                  backgroundColor: darkMode
                    ? `${theme.colors.surface}80`
                    : "rgba(74, 114, 172, 0.05)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: theme.colors.primary,
                    boxShadow: darkMode
                      ? `0 4px 20px 0 ${theme.colors.primary}30`
                      : `0 4px 20px 0 ${theme.colors.primary}20`,
                  },
                }}
                onClick={handleAITripGeneration}
              >
                <AutoAwesomeIcon
                  sx={{ fontSize: 40, color: theme.colors.primary, mb: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: darkMode ? theme.colors.text : "inherit",
                  }}
                >
                  دع الذكاء الاصطناعي يخطط رحلتك
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.textSecondary }}
                >
                  أخبرنا عن اهتماماتك وسنقوم بإنشاء رحلة مثالية لك
                </Typography>
              </Box>
            </motion.div>
          </Box>

          {/* AI Dialog */}
          <Dialog
            open={aiDialogOpen}
            onClose={() => setAiDialogOpen(false)}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              style: {
                backgroundColor: darkMode ? theme.colors.surface : "#fff",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: darkMode
                  ? "0 8px 32px rgba(0, 0, 0, 0.5)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <DialogTitle
              sx={{
                color: theme.colors.primary,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              مساعد تخطيط الرحلة الذكي
            </DialogTitle>
            <DialogContent>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  textAlign: "center",
                  color: darkMode ? theme.colors.text : "inherit",
                }}
              >
                أخبرنا المزيد عن الأنشطة أو الأماكن التي ترغب في زيارتها، وسنقوم
                بإنشاء خطة رحلة مخصصة لك.
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="ما هي اهتماماتك أو الأنشطة المفضلة لديك؟"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                inputProps={{
                  dir: "rtl",
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: darkMode
                      ? `${theme.colors.background}40`
                      : "rgba(0, 0, 0, 0.02)",
                    "& fieldset": {
                      borderColor: darkMode
                        ? `${theme.colors.primary}60`
                        : "rgba(0, 0, 0, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: darkMode
                        ? theme.colors.primary
                        : "rgba(0, 0, 0, 0.23)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.colors.primary,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: darkMode ? theme.colors.textSecondary : undefined,
                  },
                  "& .MuiInputBase-input": {
                    color: darkMode ? theme.colors.text : undefined,
                  },
                }}
              />
              {aiError && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    color: darkMode ? theme.colors.primary : "error.main",
                  }}
                >
                  {aiError}
                </Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
              <Button
                onClick={() => setAiDialogOpen(false)}
                sx={{
                  color: theme.colors.textSecondary,
                  "&:hover": {
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                إلغاء
              </Button>
              <Button
                variant="contained"
                onClick={handleAiPromptSubmit}
                disabled={aiLoading}
                sx={{
                  backgroundColor: theme.colors.primary,
                  color: "#fff",
                  borderRadius: "8px",
                  px: 3,
                  "&:hover": {
                    backgroundColor: darkMode
                      ? theme.colors.accent
                      : theme.colors.secondary,
                  },
                  "&.Mui-disabled": {
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.12)"
                      : "rgba(0, 0, 0, 0.12)",
                    color: darkMode
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(0, 0, 0, 0.26)",
                  },
                }}
              >
                {aiLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "إنشاء رحلة"
                )}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Next Button */}
          <NextButton onClick={handleSubmit} $darkMode={darkMode}>
            التالي
            <ArrowBackIosIcon fontSize="small" />
          </NextButton>
        </FormContainer>
      )}
      {!create && <TripType />}
    </>
  );
}
