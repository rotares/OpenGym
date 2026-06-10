import { type WorkoutExercise } from "@/entities/workout/model/workout-session.types";
import { formatDate, formatNumberToTime } from "@/shared/lib";
import { nanoid } from "nanoid";
import { z } from "zod";
import type { ExerciseSaving, RawWorkoutDetails, RawWorkoutListItem, WorkoutDetails, WorkoutExerciseType, WorkoutListItem, WorkoutSaving, WorkoutValidationErrors } from "../model/types";
import { type WorkoutSession, } from "../model/workout-session.types";

export const workoutMapper = {

  exerciseMap: (exercises: WorkoutExercise[], workoutId: string):ExerciseSaving[] => {

    const getTotalVolume = (exercise: WorkoutExercise) => {
      return exercise.sets.reduce((acc, {weight}) => Number(weight) + acc , 0)
    } 

    return exercises.map((exercise, index) => ({
      workout_id: workoutId,
      exercise_id: exercise.exerciseId,
      order_index: index,
      total_sets: exercise.sets.length,
      total_volume: getTotalVolume(exercise),
    }))
  },

  setsMapper: (insertedExercises: WorkoutExerciseType[], workoutDraftExercises: WorkoutExercise[]) => {

    if(!insertedExercises || !workoutDraftExercises) {
      throw new Error("Inserted exercises or workout draft exercises are undefined")
    }

    //flat map т.к возвращается массив сетов для упражнения, а нам нужны сеты в виде обьекта массивов
    return insertedExercises.flatMap((insertedExercise, index) => {
      // Find corresponding exercise in workoutDraft
      const localExercise = workoutDraftExercises[index]
      
      return localExercise.sets.map((set, setIndex) => ({
        workout_exercise_id: insertedExercise.id,
        order_index: setIndex,
        reps: Number(set.reps),
        weight: Number(set.weight),
        is_done: set.completed,
      }))
    })
  },

  finishMapper: (workout: WorkoutSession, userId: string):WorkoutSaving => {
    const totalInfo = workout.exercises.reduce((res, {sets}) => {
        res.totalSets += sets.length
        const totalVol = sets.reduce((acc, {weight}) => acc + Number(weight), 0)
        res.totalVol += totalVol

        return res
    }, {totalSets:0, totalVol:0})

    const finishedAt = new Date().toISOString()
    const durationMinutes = Math.floor((new Date(finishedAt).valueOf() - new Date(workout.startedAt).valueOf()) / (1000 * 60))

    const formatted:WorkoutSaving = {
      title: workout.title ? workout.title : 'Тренировка',
      user_id: userId,
      started_at: workout.startedAt,
      finished_at: finishedAt,
      total_volume: totalInfo.totalVol,
      total_sets: totalInfo.totalSets,
      duration_minutes: durationMinutes
    }

    return formatted
  },

  // optimisticMapper({workoutDraft, userId}: SaveWorkoutPayload) {
  //  const {id, startedAt, finishedAt} = workoutDraft
  //  return {
  //   title: 'newWorkout',
  //   id,
  //   startedAt,
  //   finishedAt,
  //   user_id: userId
  //  }
  // },

  //validation error mapper - преобразует ошибки валидации в удобный для отображения формат
  validateErrorMapper(workout: WorkoutSession, issues: z.core.$ZodIssue[]):WorkoutValidationErrors {
    const errors: WorkoutValidationErrors = {}

    for(const issue of issues) {

      const [, errorIndex] = issue.path
      const exercise = workout.exercises[errorIndex as number]

      if(!exercise) continue

      errors[exercise.id] = {
        hasError: true
      }
      
    }

    return errors
  },

  //mapper for list item
  workoutListItem(data: RawWorkoutListItem): WorkoutListItem[] {
    return data.map(w => {
      return ({
        id: w.id,
        title: w.title,
        date: formatDate(w.finished_at),
        duration: formatNumberToTime(w.duration_minutes),
        totalVolume: w.total_volume,
        totalSets: w.total_sets,
        exercisesPreview: w.workout_exercises.map(ex => ({name:ex.exercises.name , setsCount: ex.total_sets}))
      })
    })  

  },

  //mapper data for workout page
 workoutDetails(data: RawWorkoutDetails): WorkoutDetails {
    return {
      id: data.id,
      title: data.title,
      date: formatDate(data.finished_at),
      duration: formatNumberToTime(data.duration_minutes),
      totalVolume: data.total_volume,
      totalSets: data.total_sets,

      exercises: data.workout_exercises.map(ex => ({
        exerciseId: ex.exercise_id,
        name: ex.exercises.name,
        totalVolume: ex.total_volume,
        totalSets: ex.total_sets,
        sets: ex.sets.flatMap(set => set)
      })),
    };
  },

  //map for edit 
  detailsToWorkoutSession(workoutDetails: WorkoutDetails): WorkoutSession {

    const exercises = workoutDetails.exercises.map(ex => {
      return {
        id: nanoid(),
        exerciseId: ex.exerciseId,
        name: ex.name,
        sets: ex.sets.map(set => ({id:nanoid(), reps: String(set.reps), weight: String(set.weight), completed: true}))
      }
    })

    const mappedData:WorkoutSession = {
      id: workoutDetails.id,
      title: workoutDetails.title,
      status: "active",
      startedAt: '',
      finishedAt: null,
        exercises
      }
      
    return mappedData
  }
}