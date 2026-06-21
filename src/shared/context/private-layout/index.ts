import { createContext, useContext } from "react"

export const PrivateLayoutContext = createContext<HTMLElement | null>(null)

export const usePrivateLayoutContext = () => {
  const ctx = useContext(PrivateLayoutContext)
  if (!ctx) throw new Error("Has no PrivateLayoutContext")
  return ctx
}

