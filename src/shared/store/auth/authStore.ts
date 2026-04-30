import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface AuthStore {
  user: unknown
  setUser: (arg: unknown) => void
}

export const useAuthStore = create<AuthStore, [["zustand/devtools", never]]>(
  devtools(
    (set) => ({
      user: "user",
      setUser: (user) => set({ user: user }),
    }),
    { name: "authStore" },
  ),
)
