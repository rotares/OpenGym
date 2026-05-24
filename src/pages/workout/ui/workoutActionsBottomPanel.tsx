import { useWorkoutStore } from "@/entities/workout/model/workoutStore"
import { Button } from "@/shared/ui/primitives"
import { SelectExercise } from "@/widgets/exercise"
import { memo } from "react"
import { useShallow } from "zustand/shallow"

type Props = {
  handleFinishWorkout: () => void
}

export const WorkoutActionsBottomPanel = memo(
  ({ handleFinishWorkout }: Props) => {
    const { status, addExercise, cancelWorkout, startWorkout } =
      useWorkoutStore(
        useShallow((s) => ({
          status: s.workout?.status,
          addExercise: s.addExercise,
          cancelWorkout: s.cancelWorkout,
          startWorkout: s.startWorkout,
        })),
      )

    return (
      <div>
        {status === "active" || status === "saving" ? (
          <div className="flex flex-wrap flex-col sm:flex-row gap-4 justify-center">
            <SelectExercise onAdd={addExercise} />
            <Button onClick={handleFinishWorkout}>Завершить тренировку</Button>
            <Button variant="destructive" onClick={cancelWorkout}>
              Отменить тренировку
            </Button>
          </div>
        ) : (
          <Button className="w-full" onClick={startWorkout}>
            Начать тренировку
          </Button>
        )}
      </div>
    )
  },
)
