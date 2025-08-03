"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    setMounted(true);
    // Apply initial theme
    const savedTheme = localStorage.getItem("theme-storage");
    if (savedTheme) {
      try {
        const { state } = JSON.parse(savedTheme);
        document.documentElement.classList.toggle(
          "dark",
          state.theme === "dark"
        );
      } catch (e) {
        // Fallback to light theme
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Apply theme changes
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
