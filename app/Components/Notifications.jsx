"use client";
import React, {useState } from "react";
import {ProfileContainer} from "../styledComponent/Notifications/styledNotifications";
import NotificationCard from "../Components/NotificationCard";



const Notifications = () => {
  const [notification, setNotification] = useState(true);

  return (
<>
      {notification && (
        <ProfileContainer>
          <NotificationCard
            title="إشعار جديد"
            message="تم إضافة رحلة جديدة بنجاح."
            onClose={() => setNotification(false)}
          />
        </ProfileContainer>
      )}
</>
  );
};

export default Notifications;
