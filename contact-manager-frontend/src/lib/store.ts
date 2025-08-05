import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
    (set, get) => ({
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
      onRehydrateStorage: () => (state) => {
        // Restore cookie when store rehydrates from localStorage
        if (state?.token && state?.isAuthenticated) {
          document.cookie = `auth_token=${state.token}; path=/; max-age=${
            60 * 60 * 24 * 7
          }; SameSite=Strict`;
        }
      },
    }
  )
);

// Theme is now permanently dark - no store needed
