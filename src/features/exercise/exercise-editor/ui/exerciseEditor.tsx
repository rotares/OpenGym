import { type WorkoutExercise } from "@/entities/workout/"
import { useWorkoutStore } from "@/entities/workout/model/workoutStore"
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/shared/ui/primitives"
import { Trash } from "lucide-react"
import { memo } from "react"
import { useShallow } from "zustand/shallow"

//пропсы - упражнение, колбек на удаление, добавление сета

type Props = {
  exercise: WorkoutExercise
}

//слишком толстый компонент SPR НАРУШЕНО

export const ExerciseEditor = memo(({ exercise }: Props) => {
  const { updateSet, removeExercise, addSet } = useWorkoutStore(
    useShallow((s) => ({
      updateSet: s.updateSet,
      removeExercise: s.removeExercise,
      addSet: s.addSet,
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
        [param]: param === "completed" ? Boolean(newValue) : Number(newValue),
      },
    })
  }

  return (
    <>
      <Card size="sm" className="mx-auto mb-5 ">
        <CardHeader className="grid grid-cols-2">
          <CardTitle>{name}</CardTitle>
          <CardAction>
            <Button
              onClick={() => removeExercise(exercise.id)}
              variant={"destructive"}
              size="icon-lg"
            >
              <span className="sr-only">Удалить упражнение</span>
              <Trash />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {sets.map(({ reps, weight, id: setId, completed }) => (
            <FieldGroup
              key={setId}
              className="grid max-w-sm grid-cols-[1fr_1fr_auto] gap-3"
            >
              <Field>
                <FieldLabel htmlFor={"weight" + setId} children="кг" />
                <Input
                  onChange={({ currentTarget }) =>
                    onUpdate(exerciseId, setId, "weight", currentTarget.value)
                  }
                  id={"weight" + setId}
                  value={weight}
                />
              </Field>
              <Field>
                <FieldLabel
                  className="truncate"
                  htmlFor={"reps" + setId}
                  children="Повторения"
                />
                <Input
                  onChange={({ currentTarget }) =>
                    onUpdate(exerciseId, setId, "reps", currentTarget.value)
                  }
                  id={"reps" + setId}
                  value={reps}
                />
              </Field>
              <Field>
                <FieldLabel className="sr-only" htmlFor={"completed" + setId} />
                <div className="flex items-end justify-center h-full ">
                  <Checkbox
                    className=" h-[32px] w-[32px]  rounded-md data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
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
                </div>
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
