"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isYesterday, isThisWeek } from "date-fns";
import { arSA, th } from "date-fns/locale";
import { useTheme } from "../context/ThemeContext";
import {
  NotificationsActive as NotificationsActiveIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  NotificationsNone as NotificationsNoneIcon,
  DeleteSweep as DeleteSweepIcon,
} from "@mui/icons-material";

// Sample notification data - replace with your actual API fetch
const sampleNotifications = [
  {
    id: 1,
    type: "success",
    title: "تم حجز رحلتك بنجاح",
    message: "تم تأكيد حجز رحلتك إلى شرم الشيخ. استمتع برحلتك!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isRead: false,
  },
  {
    id: 2,
    type: "info",
    title: "تذكير بموعد الرحلة",
    message: "رحلتك إلى الأقصر تبدأ غداً. تأكد من إستعداداتك!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    isRead: true,
  },
  {
    id: 3,
    type: "warning",
    title: "تغيير في موعد الرحلة",
    message:
      "تم تغيير موعد الانطلاق إلى الساعة الثامنة صباحاً بدلاً من العاشرة",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: false,
  },
  {
    id: 4,
    type: "error",
    title: "مشكلة في الدفع",
    message:
      "نعتذر، حدثت مشكلة أثناء معالجة عملية الدفع الخاصة بك. يرجى المحاولة مرة أخرى",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    isRead: true,
  },
  {
    id: 5,
    type: "success",
    title: "خصم خاص لك",
    message: "حصلت على خصم 15% على رحلتك القادمة كعميل مميز!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    isRead: false,
  },
  {
    id: 6,
    type: "info",
    title: "عروض جديدة متاحة",
    message: "تم إضافة وجهات سفر جديدة! اكتشف الرحلات المميزة إلى أوروبا",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
    isRead: true,
  },
];

// Notification icon based on type
const getNotificationIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon style={{ color: "#4caf50" }} />;
    case "info":
      return <InfoIcon style={{ color: "#2196f3" }} />;
    case "warning":
      return <WarningIcon style={{ color: "#ff9800" }} />;
    case "error":
      return <ErrorIcon style={{ color: "#f44336" }} />;
    default:
      return <InfoIcon style={{ color: "#2196f3" }} />;
  }
};

// Format relative time
const formatNotificationDate = (timestamp) => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return `اليوم ${format(date, "h:mm a", { locale: arSA })}`;
  } else if (isYesterday(date)) {
    return `الأمس ${format(date, "h:mm a", { locale: arSA })}`;
  } else if (isThisWeek(date)) {
    return format(date, "EEEE", { locale: arSA });
  } else {
    return format(date, "d MMM yyyy", { locale: arSA });
  }
};

