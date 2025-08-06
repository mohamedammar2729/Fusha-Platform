"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "./Components/Home/Home";
import HomeV2 from "./Components/HomeV2/HomeV2";

export default function Page() {
  const [userType, setUserType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const type = parsedUser.userType || "user";
        setUserType(type);

        // Redirect admin users to the admin dashboard
        if (type === "admin") {
          router.push("/admin");
          return;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserType("user");
      }
    } else {
      setUserType("user");
    }
  }, [router]);

  // If user is admin, don't render anything as we're redirecting
  if (userType === "admin") {
    return null;
  }

  const HomePage = userType === "seller" ? HomeV2 : Home;
  return <HomePage />;
}

