"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInitialized, initialize } = useAuthStore();

  useEffect(() => {
    // Initialize authentication state on app startup
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return <>{children}</>;
}
