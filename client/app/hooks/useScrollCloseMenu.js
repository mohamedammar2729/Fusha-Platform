"use client";

import { useState, useEffect } from "react";

export const useScrollCloseMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Add scroll event listener when the menu is open
    if (isOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return [isOpen, setIsOpen];
};
