import { useWorkoutStore } from "@/entities/workout"
import { Input } from "@/shared/ui/primitives"
import { useShallow } from "zustand/shallow"

export const WorkoutSessionHeader = () => {
  const { setTitle, isActiveWorkout, title } = useWorkoutStore(
    useShallow((s) => ({
      setTitle: s.setTitle,
      isActiveWorkout: s.workout,
      title: s.workout?.title,
    })),
  )

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const value = e.target.value.trim()
    setTitle(value)
  }

  return (
    <>
      <h1 className={isActiveWorkout ? "sr-only" : "text-xl"}>Тренировка</h1>
      {isActiveWorkout && (
        <Input
          id="title"
          className="text-xs sm:text-xl! max-w-[250px] focus-visible:border-none! focus:border-0! active:border-0! border-0 bg-transparent!"
          value={title}
          onChange={onHandleChange}
          placeholder="Название тренировки..."
        />
      )}
    </>
  )
}
