import { createContext, useContext } from "react"

export type HeaderConfig = {
  title: string
}

export type HeaderConfigContextType = {
  headerConfig: HeaderConfig | null
  setHeaderConfig: (headerConfig: HeaderConfig | null) => void
}

export const HeaderConfigContext =
  createContext<HeaderConfigContextType | null>(null)

export const useHeaderContext = () => {
  const context = useContext(HeaderConfigContext)
  if (!context) throw new Error("Header config context is undefined")

  return context
}
