import { Dumbbell, History, Plus } from "lucide-react"

export const NAV_CONFIG = {
  mainNav: [
    {
      label: "training",
      name: "Тренировка",
      route: "/training",
      icon: Plus,
    },
    {
      label: "history",
      name: "История тренировок",
      route: "/training-history",
      icon: History,
    },
    {
      label: "exercises",
      name: "Упражнения",
      route: "/exercises",
      icon: Dumbbell,
    },
  ],
}
