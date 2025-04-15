"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function GitHubPagesRouter() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run routing logic on the homepage to avoid interference with normal navigation
    if (
      pathname === "/" ||
      pathname === "/Fusha-Platform" ||
      pathname === "/Fusha-Platform/"
    ) {
      // Check for route parameter in URL
      const urlParams = new URLSearchParams(window.location.search);
      const routeParam = urlParams.get("route");

      if (routeParam) {
        console.log("Found route parameter:", routeParam);
        // Clean URL first by removing the query parameter
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        // Navigate to the specified route
        setTimeout(() => {
          router.push(routeParam);
        }, 100);
        return;
      }

      // Check local storage for SPA path
      const savedPath = localStorage.getItem("spa-path");
      if (savedPath) {
        console.log("Found saved path in localStorage:", savedPath);
        // Clear it to prevent redirect loops
        localStorage.removeItem("spa-path");

        // Navigate after a small delay to ensure the app is fully initialized
        setTimeout(() => {
          router.push(savedPath);
        }, 100);
      }
    }
  }, [router, pathname]);

  return null;
}
