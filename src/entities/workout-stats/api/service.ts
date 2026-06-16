import { supabase } from "@/shared/api";

export const workoutStatsService = {
  getWorkoutStatsRpc: async (start: Date | null, end: Date | null) => {
    
    const {data, error} = await supabase.rpc('get_user_workout_stats', {
      p_start_date: start?.toISOString() ?? undefined,
      p_end_date: end?.toISOString() ?? undefined,
    });

    if(error) {
      throw new Error(error.message)
    }

    const result = data[0]

    return {
      workoutsCount: result.workouts_count,
      totalVolume: result.total_volume,
      totalSets: result.total_sets,
      totalReps: result.total_reps,
    }
  }
}