import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AuthProvider } from "./auth-provider"
import { ThemeProvider } from "./theme-provider"

interface RouterProviderProps {
  children: React.ReactNode
}

//tanstack client
const queryClient = new QueryClient()

export const AppProvider = ({ children }: RouterProviderProps) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider children={children} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
