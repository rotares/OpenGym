import { type Tables } from "@/shared/api"

export type ExerciseType = Tables<"exercises"> & {
  muscle_group_name?: string
}
