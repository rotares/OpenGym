import { supabase } from '@/shared/api/supabaseClient';
import { workoutMapper } from '../lib/workout-mapper';
import { type WorkoutSession } from './../model/workout-session.types';

export const workoutService = {
  saveWorkout: async (workoutDraft: WorkoutSession, userId: string) => {
    
    const formattedWorkoutPayload = workoutMapper.finishMapper(workoutDraft, userId)

    const {data: savedWorkout} = await supabase.from('workouts')
      .insert(formattedWorkoutPayload) 
      .select()
      .single()

    //Mapper of exercises
    const exercisesPayload = workoutMapper.exerciseMap(workoutDraft.exercises, savedWorkout!.id)

    // Insert exercises and get their ids
    const {data: insertedExercises } = await supabase
      .from("workout_exercises")
      .insert(exercisesPayload)
      .select()
    
    //sets mapper
    const setsPayload = workoutMapper.setsMapper(insertedExercises!, workoutDraft.exercises)  

    await supabase.from("sets").insert(setsPayload)

    return true
  },

  getWorkouts: async () => {
    const {data, error} = await supabase.from('workouts').select('*')
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data
  }
}