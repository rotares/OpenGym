import { type Tables } from "@/shared/api";

export type MuscleInfo = Omit<Tables<'muscle_groups'>, 'created_at'> 