import { exerciseApi } from "@/entities/exercise/api"
import { ExerciseList } from "@/entities/exercise/ui"
import { CustomSpinner } from "@/shared/ui/components/spinner"
import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useFilteredExercises } from "../model/use-filtered-exercises"

//manager
export const ExerciseManager = () => {
  const navigate = useNavigate()

  const { data: exercisesArr, isLoading, error } = useQuery(exerciseApi.list())
  const filtered = useFilteredExercises(exercisesArr)

  const onClick = useCallback((id: string) => navigate(id), [navigate])

  if (isLoading) return <CustomSpinner />
  if (error) return <div>{error.message}</div>

  return <ExerciseList exercises={filtered} onClick={onClick} />
}
