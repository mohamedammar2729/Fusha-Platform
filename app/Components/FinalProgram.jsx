"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

// MUI Icons
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CategoryIcon from "@mui/icons-material/Category";
import FlagIcon from "@mui/icons-material/Flag";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import PrintIcon from "@mui/icons-material/Print";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const FinalProgram = () => {
  const { darkMode, theme } = useTheme(); // Get theme context
  const [hasMounted, setHasMounted] = useState(false);
  const [userProgram, setUserProgram] = useState([]);
  const [userPeople, setUserPeople] = useState("");
  const [userAmount, setUserAmount] = useState("");
  const [userTripType, setUserTripType] = useState("");
  const [userDestination, setUserDestination] = useState("");
  const [userTripProgram, setUserTripProgram] = useState("");
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tripSchedule, setTripSchedule] = useState([]);
  const [tripTips, setTripTips] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);

    // Add page entrance animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      try {
        const storedData = JSON.parse(localStorage.getItem("formData")) || {};
        const aiTripPlan = localStorage.getItem("aiTripPlan");
        let amountSet = false; // Flag to track if amount has been set from aiTripPlan

        // First try to set data from aiTripPlan (higher priority)
        if (aiTripPlan) {
          const parsedTripPlan = JSON.parse(aiTripPlan);

          // Set user details from aiTripPlan
          setUserDestination(parsedTripPlan.destination || "");
          setUserPeople(parsedTripPlan.people || "");
          console.log(parsedTripPlan.budget);
          // Set amount and mark as set if it exists
          if (parsedTripPlan.budget) {
            setUserAmount(parsedTripPlan.budget);
            amountSet = true;
          }

          setUserTripType(parsedTripPlan.tripType || "");

          // Use the places from aiTripPlan for the program
          if (parsedTripPlan.places && parsedTripPlan.places.length > 0) {
            setUserProgram(
              parsedTripPlan.places.map((place) => ({
                name: place.name,
                image:
                  place.image ||
                  "https://via.placeholder.com/300x200?text=صورة+غير+متوفرة",
              }))
            );
          }

          // Store schedule and tips in state
          setTripSchedule(parsedTripPlan.schedule || []);
          setTripTips(parsedTripPlan.tips || []);
        } else if (storedData.savedProgram) {
          setUserProgram(storedData.savedProgram);
        } else {
          setUserProgram([]);
        }

        // Set from formData only for values not already set from aiTripPlan
        setUserPeople((prevPeople) => prevPeople || storedData.people || "");
        setUserDestination(
          (prevDest) => prevDest || storedData.destination || ""
        );
        setUserTripType(
          (prevType) => prevType || storedData.selectedTitle || ""
        );

        // Only set amount from formData if it wasn't already set from aiTripPlan
        if (!amountSet) {
          setUserAmount(storedData.amount || "");
        }

        setUserTripProgram(storedData.selectedTitle || "");
      } catch (error) {
        console.error("Error loading saved program:", error);
      }
    }
  }, [hasMounted]);

  const handlePrintProgram = useCallback(() => {
    window.print();
  }, []);

  const handleDeleteItem = useCallback((index) => {
    setDeleteItemIndex(index);
    setShowConfirmDelete(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteItemIndex !== null) {
      const updatedProgram = [...userProgram];
      updatedProgram.splice(deleteItemIndex, 1);

      setUserProgram(updatedProgram);

      // Update localStorage
      const storedData = JSON.parse(localStorage.getItem("formData")) || {};
      storedData.savedProgram = updatedProgram;
      localStorage.setItem("formData", JSON.stringify(storedData));

      setShowConfirmDelete(false);
      setDeleteItemIndex(null);

      // Show success notification
      setShowSuccessCard(true);
      setTimeout(() => {
        setShowSuccessCard(false);
      }, 2000);
    }
  }, [deleteItemIndex, userProgram]);

  const cancelDelete = useCallback(() => {
    setShowConfirmDelete(false);
    setDeleteItemIndex(null);
  }, []);

  const shareTrip = useCallback(() => {
    setShowShareOptions((prev) => !prev);
  }, []);

  const handleSaveToProfile = useCallback(() => {
    // Get authentication token
    const token = localStorage.getItem("token");

    // Check if AI trip plan data exists
    const aiTripPlanExists = localStorage.getItem("aiTripPlan");

    // Create basic payload (used for both AI and non-AI trips)
    const payload = {
      numberOfPersons: userPeople,
      locate: userDestination,
      budget: userAmount,
      typeOfProgram: userTripType,
      selectedTripPlaces: userProgram.map((place) => place.name).join(" -- "),
      images: userProgram.map((place) => place.image),
    };

    // If AI trip plan exists, add AI-specific data to the payload
    if (aiTripPlanExists) {
      try {
        const aiTripData = JSON.parse(aiTripPlanExists);

        // Add AI-specific data fields
        payload.isAIGenerated = true;
        payload.schedule =
          tripSchedule.length > 0 ? tripSchedule : aiTripData.schedule || [];
        payload.tips = tripTips.length > 0 ? tripTips : aiTripData.tips || [];

        // Include additional AI trip data if available
        if (aiTripData.places) {
          payload.places = aiTripData.places;
        }

        // Add metadata about the AI generation
        payload.metadata = {
          aiPrompt: aiTripData.prompt || "تم إنشاء رحلة بالذكاء الاصطناعي",
          generationDate: new Date().toISOString(),
          ...(aiTripData.metadata || {}),
        };
      } catch (error) {
        console.error("Error parsing AI trip data:", error);
      }
    }

    // Make API call to save the program
    axios
      .post(
        "https://iti-server-production.up.railway.app/api/createprogram",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Show success notification
        setShowSuccessCard(true);
        setTimeout(() => {
          setShowSuccessCard(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error saving program:", error);
        setErrorMessage("حدث خطأ أثناء حفظ البرنامج. الرجاء المحاولة مرة أخرى");
        setShowErrorCard(true);
        setTimeout(() => {
          setShowErrorCard(false);
        }, 3000);
      });
  }, [
    userPeople,
    userDestination,
    userAmount,
    userTripType,
    userProgram,
    tripSchedule,
    tripTips,
  ]);

  const getProgramTotalPrice = () => {
    try {
      // First check aiTripPlan
      const aiTripPlan = localStorage.getItem("aiTripPlan");
      if (aiTripPlan) {
        const parsedTripPlan = JSON.parse(aiTripPlan);
        if (parsedTripPlan.budget) {
          return parsedTripPlan.budget.toString();
        }
      }

      // Then check formData
      const storedData = JSON.parse(localStorage.getItem("formData")) || {};
      if (storedData.amount) {
        return storedData.amount.toString();
      }

      // Default fallback
      return "0";
    } catch (error) {
      console.error("Error retrieving price from localStorage:", error);
      return "0";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    console.log("Theme updated:", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (isLoading) {
    return (
      <LoadingContainer darkMode={darkMode} theme={theme}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="loading-content"
        >
          <div className="loader">
            <div className="plane-container">
              <div className="plane"></div>
              <div className="earth"></div>
            </div>
          </div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            جاري تجهيز برنامج رحلتك
          </motion.h2>
        </motion.div>
      </LoadingContainer>
    );
  }

  return (
    <Container darkMode={darkMode} theme={theme}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ProgramHeader darkMode={darkMode} theme={theme}>
          <motion.div variants={itemVariants}>
            <h1 style={{ color: "white" }}>البرنامج النهائي</h1>
            <Subtitle darkMode={darkMode} theme={theme}>
              مراجعة التفاصيل النهائية لرحلتك
            </Subtitle>
          </motion.div>
        </ProgramHeader>

        <motion.div variants={itemVariants}>
          <InfoSection darkMode={darkMode} theme={theme}>
            <InfoHeader darkMode={darkMode} theme={theme}>
              <FlagIcon />
              <h2>معلومات الرحلة</h2>
            </InfoHeader>

            <InfoGrid>
              <InfoCard darkMode={darkMode} theme={theme}>
                <IconCircle darkMode={darkMode} theme={theme}>
                  <LocationOnIcon />
                </IconCircle>
                <InfoCardContent>
                  <InfoLabel darkMode={darkMode} theme={theme}>
                    الوجهة
                  </InfoLabel>
                  <InfoValue darkMode={darkMode} theme={theme}>
                    {userDestination || "غير محدد"}
                  </InfoValue>
                </InfoCardContent>
              </InfoCard>

              <InfoCard darkMode={darkMode} theme={theme}>
                <IconCircle darkMode={darkMode} theme={theme}>
                  <CategoryIcon />
                </IconCircle>
                <InfoCardContent>
                  <InfoLabel darkMode={darkMode} theme={theme}>
                    نوع الرحلة
                  </InfoLabel>
                  <InfoValue darkMode={darkMode} theme={theme}>
                    {userTripType || "غير محدد"}
                  </InfoValue>
                </InfoCardContent>
              </InfoCard>

              <InfoCard darkMode={darkMode} theme={theme}>
                <IconCircle darkMode={darkMode} theme={theme}>
                  <GroupIcon />
                </IconCircle>
                <InfoCardContent>
                  <InfoLabel darkMode={darkMode} theme={theme}>
                    عدد الأشخاص
                  </InfoLabel>
                  <InfoValue darkMode={darkMode} theme={theme}>
                    {userPeople || "غير محدد"}
                  </InfoValue>
                </InfoCardContent>
              </InfoCard>

              <InfoCard darkMode={darkMode} theme={theme}>
                <IconCircle darkMode={darkMode} theme={theme}>
                  <MonetizationOnIcon />
                </IconCircle>
                <InfoCardContent>
                  <InfoLabel darkMode={darkMode} theme={theme}>
                    الميزانية
                  </InfoLabel>
                  <InfoValue darkMode={darkMode} theme={theme}>
                    {userAmount} ج.م
                  </InfoValue>
                </InfoCardContent>
              </InfoCard>
            </InfoGrid>
          </InfoSection>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProgramSection darkMode={darkMode} theme={theme}>
            <SectionHeader darkMode={darkMode} theme={theme}>
              <BookmarkIcon />
              <h2>أماكن الزيارة</h2>
              <PlacesCount darkMode={darkMode} theme={theme}>
                {userProgram.length} أماكن
              </PlacesCount>
            </SectionHeader>

            {userProgram.length === 0 ? (
              <EmptyProgram darkMode={darkMode} theme={theme}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="empty-illustration">
                    <img
                      src="/empty-places.svg"
                      alt="لا توجد أماكن محفوظة"
                      style={{ width: "200px", height: "auto" }}
                    />
                  </div>
                  <h3>لم تقم باختيار أماكن بعد</h3>
                  <p>يمكنك العودة لإختيار الأماكن المناسبة لرحلتك</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/create/program" passHref>
                      <AddPlacesButton darkMode={darkMode} theme={theme}>
                        <AddCircleIcon />
                        إضافة أماكن للزيارة
                      </AddPlacesButton>
                    </Link>
                  </motion.div>
                </motion.div>
              </EmptyProgram>
            ) : (
              <PlacesGrid>
                {userProgram.map((place, index) => (
                  <motion.div
                    key={`${place.name}-${index}`}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PlaceCard darkMode={darkMode} theme={theme}>
                      <PlaceImageContainer>
                        <PlaceImage
                          src={
                            place.image ||
                            "https://via.placeholder.com/300x200?text=صورة+غير+متوفرة"
                          }
                          alt={place.name}
                          loading="lazy"
                        />
                        <DayBadge darkMode={darkMode} theme={theme}>
                          يوم {index + 1}
                        </DayBadge>
                      </PlaceImageContainer>
                      <PlaceDetails darkMode={darkMode} theme={theme}>
                        <PlaceName darkMode={darkMode} theme={theme}>
                          {place.name}
                        </PlaceName>
                        <PlaceActions>
                          <PlaceActionButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="حذف"
                            onClick={() => handleDeleteItem(index)}
                            darkMode={darkMode}
                            theme={theme}
                          >
                            <DeleteIcon />
                          </PlaceActionButton>
                        </PlaceActions>
                      </PlaceDetails>
                    </PlaceCard>
                  </motion.div>
                ))}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  <AddMoreCard darkMode={darkMode} theme={theme}>
                    {/* <Link
                      href="/create/program"
                      passHref
                      style={{ textDecoration: "none", color: "inherit" }}
                    > */}
                    <AddMoreContent
                      darkMode={darkMode}
                      theme={theme}
                      onClick={() => router.back()}
                    >
                      <AddCircleIcon style={{ fontSize: 48 }} />
                      <h3>إضافة مزيد من الأماكن</h3>
                    </AddMoreContent>
                    {/* </Link> */}
                  </AddMoreCard>
                </motion.div>
              </PlacesGrid>
            )}
          </ProgramSection>
        </motion.div>

        {/* Add this after the ProgramSection */}
        {tripSchedule && tripSchedule.length > 0 && (
          <motion.div variants={itemVariants}>
            <ScheduleSection darkMode={darkMode} theme={theme}>
              <SectionHeader darkMode={darkMode} theme={theme}>
                <EventIcon />
                <h2>جدول الرحلة</h2>
                <DaysCount darkMode={darkMode} theme={theme}>
                  {tripSchedule.length} أيام
                </DaysCount>
              </SectionHeader>

              <ScheduleTimeline>
                {tripSchedule.map((day, dayIndex) => (
                  <DaySchedule
                    key={`day-${dayIndex}`}
                    darkMode={darkMode}
                    theme={theme}
                  >
                    <DayHeader darkMode={darkMode} theme={theme}>
                      <div className="day-number">يوم {day.day}</div>
                    </DayHeader>
                    <DayActivities>
                      {day.activities.map((activity, actIndex) => (
                        <Activity
                          key={`activity-${dayIndex}-${actIndex}`}
                          darkMode={darkMode}
                          theme={theme}
                        >
                          <ActivityTime darkMode={darkMode} theme={theme}>
                            {activity.time}
                          </ActivityTime>
                          <ActivityDetails darkMode={darkMode} theme={theme}>
                            <ActivityName darkMode={darkMode} theme={theme}>
                              {activity.activity}
                            </ActivityName>
                            <ActivityPlace darkMode={darkMode} theme={theme}>
                              <LocationOnIcon fontSize="small" />
                              {activity.place}
                            </ActivityPlace>
                          </ActivityDetails>
                        </Activity>
                      ))}
                    </DayActivities>
                  </DaySchedule>
                ))}
              </ScheduleTimeline>
            </ScheduleSection>
          </motion.div>
        )}

        {tripTips && tripTips.length > 0 && (
          <motion.div variants={itemVariants}>
            <TipsSection darkMode={darkMode} theme={theme}>
              <SectionHeader darkMode={darkMode} theme={theme}>
                <InfoOutlinedIcon />
                <h2>نصائح للرحلة</h2>
              </SectionHeader>

              <TipsList>
                {tripTips.map((tip, index) => (
                  <TipItem
                    key={`tip-${index}`}
                    darkMode={darkMode}
                    theme={theme}
                  >
                    <TipIcon darkMode={darkMode} theme={theme}>
                      {index + 1}
                    </TipIcon>
                    <TipText darkMode={darkMode} theme={theme}>
                      {tip}
                    </TipText>
                  </TipItem>
                ))}
              </TipsList>
            </TipsSection>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <SummarySection darkMode={darkMode} theme={theme}>
            <SummarySectionHeader darkMode={darkMode} theme={theme}>
              <h2 style={{ color: "white" }}>ملخص الرحلة</h2>
              <SummaryPrice darkMode={darkMode} theme={theme}>
                {getProgramTotalPrice()} ج.م
              </SummaryPrice>
            </SummarySectionHeader>

            <SummaryBody darkMode={darkMode} theme={theme}>
              <SummaryItem darkMode={darkMode} theme={theme}>
                <SummaryLabel darkMode={darkMode} theme={theme}>
                  المدة:
                </SummaryLabel>
                <SummaryValue darkMode={darkMode} theme={theme}>
                  {userProgram.length} أيام
                </SummaryValue>
              </SummaryItem>
              <SummaryItem darkMode={darkMode} theme={theme}>
                <SummaryLabel darkMode={darkMode} theme={theme}>
                  الأماكن:
                </SummaryLabel>
                <SummaryValue darkMode={darkMode} theme={theme}>
                  {userProgram.length} أماكن
                </SummaryValue>
              </SummaryItem>
              <SummaryItem darkMode={darkMode} theme={theme}>
                <SummaryLabel darkMode={darkMode} theme={theme}>
                  الوجهة:
                </SummaryLabel>
                <SummaryValue darkMode={darkMode} theme={theme}>
                  {userDestination}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem darkMode={darkMode} theme={theme}>
                <SummaryLabel darkMode={darkMode} theme={theme}>
                  نوع الرحلة:
                </SummaryLabel>
                <SummaryValue darkMode={darkMode} theme={theme}>
                  {userTripType}
                </SummaryValue>
              </SummaryItem>
            </SummaryBody>
          </SummarySection>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ActionsBar darkMode={darkMode} theme={theme}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ActionButton
                primary
                onClick={handleSaveToProfile}
                darkMode={darkMode}
                theme={theme}
              >
                <SaveAltIcon />
                حفظ في ملفي الشخصي
              </ActionButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ActionButton
                secondary
                onClick={handlePrintProgram}
                darkMode={darkMode}
                theme={theme}
              >
                <PrintIcon />
                طباعة
              </ActionButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ActionButton
                onClick={shareTrip}
                darkMode={darkMode}
                theme={theme}
              >
                <ShareIcon />
                مشاركة
              </ActionButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/create/program"
                passHref
                style={{ textDecoration: "none" }}
              >
                <ActionButton tertiary darkMode={darkMode} theme={theme}>
                  <EditIcon />
                  تعديل البرنامج
                </ActionButton>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" passHref style={{ textDecoration: "none" }}>
                <ActionButton darkMode={darkMode} theme={theme}>
                  <HomeIcon />
                  الرئيسية
                </ActionButton>
              </Link>
            </motion.div>
          </ActionsBar>
        </motion.div>

        <AnimatePresence>
          {showShareOptions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ShareOptionsOverlay onClick={() => setShowShareOptions(false)}>
                <ShareOptionsCard
                  darkMode={darkMode}
                  theme={theme}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3>مشاركة البرنامج</h3>
                  <ShareOptionsGrid>
                    <ShareOption
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      darkMode={darkMode}
                      theme={theme}
                    >
                      <div className="icon whatsapp"></div>
                      <span>واتساب</span>
                    </ShareOption>
                    <ShareOption
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      darkMode={darkMode}
                      theme={theme}
                    >
                      <div className="icon telegram"></div>
                      <span>تلغرام</span>
                    </ShareOption>
                    <ShareOption
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      darkMode={darkMode}
                      theme={theme}
                    >
                      <div className="icon twitter"></div>
                      <span>تويتر</span>
                    </ShareOption>
                    <ShareOption
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      darkMode={darkMode}
                      theme={theme}
                    >
                      <div className="icon email"></div>
                      <span>البريد</span>
                    </ShareOption>
                    <ShareOption
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      darkMode={darkMode}
                      theme={theme}
                    >
                      <div className="icon copy"></div>
                      <span>نسخ الرابط</span>
                    </ShareOption>
                  </ShareOptionsGrid>
                </ShareOptionsCard>
              </ShareOptionsOverlay>
            </motion.div>
          )}

          {showConfirmDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DialogOverlay>
                <DialogContent
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  darkMode={darkMode}
                  theme={theme}
                >
                  <DialogTitle darkMode={darkMode} theme={theme}>
                    تأكيد الحذف
                  </DialogTitle>
                  <DialogText darkMode={darkMode} theme={theme}>
                    هل أنت متأكد من حذف هذا المكان من برنامج رحلتك؟
                  </DialogText>
                  <DialogActions>
                    <CancelButton
                      darkMode={darkMode}
                      theme={theme}
                      onClick={cancelDelete}
                    >
                      إلغاء
                    </CancelButton>
                    <DeleteButton
                      darkMode={darkMode}
                      theme={theme}
                      onClick={confirmDelete}
                    >
                      <DeleteIcon style={{ marginLeft: 8 }} />
                      تأكيد الحذف
                    </DeleteButton>
                  </DialogActions>
                </DialogContent>
              </DialogOverlay>
            </motion.div>
          )}
          {showSuccessCard && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <SuccessCard darkMode={darkMode} theme={theme}>
                <CheckCircleIcon style={{ fontSize: 28, color: "#4CAF50" }} />
                <span>تم تنفيذ العملية بنجاح</span>
              </SuccessCard>
            </motion.div>
          )}
          {showErrorCard && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorCard darkMode={darkMode} theme={theme}>
                <ErrorIcon />
                <span>{errorMessage}</span>
              </ErrorCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 80px;
  direction: rtl;
  background-color: ${(props) =>
    props.darkMode
      ? props.theme.colors.background
      : props.theme.colors.surface};
  color: ${(props) =>
    props.darkMode ? props.theme.colors.text : props.theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px 15px 60px;
  }

  @media print {
    padding: 0;
    margin: 0;
    background-color: white;
    color: black;
  }
`;

const ProgramHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  background: ${(props) =>
    props.darkMode
      ? `linear-gradient(135deg, ${props.theme.colors.surface}, ${props.theme.colors.primary})`
      : `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.primary})`};
  padding: 30px;
  border-radius: 20px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 10px 30px rgba(0, 0, 0, 0.3)"
      : "0 10px 30px rgba(59, 88, 152, 0.2)"};
  transition: background 0.3s ease, box-shadow 0.3s ease;

  h1 {
    font-size: 2.4rem;
    margin: 0;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 30px;
    border-radius: 16px;

    h1 {
      font-size: 1.8rem;
    }
  }

  @media print {
    background: #ffffff;
    color: ${(props) => props.theme.colors.primary};
    box-shadow: none;
    border: 1px solid #eaeaea;
    padding: 20px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: ${(props) => (props.darkMode ? "1" : "0.9")};
  margin: 0;
  color: ${(props) => (props.darkMode ? props.theme.colors.text : "white")};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const InfoSection = styled.section`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 5px 20px rgba(0, 0, 0, 0.15)"
      : "0 5px 20px rgba(0, 0, 0, 0.05)"};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 24px;
  }

  @media print {
    box-shadow: none;
    border: 1px solid #eaeaea;
    break-inside: avoid;
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
  transition: color 0.3s ease;

  svg {
    font-size: 24px;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${(props) =>
      props.darkMode ? props.theme.colors.text : props.theme.colors.text};
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;

    svg {
      font-size: 22px;
    }

    h2 {
      font-size: 1.3rem;
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.surface : "#f9fafc"};
  border-radius: 14px;
  padding: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${(props) =>
      props.darkMode
        ? "0 5px 15px rgba(0, 0, 0, 0.15)"
        : "0 5px 15px rgba(0, 0, 0, 0.08)"};
  }

  @media (max-width: 768px) {
    padding: 12px;
    border-radius: 10px;
  }

  @media print {
    background: #ffffff;
    box-shadow: none;
    border: 1px solid #eaeaea;
  }
`;

const IconCircle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.primary : props.theme.colors.primary};
  color: ${(props) =>
    props.darkMode ? props.theme.colors.background : "white"};
  margin-left: 15px;
  flex-shrink: 0;
  transition: background 0.3s ease, color 0.3s ease;

  svg {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-left: 12px;

    svg {
      font-size: 20px;
    }
  }

  @media print {
    background: #f0f4f8;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const InfoCardContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  color: ${(props) =>
    props.darkMode
      ? props.theme.colors.textSecondary
      : props.theme.colors.textSecondary};
  margin-bottom: 5px;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 3px;
  }
`;

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.text : props.theme.colors.text};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ProgramSection = styled.section`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 5px 20px rgba(0, 0, 0, 0.15)"
      : "0 5px 20px rgba(0, 0, 0, 0.05)"};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 24px;
  }

  @media print {
    box-shadow: none;
    border: 1px solid #eaeaea;
    break-inside: avoid;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 10px;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
  transition: color 0.3s ease;

  svg {
    font-size: 24px;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    flex: 1;
    color: ${(props) =>
      props.darkMode ? props.theme.colors.text : props.theme.colors.text};
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    svg {
      font-size: 22px;
    }

    h2 {
      font-size: 1.3rem;
    }
  }
`;

const PlacesCount = styled.div`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.surface : "#f0f4f8"};
  color: ${(props) =>
    props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 4px 10px;
  }
`;

const EmptyProgram = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  color: ${(props) =>
    props.darkMode
      ? props.theme.colors.textSecondary
      : props.theme.colors.textSecondary};
  transition: color 0.3s ease;

  .empty-illustration {
    margin-bottom: 20px;
    opacity: ${(props) => (props.darkMode ? "0.8" : "1")};
    filter: ${(props) => (props.darkMode ? "brightness(0.9)" : "none")};
    transition: opacity 0.3s ease, filter 0.3s ease;
  }

  h3 {
    margin: 0 0 10px;
    color: ${(props) =>
      props.darkMode ? props.theme.colors.text : props.theme.colors.text};
    font-size: 1.3rem;
    transition: color 0.3s ease;
  }

  p {
    margin: 0 0 25px;
    max-width: 300px;
    line-height: 1.5;
    color: ${(props) =>
      props.darkMode
        ? props.theme.colors.textSecondary
        : props.theme.colors.textSecondary};
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 30px 15px;

    h3 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.95rem;
      margin-bottom: 20px;
    }
  }
`;

const AddPlacesButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.primary : props.theme.colors.primary};
  color: ${(props) =>
    props.darkMode ? props.theme.colors.background : "white"};
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.darkMode
      ? `0 4px 15px rgba(${props.theme.colors.primary}, 0.25)`
      : `0 4px 15px rgba(${props.theme.colors.primary}, 0.25)`};
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.darkMode
        ? `0 6px 20px rgba(${props.theme.colors.primary}, 0.35)`
        : `0 6px 20px rgba(${props.theme.colors.primary}, 0.35)`};
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
`;

const PlacesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const PlaceCard = styled.div`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.surface : props.theme.colors.surface};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 4px 15px rgba(0, 0, 0, 0.2)"
      : "0 4px 15px rgba(0, 0, 0, 0.08)"};
  transition: all 0.3s ease;

  @media print {
    box-shadow: none;
    border: 1px solid #eaeaea;
    break-inside: avoid;
  }
`;

const PlaceImageContainer = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  ${PlaceCard}:hover & {
    transform: scale(1.08);
  }

  @media print {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
`;

const DayBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.primary : props.theme.colors.primary};
  color: ${(props) =>
    props.darkMode ? props.theme.colors.background : "white"};
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 2px 8px rgba(0, 0, 0, 0.25)"
      : "0 2px 8px rgba(0, 0, 0, 0.15)"};
  z-index: 2;
  transition: all 0.3s ease;

  ${PlaceCard}:hover & {
    box-shadow: ${(props) =>
      props.darkMode
        ? "0 4px 12px rgba(0, 0, 0, 0.3)"
        : "0 4px 12px rgba(0, 0, 0, 0.2)"};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 5px 12px;
    font-size: 13px;
    top: 10px;
    right: 10px;
  }

  @media print {
    box-shadow: none;
    background-color: #f0f4f8;
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid #e0e0e0;
  }
`;

const PlaceDetails = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  border-top: ${(props) =>
    props.darkMode
      ? `1px solid ${props.theme.colors.border}`
      : "1px solid rgba(0, 0, 0, 0.05)"};
  transition: background 0.3s ease, border-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 14px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const PlaceName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.text : props.theme.colors.text};
  font-weight: 600;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;

  ${PlaceCard}:hover & {
    color: ${(props) =>
      props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const PlaceActions = styled.div`
  display: flex;
  gap: 8px;

  @media print {
    display: none;
  }
`;

const PlaceActionButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.background : "#f5f5f5"};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #f44336;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: ${(props) =>
      props.darkMode ? "rgba(244, 67, 54, 0.15)" : "rgba(244, 67, 54, 0.1)"};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  &:hover {
    background: ${(props) => (props.darkMode ? "#3a1212" : "#ffeaea")};
    color: ${(props) => (props.darkMode ? "#ff6b6b" : "#e53935")};
    box-shadow: ${(props) =>
      props.darkMode
        ? "0 2px 8px rgba(244, 67, 54, 0.4)"
        : "0 2px 8px rgba(244, 67, 54, 0.25)"};

    &::before {
      width: 100%;
      height: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 18px;
    z-index: 2;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;

    svg {
      font-size: 16px;
    }
  }
`;

const AddMoreCard = styled.div`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.surface : "#f9fafc"};
  border: ${(props) =>
    props.darkMode
      ? `2px dashed ${props.theme.colors.border}`
      : "2px dashed #d0d7e2"};
  border-radius: 16px;
  height: 100%;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.darkMode
        ? `linear-gradient(135deg, rgba(${props.theme.colors.primary}, 0.05), rgba(${props.theme.colors.primary}, 0.1))`
        : `linear-gradient(135deg, rgba(${props.theme.colors.primary}, 0.05), rgba(${props.theme.colors.primary}, 0.1))`};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    border-color: ${(props) =>
      props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
    background: ${(props) =>
      props.darkMode ? props.theme.colors.background : "#f0f4f8"};
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${(props) =>
      props.darkMode
        ? `0 10px 25px rgba(${props.theme.colors.primary}, 0.1)`
        : `0 10px 25px rgba(${props.theme.colors.primary}, 0.1)`};

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    min-height: 220px;
  }

  @media (max-width: 480px) {
    min-height: 180px;
  }

  @media print {
    display: none;
  }
