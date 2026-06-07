import { useMutation } from "@tanstack/react-query"
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

    onMutate: async (variables, context) => {

      // await context.client.cancelQueries({queryKey: ['workouts']})

      //install saving status
      useWorkoutStore.getState().setStatus("saving")

      // const mappedData = workoutMapper.optimisticMapper(variables)
      // const prevData = context.client.getQueryData(['workouts'])

      // context.client.setQueryData(['workouts'], (old: Array<unknown>) => {
      //   if(!old) return

      //   return [...old, mappedData]
      // }) 
      
      // return {prevData}
    },

    onSuccess: () => {
      useWorkoutStore.getState().resetWorkout()
    },
    
    onSettled: (_, __, ___, ____, context) => {
      context.client.invalidateQueries({queryKey: ['workouts'], exact: true}, )
    },

    onError: (error, _, onMutateResult, context) => {
      console.warn(error)
      useWorkoutStore.getState().setStatus("active")

      // if(onMutateResult?.prevData) {
      //   context.client.setQueryData(['workouts'], onMutateResult.prevData)
      // }
    },
    
  })}