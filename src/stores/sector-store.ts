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
  clearSectorData: () =>
    set({ sectorData: null, sectorMemberList: [], isLoading: false }),
}));

export default useSectorStore;
