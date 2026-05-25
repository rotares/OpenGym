import { useMatches } from "react-router"
import type { RouteHandle } from "./types"


//typeguard
const isPageHeaderConfig = (handle: unknown): handle is RouteHandle => {
  return (handle !== null && typeof handle === 'object' && 'pageHeader' in handle)
}

export const usePageHeaderConfig = () => {
  const matches = useMatches()

  const pageHeaderConfig = [...matches]
    .reverse()
    .map(m => m.handle)
    .find(isPageHeaderConfig)
    ?.pageHeader
    
  return pageHeaderConfig ?? null
}
