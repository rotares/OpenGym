import { ModeToggle } from "@/shared/ui/components/themeToggle/theme-toggle"
import { Button, useSidebar } from "@/shared/ui/primitives"
import { MenuIcon } from "lucide-react"
import { useNavigate } from "react-router"

//global
export const PrivateHeader = () => {
  const navigate = useNavigate()
  const { isMobile, toggleSidebar } = useSidebar()

  return (
    <header className="flex sticky top-0 z-50 bg-primary text-primary-foreground items-center px-6 lg:px-8">
      <div className="h-(--header-height) flex gap-4 items-center justify-between mx-auto w-full">
        <h1
          onClick={() => navigate("/profile")}
          className="text-xl cursor-pointer"
        >
          OpenGym
        </h1>

        <div className="flex gap-3">
          <ModeToggle />
          {isMobile && (
            <Button size={"icon-lg"} variant={"ghost"} onClick={toggleSidebar}>
              <MenuIcon />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