`;

const AddMoreContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.textSecondary : "#7c8ba1"};
  text-align: center;
  padding: 20px;
  z-index: 2;
  transition: color 0.3s ease;

  h3 {
    margin: 16px 0 0 0;
    font-size: 18px;
    font-weight: 600;
    transition: color 0.3s ease;
    color: ${(props) => (props.darkMode ? props.theme.colors.text : "inherit")};
  }

  svg {
    opacity: 0.8;
    color: ${(props) =>
      props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
    transition: all 0.5s ease;
  }

  ${AddMoreCard}:hover & {
    color: ${(props) =>
      props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};

    svg {
      opacity: 1;
      transform: scale(1.1) rotate(180deg);
      animation: pulse 1.5s infinite;
    }

    h3 {
      transform: scale(1.05);
      color: ${(props) =>
        props.darkMode
          ? props.theme.colors.accent
          : props.theme.colors.primary};
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1) rotate(180deg);
    }
    50% {
      transform: scale(1.1) rotate(180deg);
    }
    100% {
      transform: scale(1) rotate(180deg);
    }
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 16px;
      margin-top: 12px;
    }

    svg {
      font-size: 42px !important;
    }
  }
`;

const SummarySection = styled.section`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 5px 20px rgba(0, 0, 0, 0.15)"
      : "0 5px 20px rgba(0, 0, 0, 0.05)"};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${(props) =>
      props.darkMode
        ? "0 8px 25px rgba(0, 0, 0, 0.2)"
        : "0 8px 25px rgba(0, 0, 0, 0.08)"};
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    margin-bottom: 24px;
  }

  @media print {
    box-shadow: none;
    border: 1px solid #eaeaea;
    break-inside: avoid;
    page-break-inside: avoid;
  }
`;

const SummarySectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.primary : props.theme.colors.primary};
  color: white;
  transition: background 0.3s ease;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 24px;
      background: ${(props) =>
        props.darkMode ? props.theme.colors.background : "white"};
      border-radius: 3px;
      margin-left: 12px;
      transition: background 0.3s ease;
    }
  }

  @media (max-width: 768px) {
    padding: 16px 20px;

    h2 {
      font-size: 1.2rem;

      &::before {
        height: 18px;
        width: 4px;
        margin-left: 10px;
      }
    }
  }

  @media print {
    background: #f0f4f8;
    color: ${(props) => props.theme.colors.primary};

    h2::before {
      background: ${(props) => props.theme.colors.primary};
    }
  }
`;

const SummaryPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: ${(props) =>
    props.darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.2)"};
  padding: 6px 16px;
  border-radius: 30px;
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 5px 14px;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    padding: 4px 12px;
  }

  @media print {
    background: rgba(59, 88, 152, 0.1);
  }
`;

const SummaryBody = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  background: ${(props) =>
    props.darkMode
      ? `linear-gradient(to bottom, ${props.theme.colors.card}, ${props.theme.colors.surface})`
      : "linear-gradient(to bottom, white, #f9fafc)"};
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background: ${(props) =>
      props.darkMode
        ? `rgba(${props.theme.colors.accent}, 0.05)`
        : `rgba(${props.theme.colors.primary}, 0.05)`};
    transform: translateY(-2px);
  }
