import { queryOptions } from "@tanstack/react-query"
import { exerciseService } from "./exercise-service"

export const EXERCISE_QUERIES = {
  all: () => ["exercises"],

  lists: () => [...EXERCISE_QUERIES.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: ["exercises"],
      queryFn: () => exerciseService.getAll(),
      refetchOnMount: false,
    }),

  details: () => [...EXERCISE_QUERIES.all(), "details"],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...EXERCISE_QUERIES.details(), id],
      queryFn: () => exerciseService.getById(id),
      refetchOnMount: false,
    }),
}


