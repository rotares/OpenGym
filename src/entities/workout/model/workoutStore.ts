import { nanoid } from 'nanoid';
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type WorkoutStore } from "./types";

export const useWorkoutStore = create<WorkoutStore>()(
  devtools(
    persist(
      immer((set) => ({
        workout: null,

        startWorkout: () =>
          set((state) => {
            state.workout = {
              title: 'Тренировка',
              id: nanoid(),
              status: "active",
              startedAt: new Date().toISOString(),
              finishedAt: null,
              exercises: [],
            }
          }),

        cancelWorkout: () =>
          set((state) => {
            state.workout = null
          }),

        addExercise: (exercise) =>
          set((state) => {
            if (!state.workout) return

            state.workout.exercises.push({
              id: nanoid(),
              exerciseId: exercise.id,
              name: exercise.name,
              sets: [
                {
                  id: nanoid(),
                  reps: '',
                  weight: '',
                  completed: false,
                },
              ],
            })
          }),

        removeExercise: (exerciseId) =>
          set((state) => {
            if (!state.workout) return

            state.workout.exercises = state.workout.exercises.filter(
              (exercise) => exercise.id !== exerciseId,
            )
          }),

        addSet: (exerciseId) =>
          set((state) => {
            if (!state.workout) return

            const exercise = state.workout.exercises.find(
              (exercise) => exercise.id === exerciseId,
            )

            if (!exercise) return

            exercise.sets.push({
              id: nanoid(),
              reps: '',
              weight: '',
              completed: false,
            })
          }),

        updateSet: ({ exerciseId, setId, changes }) =>
          set((state) => {
            if (!state.workout) return

            const exercise = state.workout.exercises.find(
              (exercise) => exercise.id === exerciseId,
            )

            if (!exercise) return

            const setItem = exercise.sets.find((set) => set.id === setId)

            if (!setItem) return

            Object.assign(setItem, changes)
          }),

        removeSet: (exerciseId, setId) =>
          set((state) => {
            if (!state.workout) return

            const exercise = state.workout.exercises.find(
              (exercise) => exercise.id === exerciseId,
            )

            if (!exercise) return

            exercise.sets = exercise.sets.filter((set) => set.id !== setId)
          }),
          
        resetWorkout: () =>
          set((state) => {
            state.workout = null
          }),

        setStatus: (newStatus) => set((state) => {
          if (state.workout) {
            state.workout.status = newStatus;
          }
        }),
        
        setTitle: (newTitle) => set((state) => {
          if (state.workout) {
              state.workout.title = newTitle
          }
        })

      })),
      {
        name: "workout-session",
      },
    ),
    {
      name: "WorkoutStore",
    },
  ),
)
