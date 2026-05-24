// entities/workout/model/workout-store.types.ts

import type { Tables } from "@/shared/api/types/database-supabase"
import type {
  WorkoutExercise,
  WorkoutSession,
  WorkoutSet,
} from "./workout-session.types"

export type Exercise = Tables<"exercises"> 


export type Workout = Tables<"workouts">
export type WorkoutExerciseType = Tables<"workout_exercises">

/**
 * Payload for updating set
 */
export interface UpdateWorkoutSetPayload {
  exerciseId: WorkoutExercise["id"]

  setId: WorkoutSet["id"]

  changes: Partial<Pick<WorkoutSet, "reps" | "weight" | "completed">>
}

/**
 * Workout store
 */
export interface WorkoutStore {
  /**
   * Current active workout
   */
  workout: WorkoutSession | null

  /**
   * Workout lifecycle
   */
  startWorkout: () => void
  cancelWorkout: () => void
  

  /**
   * Exercise actions
   */
  addExercise: (exercise: Pick<Exercise, 'id' | 'name'>) => void

  removeExercise: (exerciseId: WorkoutExercise["id"]) => void

  /**
   * Set actions
   */
  addSet: (exerciseId: WorkoutExercise["id"]) => void

  removeSet: (
    exerciseId: WorkoutExercise["id"],
    setId: WorkoutSet["id"],
  ) => void

  updateSet: (payload: UpdateWorkoutSetPayload) => void

  /**
   * Helpers
   */
  resetWorkout: () => void
  setStatus(newStatus: 'active' | 'saving'): void
}
