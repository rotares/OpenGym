import { type ExerciseType } from "@/entities/exercise"
export type ExerciseFilter = Partial<Pick<ExerciseType, 'is_custom' | 'muscle_group_id'>>