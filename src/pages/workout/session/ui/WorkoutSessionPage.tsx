import {
  useHandleSubmitWorkout,
  type WorkoutValidationErrors,
} from "@/entities/workout"
import { PageWrapper } from "@/shared/ui/components"
import { useState } from "react"
import { WorkoutSessionActionsBottomPanel } from "./WorkoutSessionActionsBottomPanel"
import { WorkoutSessionContent } from "./WorkoutSessionContent"
import { WorkoutSessionHeader } from "./WorkoutSessionHeader"

export const WorkoutSessionPage = () => {
  const [exerciseErrorsIds, setExerciseErrorsIds] =
    useState<WorkoutValidationErrors>({})

  const handleSubmit = useHandleSubmitWorkout({
    onValidationErrors: setExerciseErrorsIds,
  })

  return (
    <PageWrapper>
      <PageWrapper.Header className="flex justify-between gap-4">
        <WorkoutSessionHeader />
        <WorkoutSessionActionsBottomPanel onSaveHandler={handleSubmit} />
      </PageWrapper.Header>
      <PageWrapper.Content className="h-full">
        <WorkoutSessionContent exerciseErrorsIds={exerciseErrorsIds} />
      </PageWrapper.Content>
    </PageWrapper>
  )
}
