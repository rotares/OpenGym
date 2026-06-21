import { AuthProvider } from "@/app/providers/auth-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense } from "react"
import { Toaster } from "sonner"

type ProvidersProps = {
  children: React.ReactNode
  toaster?: boolean
}

export const Providers = ({ children, toaster = false }: ProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={null}>
          {children}
          {toaster && <Toaster />}
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  )
}
