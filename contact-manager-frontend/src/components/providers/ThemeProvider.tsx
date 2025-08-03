"use client";

import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Always apply dark mode
    document.documentElement.classList.add("dark");
    document.body.style.backgroundColor = "#000000";
  }, []);

  return <>{children}</>;
}
