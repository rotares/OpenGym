import { type ExerciseType } from "@/entities/exercise/model/exercise-types"
import { useSearchBar } from "@/features/search-bar"
import { useMemo } from "react"

//hook for filter with searchQuery
export const useFilteredExercises = (exercisesData: ExerciseType[]) => {
  const searchQuery = useSearchBar((state) => state.searchQuery)

  const filteredExercises = useMemo(() => {
    return searchQuery
      ? exercisesData.filter(({ name }) => name.includes(searchQuery))
      : exercisesData
  }, [searchQuery, exercisesData])

  return filteredExercises
}
