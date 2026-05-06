import { useAuth } from "@/features/auth/model/auth/useAuth"
import { useQuery } from "@tanstack/react-query"
import { USER_QUERIES } from "./userQueries"

export const useUser = () => {
  const { isAuthentificated } = useAuth()

  return useQuery(USER_QUERIES.me(isAuthentificated))
}
