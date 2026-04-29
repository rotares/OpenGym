import { useMatches } from "react-router"
import { type HeaderConfig } from "./types"

export const useHeaderConfig = () => {
  const matches = useMatches()
  console.log(matches)

  const headerConfig: HeaderConfig = [...matches]
    .reverse()
    .find((m) => m.handle?.header)?.handle?.header

  console.log(headerConfig)

  return headerConfig ?? null
}
