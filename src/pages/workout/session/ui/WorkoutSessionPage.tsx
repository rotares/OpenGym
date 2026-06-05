import { useUser } from "@/entities/user"
import {
  type WorkoutValidationErrors,
  useHandleFinishWorkout,
} from "@/entities/workout"
import { useState } from "react"
import { PageWrapper } from "../../../../shared/ui/components"
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
    <PageWrapper>
      <PageWrapper.Header className="flex justify-between gap-4">
        <h1 className="text-xl">Тренировка</h1>
        <WorkoutSessionActionsBottomPanel
          handleFinishWorkout={handleFinishWorkout}
        />
      </PageWrapper.Header>
      <PageWrapper.Content className="h-full">
        <WorkoutSessionContent exerciseErrorsIds={exerciseErrorsIds} />
      </PageWrapper.Content>
    </PageWrapper>
  )
}
