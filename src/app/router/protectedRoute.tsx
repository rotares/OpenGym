import { useAuth } from "@/features/auth/model/auth/useAuth"
import { CustomSpinner } from "@/shared/ui/components"
import { Navigate, Outlet, useLocation } from "react-router"

export const ProtectedRoute = () => {
  //using location for redirect
  const location = useLocation()
  const { isLoading, isAuthentificated } = useAuth()

  if (isLoading) return <CustomSpinner />
  if (!isAuthentificated)
    return <Navigate to="/auth" state={{ from: location }} replace />

  return <Outlet />
}
