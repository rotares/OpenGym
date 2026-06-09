import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { workoutService } from "../api/workout-service"
import type { WorkoutSession } from "./workout-session.types"
import { useWorkoutStore } from "./workoutStore"

export type SaveWorkoutPayload = {
  workoutDraft: WorkoutSession,
  userId: string,
}

export const useSaveWorkoutMutation = () => {

  return useMutation({
    mutationFn: ({workoutDraft, userId} : SaveWorkoutPayload) => workoutService.saveWorkout(workoutDraft, userId),

    onMutate: () => {
      useWorkoutStore.getState().setStatus("saving")
    },

    onSuccess: () => {
      useWorkoutStore.getState().resetWorkout()
    },
    
    onSettled: (_, __, ___, ____, context) => {
      context.client.invalidateQueries({queryKey: ['workouts'], exact: true}, )
    },

    onError: (error) => {
      toast.error(`Ошибка: ${error.message}`)
      useWorkoutStore.getState().setStatus("active")
    },
    
  })}