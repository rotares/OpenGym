//@ts-nocheck
/* eslint-disable no-use-before-define */ 

import { useMatches } from "react-router"
import { type HeaderConfig } from "./types"

export const useHeaderConfig = () => {
  const matches = useMatches()

  const headerConfig: HeaderConfig = [...matches]
    .reverse()
    .find((m) => m.handle?.header)?.handle?.header

  return headerConfig ?? null
}
