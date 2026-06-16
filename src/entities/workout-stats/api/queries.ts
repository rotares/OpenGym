import { queryOptions } from "@tanstack/react-query"
import type { PeriodRange, WorkoutStats } from "../model"
import { workoutStatsService } from "./service"

export const WORKOUT_STATS_QUERIES = {
  main: () => ['stats'],
  getAll: ({range, startDate, endDate}: {range: PeriodRange, startDate: Date, endDate: Date}) => 
    queryOptions<WorkoutStats>({
      queryKey: [...WORKOUT_STATS_QUERIES.main(), range, startDate, endDate],
      queryFn: () => workoutStatsService.getWorkoutStatsRpc(startDate, endDate)
    })
}