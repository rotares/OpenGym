import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import type { WorkoutStats } from "../model"
import { workoutStatsService } from "./service"

export const WORKOUT_STATS_QUERIES = {
  main: () => ['stats'],
  getAll: ({startDate, endDate}: {startDate: Date | null, endDate: Date | null}) => 
    queryOptions<WorkoutStats>({
      queryKey: [...WORKOUT_STATS_QUERIES.main(), startDate, endDate],
      queryFn: () => workoutStatsService.getWorkoutStatsRpc(startDate, endDate),
      placeholderData: keepPreviousData,
      staleTime: 5 * 1000 * 60,
    })
}