import { ISectorMember } from "@/constants/sectorSchema";
import { create } from "zustand";

type SelectedUserState = {
  user?: ISectorMember;
  setUser: (user?: ISectorMember) => void;
  approvalUser?: ISectorMember;
  setApprovalUser: (user?: ISectorMember) => void;
};

export const useSelectedUserStore = create<SelectedUserState>(set => ({
  user: undefined,
  setUser: (user?: ISectorMember) => set({ user }),
  approvalUser: undefined,
  setApprovalUser: (approvalUser?: ISectorMember) => set({ approvalUser }),
}));
