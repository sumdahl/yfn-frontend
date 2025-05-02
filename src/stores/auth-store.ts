import { User } from "@/models/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useSectorStore from "./sector-store";
interface AuthStore {
  token?: string;
  user?: User;
  update: (token?: string, user?: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      update: (token?: string, user?: User) => set({ token, user }),
      logout: () => {
        set({ token: undefined, user: undefined });
        localStorage.removeItem("auth-storage");
        useSectorStore.getState().clearSectorData();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useIsAuthenticated = () => !!useAuthStore((s) => s.token);
