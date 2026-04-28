import {
  ExerciseDetailsPage,
  ExercisesPage,
  HomePage,
  NotFoundPage,
  WorkoutsHistoryPage,
} from "@/pages"
import { ExerciseLayout, MainLayout, PageHeaderLayout } from "@/shared/ui/layouts/"
import { createBrowserRouter, RouterProvider } from "react-router"

const routeConfig = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        Component: PageHeaderLayout,
        children: [
          {
            path: "workouts-history",
            Component: WorkoutsHistoryPage,
            handle: { meta: { title: "История тренировок" } },
          },
          {
            path: "exercises",
            Component: ExerciseLayout,
            children: [
              {
                index: true,
                Component: ExercisesPage,
                handle: { meta: { title: "Упражнения" } },
              },
              {
                path: ":id",
                Component: ExerciseDetailsPage,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={routeConfig} />
}
