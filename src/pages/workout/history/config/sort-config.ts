
import type { WorkoutListItem } from "@/entities/workout/model/types";
import { type SortConfig, type SortOption } from "@/features/universal-sort";


export const SORT_OPTIONS:SortOption<WorkoutListItem>[] = [{
  displayName: 'Дата',
  key: 'date'
}]

export const INITIAL_SORT_CONFIG:SortConfig<WorkoutListItem> = {
  key: 'date',
  order: 'desc'
}