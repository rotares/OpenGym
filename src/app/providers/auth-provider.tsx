import { USER_KEYS, USER_QUERIES } from "@/entities/user"
import { AuthContext, type AuthContextType } from "@/features/auth"
import { supabase } from "@/shared/api"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthContextType>({
    status: "loading",
    session: null,
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    const init = async () => {
      //получаю данные, не меняю стейт если юзера нету?
      const { data } = await supabase.auth.getSession()

      if (data?.session) {
        setAuth({
          status: "authentificated",
          session: data.session,
        })

        queryClient.prefetchQuery(USER_QUERIES.me())
      } else {
        setAuth({
          status: "guest",
          session: null,
        })
      }
    }

    //вызов функции инициализации сессии
    init()

    //подписка на supabase events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setAuth({
          status: "guest",
          session: null,
        })

        queryClient.clear()
        // queryClient.removeQueries({ queryKey: USER_KEYS.me() })
        return
      }

      if (event === "USER_UPDATED") {
        queryClient.invalidateQueries({ queryKey: USER_KEYS.me() })
        return
      }

      if (session) {
        setAuth({
          status: "authentificated",
          session,
        })

        queryClient.prefetchQuery(USER_QUERIES.me())
      }
    })

    //cleanup
    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
