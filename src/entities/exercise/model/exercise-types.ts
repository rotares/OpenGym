import { type Tables } from "@/shared/api/types/database-supabase"

export type ExerciseType = Tables<"exercises"> & {
    muscle_group?: {
    name: string
  }
}
