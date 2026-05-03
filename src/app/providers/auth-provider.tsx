import { supabase } from "@/shared/api/supabaseClient"
import { useAuth } from "@/shared/store/auth/useAuth"
import { useEffect } from "react"

export const AuthProvider = ({ children }) => {
  const { setUser } = useAuth()

  useEffect(() => {
    console.log("Auth provider")

    //get initial session
    supabase.auth.getSession().then((data) => {
      const {
        data: { session },
      } = data
      setUser(session?.user ?? null)
    })

    //subs for auth events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")
        setUser(session?.user)

      if (event === "SIGNED_OUT") {
        setUser(null)
      }

      return () => subscription.unsubscribe()
    })
  }, [setUser])

  return <>{children}</>
}
