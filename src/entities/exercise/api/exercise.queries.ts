import { queryOptions } from "@tanstack/react-query"
import { exerciseService } from "./exercise-service"

export const EXERCISE_QUERIES = {
  all: () =>
    queryOptions({
      queryKey: ["exercises"],
      queryFn: () => exerciseService.getAll(),
      refetchOnMount: false,
    }),
}
