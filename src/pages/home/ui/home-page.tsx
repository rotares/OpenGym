import { Button } from "@/shared/ui"
/**
 * Home Page
 * Route-level composition that owns its own logic
 * Can import from shared and lower layers only
 */
function HomePage() {
  return (
    <div className="text-center flex gap-4 flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to OpenGym</h1>
      <p className="text-lg text-muted-foreground">
        Your personal fitness companion
      </p>
      <Button variant="default" size="lg">
        Get Started
      </Button>
    </div>
  )
}

export { HomePage }
