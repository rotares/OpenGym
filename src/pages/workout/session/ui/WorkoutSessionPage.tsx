import { useUser } from "@/entities/user"
import {
  type WorkoutValidationErrors,
  useHandleFinishWorkout,
} from "@/entities/workout"
import { PageWrapper } from "@/shared/ui/components"
import { useState } from "react"
import { WorkoutSessionActionsBottomPanel } from "./WorkoutSessionActionsBottomPanel"
import { WorkoutSessionContent } from "./WorkoutSessionContent"
import { WorkoutSessionHeader } from "./WorkoutSessionHeader"
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
        <WorkoutSessionHeader />
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
