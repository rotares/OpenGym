import { useShallow } from "zustand/shallow"
import { useAuthStore } from "./authStore"

export const useAuth = () => {
  const { user, setUser } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      setUser: s.setUser,
    })),
  )

  const isAuth = !!user

  return {
    user,
    setUser,
    isAuth,
  }
}
