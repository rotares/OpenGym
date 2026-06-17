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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/primitives"
import { Ellipsis, Plus, Trash } from "lucide-react"
import { memo } from "react"
import { useShallow } from "zustand/shallow"
import { EditorSetRow } from "./EditorSetRow"
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

  // Обновление параметров сета
  const handleUpdateSet = (
    exerciseId: string,
    setId: string,
    param: "weight" | "reps" | "completed",
    newValue: string | boolean,
  ) => {
    updateSet({
      exerciseId,
      setId,
      changes: { [param]: newValue },
    })
  }

  // Удаление сета или всего упражнения, если сет был последним
  const handleRemoveSet = (exerciseId: string, setId: string) => {
    if (exercise.sets.length === 1) {
      removeExercise(exerciseId)
    } else {
      removeSet(exerciseId, setId)
    }
  }

  return (
    <Card
      size="sm"
      className={cn(
        "w-full max-w-2xl mx-auto mb-6 overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200",
        "border-slate-100 bg-white dark:bg-slate-950 dark:border-slate-900",
        hasError &&
          "border-rose-300 shadow-sm shadow-rose-100 dark:border-rose-950 dark:shadow-none",
      )}
    >
      {/* Шапка редактора (стилизация 1-в-1 как в ExerciseCard) */}
      <CardHeader className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-200">
          {name}
        </CardTitle>

        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-slate-200 dark:border-slate-800"
              >
                <Ellipsis className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="end"
              className="dark:bg-slate-950 border-slate-100 dark:border-slate-900"
            >
              <DropdownMenuItem
                onClick={() => removeExercise(exerciseId)}
                variant="destructive"
                className="text-xs font-medium"
              >
                <Trash className="w-3.5 h-3.5 mr-2" />
                Удалить упражнение
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      {/* Тело псевдотаблицы */}
      <CardContent className="p-4 flex flex-col gap-1">
        {/* Шапка таблицы */}
        <div className="grid grid-cols-[2.5rem_1fr_1fr_2.5rem_auto] gap-2 sm:gap-3 px-1 pb-2 mb-1 border-b border-slate-100 dark:border-slate-900 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase text-center">
          <div>Сет</div>
          <div className="text-center">Кг</div>
          <div className="text-center">Повт.</div>
          <div className="text-center"></div>
        </div>

        {/* Список подходов */}
        <div className="space-y-1">
          {sets.map((set, index) => (
            <EditorSetRow
              key={set.id}
              set={set}
              index={index}
              exerciseId={exerciseId}
              onUpdate={handleUpdateSet}
              onRemove={handleRemoveSet}
            />
          ))}
        </div>
      </CardContent>

      {/* Подвал для интерактивных действий */}
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          onClick={() => addSet(exerciseId)}
          className="w-full h-10 border-dashed border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all rounded-xl"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Добавить подход
        </Button>
      </CardFooter>
    </Card>
  )
})

ExerciseEditor.displayName = "ExerciseEditor"
