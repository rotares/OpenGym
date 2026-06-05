import { supabase } from "@/shared/api"

export const muscleService = {
  async getMuscles () {
    const {data, error} = await supabase.from('muscle_groups').select(`id, name`)

    if(error) {
      throw new Error(error.message)
    }
    return data
  }
}