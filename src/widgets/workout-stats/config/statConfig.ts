import type { WorkoutStats } from "../model"

type StatConfigItem = {
  key: keyof WorkoutStats
  title: string
  prefix?: string
}

export const STAT_CONFIG: StatConfigItem[] = [
  {
    key: "workoutsCount",
    title: "Тренировки",
  },
  {
    key: "totalVolume",
    title: "Общий объем",
    prefix: "кг.",
  },
  {
    key: "totalSets",
    title: "Всего подходов",
  },
  {
    key: "totalReps",
    title: "Всего повторов",
  },
] as const