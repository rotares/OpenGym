import { ItemGroup } from "@/shared/ui/primitives"
import { motion } from "framer-motion"
import { memo, useCallback } from "react"
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
    const handleOnClick = useCallback(
      (exercise: ExerciseType) => {
        onNavigate?.(exercise.id)
        onAdd?.(exercise)
      },
      [onAdd, onNavigate],
    )
    return (
      <motion.div
        className="text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {exercises.length === 0 ? (
          <div className="flex flex-col mt-[50px] text-center text-muted-foreground">
            <span>Упс...</span>
            <span>Ничего не найдено</span>
          </div>
        ) : (
          <ItemGroup>
            {exercises.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                name={exercise.name}
                muscle_group_name={exercise.muscle_group_name}
                onClick={() => handleOnClick(exercise)}
              />
            ))}
          </ItemGroup>
        )}
      </motion.div>
    )
  },
)

ExerciseList.displayName = "ExerciseList"