// Group notifications by date
const groupNotificationsByDate = (notifications) => {
  const groups = {};

  notifications.forEach((notification) => {
    const date = new Date(notification.timestamp);
    let groupKey;

    if (isToday(date)) {
      groupKey = "اليوم";
    } else if (isYesterday(date)) {
      groupKey = "الأمس";
    } else if (isThisWeek(date)) {
      groupKey = "هذا الأسبوع";
    } else {
      groupKey = "قديم";
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(notification);
  });

  // Order by most recent
  const orderedGroups = {};
  ["اليوم", "الأمس", "هذا الأسبوع", "قديم"].forEach((key) => {
    if (groups[key]) {
      orderedGroups[key] = groups[key].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    }
  });

  return orderedGroups;
};

const Notifications = () => {
  const { darkMode, theme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [showClearAll, setShowClearAll] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState(null);

  // Fetch notifications data
  useEffect(() => {
    // Simulate API fetch
    const fetchNotifications = async () => {
      try {
        // Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNotifications(sampleNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...notifications];

    // Apply type filter
    if (filter !== "all") {
      if (filter === "unread") {
        result = result.filter((item) => !item.isRead);
      } else {
        result = result.filter((item) => item.type === filter);
      }
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.message.toLowerCase().includes(term)
      );
    }

    setFilteredNotifications(result);
  }, [notifications, filter, searchTerm]);

  // Mark notification as read
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
    // Add animation completion effect
    setTimeout(() => {
      document
        .getElementById(`notification-${id}`)
        ?.classList.add("mark-complete");
      setTimeout(() => {
        document
          .getElementById(`notification-${id}`)
          ?.classList.remove("mark-complete");
      }, 1000);
    }, 100);
  }, []);

  // Delete notification
  const deleteNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );

    // Show success animation
    const toast = document.createElement("div");
    toast.className = "toast-notification success";
    toast.textContent = "تم تحديث جميع الإشعارات كمقروءة";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
    }, 100);
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setShowClearAll(false);
  }, []);

  // Toggle notification expansion
  const toggleExpand = useCallback((id) => {
    setExpandedNotification((prev) => (prev === id ? null : id));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  // Group notifications for display
  const groupedNotifications = groupNotificationsByDate(filteredNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationsContainer $darkMode={darkMode} theme={theme}>
      <NotificationsHeader $darkMode={darkMode} theme={theme}>
        <HeaderTitle $darkMode={darkMode} theme={theme}>
          <NotificationsActiveIcon className="header-icon" />
          الإشعارات
          {!loading && unreadCount > 0 && (
            <UnreadBadge>{unreadCount}</UnreadBadge>
          )}
        </HeaderTitle>

        <HeaderActions>
          {notifications.length > 0 && (
            <>
              <ActionButton
                onClick={markAllAsRead}
                title="تحديث الكل كمقروء"
                $darkMode={darkMode}
                theme={theme}
              >
                <CheckCircleOutlineIcon /> قراءة الكل
              </ActionButton>
              <ActionButton
                $danger // Changed from danger to $danger
                onClick={() => setShowClearAll(true)}
                title="حذف جميع الإشعارات"
                $darkMode={darkMode}
                theme={theme}
              >
                <DeleteSweepIcon /> حذف الكل
              </ActionButton>
            </>
          )}
        </HeaderActions>
      </NotificationsHeader>

      <NotificationsControls $darkMode={darkMode} theme={theme}>
        <SearchContainer $darkMode={darkMode} theme={theme}>
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="بحث في الإشعارات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ color: theme?.colors?.text || "#333" }}
          />
          {searchTerm && (
            <ClearButton
              onClick={() => setSearchTerm("")}
              title="مسح البحث"
              $darkMode={darkMode}
              theme={theme}
            >
              <CloseIcon />
            </ClearButton>
          )}
        </SearchContainer>

        <FilterContainer>
          <FilterButton
            $active={filter === "all"} // Changed from active to $active
            onClick={() => setFilter("all")}
            $darkMode={darkMode}
            theme={theme}
          >
            الكل
          </FilterButton>
          <FilterButton
            $active={filter === "unread"} // Changed from active to $active
            onClick={() => setFilter("unread")}
            $darkMode={darkMode}
            theme={theme}
          >
            غير مقروءة
          </FilterButton>
          <FilterButton
            $active={filter === "success"} // Changed from active to $active
            onClick={() => setFilter("success")}
            color="#4caf50"
            $darkMode={darkMode}
            theme={theme}
          >
            تأكيدات
          </FilterButton>
          <FilterButton
            $active={filter === "info"} // Changed from active to $active
            onClick={() => setFilter("info")}
            color="#2196f3"
            $darkMode={darkMode}
            theme={theme}
          >
            معلومات
          </FilterButton>
          <FilterButton
            $active={filter === "warning"} // Changed from active to $active
            onClick={() => setFilter("warning")}
            color="#ff9800"
            $darkMode={darkMode}
            theme={theme}
          >
            تنبيهات
          </FilterButton>
          <FilterButton
            $active={filter === "error"} // Changed from active to $active
            onClick={() => setFilter("error")}
            color="#f44336"
            $darkMode={darkMode}
            theme={theme}
          >
            مشاكل
          </FilterButton>
        </FilterContainer>
      </NotificationsControls>

      <NotificationList $darkMode={darkMode} theme={theme}>
        {loading ? (
          <LoadingState $darkMode={darkMode} theme={theme}>
            <div className="loading-animation">
              <div className="loading-plane"></div>
              <div className="cloud cloud1"></div>
              <div className="cloud cloud2"></div>
              <div className="cloud cloud3"></div>
            </div>
            <h3>جاري تحميل الإشعارات...</h3>
          </LoadingState>
        ) : notifications.length === 0 ? (
          <EmptyState $darkMode={darkMode} theme={theme}>
            <div className="empty-illustration">
              <NotificationsNoneIcon className="empty-icon" />
            </div>
            <h3>لا توجد إشعارات</h3>
            <p>ستظهر هنا جميع الإشعارات والتحديثات المتعلقة برحلاتك وحسابك</p>
          </EmptyState>
        ) : filteredNotifications.length === 0 ? (
          <NoResults $darkMode={darkMode} theme={theme}>
            <div className="search-illustration">
              <SearchIcon className="search-icon" />
            </div>
            <h3>لا توجد نتائج مطابقة</h3>
            <p>لم نتمكن من العثور على إشعارات مطابقة لبحثك</p>
            <ResetButton $darkMode={darkMode} theme={theme}>
              <FilterListIcon /> إعادة ضبط الفلتر
            </ResetButton>
          </NoResults>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(groupedNotifications).map(([date, items]) => (
              <React.Fragment key={date}>
                <DateDivider $darkMode={darkMode} theme={theme}>
                  {date}
                </DateDivider>
                <AnimatePresence>
                  {items.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      id={`notification-${notification.id}`}
                      layoutId={`notification-${notification.id}`}
                      $isRead={notification.isRead} // Changed to $isRead
                      $type={notification.type} // Changed to $type
                      $isExpanded={expandedNotification === notification.id} // Changed to $isExpanded
                      onClick={() => toggleExpand(notification.id)}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      $darkMode={darkMode}
                      theme={theme}
                    >
                      <NotificationIconWrapper $type={notification.type}>
                        {getNotificationIcon(notification.type)}
                      </NotificationIconWrapper>

                      <NotificationContent>
                        <NotificationTitle>
                          {notification.title}
                          {!notification.isRead && <UnreadDot />}
                        </NotificationTitle>

                        <NotificationMessage
                          $isExpanded={expandedNotification === notification.id}
                        >
                          {notification.message}
                        </NotificationMessage>

                        <NotificationTime>
                          {formatNotificationDate(notification.timestamp)}
                        </NotificationTime>
                      </NotificationContent>

                      <NotificationActions>
                        {!notification.isRead && (
                          <ActionIconButton
                            title="تحديث كمقروء"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="read-button"
                          >
                            <CheckCircleOutlineIcon />
                          </ActionIconButton>
                        )}
                        <ActionIconButton
                          title="حذف الإشعار"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="delete-button"
                        >
                          <DeleteIcon />
                        </ActionIconButton>
                      </NotificationActions>
                    </NotificationCard>
                  ))}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </NotificationList>

      <AnimatePresence>
        {showClearAll && (
          <ConfirmDialog
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            $darkMode={darkMode}
            theme={theme}
          >
            <ConfirmDialogContent>
              <h3>حذف جميع الإشعارات</h3>
              <p>
                هل أنت متأكد من حذف جميع الإشعارات؟ لا يمكن التراجع عن هذا
                الإجراء.
              </p>
              <ConfirmDialogActions>
                <CancelButton
                  $darkMode={darkMode}
                  theme={theme}
                  onClick={() => setShowClearAll(false)}
                >
                  إلغاء
                </CancelButton>
                <DeleteButton
                  $darkMode={darkMode}
                  theme={theme}
                  onClick={clearAllNotifications}
                >
                  <DeleteIcon /> حذف الكل
                </DeleteButton>
              </ConfirmDialogActions>
            </ConfirmDialogContent>
          </ConfirmDialog>
        )}
      </AnimatePresence>
    </NotificationsContainer>
  );
};

export default memo(Notifications);
// Enhanced Styled Components
const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.$darkMode ? props.theme?.colors?.surface || "#2D3250" : "#fff"};
  border-radius: 20px;
  box-shadow: 0 10px 30px
    ${(props) =>
      props.$darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"};
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 40px;
  overflow: hidden;
  direction: rtl;
  height: calc(100vh - 160px);
  position: relative;
  color: ${(props) =>
    props.theme?.colors?.text || (props.$darkMode ? "#e0e0e0" : "#333")};

  @media (max-width: 1024px) {
    width: 90%;
    margin-top: 90px;
    height: calc(100vh - 150px);
  }

  @media (max-width: 768px) {
    width: 95%;
    margin-top: 80px;
    border-radius: 16px;
    height: calc(100vh - 140px);
  }

  @media (max-width: 480px) {
    width: 95%;
    margin-top: 70px;
    border-radius: 14px;
    height: calc(100vh - 130px);
  }

  /* Global styles for animations */
  .mark-complete {
    background-color: ${(props) =>
      props.$darkMode ? "rgba(76, 175, 80, 0.2)" : "#e8f5e9"} !important;
    transition: background-color 0.5s ease;
  }

  @keyframes planeMove {
    0% {
      transform: translateX(0) translateY(0) rotate(0);
    }
    25% {
      transform: translateX(15px) translateY(-15px) rotate(5deg);
    }
    75% {
      transform: translateX(-15px) translateY(15px) rotate(-5deg);
    }
    100% {
      transform: translateX(0) translateY(0) rotate(0);
    }
  }

  @keyframes cloudMove {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(0);
    }
  }

  .toast-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: ${(props) =>
      props.$darkMode ? props.theme?.colors?.surface || "#2D3250" : "white"};
    color: #4caf50;
    padding: 15px 25px;
    border-radius: 50px;
    box-shadow: 0 5px 15px
      ${(props) =>
        props.$darkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: transform 0.3s ease;
    z-index: 9999;
  }

  .toast-notification.success:before {
    content: "✓";
    background: #4caf50;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toast-notification.show {
    transform: translateX(-50%) translateY(0);
  }
`;

const NotificationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: ${(props) =>
    props.$darkMode
      ? props.theme?.colors?.primary || "#F6B17A"
      : "linear-gradient(135deg, #3b5898, #4b72ad)"};
  color: ${(props) => (props.$darkMode ? "#111" : "white")};
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ $darkMode }) => ($darkMode ? "#111" : "white")};

  .header-icon {
    font-size: 24px;
    animation: pulse 2s infinite;
    color: ${({ $darkMode, theme }) => ($darkMode ? "#111" : "white")};
    filter: ${({ $darkMode }) =>
      $darkMode
        ? "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))"
        : "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.2))"};
    transition: color 0.3s ease, filter 0.3s ease;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 480px) {
    font-size: 18px;

    .header-icon {
      font-size: 22px;
    }
  }
`;

const UnreadBadge = styled.span`
  background: #ff5252;
  color: white;
  border-radius: 20px;
  padding: 2px 8px;
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) =>
    props.$danger
      ? props.$darkMode
        ? "rgba(255, 59, 48, 0.25)"
        : "rgba(255, 59, 48, 0.15)"
      : props.$darkMode
      ? "rgba(255, 255, 255, 0.25)"
      : "rgba(255, 255, 255, 0.15)"};
  border: 1px solid
    ${(props) =>
      props.$danger
        ? props.$darkMode
          ? "rgba(255, 59, 48, 0.4)"
          : "rgba(255, 59, 48, 0.3)"
        : props.$darkMode
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(255, 255, 255, 0.3)"};
  color: ${(props) => (props.$darkMode ? "#111" : "white")};
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$danger
        ? props.$darkMode
          ? "rgba(255, 59, 48, 0.35)"
          : "rgba(255, 59, 48, 0.25)"
        : props.$darkMode
        ? "rgba(255, 255, 255, 0.35)"
        : "rgba(255, 255, 255, 0.25)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 6px 10px;
  }
`;

const NotificationsControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  background: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.controlsBackgroundDark : "#f9fafc"};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 12px 20px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.searchBackgroundDark : "#  "};
  border: 1px solid
    ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.searchBorderDark : "#e0e0e0"};
  border-radius: 12px;
  padding: 8px 16px;
  flex: 1;
  max-width: 350px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:focus-within {
    border-color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.searchFocusBorderDark : "#4b72ad"};
    box-shadow: 0 0 0 3px
      ${({ $darkMode, theme }) =>
        $darkMode
          ? theme.colors.searchFocusShadowDark
          : "rgba(75, 114, 172, 0.15)"};
  }

  .search-icon {
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.searchIconDark : "#9ca3af"};
    font-size: 20px;
    margin-left: 8px;
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 15px;
    background: transparent;
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.textDark : "#333"};
    font-family: "Amiri", serif;
  }

  @media (max-width: 768px) {
    max-width: none;
    flex: 1;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 8px 12px;

    input {
      font-size: 14px;
    }
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.clearButtonDark : "#9ca3af"};
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.clearButtonHoverDark : "#4b5563"};
    background: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.clearButtonBackgroundHoverDark : "#f3f4f6"};
  }

  svg {
    font-size: 18px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex: 1;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: flex-start;
    gap: 6px;
  }
