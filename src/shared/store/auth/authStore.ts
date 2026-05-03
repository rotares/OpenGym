import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface AuthStore {
  user: unknown
  isInitialized: boolean
  setUser: (arg: unknown) => void
  setIsInitialized: (arg: boolean) => void
}

export const useAuthStore = create<AuthStore, [["zustand/devtools", never]]>(
  devtools(
    (set) => ({
      user: null,
      isInitialized: false,
      setUser: (user) => set({ user: user, isInitialized: true }),
      setIsInitialized: (v: boolean) =>
        set({
          isInitialized: v,
        }),
    }),
    { name: "authStore" },
  ),
)
