import { useAuth } from "@/shared/store/auth/useAuth"
import { CustomSpinner } from "@/shared/ui/components"
import { Navigate, Outlet } from "react-router"

export const GuestRoute = () => {
  const { isInitialized, isAuth } = useAuth()

  if (!isInitialized) return <CustomSpinner />
  if (isAuth) return <Navigate to="/" />

  return <Outlet />
}
