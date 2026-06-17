import { type InfiniteData, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { workoutService } from "../api/workout-service"
import { type WorkoutListItem } from "./types"

export const useDeleteWorkoutMutation = () => {
  return useMutation({
    mutationFn: (id: string) => workoutService.deleteWorkout(id),

    onMutate: async (variables, context) => {
      await context.client.cancelQueries({queryKey: ['workouts']})
      const prevData = context.client.getQueryData<InfiniteData<WorkoutListItem[]>>(['workouts'])

      //optimistic update
      context.client.setQueryData(['workouts'], (old: InfiniteData<WorkoutListItem[]>) => {
        if(!old) return 

        return {
          ...old,
          pages: old.pages.map(page => {
            return page.filter(workout => workout.id !== variables)
          })
        }
      })


      return {prevData}

    },

    onSuccess: (_, variables, __, context) => {
      context.client.removeQueries({
        queryKey: ['workouts','details', variables]
      })

      toast.success('Тренировка успешно удалена')
      
    },

    onError: (error, _, onMutateResult, context) => {
      toast.error(`Ошибка при удалении ${error.message}`)
      if(onMutateResult?.prevData) {
        context.client.setQueryData(['workouts'], onMutateResult.prevData)
      }
    }
  })
}