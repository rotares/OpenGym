import { SearchBar } from "@/features/search-bar"
import { useHeaderStore } from "@/shared/store/header"
import { ExerciseManager } from "@/widgets/exercise-manager"
import { useLayoutEffect } from "react"

export const ExercisesPage = () => {
  const setHeaderConfig = useHeaderStore((store) => store.setHeaderConfig)

  useLayoutEffect(() => {
    setHeaderConfig({
      actions: () => <SearchBar />,
    })

    return () => {
      setHeaderConfig(null)
    }
  }, [setHeaderConfig])

  return (
    <div>
      <ExerciseManager />
    </div>
  )
}
