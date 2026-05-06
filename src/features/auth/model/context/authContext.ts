import type { Session } from "@supabase/supabase-js"
import { createContext, useContext } from "react"

export type AuthContextType =
  | {
      status: "loading"
      session: null
    }
  | {
      status: "authentificated"
      session: Session
    }
  | {
      status: "guest"
      session: null
    }

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("context is not defined")
  return ctx
}
