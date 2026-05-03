import { useShallow } from "zustand/shallow"
import { useAuthStore } from "./authStore"

export const useAuth = () => {
  const { user, setUser, isInitialized } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      setUser: s.setUser,
      isInitialized: s.isInitialized,
    })),
  )

  const isAuth = !!user

  return {
    user,
    setUser,
    isAuth,
    isInitialized,
  }
}
