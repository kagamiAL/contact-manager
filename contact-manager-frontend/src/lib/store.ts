import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Auth Store
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: number; username: string; email: string } | null;
  isInitialized: boolean;
  login: (
    token: string,
    user: { id: number; username: string; email: string }
  ) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      isInitialized: false,
      login: (token, user) => {
        localStorage.setItem("auth_token", token);
        // Set cookie for middleware
        document.cookie = `auth_token=${token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Strict`;
        set({ isAuthenticated: true, token, user, isInitialized: true });
      },
      logout: () => {
        localStorage.removeItem("auth_token");
        // Remove cookie
        document.cookie =
          "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          isInitialized: true,
        });
      },
      initialize: () => {
        const storedToken = localStorage.getItem("auth_token");
        const state = get();

        if (storedToken && state.token && state.user && state.isAuthenticated) {
          // We have a stored token and valid state, verify cookie exists
          const cookies = document.cookie.split(";");
          const tokenCookie = cookies.find((cookie) =>
            cookie.trim().startsWith("auth_token=")
          );

          if (!tokenCookie || tokenCookie.split("=")[1] !== storedToken) {
            // Recreate cookie
            document.cookie = `auth_token=${storedToken}; path=/; max-age=${
              60 * 60 * 24 * 7
            }; SameSite=Strict`;
          }

          set({ isInitialized: true });
        } else if (
          storedToken &&
          (!state.token || !state.user || !state.isAuthenticated)
        ) {
          // We have a token but incomplete state, logout
          localStorage.removeItem("auth_token");
          document.cookie =
            "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          set({
            isAuthenticated: false,
            token: null,
            user: null,
            isInitialized: true,
          });
        } else if (!storedToken && (state.token || state.isAuthenticated)) {
          // No stored token but state thinks we're authenticated, clear state
          set({
            isAuthenticated: false,
            token: null,
            user: null,
            isInitialized: true,
          });
        } else {
          // Normal case, just mark as initialized
          set({ isInitialized: true });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Don't persist isInitialized flag
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
      }),
    }
  )
);

// Theme is now permanently dark - no store needed
