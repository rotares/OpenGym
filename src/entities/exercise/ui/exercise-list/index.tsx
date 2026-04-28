import { ItemGroup } from "@/shared/ui/primitives"
import { motion } from "framer-motion"
import { memo } from "react"
import { type ExerciseType } from "../../model/exercise-types"
import { ExerciseItem } from "../exercise-item"

type ExerciseListType = {
  exercises: ExerciseType[],
  onClick?: (id: string) => void
}

//list of exercise
export const ExerciseList = memo(({ exercises, onClick }: ExerciseListType) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <ItemGroup>
        {exercises.map(({ id, name, muscle_group_id }) => (
          <ExerciseItem
            key={id}
            name={name}
            muscle_group_id={muscle_group_id}
            onClick={() => onClick?.(id)}
          />
        ))}
      </ItemGroup>
    </motion.div>
  )
})
