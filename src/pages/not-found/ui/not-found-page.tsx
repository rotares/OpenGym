import { Button } from "@/shared/ui/primitives"
import { Link } from "react-router"

/**
 * Not Found Page
 * Displayed when a route is not found
 */
function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground">Page not found</p>
      <Button asChild variant="outline">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  )
}

export { NotFoundPage }
