import { useWorkoutStore } from "@/entities/workout/model/workoutStore"
import { ExerciseEditor } from "@/features/exercise"
import { CustomSpinner } from "@/shared/ui/components"
import { useShallow } from "zustand/shallow"

export const WorkoutContent = () => {
  const { workout, status, startWorkout } = useWorkoutStore(
    useShallow((s) => ({
      workout: s.workout,
      status: s.workout?.status,
      startWorkout: s.startWorkout,
    })),
  )

  if (!workout) {
    return (
      <div
        onClick={startWorkout}
        className="group h-full flex-1 flex items-center justify-center"
      >
        <p className="text-muted shadow-lg group-hover:shadow-cyan-500/35 group-hover:text-slate-200 transition-all duration-400">
          Начать тренировку
        </p>
      </div>
    )
  }

  if (status === "saving") {
    return (
      <CustomSpinner
        children={<p className="text-muted">Сохранение тренировки...</p>}
        className="h-full flex-col"
      />
    )
  }

  if (workout.exercises.length > 0) {
    return (
      <div className="mx-auto max-w-100">
        {workout.exercises.map((exercise) => (
          <ExerciseEditor key={exercise.id} exercise={exercise} />
        ))}
      </div>
    )
  }

  return (
    <div className="group h-full flex-1 flex items-center justify-center">
      <p className="text-muted shadow-lg group-hover:shadow-cyan-500/35 group-hover:text-slate-200 transition-all duration-400">
        Добавьте упражнения
      </p>
    </div>
  )
}
