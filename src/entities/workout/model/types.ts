// entities/workout/model/workout-store.types.ts
import type { Tables } from "@/shared/api"
import { type QueryData } from "@supabase/supabase-js"
import { workoutDetailsQuery, workoutListItemQuery } from "../config/query-select"
import type {
  WorkoutExercise,
  WorkoutSession,
  WorkoutSet,
} from "./workout-session.types"

//basic types
export type Exercise = Tables<"exercises"> 
export type Workout = Tables<"workouts">
export type WorkoutExerciseType = Tables<"workout_exercises">

//modified
export type WorkoutSaving = Omit<Workout, 'created_at' | 'id'>
export type ExerciseSaving = Omit<WorkoutExerciseType, 'id'>

//raw data from api
export type RawWorkoutDetails = QueryData<typeof workoutDetailsQuery>
export type RawWorkoutListItem = QueryData<typeof workoutListItemQuery>

//types for client
export type ExercisePreview = {
  name: string,
  setsCount: number
}

export type WorkoutListItem = {
    id: string,
    title: string,
		date: string  
		duration: string  
		totalVolume: number  
		totalSets: number  
} & {
  exercisesPreview: ExercisePreview[]
}

export type WorkoutDetails = {
	id: string
  title: string,
	date: string  
	duration: string  
	totalVolume: number  
	totalSets: number  
	exercises: {  
    exerciseId: string,
    name: string,
    totalVolume: number,
    totalSets: number,
    sets: {  
      weight: number  
      reps: number
      order_index: number 
    }[]  
  }[]
} 

//types for validation
export type WorkoutValidationErrors =
  Record<
    string,
    {
      hasError: boolean
    }
  >

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
  mode: 'create' | 'edit' | null

  /**
   * Workout lifecycle
   */
  startWorkout: () => void
  editWorkout: (workoutDraft: WorkoutSession) => void
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
  setTitle: (newTitle: string) => void
}
