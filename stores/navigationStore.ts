import { create } from "zustand"

interface NavigationState {
  lastScreen: string | null;
  setLastScreen: (screen: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  lastScreen: null,
  setLastScreen: (screen) => set({ lastScreen: screen }),
}))
