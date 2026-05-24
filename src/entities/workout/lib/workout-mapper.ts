import { type WorkoutExercise } from "@/entities/workout/model/workout-session.types"
import type { WorkoutExerciseType } from "../model/types"
import { type WorkoutSession } from "../model/workout-session.types"


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

    return insertedExercises.flatMap((insertedExercise, index) => {
      // Find corresponding exercise in workoutDraft
      const localExercise = workoutDraftExercises[index]
      
      return localExercise.sets.map((set, setIndex) => ({
        workout_exercise_id: insertedExercise.id,
        order_index: setIndex,
        reps: set.reps,
        weight: set.weight,
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
  )
}