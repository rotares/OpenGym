import { useAuth } from "@/shared/store/auth/useAuth"
import { Navigate, Outlet } from "react-router"

export const ProtectedRoute = () => {
  const { isAuth } = useAuth()

  if (!isAuth) return <Navigate to="/sign-in" replace />

  return <Outlet />
}
