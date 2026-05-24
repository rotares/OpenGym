import { ItemGroup } from "@/shared/ui/primitives"
import { motion } from "framer-motion"
import { memo } from "react"
import { type ExerciseType } from "../../model/exercise-types"
import { ExerciseItem } from "../exercise-item"

type ExerciseListType = {
  exercises: ExerciseType[]
  onAdd?: (exercise: ExerciseType) => void
  onNavigate?: (id: string) => void
}

//list of exercise
export const ExerciseList = memo(
  ({ exercises, onAdd, onNavigate }: ExerciseListType) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <ItemGroup>
          {exercises.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              name={exercise.name}
              muscle_group={exercise?.muscle_group}
              onClick={() => {
                onNavigate?.(exercise.id)
                onAdd?.(exercise)
              }}
            />
          ))}
        </ItemGroup>
      </motion.div>
    )
  },
)
