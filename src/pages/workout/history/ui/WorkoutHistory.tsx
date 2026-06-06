import { WORKOUT_QUERIES, WorkoutItem } from "@/entities/workout"
import { SortDropdown, useSort } from "@/features/universal-sort"
import { PageWrapper } from "@/shared/ui/components"
import { Button } from "@/shared/ui/primitives"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { INITIAL_SORT_CONFIG, SORT_OPTIONS } from "../config"

export const WorkoutHistoryPage = () => {
  const { data: workouts } = useSuspenseQuery(WORKOUT_QUERIES.list())
  const navigate = useNavigate()

  const { sortedData, requestSort, currentSortConfig, resetSort } = useSort({
    data: workouts,
    initialSortConfig: INITIAL_SORT_CONFIG,
  })

  if (workouts.length === 0) {
    return (
      <div className="flex flex-1 justify-center self-center flex-col gap-5 items-center justify-self-center">
        <p>У вас еще нету тренировок</p>
        <Button onClick={() => navigate("/workout-session")}>
          К тренировке
        </Button>
      </div>
    )
  }

  return (
    <PageWrapper>
      <PageWrapper.Header className="flex items-center justify-between gap-x-10">
        <h2 className="text-xl">История тренировок</h2>
        <SortDropdown
          currentSortConfig={currentSortConfig}
          resetSort={resetSort}
          onChangeSort={requestSort}
          sortOptions={SORT_OPTIONS}
        />
      </PageWrapper.Header>
      <PageWrapper.Content>
        {sortedData.map((workout) => (
          <WorkoutItem workout={workout} key={workout.id} />
        ))}
      </PageWrapper.Content>
    </PageWrapper>
  )
}
