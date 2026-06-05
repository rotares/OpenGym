import { create, type StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"

export type ThemeType = "light" | "dark" | "system"

export interface ThemeStore {
  theme: ThemeType
  toggleTheme: () => void
  setTheme: (theme: ThemeType) => void
}

//theme store slice
const ThemeStoreSlice: StateCreator<ThemeStore> = (set) => ({
  theme: "system",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  setTheme: (theme: ThemeType) => set({ theme }),
})

//store for theme management using zustand with persistence
export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(ThemeStoreSlice, {
      name: "theme-store",
    }),
  ),
)
