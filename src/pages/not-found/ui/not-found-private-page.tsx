import { Button } from "@/shared/ui/primitives"
import { useNavigate } from "react-router"
/**
 * Not Found Page
 * Displayed when a route is not found
 */
export function NotFoundPrivatePage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 flex-1 justify-center items-center">
      <h2 className="text-6xl font-bold">404</h2>
      <p className="text-lg text-muted-foreground">
        Упс... Страница не найдена
      </p>
      <Button onClick={() => navigate(-1)} variant="outline">
        Вернуться назад
      </Button>
    </div>
  )
}
