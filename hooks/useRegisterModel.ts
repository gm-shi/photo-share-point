import { create } from "zustand";

interface RegisterStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRegisterModel = create<RegisterStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
