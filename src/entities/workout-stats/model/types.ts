export type WorkoutStats = {
  workoutsCount: number
  totalVolume: number
  totalSets: number
  totalReps: number
}

export type StatsPeriodState = {
  anchorDate: Date
  range: Range
}

export type PeriodRange = "week" | "month" | "year" | "all"

