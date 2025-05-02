// stores/useSectorStore.ts
import { create } from "zustand";
import { SectorData } from "@/constants/api-sector";

// Type for flattened sector member list
type SectorMember =
  SectorData["sector_list"][number]["sector_member_list"][number];

interface SectorStore {
  sectorData: SectorData | null;
  sectorMemberList: SectorMember[];
  isLoading: boolean;
  setSectorData: (sectorData: SectorData) => void;
  setLoading: (isLoading: boolean) => void;
  updateMinuteInfo: (minuteInfo: { uploaded: boolean }) => void; // uploaded could or not be verify
  clearSectorData: () => void;
}

const useSectorStore = create<SectorStore>((set) => ({
  sectorData: null,
  sectorMemberList: [],
  isLoading: false,
  setSectorData: (sectorData) =>
    set({
      sectorData,
      sectorMemberList: sectorData.sector_list.flatMap(
        (sector) => sector.sector_member_list
      ),
      isLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  updateMinuteInfo: (minuteInfo) =>
    set((state) => ({
      sectorData: state.sectorData
        ? {
            ...state.sectorData,
            minute_details: {
              ...state.sectorData.minute_details,
              minute_info: minuteInfo,
            },
          }
        : null,
    })),
  clearSectorData: () =>
    set({ sectorData: null, sectorMemberList: [], isLoading: false }),
}));

export default useSectorStore;
