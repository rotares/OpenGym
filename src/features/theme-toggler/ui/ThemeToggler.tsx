import { Monitor, Moon, Sun } from "lucide-react"

import { useThemeStore } from "@/entities/theme"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/primitives"
import { memo } from "react"

type ModeToggleProps = {
  className?: "string"
}

export const ThemeToggler = memo(({ className }: ModeToggleProps) => {
  const setTheme = useThemeStore((s) => s.setTheme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} asChild>
        <Button variant="ghost" size="icon-lg">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Переключить тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={15} align="center">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun />
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon />
          Тёмная
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor />
          Системная
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
