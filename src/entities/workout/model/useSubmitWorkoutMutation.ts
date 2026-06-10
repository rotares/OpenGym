import { useWorkoutStore } from "@/entities/workout"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useSubmitWorkoutMutation = <T>(mutationFn: (payload: T) => Promise<unknown>) => {
  return useMutation({
    mutationFn,

    onMutate: () => {
      useWorkoutStore.getState().setStatus("saving")
    },

    onSuccess: () => {
      useWorkoutStore.getState().resetWorkout()
    },
    
    onSettled: (_, __, ___, ____, context) => {
      context.client.invalidateQueries({queryKey: ['workouts']})
    },

    onError: (error) => {
      useWorkoutStore.getState().setStatus("active")
      toast.error(`Ошибка ${error.message} `)
    },

  })
}