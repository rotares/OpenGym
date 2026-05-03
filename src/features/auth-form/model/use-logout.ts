import { supabase } from "@/shared/api/supabaseClient"

export const useLogout = async () => supabase.auth.signOut({ scope: "local" })
