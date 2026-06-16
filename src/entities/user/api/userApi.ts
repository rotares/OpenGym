import { supabase } from "@/shared/api"
import { formatDate } from "../../../shared/lib"

export const userApi = {
  async getCurrentUser() {
    const { data, error } = await supabase.from("profiles").select().single()

    if (error) throw new Error(error.message)
    return {
      id: data.id,
      username: data.username,
      regDate: formatDate(data.created_at)
    }
  },
}
