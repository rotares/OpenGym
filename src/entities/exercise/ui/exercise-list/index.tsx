import { type ExerciseType } from "../../model/exercise-types"
import { ExerciseItem } from "../exercise-item"
type ExerciseListType = {
  exercises: ExerciseType[]
}

//list of exercise
export const ExerciseList = ({ exercises }: ExerciseListType) => {
  console.log(exercises)
  return (
    <ul>
      {exercises.map((e) => (
        <ExerciseItem key={e.id} name={e.name} />
      ))}
    </ul>
  )
}
