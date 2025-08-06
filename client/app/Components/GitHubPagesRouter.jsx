"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GitHubPagesRouter() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const DEBUG = true;
    const log = (msg, data) => {
      if (DEBUG && console && console.log) {
        console.log("ROUTER: " + msg, data || "");
      }
    };

    log("GitHubPagesRouter initialized");

    // Function to perform the routing
    const performRouting = () => {
      // First check for our special redirect parameter
      const urlParams = new URLSearchParams(window.location.search);
      const ghRedirect = urlParams.get("gh-redirect");

      if (ghRedirect) {
        log("Found gh-redirect parameter:", ghRedirect);
        // Clean URL
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);

        // Navigate after a small delay
        setTimeout(() => {
          log("Navigating to:", ghRedirect);
          router.push(ghRedirect);
        }, 200);
        return true;
      }

      // Then check localStorage
      const savedPath = localStorage.getItem("spa-path");
      if (savedPath) {
        log("Found saved path in localStorage:", savedPath);
        localStorage.removeItem("spa-path");

        // Navigate after a small delay
        setTimeout(() => {
          log("Navigating to saved path:", savedPath);
          router.push(savedPath);
        }, 200);
        return true;
      }

      return false;
    };

    // Run on initial load
    performRouting();

    // Also run when URL changes (especially important for the homepage redirect)
    const handleLocationChange = () => {
      log("URL changed, checking for routing info");
      performRouting();
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [router]);

  return null;
}
