import { exerciseApi, ExerciseList } from "@/entities/exercise"
import { CustomSpinner } from "@/shared/ui/components"
import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useFilteredExercises } from "../model/use-filtered-exercises"

//manager
export const ExerciseContainerList = () => {
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery(exerciseApi.list())
  const filtered = useFilteredExercises(data ?? [])

  const onClick = useCallback((id: string) => navigate(id), [navigate])

  if (isLoading) return <CustomSpinner />
  if (error) return <div>{error.message}</div>

  return <ExerciseList exercises={filtered} onNavigate={onClick} />
}
