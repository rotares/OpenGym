import { useUser } from "@/entities/user"
import { useSaveWorkoutMutation } from "@/entities/workout/model/saveWorkoutMutation"
import { useHandleFinishWorkout } from "@/entities/workout/model/useHandleFinishWorkout"
import { WorkoutActionsBottomPanel } from "./workoutActionsBottomPanel"
import { WorkoutContent } from "./workoutContent"

export const WorkoutPage = () => {
  const { data: user } = useUser()
  const { mutate } = useSaveWorkoutMutation()

  const handleFinishWorkout = useHandleFinishWorkout({
    mutateFn: mutate,
    userId: user?.id || "",
  })

  return (
    <div
      className="
        relative
        h-full
      "
    >
      {/* scroll content */}
      <div
        className="
          h-full
          overflow-y-auto
          no-scrollbar
          md:pb-[130px]
          lg:pb-[90px]
          pb-41.25
        "
      >
        <WorkoutContent />
      </div>

      {/* bottom controls */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-40

          border-t
          bg-background
          p-4
          
        "
      >
        <WorkoutActionsBottomPanel handleFinishWorkout={handleFinishWorkout} />
      </div>
    </div>
  )
}
