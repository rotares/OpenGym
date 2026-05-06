import { useMatches } from "react-router"
import { type PageHeaderConfig } from "./types"

export const usePageHeaderConfig = () => {
  const matches = useMatches()

  const pageHeaderConfig: PageHeaderConfig = [...matches]
    .reverse()
    .find((m) => m.handle?.pageHeader)?.handle?.pageHeader

  return pageHeaderConfig ?? null
}
