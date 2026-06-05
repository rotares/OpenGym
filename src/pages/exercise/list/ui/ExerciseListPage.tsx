import { exerciseApi, ExerciseList } from "@/entities/exercise"

import {
  ExerciseFilterModal,
  useExerciseFilters,
} from "@/features/exercise/filters"
import { useSearch } from "@/shared/lib/useSearch"
import { SearchInput } from "@/shared/ui/components"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { useNavigate } from "react-router"

export const ExerciseListPage = () => {
  const navigate = useNavigate()

  const { data: exercises, error } = useSuspenseQuery(exerciseApi.list())
  const { filteredExercises, updateFilters, resetFilters } = useExerciseFilters(
    {
      exercises,
    },
  )

  const {
    setSearchQuery,
    searchQuery,
    filteredData: filteredExWithSearch,
  } = useSearch({
    initialData: filteredExercises,
    searchKey: "name",
  })

  const onClick = useCallback((id: string) => navigate(id), [navigate])
  if (error) return <div>{error.message}</div>

  return (
    <>
      <header className="pb-4">
        <h2 className="text-xl mb-4">Упражнения</h2>
        <div className="flex gap-4">
          <SearchInput
            onChange={setSearchQuery}
            value={searchQuery}
            placeholder="Поиск упражнений..."
          />
          <ExerciseFilterModal
            onChangeFilter={updateFilters}
            onResetFilters={resetFilters}
          />
        </div>
      </header>
      <main className="no-scrollbar overflow-y-auto pb-8">
        <ExerciseList exercises={filteredExWithSearch} onNavigate={onClick} />
      </main>
    </>
  )
}
