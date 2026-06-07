import { supabase } from '@/shared/api';
import { WORKOUT_DETAILS_SELECT, WORKOUT_LIST_ITEM } from '../config/query-select';
import { workoutMapper } from '../lib/workout-mapper';
import { type WorkoutSession } from './../model/workout-session.types';
import { type GetWorkoutParams } from './types';

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

  getWorkouts: async ({page, pageSize}: GetWorkoutParams ) => {

    //compute from and to
    const from = page * pageSize
    const to = from + pageSize - 1

    const {data, error} = await supabase.from('workouts').select(WORKOUT_LIST_ITEM
    )
    .order('created_at', {
      ascending: false
    })
    .range(from, to)
    .limit(3, {foreignTable: 'workout_exercises'})
    
  if (error) {
    throw new Error(error.message)
  }
    
    const mappedData = workoutMapper.workoutListItem(data)
    return mappedData
  },

  async getById(id: string) {
    const {data, error} = await supabase.from('workouts').select(WORKOUT_DETAILS_SELECT)
      .eq('id', id)
      .single()
      
    if (error) {
      throw new Error(error.message)
    }
    
    const mappedData = workoutMapper.workoutDetails(data)
    return mappedData

  }
}