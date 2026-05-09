import { useNavigate } from "react-router"

type HeaderProps = {
  sidebarTrigger?: React.ReactNode
  separator?: React.ReactNode
}

//global header
export const AppHeader = ({ sidebarTrigger, separator }: HeaderProps) => {
  const navigate = useNavigate()

  return (
    <header className="flex sticky top-0 z-50 bg-primary text-primary-foreground items-center px-6 lg:px-8">
      <div className="h-(--header-height) flex gap-4 items-center mx-auto w-full">
        <div className="flex gap-3">
          {sidebarTrigger}
          {separator}
        </div>
        <h1 onClick={() => navigate("/")} className="text-xl cursor-pointer">
          OpenGym
        </h1>
      </div>
    </header>
  )
}
