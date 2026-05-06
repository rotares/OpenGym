import { useAuthContext } from "../context/authContext"

export const useAuth = () => {
  const { status } = useAuthContext()

  return {
    isLoading: status === "loading",
    isAuthentificated: status === "authentificated",
    isGuest: status === "guest",
  }
}
