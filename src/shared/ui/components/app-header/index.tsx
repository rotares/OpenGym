import { supabase } from "@/shared/api/supabaseClient"
import { Button } from "@/shared/ui/primitives"
import { useNavigate } from "react-router"

//global header
export const AppHeader = () => {
  const navigate = useNavigate()

  return (
    <header className="flex bg-primary text-primary-foreground items-center px-6 lg:px-10 py-3">
      <div className="flex gap-3 items-center mx-auto w-full">
        <h1 onClick={() => navigate("/")} className="text-xl cursor-pointer">
          OpenGym
        </h1>
        <Button onClick={() => navigate("/auth")}>Log</Button>
        <Button onClick={() => supabase.auth.signOut()}>Out</Button>
      </div>
    </header>
  )
}
