import { type Database } from "@/shared/api"

export type User = Database["public"]["Tables"]["profiles"]["Row"]
