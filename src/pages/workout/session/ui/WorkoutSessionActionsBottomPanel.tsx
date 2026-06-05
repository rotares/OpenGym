import { useWorkoutStore } from "@/entities/workout"
import { Button } from "@/shared/ui/primitives"
import { ExerciseDrawer } from "@/widgets/exercise/drawer"
import { Check, Plus, X } from "lucide-react"
import { memo } from "react"
import { useShallow } from "zustand/shallow"
type Props = {
  handleFinishWorkout: () => void
}

export const WorkoutSessionActionsBottomPanel = memo(
  ({ handleFinishWorkout }: Props) => {
    const { status, addExercise, cancelWorkout, startWorkout, isEmptyWorkout } =
      useWorkoutStore(
        useShallow((s) => ({
          status: s.workout?.status,
          isEmptyWorkout: s.workout?.exercises.length === 0,
          addExercise: s.addExercise,
          cancelWorkout: s.cancelWorkout,
          startWorkout: s.startWorkout,
        })),
      )

    return (
      <div>
        {status === "active" || status === "saving" ? (
          <div className="flex gap-4 justify-center">
            <ExerciseDrawer onAdd={addExercise} />
            <Button disabled={isEmptyWorkout} onClick={handleFinishWorkout}>
              <Check />
              <span className="sr-only">Завершить тренировку</span>
            </Button>
            <Button variant="destructive" onClick={cancelWorkout}>
              <X />
              <span className="sr-only">Отменить тренировку</span>
            </Button>
          </div>
        ) : (
          <Button className="w-full" onClick={startWorkout}>
            <Plus />
            <span className="sr-only">Начать тренировку</span>
          </Button>
        )}
      </div>
    )
  },
)

WorkoutSessionActionsBottomPanel.displayName =
  "WorkoutSessionActionsBottomPanel"
