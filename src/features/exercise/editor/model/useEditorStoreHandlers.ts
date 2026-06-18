import { useWorkoutStore, type UpdateWorkoutSetPayload } from "@/entities/workout"
import { useCallback, useMemo } from "react"
import { useShallow } from "zustand/shallow"

export type updateSetHandler = <P extends keyof UpdateWorkoutSetPayload['changes']> (
  setId: string,
  param: P,
  newValue: UpdateWorkoutSetPayload['changes'][P]
) => void

//хук инкапсулирует внутри логику обновления сетов и прочие хендлеры, чтобы разгрузить ui
export const useEditorStoreHandlers = (exerciseId: string) => {
  const { updateSet, removeExercise, addSet, removeSet } = useWorkoutStore(
    useShallow((s) => ({
      updateSet: s.updateSet,
      removeExercise: s.removeExercise,
      addSet: s.addSet,
      removeSet: s.removeSet,
    })),
  )

  const setsLength = useWorkoutStore(s => s.workout?.exercises.find(ex => ex.id === exerciseId)?.sets.length ?? 0)

  const updateSetHandler: updateSetHandler = useCallback((
    setId,
    param,
    newValue
  ) => {
    updateSet(
      {
        exerciseId,
        setId,
        changes: {
          [param] : newValue
        }
      }
    )

  }, [exerciseId, updateSet])

  const removeSetHandler = useCallback((setId: string) => {
    if (setsLength <= 1) {
      removeExercise(exerciseId)
    } else {
      removeSet(exerciseId, setId)
    }
  }, [setsLength, removeExercise, removeSet, exerciseId])

  const addSetHandler = useCallback(() => addSet(exerciseId), [addSet, exerciseId])
  const removeExerciseHandler = useCallback(() => removeExercise(exerciseId), [removeExercise, exerciseId])

  return useMemo(() => ({
    updateSetHandler,
    removeSetHandler,
    addSetHandler,
    removeExerciseHandler
  }), [updateSetHandler, removeSetHandler, addSetHandler, removeExerciseHandler])

}