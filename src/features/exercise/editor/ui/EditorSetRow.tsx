import type { WorkoutSet } from "@/entities/workout/model/workout-session.types"
import {
  Button,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/shared/ui/primitives"
import { Trash } from "lucide-react"
import { memo } from "react"
import { type updateSetHandler } from "../model"

type Props = {
  set: WorkoutSet
  index: number
  onUpdate: updateSetHandler
  onRemove: (setId: string) => void
}

export const EditorSetRow = memo(
  ({ set, index, onUpdate, onRemove }: Props) => {
    const { reps, weight, id: setId, completed } = set

    return (
      <FieldGroup className="grid grid-cols-[2.5rem_1fr_1fr_2.5rem_auto] gap-2 sm:gap-3 py-1.5 items-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
        {/* Номер подхода */}
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {index + 1}
          </span>
        </div>

        {/* Инпут: Вес */}
        <Field className="relative">
          <Input
            data-testid="weightInput"
            onChange={({ currentTarget }) =>
              onUpdate(setId, "weight", currentTarget.value)
            }
            id={"weight" + setId}
            value={weight}
            type="number"
            className="h-9 text-center font-semibold text-slate-800 dark:text-slate-200"
          />
          <FieldLabel
            className="sr-only"
            htmlFor={"weight" + setId}
            children="Кг"
          />
        </Field>

        {/* Инпут: Повторения */}
        <Field className="relative">
          <Input
            data-testid="repsInput"
            onChange={({ currentTarget }) =>
              onUpdate(setId, "reps", currentTarget.value)
            }
            id={"reps" + setId}
            value={reps}
            type="number"
            className="h-9 text-center font-semibold text-slate-800 dark:text-slate-200"
          />
          <FieldLabel
            className="sr-only"
            htmlFor={"reps" + setId}
            children="Повторения"
          />
        </Field>

        {/* Чекбокс выполнения */}
        <Field className="flex justify-center">
          <Checkbox
            data-testid="setCompleteCheckbox"
            className="h-8 w-8 rounded-lg border-slate-200 dark:border-slate-800 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 transition-all shadow-2xs"
            checked={completed}
            onCheckedChange={() => onUpdate(setId, "completed", !completed)}
            id={"completed" + setId}
          />
          <FieldLabel htmlFor={"completed" + setId} className="sr-only" />
        </Field>

        {/* Кнопка удаления строки */}
        <Field>
          <Button
            onClick={() => {
              onRemove(setId)
            }}
            variant="destructive"
            size="icon"
            className="h-9! w-9! rounded-lg"
            id={"delete" + setId}
          >
            <Trash className="w-4 h-4" />
          </Button>
          <FieldLabel htmlFor={"delete" + setId} className="sr-only" />
        </Field>
      </FieldGroup>
    )
  },
)

EditorSetRow.displayName = "EditorSetRow"
