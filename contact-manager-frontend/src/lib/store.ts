import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Theme } from "./types";

// Auth Store
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: number; username: string; email: string } | null;
  login: (
    token: string,
    user: { id: number; username: string; email: string }
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      login: (token, user) => {
        localStorage.setItem("auth_token", token);
        // Set cookie for middleware
        document.cookie = `auth_token=${token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Strict`;
        set({ isAuthenticated: true, token, user });
      },
      logout: () => {
        localStorage.removeItem("auth_token");
        // Remove cookie
        document.cookie =
          "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        set({ isAuthenticated: false, token: null, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Theme Store
interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        // Don't apply DOM changes here - let ThemeProvider handle it
      },
      setTheme: (theme) => {
        set({ theme });
        // Don't apply DOM changes here - let ThemeProvider handle it
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
