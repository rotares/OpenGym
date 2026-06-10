import { useWorkoutStore } from "@/entities/workout"
import { Input } from "@/shared/ui/primitives"
import { CircleAlert } from "lucide-react"
import { useShallow } from "zustand/shallow"

export const WorkoutSessionHeader = () => {
  const { setTitle, isActiveWorkout, title, isEdit } = useWorkoutStore(
    useShallow((s) => ({
      setTitle: s.setTitle,
      isActiveWorkout: s.workout,
      title: s.workout?.title,
      isEdit: s.mode === "edit",
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
      {isEdit && (
        <div className="text-xs flex gap-3 items-center">
          <CircleAlert className="text-yellow-200" />
          Вы редактируете тренировку
        </div>
      )}
    </>
  )
}
