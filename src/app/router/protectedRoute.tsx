import { useAuthStore } from "@/shared/store/auth/authStore"
import { useAuth } from "@/shared/store/auth/useAuth"
import { CustomSpinner } from "@/shared/ui/components"
import { Navigate, Outlet } from "react-router"

export const ProtectedRoute = () => {
  const isInitialized = useAuthStore((state) => state.isInitialized)
  const { isAuth } = useAuth()

  if (!isInitialized) return <CustomSpinner />
  if (!isAuth) return <Navigate to="/auth" replace />

  return <Outlet />
}
