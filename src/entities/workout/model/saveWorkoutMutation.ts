import { useMutation } from "@tanstack/react-query"
import { workoutService } from "../api/workout-service"
import type { WorkoutSession } from "./workout-session.types"
import { useWorkoutStore } from "./workoutStore"

type SaveWorkoutPayload = {
  workoutDraft: WorkoutSession,
  userId: string,
}

export const useSaveWorkoutMutation = () => {

  return useMutation({
    mutationFn: ({workoutDraft, userId} : SaveWorkoutPayload) => workoutService.saveWorkout(workoutDraft, userId),

    onMutate: () => {
      useWorkoutStore.getState().setStatus("saving")
    },

    onSuccess: async (_, __, ___, context) => {
      useWorkoutStore.getState().resetWorkout()
      //invalidate workouts list on history-workout
      context.client.invalidateQueries({queryKey: ['workouts'], exact: true}, )
    },
    
    onError: (error) => {
      console.error("Error saving workout:", error)
      useWorkoutStore.getState().setStatus("active")
    },
    
  })}