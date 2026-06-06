
import { type Workout } from "@/entities/workout";
import { type SortConfig, type SortOption } from "@/features/universal-sort";


export const SORT_OPTIONS:SortOption<Workout>[] = [{
  displayName: 'Дата создания',
  key: 'created_at'
}]

export const INITIAL_SORT_CONFIG:SortConfig<Workout> = {
  key: 'created_at',
  order: 'asc'
}