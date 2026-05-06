import { useAuth } from "@/features/auth/model/auth/useAuth"
import { CustomSpinner } from "@/shared/ui/components"
import { Navigate, Outlet, useLocation } from "react-router"

export const GuestRoute = () => {
  const { isLoading, isAuthentificated } = useAuth()

  const location = useLocation()
  const redirectRoute = location?.state?.from?.pathname || "/profile"

  if (isLoading) return <CustomSpinner />
  if (isAuthentificated) return <Navigate to={redirectRoute} replace />

  return <Outlet />
}
