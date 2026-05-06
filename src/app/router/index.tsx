import { SearchBar } from "@/features/search-bar"
import {
  ExerciseDetailsPage,
  ExercisesPage,
  HomePage,
  NotFoundPage,
  UserProfilePage,
  WorkoutsHistoryPage,
} from "@/pages"
import { AuthPage } from "@/pages/auth"
import { ExerciseLayout, MainLayout, PageHeaderLayout } from "@/widgets/layouts"
import { createBrowserRouter, RouterProvider } from "react-router"
import { GuestRoute } from "./guestRoute"
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
        Component: GuestRoute,
        children: [
          {
            path: "auth",
            Component: AuthPage,
          },
        ],
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
              {
                Component: UserProfilePage,
                path: "profile",
                handle: {
                  pageHeader: {
                    title: "Ваш профиль",
                  },
                },
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
