//exercise item
import { type ExerciseType } from "../../model/exercise-types"

export const ExerciseItem = (props: ExerciseType) => {
  const { name } = props

  return <div>{name}</div>
}
