import { create } from "zustand";

interface CoverImageStore {
  isOpen: boolean;
  url?: string;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
}

export const useCoverImageStore = create<CoverImageStore>((set) => ({
  isOpen: false,
  url: undefined,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));
