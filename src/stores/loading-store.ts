// stores/useLoadingStore.ts
import { create } from "zustand";

type LoadingState = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),
}));
