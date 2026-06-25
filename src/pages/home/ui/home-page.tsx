/**
 * Home Page
 * Route-level composition that owns its own logic
 * Can import from shared and lower layers only
 */
import { useNavigate } from "react-router"
import { Button } from "@/shared/ui/primitives"
function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 text-center flex gap-4 flex-col items-center justify-center ">
      <h2 className="text-2xl">Добро пожаловать!</h2>
      <Button variant={"outline"} onClick={() => navigate("auth")}>
        Войти в аккаунт
      </Button>
    </div>
  )
}

export { HomePage }
