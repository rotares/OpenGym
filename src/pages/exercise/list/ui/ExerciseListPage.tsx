import { exerciseApi, ExerciseList } from "@/entities/exercise"

import {
  ExerciseFilterModal,
  useExerciseFilters,
} from "@/features/exercise/filters"

import { SearchInput, useSearch } from "@/features/universal-search"
import { SortDropdown, useSort } from "@/features/universal-sort"
import { PageWrapper } from "@/shared/ui/components"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { useNavigate } from "react-router"
import { INITIAL_SORT_CONFIG, SORT_OPTIONS } from "../config"

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

  const { sortedData, requestSort, currentSortConfig, resetSort } = useSort({
    data: filteredExWithSearch,
    initialSortConfig: INITIAL_SORT_CONFIG,
  })

  const onClick = useCallback((id: string) => navigate(id), [navigate])
  if (error) return <div>{error.message}</div>

  return (
    <PageWrapper>
      <PageWrapper.Header>
        <div className="flex flex-wrap justify-between gap-x-10">
          <h2 className="text-xl mb-4">Упражнения</h2>
          <div className="mb-3 sm:mb-0 flex gap-1">
            <ExerciseFilterModal
              onChangeFilter={updateFilters}
              onResetFilters={resetFilters}
            />
            <SortDropdown
              onChangeSort={requestSort}
              sortOptions={SORT_OPTIONS}
              currentSortConfig={currentSortConfig}
              resetSort={resetSort}
            />
          </div>
        </div>
        <SearchInput
          onChange={setSearchQuery}
          value={searchQuery}
          placeholder="Поиск упражнений..."
        />
      </PageWrapper.Header>
      <PageWrapper.Content>
        <ExerciseList exercises={sortedData} onNavigate={onClick} />
      </PageWrapper.Content>
    </PageWrapper>
  )
}
