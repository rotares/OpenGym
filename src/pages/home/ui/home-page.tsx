import { NavLink } from "react-router"

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
      <NavLink to={"/workouts-history"}>Sign In</NavLink>
    </div>
  )
}

export { HomePage }
