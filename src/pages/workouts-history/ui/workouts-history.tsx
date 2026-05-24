import { WORKOUT_QUERIES } from "@/entities/workout/api/workout.queries"
import { CustomSpinner } from "@/shared/ui/components"
import { useQuery } from "@tanstack/react-query"

export const WorkoutsHistoryPage = () => {
  const {
    data: workouts,
    isLoading,
    isRefetching,
  } = useQuery(WORKOUT_QUERIES.list())

  if (isLoading) return CustomSpinner

  return (
    <>
      <div className={isRefetching ? "opacity-50" : "0"}>
        {workouts?.map((workout) => (
          <div key={workout.id}>{workout.title}</div>
        ))}
      </div>
    </>
  )
}
