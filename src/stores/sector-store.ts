import { create } from "zustand";
import { ApiSectorResponse } from "@/constants/api-sector";

interface SessionState {
  sectorResponse: ApiSectorResponse | null;
  setSectorResponse: (data: ApiSectorResponse) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sectorResponse: null,
  setSectorResponse: (data) => set({ sectorResponse: data }),
}));