`;

const FilterButton = styled.button`
  background: ${(props) => {
    if (props.$active) {
      if (props.color) {
        return `linear-gradient(135deg, ${props.color}, ${props.color}99)`;
      }
      return props.$darkMode
        ? props.theme?.colors?.primary || "#F6B17A"
        : "linear-gradient(135deg, #3b5898, #4b72ad)";
    }
    return props.$darkMode
      ? props.theme?.colors?.surface || "#424769"
      : "#f0f0f0";
  }};
  color: ${(props) =>
    props.$active
      ? props.$darkMode && !props.color
        ? "#111"
        : "white"
      : props.theme?.colors?.text || (props.$darkMode ? "#e0e0e0" : "#555")};
  border: none;
  border-radius: 30px;
  padding: 7px 14px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$active ? "0 3px 8px rgba(0, 0, 0, 0.15)" : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: ${(props) =>
      props.$active
        ? props.color
          ? `linear-gradient(135deg, ${props.color}, ${props.color}99)`
          : "linear-gradient(135deg, #3b5898, #4b72ad)"
        : "#e5e5e5"};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;
const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 24px;
  scrollbar-width: thin;
  scrollbar-color: rgba(75, 114, 173, 0.3) transparent;
  position: relative;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(75, 114, 173, 0.3);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(75, 114, 173, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0 16px 16px;
  }

  @media (max-width: 480px) {
    padding: 0 12px 12px;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.textSecondary : theme.colors.textSecondary};
  text-align: center;
  height: 100%;
  min-height: 300px;

  h3 {
    margin-top: 24px;
    font-size: 18px;
    font-weight: 600;
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.text : theme.colors.text};
  }

  .loading-animation {
    position: relative;
    width: 200px;
    height: 120px;
  }

  .loading-plane {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 60px;
    height: 60px;
    transform: translate(-50%, -50%);
    background: ${({ $darkMode, theme }) =>
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(
        $darkMode ? theme.colors.primary : theme.colors.primary
      )}'%3E%3Cpath d='M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'/%3E%3C/svg%3E") no-repeat center center`};
    animation: planeMove 3s infinite ease-in-out;
    z-index: 2;
  }

  .cloud {
    position: absolute;
    background: ${({ $darkMode, theme }) =>
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(
        $darkMode ? theme.colors.border : "#d1d5db"
      )}'%3E%3Cpath d='M12 6c-2.67 0-5.05 1.66-6 4.15 0 0 0 .01-.01.01C2.92 11.65 0 13.36 0 18c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4 0-3.53-2.7-6.24-6.1-6.96l-.58-.22-.16-.6C16.26 7.44 14.3 6 12 6z'/%3E%3C/svg%3E") no-repeat center center`};
    width: 60px;
    height: 40px;
    z-index: 1;
    opacity: ${({ $darkMode }) => ($darkMode ? 0.6 : 0.8)};
  }

  .cloud1 {
    top: 20%;
    left: 10%;
    transform: scale(0.8);
    animation: cloudMove 8s infinite ease-in-out;
  }

  .cloud2 {
    top: 40%;
    right: 10%;
    transform: scale(0.6);
    animation: cloudMove 6s infinite ease-in-out 1s;
  }

  .cloud3 {
    bottom: 20%;
    left: 30%;
    transform: scale(1);
    animation: cloudMove 9s infinite ease-in-out 2s;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    .loading-animation {
      width: 160px;
      height: 100px;
    }
  }

  /* Background for animation container */
  &::before {
    content: "";
    position: absolute;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: ${({ $darkMode, theme }) =>
      $darkMode ? "rgba(66, 71, 105, 0.3)" : "rgba(245, 247, 250, 0.5)"};
    z-index: 0;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.textSecondaryDark : "var(--text-secondary)"};
  height: 100%;
  min-height: 300px;

  .empty-illustration {
    background: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.emptyIllustrationBackgroundDark : "#f4f7fc"};
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    box-shadow: inset 0 0 20px rgba(75, 114, 173, 0.1);
  }

  .empty-icon {
    font-size: 60px;
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.emptyIconDark : "#a1a1aa"};
    animation: pulse 2s infinite ease-in-out;
  }

  h3 {
    font-size: 20px;
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.textPrimaryDark : "var(--text-primary)"};
    margin-bottom: 12px;
    font-weight: 600;
  }

  p {
    max-width: 320px;
    line-height: 1.6;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    .empty-illustration {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }

    .empty-icon {
      font-size: 50px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 15px;
    }
  }
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.textSecondaryDark : "var(--text-secondary)"};
  height: 100%;
  min-height: 300px;

  .search-illustration {
    position: relative;
    width: 120px;
    height: 120px;
    background: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.searchIllustrationBackgroundDark : "#f4f7fc"};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    box-shadow: inset 0 0 20px rgba(75, 114, 173, 0.1);
  }

  .search-icon {
    font-size: 60px;
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.searchIconDark : "#a1a1aa"};
  }

  h3 {
    font-size: 20px;
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.textPrimaryDark : "var(--text-primary)"};
    margin-bottom: 12px;
    font-weight: 600;
  }

  p {
    max-width: 320px;
    line-height: 1.6;
    font-size: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    .search-illustration {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }

    .search-icon {
      font-size: 50px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 15px;
      margin-bottom: 20px;
    }
  }
