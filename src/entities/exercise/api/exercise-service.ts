import { supabase } from "@/shared/api"
import { omit } from "@/shared/lib"
import { type ExerciseType } from "../model/exercise-types"

// This is a mock implementation of the exercise service. In a real application, this would make HTTP requests to a backend API.
export const exerciseService = {
  async getAll(): Promise<ExerciseType[]> {
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(MOCK_DATA), 2000)
    // })
    const {data, error} = await supabase.from('exercises').select(`
      id,
      name,
      created_at,
      is_custom,
      muscle_group_id,
      muscle_group:muscle_groups(name) 
    `) 
  
    if(error) {
      throw new Error(error.message)
    }

    const result = data.map((exercise) => {
      return {
        muscle_group_name: exercise.muscle_group.name,
        ...omit(exercise, ['muscle_group']),
      }
    })

    return result
  },

  //fix types
  async getById(id: string): Promise<ExerciseType> {
    const {data, error} = await supabase.from('exercises').select(`
      id,
      name,
      created_at,
      is_custom,
      muscle_group_id,
      muscle_group:muscle_groups(name) 
    `) 
    .eq('id', id)
    .single()

    if(error) {
      throw new Error(error.message)
    }

    const result = {
      muscle_group_name: data.muscle_group.name,
      ...omit(data, ['muscle_group']),
    }

    return result
  },
}
