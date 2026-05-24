import { useCallback } from "react"
import { type WorkoutSession } from "./workout-session.types"
import { useWorkoutStore } from "./workoutStore"

type SaveWorkoutPayload = {
  workoutDraft: WorkoutSession,
  userId: string,
}

type Props = {
  mutateFn: (payload: SaveWorkoutPayload) => void,
  userId: string,
}

export const useHandleFinishWorkout = ({mutateFn, userId}: Props) => {
  return useCallback(() => {
    const workout = useWorkoutStore.getState().workout

    if (!workout || !userId) {
      console.error("No active workout found")
      return
    }

    const payload: SaveWorkoutPayload = {
      workoutDraft: {
        ...workout,
        finishedAt: new Date().toISOString(),
      },
      userId
    }

    mutateFn(payload)

  }, [userId, mutateFn])
}