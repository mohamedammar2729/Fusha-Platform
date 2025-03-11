import React, { useState } from "react";
import { Card, Typography, IconButton, Box } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";

const notifications = [
  { id: 1, title: "إشعار جديد", message: "تم إضافة رحلة جديدة بنجاح" },
  { id: 2, title: "إشعار جديد", message: "اطلع على أحدث الرحلات" },
  { id: 3, title: "إشعار جديد", message: "ب رجاء تقييم آخر رحلتك" },
  { id: 4, title: "إشعار جديد", message: "هناك عروض خاصة على الرحلات" },
];

const NotificationList = () => {
  const [notificationList, setNotificationList] = useState(notifications);

  const handleDelete = (id) => {
    setNotificationList(notificationList.filter((notification) => notification.id !== id));
  };

  return (
    <Box sx={{ display: "grid", gap: 2, padding: 2 }}>
      {notificationList.map((notification) => (
        <Card
          key={notification.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 8px 0px 8px",
            boxShadow: 4,
            borderRadius: 3,
            width: "95%",
            height: "100px",
            background: "linear-gradient(135deg, #f0f4ff, #dce3ff)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <NotificationsActiveIcon sx={{ color: "#1976d2", fontSize: 36 }} />
            <Box>
              <Typography variant="h6" sx={{ color: "#333" }}>
                {notification.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                {notification.message}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => handleDelete(notification.id)}>
            <CloseIcon sx={{ color: "#d32f2f" }} />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
};

export default NotificationList;
