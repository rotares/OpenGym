//exercise item
import { type ExerciseType } from "../../model/exercise-types"

export const ExerciseItem = (props: Partial<ExerciseType>) => {
  const { name } = props

  return <li>{name}</li>
}
