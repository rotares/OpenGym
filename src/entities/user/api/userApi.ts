import { supabase } from "@/shared/api"

export const userApi = {
  async getCurrentUser() {
    const { data, error } = await supabase.from("profiles").select().single()
    if (error) throw new Error(error.message)
    return data
  },
}
