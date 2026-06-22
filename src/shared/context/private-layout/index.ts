import { createContext, useContext } from "react"

export const PrivateLayoutContext = createContext<HTMLElement | null>(null)

export const usePrivateLayoutContext = () => {
  const ctx = useContext(PrivateLayoutContext)
  return ctx
}

