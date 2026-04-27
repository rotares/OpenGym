import { create } from "zustand"
import { devtools } from "zustand/middleware"

type ExerciseSearchType = {
  searchQuery: string
  setSearchQuery: (arg: string) => void
}

export const useSearchBar = create<
  ExerciseSearchType,
  [["zustand/devtools", never]]
>(
  devtools(
    (set) => ({
      searchQuery: "",
      setSearchQuery: (newSearchQuery) => set({ searchQuery: newSearchQuery }),
    }),
    { name: "filtersStore" },
  ),
)
