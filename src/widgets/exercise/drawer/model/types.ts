import { type ExerciseType } from "@/entities/exercise"


export type DrawerProps = {
  onAdd: (exercise: ExerciseType) => void
  
}