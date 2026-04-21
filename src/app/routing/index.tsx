import { HomePage, NotFoundPage } from "@/pages"
import MainLayout from "@/shared/ui/main-layout"
import { Route, Routes } from "react-router"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
