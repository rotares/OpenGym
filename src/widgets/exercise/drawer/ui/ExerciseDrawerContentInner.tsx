import { exerciseApi, ExerciseList } from "@/entities/exercise"
import {
  ExerciseFilterModal,
  useExerciseFilters,
} from "@/features/exercise/filters"
import { useSearch } from "@/shared/lib"
import { SearchInput } from "@/shared/ui/components"
import { DrawerHeader, DrawerTitle } from "@/shared/ui/primitives"
import { useSuspenseQuery } from "@tanstack/react-query"
import { memo } from "react"
import { type DrawerProps } from "../model"

export const ExerciseDrawerContentInner = memo(({ onAdd }: DrawerProps) => {
  //get data from suspense
  const { data: exercises } = useSuspenseQuery(exerciseApi.list())

  //filters logic
  const { filteredExercises, updateFilters, resetFilters } = useExerciseFilters(
    {
      exercises,
    },
  )

  //hoook for debounced search
  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredExWithSearch,
  } = useSearch({
    initialData: filteredExercises,
    searchKey: "name",
  })

  return (
    <>
      <DrawerHeader className="px-0">
        <DrawerTitle className="mb-3">Выберите упражнение</DrawerTitle>
        <div className="flex gap-4">
          <SearchInput
            placeholder="Поиск упражнений..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <ExerciseFilterModal
            onChangeFilter={updateFilters}
            onResetFilters={resetFilters}
          />
        </div>
      </DrawerHeader>
      <div className="no-scrollbar overflow-y-auto h-full">
        <ExerciseList onAdd={onAdd} exercises={filteredExWithSearch!} />
      </div>
    </>
  )
})

ExerciseDrawerContentInner.displayName = "ExerciseDrawerContentInner"
