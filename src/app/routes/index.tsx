import { HomePage, NotFoundPage, WorkoutsHistoryPage } from "@/pages"
import { MainLayout, PageHeaderLayout } from "@/shared/ui/layouts/"
import { Route, Routes } from "react-router"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<PageHeaderLayout />}>
          <Route path="/workouts-history" element={<WorkoutsHistoryPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
