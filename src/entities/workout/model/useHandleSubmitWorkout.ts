import { useUser } from "@/entities/user";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { workoutMapper, workoutSubmitSchema } from "../lib";
import { workoutService } from './../api/workout-service';
import { type WorkoutValidationErrors } from "./types";
import { useSubmitWorkoutMutation } from "./useSubmitWorkoutMutation";
import { type WorkoutSession } from "./workout-session.types";
import { useWorkoutStore } from "./workoutStore";

type MutationPayload = {
  workoutDraft: WorkoutSession,
  userId: string
}

type Props = {
  onValidationErrors: (value: WorkoutValidationErrors) => void
}


export const useHandleSubmitWorkout = ({onValidationErrors}: Props) => {
  const navigate = useNavigate()
  const {data: user} = useUser()

  //create mutations
  const saveMutation = useSubmitWorkoutMutation(({workoutDraft, userId}: MutationPayload) => workoutService.saveWorkout(workoutDraft, userId))
  const updateMutation = useSubmitWorkoutMutation(({workoutDraft}: Pick<MutationPayload, 'workoutDraft'>) => workoutService.updateWorkout(workoutDraft))


  //return submit func
  return useCallback(async () => {
    const workout = useWorkoutStore.getState().workout
    const mode = useWorkoutStore.getState().mode
    
    if ((!workout || workout.exercises.length === 0 || !mode || !user)) {
      console.error("No active workout found")
      return
    }

    //validate before submit
    const validated = workoutSubmitSchema.safeParse(workout)

    if(!validated.success) {
      const errors = workoutMapper.validateErrorMapper(workout, validated.error.issues)
      onValidationErrors(errors)
      toast.error('Ошибка, проверьте карточки упражнений')
      return
    }

    onValidationErrors({})

    if(mode === 'create') {
      await saveMutation.mutateAsync({workoutDraft: workout, userId: user.id})
      toast.success('Тренировка сохранена!')
    } else {
      await updateMutation.mutateAsync({workoutDraft: workout})
      toast.success('Тренировка обновлена!')
      navigate(`/workouts-history/${workout.id}`)
    }
    
  }, [onValidationErrors, saveMutation, updateMutation, user, navigate])
}

