import { create } from 'zustand'

interface NavigationState {
  lastScreen: string | null
  screenHistory: string[]
  setLastScreen: (screen: string) => void
  addToHistory: (screen: string) => void
  removeFromHistory: () => void
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  lastScreen: null,
  screenHistory: [],
  setLastScreen: screen => set({ lastScreen: screen }),
  addToHistory: screen => {
    const { screenHistory } = get()
    // No añadir pantallas duplicadas consecutivas
    if (screenHistory[screenHistory.length - 1] !== screen) {
      set({
        screenHistory: [...screenHistory, screen],
        lastScreen: screenHistory[screenHistory.length - 1] || null,
      })
    }
  },
  removeFromHistory: () => {
    const { screenHistory } = get()
    const newHistory = screenHistory.slice(0, -1)
    set({
      screenHistory: newHistory,
      lastScreen: newHistory[newHistory.length - 1] || null,
    })
  },
}))