`;

const ResetButton = styled.button`
  background: linear-gradient(135deg, #3b5898, #4b72ad);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(59, 88, 152, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 88, 152, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(59, 88, 152, 0.2);
  }

  @media (max-width: 480px) {
    padding: 8px 18px;
    font-size: 14px;
  }
`;

const DateDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0 16px;
  color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.textSecondaryDark : "var(--text-secondary)"};
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.dividerDark : "#e5e7eb"};
  }

  &::before {
    margin-left: 16px;
  }

  &::after {
    margin-right: 16px;
  }

  &:first-child {
    margin-top: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin: 20px 0 12px;

    &::before {
      margin-left: 12px;
    }

    &::after {
      margin-right: 12px;
    }
  }
`;

const NotificationCard = styled(motion.div)`
  display: flex;
  background: ${
    (props) =>
      props.$darkMode
        ? props.$isRead
          ? props.theme?.colors?.surface || "#3f435e"
          : `linear-gradient(to right, rgba(55, 65, 100, 0.4), rgba(45, 50, 80, 0.3))` // Darker in dark mode
        : props.$isRead
        ? "#ffffff"
        : `linear-gradient(to right, rgba(229, 231, 235, 0.9), rgba(229, 231, 235, 0.6))` // More gray in light mode
  };
  border: 1px solid
    ${(props) =>
      props.$darkMode
        ? props.theme?.colors?.border || "#7077A1"
        : props.$isRead
        ? "#eaeaea"
        : "#e5e9f0"};
  border-right: 3px solid
    ${(props) => {
      if (!props.$isRead) {
        switch (props.$type) {
          case "success":
            return "#4caf50";
          case "info":
            return "#2196f3";
          case "warning":
            return "#ff9800";
          case "error":
            return "#f44336";
          default:
            return "#3b5898";
        }
      }
      return "#eaeaea";
    }};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.25s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px
    rgba(0, 0, 0, ${(props) => (props.$isRead ? "0.02" : "0.05")});

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 3px;
    background: ${(props) => {
      switch (props.$type) {
        case "success":
          return "#4caf50";
        case "info":
          return "#2196f3";
        case "warning":
          return "#ff9800";
        case "error":
          return "#f44336";
        default:
          return "#3b5898";
      }
    }};
    opacity: ${(props) => (props.$isRead ? "0" : "1")};
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: 0 4px 12px
      rgba(0, 0, 0, ${(props) => (props.$isRead ? "0.05" : "0.08")});
    border-color: ${(props) => (props.$isRead ? "#d5d5d5" : "#c7d2e5")};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  ${(props) =>
    props.$isExpanded &&
    `
    background: #f8fafd;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  `}

  @media (max-width: 768px) {
    padding: 14px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin-bottom: 8px;
  }
