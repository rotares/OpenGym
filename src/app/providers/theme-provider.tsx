import { useLayoutEffect } from "react"
import { useShallow } from "zustand/shallow"
import { useThemeStore } from "../store/theme"

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, setTheme } = useThemeStore(
    useShallow((state) => ({ theme: state.theme, setTheme: state.setTheme })),
  )

  //using use layout beacause it's work before paint in browser (fix flash light)
  useLayoutEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      setTheme(systemTheme)
      return
    }

    root.classList.add(theme)

    setTheme(theme)
  }, [theme, setTheme])

  return <>{children}</>
}
