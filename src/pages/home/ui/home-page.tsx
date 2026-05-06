/**
 * Home Page
 * Route-level composition that owns its own logic
 * Can import from shared and lower layers only
 */
import { useNavigate } from "react-router"

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="text-center flex gap-4 flex-col items-center justify-center ">
      <button onClick={() => navigate("auth")}>Войти в аккаунт</button>
    </div>
  )
}

export { HomePage }
