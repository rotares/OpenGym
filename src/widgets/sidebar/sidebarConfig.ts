import { Dumbbell, History, Plus, Settings, UserCircle } from "lucide-react"

export const NAV_CONFIG = {
  mainNav: [
    {
      label: "training",
      name: "Тренировка",
      route: "/workout-session",
      icon: Plus,
    },
    {
      label: "history",
      name: "История тренировок",
      route: "/workouts-history",
      icon: History,
    },
    {
      label: "exercises",
      name: "Упражнения",
      route: "/exercises",
      icon: Dumbbell,
    },
  ],
  
  mobileNav: [
    {
      label: "profile",
      name: "Профиль",
      route: "/profile",
      icon: UserCircle,
    },
    {
      label: "settings",
      name: "Настройки",
      route: "/settings",
      icon: Settings,
    },
  ],
}
