import { WORKOUT_QUERIES, WorkoutItem } from "@/entities/workout"
import { Button } from "@/shared/ui/primitives"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

export const WorkoutHistoryPage = () => {
  const { data: workouts } = useSuspenseQuery(WORKOUT_QUERIES.list())
  const navigate = useNavigate()

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
    <>
      <header className="pb-4">
        <h2 className="text-xl mb-4">История тренировок</h2>
      </header>
      <main className="no-scrollbar overflow-y-auto">
        {workouts.map((workout) => (
          <WorkoutItem workout={workout} key={workout.id} />
        ))}
      </main>
    </>
  )
}
