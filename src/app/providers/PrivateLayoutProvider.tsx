import { PrivateLayoutContext } from "@/shared/context/private-layout"
import { type ReactNode, useCallback, useState } from "react"

type ContainerRefFn = (node: HTMLElement | null) => void

type PrivateLayoutProviderProps = {
  children: (containerRef: ContainerRefFn) => ReactNode
}

export const PrivateLayoutProvider = ({
  children,
}: PrivateLayoutProviderProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  const containerRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      setContainer(node)
    }
  }, [])

  return (
    <PrivateLayoutContext.Provider value={container}>
      {children(containerRef)}
    </PrivateLayoutContext.Provider>
  )
}
