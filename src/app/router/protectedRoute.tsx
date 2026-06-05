import { useAuth } from "@/features/auth"
import { Navigate, Outlet, useLocation } from "react-router"

export const ProtectedRoute = () => {
  //using location for redirect
  const location = useLocation()
  const { isLoading, isAuthentificated } = useAuth()

  if (isLoading) return null
  if (!isAuthentificated)
    return <Navigate to="/auth" state={{ from: location }} replace />

  return <Outlet />
}
