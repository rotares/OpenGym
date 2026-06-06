import { type ExerciseType } from "@/entities/exercise";
import type { SortConfig, SortOption } from "@/features/universal-sort";


export const SORT_OPTIONS:SortOption<ExerciseType>[] = [
  {
    displayName: "Название",
    key: "name",
  },

  {
    displayName: "Группа мышц",
    key: "muscle_group_name",
  },
] as const

export const INITIAL_SORT_CONFIG:SortConfig<ExerciseType> = {
  key: 'name',
  order: 'asc'
}