`;

const NotificationIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-left: 16px;
  background: ${(props) => {
    switch (props.$type) {
      case "success":
        return "rgba(76, 175, 80, 0.12)";
      case "info":
        return "rgba(33, 150, 243, 0.12)";
      case "warning":
        return "rgba(255, 152, 0, 0.12)";
      case "error":
        return "rgba(244, 67, 54, 0.12)";
      default:
        return "rgba(59, 88, 152, 0.12)";
    }
  }};
  transition: all 0.3s ease;

  svg {
    font-size: 24px;
    transition: transform 0.3s ease;
  }

  ${NotificationCard}:hover & {
    transform: scale(1.05);

    svg {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-left: 14px;

    svg {
      font-size: 22px;
    }
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    margin-left: 12px;

    svg {
      font-size: 20px;
    }
  }
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 5px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.textPrimaryDark : "var(--text-primary)"};
  display: flex;
  align-items: center;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 3px;
  }
`;

const UnreadDot = styled.span`
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
    margin-right: 6px;
  }
`;

const NotificationMessage = styled.p`
  margin: 0;
  color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.textSecondaryDark : "var(--text-secondary)"};
  font-size: 15px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.$isExpanded ? "10" : "2")};
  -webkit-box-orient: vertical;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const NotificationTime = styled.div`
  color: #9ca3af;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    width: 3px;
    height: 3px;
    background: #d1d5db;
    border-radius: 50%;
    margin: 0 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 5px;
  }
