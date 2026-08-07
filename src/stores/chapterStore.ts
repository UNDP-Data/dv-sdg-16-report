import { create } from 'zustand';

type Actions = {
  setIsGenderLensActive: (d: boolean) => void;
  setActiveSection: (d: string) => void;
};

type Store = {
  isGenderLensActive: boolean;
  activeSection: string;
  actions: Actions;
};

export const useStore = create<Store>((set) => ({
  isGenderLensActive: false,
  activeSection: '',
  actions: {
    setIsGenderLensActive: (active) => set(() => ({ isGenderLensActive: active })),
    setActiveSection: (section) => set(() => ({ activeSection: section })),
  },
}));

export const useIsGenderLensActive = () => useStore((s) => s.isGenderLensActive);
export const useActiveSection = () => useStore((s) => s.activeSection);

export const useActions = () => useStore((s) => s.actions);
