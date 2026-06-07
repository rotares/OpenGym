import { supabase } from "@/shared/api"

const WORKOUT_DETAILS_SELECT = `
    id,
    title,
    finished_at,
    duration_minutes,
    total_volume,
    total_sets,
    workout_exercises (
      total_sets,
      total_volume,
      exercises (
        name
      ),
      sets (
        weight,
        reps,
        order_index
      )
    )
`

const workoutDetailsQuery = supabase.from('workouts').select(WORKOUT_DETAILS_SELECT).single()


const WORKOUT_LIST_ITEM = 
  ` id,
    title,
    duration_minutes,
    finished_at,
    title,
    total_sets,
    total_volume,
    workout_exercises (
      total_sets,
      exercises (
        name
      )
    )
  `

const workoutListItemQuery = supabase.from('workouts').select(WORKOUT_LIST_ITEM)

export {
  WORKOUT_DETAILS_SELECT, WORKOUT_LIST_ITEM, workoutDetailsQuery, workoutListItemQuery
}

