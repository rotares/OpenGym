import { SearchBar } from "@/features/search-bar"
import {
  ExerciseDetailsPage,
  ExercisesPage,
  HomePage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
  WorkoutsHistoryPage,
} from "@/pages"
import { ExerciseLayout, MainLayout, PageHeaderLayout } from "@/widgets/layouts"
import { createBrowserRouter, RouterProvider } from "react-router"
import { ProtectedRoute } from "./protectedRoute"

const routeConfig = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "sign-in",
        Component: SignInPage,
      },
      {
        path: "sign-up",
        Component: SignUpPage,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            Component: PageHeaderLayout,
            children: [
              {
                path: "workouts-history",
                Component: WorkoutsHistoryPage,
              },
              {
                path: "exercises",
                Component: ExerciseLayout,
                children: [
                  {
                    index: true,
                    Component: ExercisesPage,
                    handle: {
                      header: {
                        title: "Упражнения",
                        actions: <SearchBar />,
                      },
                    },
                  },
                  {
                    path: ":id",
                    Component: ExerciseDetailsPage,
                    handle: {
                      pageHeader: {
                        title: "Упражнение",
                        back: true,
                      },
                    },
                  },
                ],
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
