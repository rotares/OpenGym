import { useCallback } from "react"
import { toast } from "sonner"
import { workoutMapper, workoutSubmitSchema } from "../lib"
import { useSaveWorkoutMutation } from "./saveWorkoutMutation"
import { type WorkoutValidationErrors } from "./types"
import { type WorkoutSession } from "./workout-session.types"
import { useWorkoutStore } from "./workoutStore"

type SaveWorkoutPayload = {
  workoutDraft: WorkoutSession,
  userId: string,
}

type Props = {
  onValidationErrors: (value: WorkoutValidationErrors) => void
  userId: string,
}

export const useHandleFinishWorkout = ({onValidationErrors, userId}: Props) => {
  const {mutate} = useSaveWorkoutMutation()

  return useCallback(() => {
    const workout = useWorkoutStore.getState().workout

    if ((!workout || workout.exercises.length === 0) || !userId) {
      console.error("No active workout found")
      return
    }

    const validated = workoutSubmitSchema.safeParse(workout)

    if(!validated.success) {
      const errors = workoutMapper.validateErrorMapper(workout, validated.error.issues)
      onValidationErrors(errors)
      toast.error('Ошибка, проверьте карточки упражнений')
      return
    }

    onValidationErrors({})

    //pre mapping, add finishedAt field to workout
    const payload: SaveWorkoutPayload = {
      workoutDraft: workout,
      userId
    }

    mutate(payload,{
      onSuccess: () => toast.success('Тренировка сохранена')
    })

  }, [userId, mutate, onValidationErrors])
}