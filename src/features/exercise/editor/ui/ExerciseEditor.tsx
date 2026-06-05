import { type WorkoutExercise, useWorkoutStore } from "@/entities/workout/"
import { cn } from "@/shared/lib"
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/shared/ui/primitives"
import { Ellipsis, Trash } from "lucide-react"
import { memo } from "react"
import { useShallow } from "zustand/shallow"

//пропсы - упражнение, колбек на удаление, добавление сета

type Props = {
  exercise: WorkoutExercise
  hasError?: boolean
}

//слишком толстый компонент SPR НАРУШЕНО

export const ExerciseEditor = memo(({ exercise, hasError }: Props) => {
  const { updateSet, removeExercise, addSet, removeSet } = useWorkoutStore(
    useShallow((s) => ({
      updateSet: s.updateSet,
      removeExercise: s.removeExercise,
      addSet: s.addSet,
      removeSet: s.removeSet,
    })),
  )

  const { name, sets, id: exerciseId } = exercise

  const onUpdate = (
    exerciseId: string,
    setId: string,
    param: "weight" | "reps" | "completed",
    newValue: string,
  ) => {
    updateSet({
      exerciseId,
      setId,
      changes: {
        [param]: param === "completed" ? Boolean(newValue) : newValue,
      },
    })
  }

  return (
    <>
      <Card
        size="sm"
        className={cn(
          "mx-auto mb-11",
          hasError && "shadow-2xs shadow-rose-400",
        )}
      >
        <CardHeader className="grid grid-cols-2 mb-5">
          <CardTitle>{name}</CardTitle>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                <DropdownMenuItem
                  onClick={() => removeExercise(exercise.id)}
                  variant="destructive"
                >
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid grid-cols-[3rem_1fr_1fr_2rem_auto] gap-3 px-1 text-[10px] font-bold tracking-wider text-zinc-500 uppercase items-center">
            <div>Подход</div>
            <div className="text-left md:text-center">Кг.</div>
            <div className="text-left md:text-center">Повт.</div>
            <div className="col-span-2"></div>{" "}
          </div>
          {sets.map(({ reps, weight, id: setId, completed }, index) => (
            <FieldGroup
              key={setId}
              className="grid grid-cols-[3rem_1fr_1fr_2rem_auto] gap-3"
            >
              <div className="flex items-center justify-center">
                {index + 1}
              </div>
              <Field className="relative">
                <Input
                  onChange={({ currentTarget }) =>
                    onUpdate(exerciseId, setId, "weight", currentTarget.value)
                  }
                  id={"weight" + setId}
                  value={weight}
                  type="number"
                />
                <FieldLabel
                  className="sr-only"
                  htmlFor={"weight" + setId}
                  children="Кг"
                />
              </Field>
              <Field>
                <Input
                  onChange={({ currentTarget }) =>
                    onUpdate(exerciseId, setId, "reps", currentTarget.value)
                  }
                  id={"reps" + setId}
                  value={reps}
                  type="number"
                />
                <FieldLabel
                  className="sr-only"
                  htmlFor={"reps" + setId}
                  children="Повторения"
                />
              </Field>
              <Field>
                <div className="flex ">
                  <Checkbox
                    className="h-[32px] w-[32px] rounded-md data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    checked={completed}
                    onCheckedChange={() =>
                      updateSet({
                        exerciseId,
                        setId,
                        changes: { completed: !completed },
                      })
                    }
                    id={"completed" + setId}
                  />
                  <FieldLabel
                    htmlFor={"completed" + setId}
                    className="sr-only"
                  />
                </div>
              </Field>
              <Field className="flex">
                <Button
                  onClick={() => {
                    if (exercise.sets.length === 1) {
                      removeExercise(exercise.id)
                      return
                    }
                    removeSet(exercise.id, setId)
                  }}
                  variant={"destructive"}
                  id={"delete" + exercise.id}
                >
                  <Trash />
                </Button>
                <FieldLabel
                  htmlFor={"delete" + exercise.id}
                  className="sr-only"
                />
              </Field>
            </FieldGroup>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            variant="default"
            onClick={() => addSet(exerciseId)}
            className="flex-1 border-dashed"
          >
            Добавить сет
          </Button>
        </CardFooter>
      </Card>
    </>
  )
})

ExerciseEditor.displayName = "ExerciseEditor"
