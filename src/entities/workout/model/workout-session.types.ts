// entities/workout/model/workout-session.types.ts
/**
 * Workout session status
 */
export type WorkoutStatus = "active" | "saving"

/**
 * Single set inside workout exercise
 */
export interface WorkoutSet {
  id: string

  reps: string

  weight: string

  completed: boolean
}

/**
 * Exercise instance inside workout
 *
 * IMPORTANT:
 * This is NOT Exercise entity from DB.
 * This is workout-specific instance.
 */
export interface WorkoutExercise {
  /**
   * Local workout exercise id
   */
  id: string

  /**
   * Reference to exercise entity
   */
  exerciseId: string

  /**
   * Snapshot of exercise name
   *
   * We duplicate it intentionally
   * to avoid unnecessary lookups.
   */
  name: string

  sets: WorkoutSet[]
}

/**
 * Active workout session
 */
export interface WorkoutSession {
  id: string

  status: WorkoutStatus

  startedAt: string

  finishedAt: string | null

  exercises: WorkoutExercise[]
}