`;

const NotificationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 8px;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  ${NotificationCard}:hover & {
    opacity: 1;
  }

  @media (max-width: 480px) {
    padding-right: 4px;
    gap: 6px;
  }
`;

const ActionIconButton = styled.button`
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;

  svg {
    font-size: 20px;
  }

  &:hover {
    background: #f1f5f9;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }

  &.read-button:hover {
    color: #4caf50;
    background: rgba(76, 175, 80, 0.1);
  }

  &.delete-button:hover {
    color: #f44336;
    background: rgba(244, 67, 54, 0.1);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;

    svg {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;

    svg {
      font-size: 16px;
    }
  }
`;

const ConfirmDialog = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  direction: rtl;
`;

const ConfirmDialogContent = styled.div`
  background: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.dialogBackgroundDark : "white"};
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  text-align: center;

  h3 {
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.textPrimaryDark : "var(--text-primary)"};
    font-size: 20px;
    margin-bottom: 16px;
    font-weight: 600;
  }

  p {
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.textSecondaryDark : "var(--text-secondary)"};
    margin-bottom: 24px;
    line-height: 1.6;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    padding: 24px;
    max-width: 360px;

    h3 {
      font-size: 18px;
      margin-bottom: 12px;
    }

    p {
      font-size: 15px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 12px;

    h3 {
      font-size: 17px;
    }

    p {
      font-size: 14px;
      margin-bottom: 18px;
    }
  }
`;

const ConfirmDialogActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 12px;
  }
`;

const CancelButton = styled.button`
  background: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.cancelButtonBackgroundDark : "#f1f5f9"};
  color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.textPrimaryDark : "var(--text-primary)"};
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.cancelButtonBackgroundHoverDark : "#e2e8f0"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const DeleteButton = styled.button`
  background: linear-gradient(135deg, #f44336, #e53935);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);

  svg {
    font-size: 18px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(244, 67, 54, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;

    svg {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
