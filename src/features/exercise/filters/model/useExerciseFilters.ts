import { type ExerciseType } from '@/entities/exercise';
import { type ExerciseFilter } from '@/features/exercise/filters';
import { useMemo, useState } from 'react';


type Props = {
  exercises: ExerciseType[]
}

export const useExerciseFilters = ({exercises}: Props) => {

  const [filters, setFilters] = useState<ExerciseFilter>({})

  const updateFilters = (patch: ExerciseFilter ) => {
    setFilters(prev => ({
      ...prev,
      ...patch
    }))
  }

  const resetFilters = () => setFilters({})

  const filteredExercises = useMemo(() => {
    const entries = Object.entries(filters) as [keyof ExerciseFilter, ExerciseFilter[keyof ExerciseFilter]][]
    if(entries.length === 0) return exercises

    return exercises.filter(ex => entries.every(([key, value]) => ex[key] === value))

  }, [exercises, filters])                                    

  return {
    updateFilters,
    resetFilters,
    filteredExercises,
    filters
  }

}