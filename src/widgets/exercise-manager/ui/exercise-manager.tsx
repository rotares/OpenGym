import { exerciseApi } from "@/entities/exercise/api"
import { ExerciseList } from "@/entities/exercise/ui"
import { useQuery } from "@tanstack/react-query"
import { useFilteredExercises } from "../model/use-filtered-exercises"

//manager
export const ExerciseManager = () => {
  const { data: exercisesArr, isLoading, error } = useQuery(exerciseApi.all())

  const filtered = useFilteredExercises(exercisesArr)

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>{error.message}</div>

  return <ExerciseList exercises={filtered} />
}
