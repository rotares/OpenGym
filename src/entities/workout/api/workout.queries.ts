import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
import { PAGE_SIZE } from "../config/pageSize"
import type { WorkoutDetails, WorkoutListItem } from "../model/types"
import { workoutService } from "./workout-service"

export const WORKOUT_QUERIES = {
  all: () => ['workouts'],

  list: () => {
    return infiniteQueryOptions<WorkoutListItem[]>({
      queryKey: WORKOUT_QUERIES.all(),
      queryFn: ({pageParam}) => workoutService.getWorkouts({page:pageParam as number, pageSize: PAGE_SIZE}),
      initialPageParam: 0,
      getNextPageParam: (
        lastPage,
        pages
      ) => {
        if(lastPage.length < PAGE_SIZE) {
          return undefined
        }
        return pages.length
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  },

  details: () => [...WORKOUT_QUERIES.all(), 'details'],

  detail: (id: string) => {
    return queryOptions<WorkoutDetails>({
      queryKey: [WORKOUT_QUERIES.details(), id],
      queryFn: () => workoutService.getById(id),
      staleTime: 60 * 1000 * 5,
    })
  }
}