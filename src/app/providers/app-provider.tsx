import { BrowserRouter } from "react-router"
import { ThemeProvider } from "./theme-provider"

interface RouterProviderProps {
  children: React.ReactNode
}

export const AppProvider = ({ children }: RouterProviderProps) => {
  return (
    <ThemeProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  )
}