`;

const SummaryLabel = styled.div`
  color: ${(props) =>
    props.darkMode
      ? props.theme.colors.textSecondary
      : props.theme.colors.textSecondary};
  font-size: 14px;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary};
    margin-left: 8px;
    opacity: 0.7;
  }
`;

const SummaryValue = styled.div`
  color: ${(props) =>
    props.darkMode ? props.theme.colors.text : props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  padding-right: 14px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ActionsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  padding: 20px;
  border-radius: 18px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 5px 15px rgba(0, 0, 0, 0.15)"
      : "0 5px 15px rgba(0, 0, 0, 0.05)"};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${(props) =>
      props.darkMode
        ? "0 8px 20px rgba(0, 0, 0, 0.2)"
        : "0 8px 20px rgba(0, 0, 0, 0.08)"};
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 16px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    padding: 14px;
  }

  @media print {
    display: none;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 4px 12px rgba(0, 0, 0, 0.2)"
      : "0 4px 12px rgba(0, 0, 0, 0.1)"};
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: ${(props) =>
      props.darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease;
  }

  &:hover:before {
    width: 300px;
    height: 300px;
  }

  ${(props) =>
    props.primary &&
    `
    background: ${props.theme.colors.primary};
    color: ${props.darkMode ? props.theme.colors.background : "white"};
    box-shadow: 0 4px 15px ${
      props.darkMode
        ? `rgba(${props.theme.colors.primary.replace(/[^\d,]/g, "")}, 0.3)`
        : "rgba(74, 114, 172, 0.25)"
    };
    
    &:hover {
      box-shadow: 0 6px 18px ${
        props.darkMode
          ? `rgba(${props.theme.colors.primary.replace(/[^\d,]/g, "")}, 0.4)`
          : "rgba(74, 114, 172, 0.35)"
      };
      transform: translateY(-3px);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  `}

  ${(props) =>
    props.secondary &&
    `
    background: ${props.darkMode ? props.theme.colors.accent : "#2196f3"};
    color: ${props.darkMode ? props.theme.colors.background : "white"};
    box-shadow: 0 4px 15px ${
      props.darkMode
        ? `rgba(${props.theme.colors.accent.replace(/[^\d,]/g, "")}, 0.25)`
        : "rgba(33, 150, 243, 0.25)"
    };
    
    &:hover {
      background: ${props.darkMode ? props.theme.colors.accent : "#1e88e5"};
      box-shadow: 0 6px 18px ${
        props.darkMode
          ? `rgba(${props.theme.colors.accent.replace(/[^\d,]/g, "")}, 0.35)`
          : "rgba(33, 150, 243, 0.35)"
      };
      transform: translateY(-3px);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  `}
  
  ${(props) =>
    props.tertiary &&
    `
    background: ${props.darkMode ? props.theme.colors.primary : "#ff9800"};
    color: ${props.darkMode ? props.theme.colors.background : "white"};
    box-shadow: 0 4px 15px ${
      props.darkMode
        ? `rgba(${props.theme.colors.primary.replace(/[^\d,]/g, "")}, 0.25)`
        : "rgba(255, 152, 0, 0.25)"
    };
    
    &:hover {
      background: ${
        props.darkMode ? `${props.theme.colors.accent}` : "#f57c00"
      };
      box-shadow: 0 6px 18px ${
        props.darkMode
          ? `rgba(${props.theme.colors.accent.replace(/[^\d,]/g, "")}, 0.35)`
          : "rgba(255, 152, 0, 0.35)"
      };
      transform: translateY(-3px);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  `}
  
  ${(props) =>
    !props.primary &&
    !props.secondary &&
    !props.tertiary &&
    `
    background: ${props.darkMode ? props.theme.colors.surface : "#f0f4f8"};
    color: ${
      props.darkMode ? props.theme.colors.text : props.theme.colors.text
    };
    
    &:hover {
      background: ${props.darkMode ? props.theme.colors.card : "#e0e6ed"};
      transform: translateY(-3px);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  `}
  
  svg {
    font-size: 20px;
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover svg {
    transform: scale(1.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.primary
          ? `rgba(${props.theme.colors.primary.replace(/[^\d,]/g, "")}, 0.3)`
          : props.secondary
          ? props.darkMode
            ? `rgba(${props.theme.colors.accent.replace(/[^\d,]/g, "")}, 0.3)`
            : "rgba(33, 150, 243, 0.3)"
          : props.tertiary
          ? props.darkMode
            ? `rgba(${props.theme.colors.primary.replace(/[^\d,]/g, "")}, 0.3)`
            : "rgba(255, 152, 0, 0.3)"
          : "rgba(0, 0, 0, 0.1)"};
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 14px;

    svg {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 12px;
  }
`;

// Update other styled components similarly for dark mode support...

const ShareOptionsOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ShareOptionsCard = styled.div`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: scaleIn 0.3s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  h3 {
    color: var(--text-primary);
    font-size: 1.5rem;
    margin: 0 0 20px 0;
    position: relative;
    padding-bottom: 15px;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(
        to right,
        var(--primary-color),
        var(--secondary-color)
      );
      border-radius: 3px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 16px;
      padding-bottom: 12px;

      &:after {
        width: 50px;
        height: 2px;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 16px;

    h3 {
      font-size: 1.2rem;
      padding-bottom: 10px;

      &:after {
        width: 40px;
      }
    }
  }
`;

const ShareOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const ShareOption = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 5px;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(75, 114, 173, 0.05);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover {
    background: #f5f7fa;
    transform: translateY(-3px);

    &::before {
      opacity: 1;
    }

    .icon {
      transform: scale(1.1);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    }

    span {
      color: var(--primary-color);
      font-weight: 600;
    }
  }

  .icon {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 1;
  }

  .icon.whatsapp {
    background-color: #25d366;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3E%3Cpath d='M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411'/%3E%3C/svg%3E");
  }

  .icon.telegram {
    background-color: #0088cc;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3E%3Cpath d='M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z'/%3E%3C/svg%3E");
  }

  .icon.twitter {
    background-color: #1da1f2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3E%3Cpath d='M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723 10.054 10.054 0 0 1-3.127 1.184 4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 0 0 2.46-2.548l-.047-.02z'/%3E%3C/svg%3E");
  }

  .icon.email {
    background-color: #ea4335;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3E%3Cpath d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E");
  }

  .icon.copy {
    background-color: #607d8b;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3E%3Cpath d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/%3E%3C/svg%3E");
  }

  span {
    margin-top: 10px;
    font-size: 15px;
    color: var(--text-primary);
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 12px 5px;

    .icon {
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
    }

    span {
      font-size: 14px;
      margin-top: 8px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px 5px;

    .icon {
      width: 42px;
      height: 42px;
      margin-bottom: 6px;
    }

    span {
      font-size: 13px;
      margin-top: 6px;
    }
  }
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DialogContent = styled(motion.div)`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.surface : "white"};
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 450px;
  box-shadow: ${(props) =>
    props.darkMode
      ? `0 15px 40px rgba(0, 0, 0, 0.4)`
      : `0 15px 40px rgba(0, 0, 0, 0.25)`};
  text-align: center;
  direction: rtl;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 4px;
    width: 100%;
    background: ${(props) =>
      props.darkMode
        ? `linear-gradient(to right, ${props.theme.colors.primary}, ${props.theme.colors.accent})`
        : "linear-gradient(to right, #f44336, #e53935)"};
  }

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    max-width: 320px;
    border-radius: 14px;
  }
