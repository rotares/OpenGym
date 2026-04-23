import {
  HeaderConfigContext,
  type HeaderConfig,
} from "@/shared/context/header-config-context"
import { useMemo, useState } from "react"

//context for header config, which will be used in PageHeaderLayout for customization header for each page
export const HeaderConfigProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig | null>(null)

  const value = useMemo(() => {
    return {
      headerConfig,
      setHeaderConfig,
    }
  }, [headerConfig])

  return (
    <HeaderConfigContext.Provider value={value}>
      {children}
    </HeaderConfigContext.Provider>
  )
}
