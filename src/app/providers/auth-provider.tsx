import { supabase } from "@/shared/api/supabaseClient"
import { useAuth } from "@/shared/store/auth/useAuth"
import { useEffect } from "react"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuth()

  useEffect(() => {
    console.log("Auth provider")

    //subs for auth events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "INITIAL_SESSION"
      )
        setUser(session?.user ?? null)

      if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser])

  return <>{children}</>
}
