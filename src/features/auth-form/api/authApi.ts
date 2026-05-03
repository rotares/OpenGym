import { supabase } from "@/shared/api/supabaseClient/index"
import type { LoginDto, RegisterDto } from "../model/types"

//api for auth
export const authApi = {
  async login({ email, password }: LoginDto) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw new Error(error.message)
    return data
  },

  async register({ email, password, options }: RegisterDto) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    })

    if (error) throw new Error(error.message)
    return data
  },
}
