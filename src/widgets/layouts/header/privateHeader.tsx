import { ThemeToggler } from "@/features/theme-toggler"
import { cn } from "@/shared/lib"
import { Button, useSidebar } from "@/shared/ui/primitives"
import { MenuIcon } from "lucide-react"
import { useNavigate } from "react-router"

//global
export const PrivateHeader = () => {
  const navigate = useNavigate()
  const { isMobile, toggleSidebar } = useSidebar()

  return (
    <header
      className={cn(
        // Делаем шапку фиксированной, добавляем размытие стекла (glassmorphism) и тонкую границу снизу
        "sticky top-0 z-50 w-full items-center px-6 lg:px-8 transition-all duration-300",
        "border-b border-slate-100 bg-white/80 backdrop-blur-md",
        "dark:border-slate-800 dark:bg-slate-950/80 text-slate-900 dark:text-slate-50",
      )}
    >
      <div className="h-(--header-height) flex gap-4 items-center justify-between mx-auto w-full">
        {/* Логотип-заголовок с интерактивным ховером, как на карточках */}
        <h1
          onClick={() => navigate("/profile")}
          className="group text-xl font-bold tracking-tight cursor-pointer text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          OpenGym
        </h1>

        <div className="flex gap-3 items-center">
          {/* Кнопка смены темы */}
          <ThemeToggler />

          {/* Мобильное меню */}
          {isMobile && (
            <Button
              size={"icon-lg"}
              variant={"ghost"}
              onClick={() => toggleSidebar()}
              // Стилизуем кнопку под общую палитру
              className="text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900"
            >
              <MenuIcon className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
