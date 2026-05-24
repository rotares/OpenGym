import { queryOptions } from "@tanstack/react-query";
import { exerciseService } from "../api/exercise-service";
import { type ExerciseType } from "../model/exercise-types";

export const EXERCISE_QUERIES = {
  all: () => ["exercises"],

  list: () =>
    queryOptions<ExerciseType[]>({
      queryKey: EXERCISE_QUERIES.all(),
      queryFn: () => exerciseService.getAll(),
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),

  details: () => [...EXERCISE_QUERIES.all(), "details"],
  detail: (id: string, queryClient: unknown) =>
    queryOptions<ExerciseType>({
      queryKey: [...EXERCISE_QUERIES.details(), id],
      queryFn: () => exerciseService.getById(id),
      initialData: () => {
        
        const allExercises = queryClient.getQueryData<ExerciseType>(EXERCISE_QUERIES.all())
        return allExercises?.find((exercise: ExerciseType) => exercise.id === id)

      },
      refetchOnMount: false,
    }),
}
