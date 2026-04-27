import { ItemGroup } from "@/shared/ui/primitives"
import { memo } from "react"
import { type ExerciseType } from "../../model/exercise-types"
import { ExerciseItem } from "../exercise-item"
type ExerciseListType = {
  exercises: ExerciseType[]
}

//list of exercise
export const ExerciseList = memo(({ exercises }: ExerciseListType) => {
  return (
    <ItemGroup>
      {exercises.map(({ id, name, muscle_group_id }) => (
        <ExerciseItem key={id} name={name} muscle_group_id={muscle_group_id} />
      ))}
    </ItemGroup>
  )
})
