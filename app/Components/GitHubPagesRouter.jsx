"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GitHubPagesRouter() {
  const router = useRouter();

  useEffect(() => {
    // Check if we have a path stored in localStorage from the 404.html redirect
    const savedPath = localStorage.getItem("spa-path");
    if (savedPath) {
      // Clear it immediately to prevent redirect loops
      localStorage.removeItem("spa-path");

      // Route to the saved path
      router.push(savedPath);
    }

    // Also check for the route query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const routeParam = urlParams.get("route");
    if (routeParam) {
      // Clean the URL by removing the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);

      // Navigate to the specified route
      router.push(routeParam);
    }
  }, [router]);

  return null;
}
