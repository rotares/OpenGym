import { useThemeStore } from "@/entities/theme"
import { useLayoutEffect } from "react"
import { useShallow } from "zustand/shallow"

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useThemeStore(
    useShallow((state) => ({ theme: state.theme })),
  )

  //using use layout beacause it's work before paint in browser (fix flash light)
  useLayoutEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    //sync with system theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }
    root.classList.add(theme)
  }, [theme])

  return <>{children}</>
}
