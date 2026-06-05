import { HomePage } from "@/pages/home"
import { LazyPage } from "@/shared/ui/components"
import { PageHeaderLayout, type RouteHandle } from "@/widgets/layouts"
import { createBrowserRouter, RouterProvider } from "react-router"
import { PrivateLayout } from "../layout/PrivateLayout"
import { PublicLayout } from "../layout/PublicLayout"
import { GuestRoute } from "./GuestRoute"
import { ProtectedRoute } from "./ProtectedRoute"

// Lazy loaded pages
const AuthPage = LazyPage(() => import("@/pages/auth"), "AuthPage")

const ExerciseListPage = LazyPage(
  () => import("@/pages/exercise/list"),
  "ExerciseListPage",
)

const ExerciseDetailsPage = LazyPage(
  () => import("@/pages/exercise/details"),
  "ExerciseDetailsPage",
)

const WorkoutPage = LazyPage(
  () => import("@/pages/workout/session"),
  "WorkoutSessionPage",
)

const WorkoutsHistoryPage = LazyPage(
  () => import("@/pages/workout/history"),
  "WorkoutHistoryPage",
)

const UserProfilePage = LazyPage(
  () => import("@/pages/user"),
  "UserProfilePage",
)

const NotFoundPage = LazyPage(() => import("@/pages/not-found"), "NotFoundPage")

const NotFoundPrivatePage = LazyPage(
  () => import("@/pages/not-found"),
  "NotFoundPrivatePage",
)

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
                children: [
                  {
                    index: true,
                    Component: ExerciseListPage,
                    // handle: {
                    //   header: {
                    //     title: "Упражнения",
                    //     actions: <SearchBar />,
                    //   },
                    // } as RouteHandle,
                  },
                  {
                    path: ":id",
                    Component: ExerciseDetailsPage,
                    handle: {
                      pageHeader: {
                        title: "Упражнение",
                        back: true,
                      },
                    } as RouteHandle,
                  },
                ],
              },
              {
                Component: UserProfilePage,
                path: "profile",
                // handle: {
                //   pageHeader: {
                //     title: "Ваш профиль",
                //   },
                // },
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
