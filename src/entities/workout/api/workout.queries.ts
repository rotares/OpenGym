import { queryOptions } from "@tanstack/react-query"
import type { Workout } from "../model/types"
import { workoutService } from "./workout-service"

export const WORKOUT_QUERIES = {
  all: () => ['workouts'],
  
  list: () => {
    return queryOptions<Workout[]>({
      queryKey: WORKOUT_QUERIES.all(),
      queryFn: workoutService.getWorkouts,
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  }
}