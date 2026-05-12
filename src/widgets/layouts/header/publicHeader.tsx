import { useNavigate } from "react-router"

export const PublicHeader = () => {
  const navigate = useNavigate()
  return (
    <header className="flex sticky top-0 z-50 bg-primary text-primary-foreground items-center px-6 lg:px-8">
      <div className="h-(--header-height) flex gap-4 items-center justify-between mx-auto w-full">
        <h1 onClick={() => navigate("/")} className="text-xl cursor-pointer">
          OpenGym
        </h1>
      </div>
    </header>
  )
}
