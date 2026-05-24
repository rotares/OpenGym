import { SearchBar } from "@/features/search-bar"
import {
  ExerciseDetailsPage,
  ExercisesPage,
  HomePage,
  NotFoundPage,
  NotFoundPrivatePage,
  UserProfilePage,
  WorkoutPage,
  WorkoutsHistoryPage,
} from "@/pages"
import { AuthPage } from "@/pages/auth"
import {
  ExerciseLayout,
  PageHeaderLayout,
  PrivateLayout,
  PublicLayout,
} from "@/widgets/layouts"
import { createBrowserRouter, RouterProvider } from "react-router"
import { GuestRoute } from "./guestRoute"
import { ProtectedRoute } from "./protectedRoute"

const routeConfig = createBrowserRouter([
  {
    Component: PublicLayout,
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
    ],
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: PrivateLayout,
        children: [
          {
            Component: PageHeaderLayout,
            children: [
              {
                path: "workouts-history",
                Component: WorkoutsHistoryPage,
              },
              {
                Component: WorkoutPage,
                path: "workout-session",
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
          {
            path: "*",
            Component: NotFoundPrivatePage,
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
