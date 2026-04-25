import { exerciseApi } from "@/entities/exercise/api"
import { ExerciseItem } from "@/entities/exercise/ui"

import { useQuery } from "@tanstack/react-query"

export const ExercisesPage = () => {
  const { data: exercisesArr, isLoading, error } = useQuery(exerciseApi.all())

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      {exercisesArr?.map((item) => (
        <ExerciseItem key={item.id} {...item} />
      ))}
    </div>
  )
}
