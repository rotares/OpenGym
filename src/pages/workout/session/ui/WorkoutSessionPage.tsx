import { useUser } from "@/entities/user"
import {
  type WorkoutValidationErrors,
  useHandleFinishWorkout,
} from "@/entities/workout"
import { useState } from "react"
import { WorkoutSessionActionsBottomPanel } from "./WorkoutSessionActionsBottomPanel"
import { WorkoutSessionContent } from "./WorkoutSessionContent"

export const WorkoutSessionPage = () => {
  const [exerciseErrorsIds, setExerciseErrorsIds] =
    useState<WorkoutValidationErrors>({})

  const { data: user } = useUser()

  const handleFinishWorkout = useHandleFinishWorkout({
    onValidationErrors: setExerciseErrorsIds,
    userId: user.id,
  })

  return (
    <>
      <header className="flex justify-between gap-4 h-[50px]">
        <h1 className="text-xl">Тренировка</h1>
        <WorkoutSessionActionsBottomPanel
          handleFinishWorkout={handleFinishWorkout}
        />
      </header>
      <main
        className="
        relative
        mt-10
        h-[calc(100%-50px)]
      "
      >
        {/* scroll content */}
        <div
          className="
          h-full
          overflow-y-auto
          no-scrollbar
          pb-5
        "
        >
          <WorkoutSessionContent exerciseErrorsIds={exerciseErrorsIds} />
        </div>

        <div
          className="
          absolute
          inset-x-0
          bottom-0
          z-40
          bg-background
          p-4          
        "
        ></div>
      </main>
    </>
  )
}