`;

const DialogTitle = styled.h3`
  color: ${(props) =>
    props.darkMode ? props.theme.colors.primary : "#f44336"};
  font-size: 1.6rem;
  margin: 0 0 16px 0;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
`;

const DialogText = styled.p`
  color: ${(props) =>
    props.darkMode
      ? props.theme.colors.textSecondary
      : "var(--text-secondary)"};
  margin: 0 0 28px 0;
  line-height: 1.6;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 24px;
    line-height: 1.5;
  }

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
    flex-direction: column-reverse;
    gap: 12px;
  }
`;

const CancelButton = styled.button`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.background : "#f5f5f5"};
  color: ${(props) =>
    props.darkMode ? props.theme.colors.text : "var(--text-primary)"};
  border: none;
  border-radius: 10px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background: ${(props) =>
      props.darkMode ? props.theme.colors.card : "#e5e5e5"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px;
  }
`;

const DeleteButton = styled.button`
  background: ${(props) =>
    props.darkMode
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`
      : "linear-gradient(135deg, #f44336, #e53935)"};
  color: ${(props) =>
    props.darkMode ? props.theme.colors.background : "white"};
  border: none;
  border-radius: 10px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: ${(props) =>
    props.darkMode
      ? `0 4px 12px rgba(246, 177, 122, 0.3)`
      : "0 4px 12px rgba(244, 67, 54, 0.25)"};
  flex: 1;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease;
  }

  &:hover {
    box-shadow: ${(props) =>
      props.darkMode
        ? `0 6px 16px rgba(246, 177, 122, 0.4)`
        : "0 6px 16px rgba(244, 67, 54, 0.35)"};
    transform: translateY(-2px);

    &::before {
      width: 300px;
      height: 300px;
    }

    svg {
      transform: rotate(90deg) scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${(props) =>
      props.darkMode
        ? `0 4px 12px rgba(246, 177, 122, 0.3)`
        : "0 4px 12px rgba(244, 67, 54, 0.25)"};
  }

  svg {
    font-size: 18px;
    position: relative;
    transition: transform 0.3s ease;
  }
`;

const SuccessCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  color: #4caf50;
  padding: 16px 30px;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  border-right: 4px solid #4caf50;
  border-left: 1px solid #e0e0e0;
  z-index: 1000;
  min-width: 220px;

  span {
    position: relative;
    z-index: 1;
  }

  svg {
    animation: pulse 2s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    padding: 14px 25px;
    font-size: 15px;
    gap: 10px;
    min-width: 200px;
    bottom: 25px;
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 40px;
    bottom: 20px;
    min-width: 180px;

    svg {
      font-size: 20px;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.background : "#f5f7fa"};
  border-radius: 20px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 10px 35px rgba(0, 0, 0, 0.3)"
      : "0 10px 35px rgba(0, 0, 0, 0.08)"};
  margin: 30px auto;
  max-width: 1100px;
  padding: 40px;
  direction: rtl;
  overflow: hidden;
  position: relative;
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: ${(props) =>
      props.darkMode
        ? `linear-gradient(135deg, ${props.theme.colors.primary}15, ${props.theme.colors.accent}15)`
        : "linear-gradient(135deg, rgba(59, 88, 152, 0.05), rgba(75, 114, 173, 0.05))"};
    border-radius: 50%;
    top: -150px;
    left: -150px;
    z-index: 0;
    transition: background 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: ${(props) =>
      props.darkMode
        ? `linear-gradient(135deg, ${props.theme.colors.primary}15, ${props.theme.colors.accent}15)`
        : "linear-gradient(135deg, rgba(59, 88, 152, 0.05), rgba(75, 114, 173, 0.05))"};
    border-radius: 50%;
    bottom: -150px;
    right: -150px;
    z-index: 0;
    transition: background 0.3s ease;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .loader {
    margin-bottom: 30px;
  }

  .plane-container {
    width: 220px;
    height: 220px;
    position: relative;
    perspective: 1200px;
  }

  .plane {
    width: 90px;
    height: 90px;
    background: ${(props) =>
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${
          props.darkMode
            ? encodeURIComponent(props.theme.colors.primary)
            : "%233b5898"
        }'%3E%3Cpath d='M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'/%3E%3C/svg%3E")`}
      no-repeat center center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: fly 3.5s ease-in-out infinite;
    filter: ${(props) =>
      props.darkMode
        ? `drop-shadow(0 5px 15px ${props.theme.colors.primary}50)`
        : "drop-shadow(0 5px 15px rgba(59, 88, 152, 0.3))"};
    transition: filter 0.3s ease, background 0.3s ease;
  }

  .earth {
    width: 140px;
    height: 140px;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: ${(props) =>
        `linear-gradient(to right, ${props.theme.colors.primary}, ${props.theme.colors.accent})`};
      border-radius: 3px;
      transition: background 0.3s ease;
    }
  }

  h2 {
    color: ${(props) =>
      props.darkMode ? props.theme.colors.text : props.theme.colors.text};
    font-weight: 600;
    margin-top: 10px;
    transition: color 0.3s ease;
  }

  @keyframes fly {
    0% {
      transform: translate(-50%, -50%) rotate(0) translateY(0) scale(1);
    }
    25% {
      transform: translate(-40%, -60%) rotate(12deg) translateY(-15px)
        scale(1.05);
    }
    50% {
      transform: translate(-50%, -40%) rotate(0) translateY(15px) scale(1);
    }
    75% {
      transform: translate(-60%, -60%) rotate(-12deg) translateY(-8px)
        scale(0.95);
    }
    100% {
      transform: translate(-50%, -50%) rotate(0) translateY(0) scale(1);
    }
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0) scale(0.6);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg) scale(0.6);
    }
  }

  @media (max-width: 768px) {
    padding: 30px;
    margin: 20px auto;
    min-height: 70vh;
    border-radius: 16px;

    .plane-container {
      width: 180px;
      height: 180px;
    }

    .plane {
      width: 70px;
      height: 70px;
    }

    .earth {
      width: 110px;
      height: 110px;
    }

    h2 {
      font-size: 1.7rem;

      &::after {
        width: 50px;
        height: 2px;
        bottom: -8px;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 20px;
    min-height: 60vh;
    border-radius: 14px;

    .loader {
      margin-bottom: 20px;
    }

    .plane-container {
      width: 150px;
      height: 150px;
    }

    .plane {
      width: 60px;
      height: 60px;
    }

    .earth {
      width: 90px;
      height: 90px;
      transform: translate(-50%, -50%) scale(0.5);
    }

    h2 {
      font-size: 1.5rem;

      &::after {
        width: 40px;
        bottom: -6px;
      }
    }
  }
`;

const ErrorCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  color: ${(props) => props.theme.colors.error};
  padding: 16px 30px;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  border-right: 4px solid #f44336;
  border-left: 1px solid #e0e0e0;
  z-index: 1000;
  min-width: 280px;
  direction: rtl;

  span {
    position: relative;
    z-index: 1;
  }

  svg {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-3px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(3px, 0, 0);
    }
  }

  @media (max-width: 768px) {
    padding: 14px 25px;
    font-size: 15px;
    gap: 10px;
    min-width: 250px;
    bottom: 25px;
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 40px;
    bottom: 20px;
    min-width: 220px;

    svg {
      font-size: 20px;
    }
  }
`;

const ErrorIcon = styled(ErrorOutlineIcon)`
  color: #f44336;
  font-size: 24px;
`;

// Add these to the end of your file with the other styled components

// Schedule Section Styles
const ScheduleSection = styled.section`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 5px 20px rgba(0, 0, 0, 0.15)"
      : "0 5px 20px rgba(0, 0, 0, 0.05)"};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 24px;
  }
`;

const DaysCount = styled(PlacesCount)``;

const ScheduleTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DaySchedule = styled.div`
  position: relative;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.surface : "#f9fafc"};
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) =>
      props.darkMode
        ? "0 8px 25px rgba(0, 0, 0, 0.2)"
        : "0 8px 25px rgba(0, 0, 0, 0.08)"};
  }
`;

const DayHeader = styled.div`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.primary : props.theme.colors.primary};
  padding: 16px 20px;
  color: white;

  .day-number {
    font-weight: 600;
    font-size: 18px;
  }
`;

const DayActivities = styled.div`
  padding: 16px;
`;

const Activity = styled.div`
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed
    ${(props) =>
      props.darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ActivityTime = styled.div`
  min-width: 100px;
  font-weight: 600;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
  padding-left: 16px;
`;

const ActivityDetails = styled.div`
  flex: 1;
`;

const ActivityName = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.text : props.theme.colors.text};
`;

const ActivityPlace = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: ${(props) =>
    props.darkMode
      ? props.theme.colors.textSecondary
      : props.theme.colors.textSecondary};

  svg {
    font-size: 14px;
    color: ${(props) =>
      props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
  }
`;

// Tips Section Styles
const TipsSection = styled.section`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : props.theme.colors.surface};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 5px 20px rgba(0, 0, 0, 0.15)"
      : "0 5px 20px rgba(0, 0, 0, 0.05)"};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 24px;
  }
`;

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TipItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.surface : "#f9fafc"};
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const TipIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.primary : props.theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`;

const TipText = styled.div`
  color: ${(props) =>
    props.darkMode ? props.theme.colors.text : props.theme.colors.text};
  line-height: 1.6;
`;

export default FinalProgram;
