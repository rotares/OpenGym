import { type WorkoutExercise } from "@/entities/workout/model/workout-session.types"
import { z } from "zod"
import { type SaveWorkoutPayload } from "../model/saveWorkoutMutation"
import type { WorkoutExerciseType, WorkoutValidationErrors } from "../model/types"
import { type WorkoutSession, } from "../model/workout-session.types"

export const workoutMapper = {

  exerciseMap: (exercises: WorkoutExercise[], workoutId: string) => {
    return exercises.map((exercise, index) => ({
      workout_id: workoutId,
      exercise_id: exercise.exerciseId,
      order_index: index,
    }))
  },

  setsMapper: (insertedExercises: WorkoutExerciseType[], workoutDraftExercises: WorkoutExercise[]) => {

    if(!insertedExercises || !workoutDraftExercises) {
      throw new Error("Inserted exercises or workout draft exercises are undefined")
    }

    //flat map т.к возвращается массив сетов для упражнения, а нам нужны сеты в виде обьекта массивов
    return insertedExercises.flatMap((insertedExercise, index) => {
      // Find corresponding exercise in workoutDraft
      const localExercise = workoutDraftExercises[index]
      
      return localExercise.sets.map((set, setIndex) => ({
        workout_exercise_id: insertedExercise.id,
        order_index: setIndex,
        reps: Number(set.reps),
        weight: Number(set.weight),
        is_done: set.completed,
      }))
    })
  },

  finishMapper: (workout: WorkoutSession, userId: string) => (
    {
      title: 'Workout' + workout.id.slice(0, 4),
      user_id: userId,
      started_at: workout.startedAt,
      finished_at: new Date().toISOString(),
    }
  ),

  optimisticMapper({workoutDraft, userId}: SaveWorkoutPayload) {
   const {id, startedAt, finishedAt} = workoutDraft
   return {
    title: 'newWorkout',
    id,
    startedAt,
    finishedAt,
    user_id: userId
   }
  },

  //validation error mapper - преобразует ошибки валидации в удобный для отображения формат
  validateErrorMapper(workout: WorkoutSession, issues: z.core.$ZodIssue[]):WorkoutValidationErrors {
    const errors: WorkoutValidationErrors = {}

    for(const issue of issues) {

      const [, errorIndex] = issue.path
      const exercise = workout.exercises[errorIndex as number]

      if(!exercise) continue

      errors[exercise.id] = {
        hasError: true
      }
      
    }

    return errors
  }
}