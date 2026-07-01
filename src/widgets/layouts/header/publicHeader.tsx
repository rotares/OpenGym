import { useNavigate } from "react-router"
import { ThemeToggler } from "@/features/theme-toggler"
import { cn } from "@/shared/lib"

export const PublicHeader = () => {
  const navigate = useNavigate()
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
          onClick={() => navigate("/")}
          className="group text-xl font-bold tracking-tight cursor-pointer text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          OpenGym
        </h1>

        <div className="flex gap-3 items-center">
          {/* Кнопка смены темы */}
          <ThemeToggler />
        </div>
      </div>
    </header>
  )
}
