import { z } from 'zod';

const workoutSchema = z.object({
  exercises: z
    .array(
      z.object({
        sets: z
          .array(
            z.object({
              reps: z.string(),
              weight: z.string(),
              completed: z.boolean(),
            })
          )
          .min(1, "Exercise must contain sets"),
      })
    )
    .min(1, "Workout must contain exercises"),
})

export const workoutSubmitSchema =
  workoutSchema.superRefine(
    (workout, ctx) => {
      workout.exercises.forEach(
        (exercise, exerciseIndex) => 
          {
          const hasIncomletedSet = exercise.sets.some(set => !set.completed)
          if(hasIncomletedSet) {
            ctx.addIssue({
              code: "custom",
              path: [
                "exercises",
                exerciseIndex,
              ],
              message:
                "Set must be completed",
            })
          }

          const hasInvalidWeightOrReps = exercise.sets.some(({weight, reps}) => {
            if(Number(weight) <= 0 || Number(reps) <= 0) return true
          })
          
          if(hasInvalidWeightOrReps) {
             ctx.addIssue({
              code: "custom",
              path: [
                "exercises",
                exerciseIndex,
              ],
              message:
                "Weight or Reps must be bigger than 0, and not empty",
            })
          }
        }
      )
    }
  )