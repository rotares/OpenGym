import { type Database } from "@/shared/api/types/database-supabase"

export type User = Database["public"]["Tables"]["profiles"]["Row"]
