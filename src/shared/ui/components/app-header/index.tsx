import { supabase } from "@/shared/api/supabaseClient"
import { useAuth } from "@/shared/store/auth/useAuth"
import { useNavigate } from "react-router"
import { Button } from "../../primitives"

//global header
export const AppHeader = ({ actions, headerConfig }) => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-primary text-primary-foreground flex items-center px-4 py-3">
      <div className="flex gap-3 items-center justify-between @md:max-w-250 h-[35px]  mx-auto w-full">
        <h1 onClick={() => navigate("/")} className="text-xl cursor-pointer">
          OpenGym
        </h1>
        {actions && <div>{actions}</div>}

        {!isAuth && <Button onClick={() => navigate("/auth")}>Start</Button>}
        {isAuth && (
          <Button
            onClick={async () => supabase.auth.signOut()}
            children={"Logout"}
          />
        )}
      </div>
    </header>
  )
}
