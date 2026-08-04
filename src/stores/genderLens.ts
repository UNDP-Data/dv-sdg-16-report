import { create } from 'zustand';

interface GenderLensStore {
  active: boolean;
  toggle: () => void;
  setActive: (active: boolean) => void;
}

export const useGenderLensStore = create<GenderLensStore>((set) => ({
  active: false,
  toggle: () => set((s) => ({ active: !s.active })),
  setActive: (active) => set({ active }),
}));
