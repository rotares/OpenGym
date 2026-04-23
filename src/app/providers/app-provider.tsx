import { BrowserRouter } from "react-router"
import { HeaderConfigProvider } from "./header-config-provider"
import { ThemeProvider } from "./theme-provider"

interface RouterProviderProps {
  children: React.ReactNode
}

export const AppProvider = ({ children }: RouterProviderProps) => {
  return (
    <ThemeProvider>
      <HeaderConfigProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </HeaderConfigProvider>
    </ThemeProvider>
  )
}
