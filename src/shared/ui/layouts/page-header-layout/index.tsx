import { useHeaderStore } from "@/shared/store/header"

import type { JSX } from "react"

import { Outlet, useMatches } from "react-router"

interface Handle {
  meta: {
    title?: string
    actions?: () => JSX.Element
  }
}

//layout for pages with header, which will be used in router for pages with header
export const PageHeaderLayout = () => {
  const headerConfig = useHeaderStore((state) => state.headerConfig)

  const matches = useMatches()
  const title =
    (matches.at(-1)?.handle as Handle)?.meta?.title || headerConfig?.title

  //if there is no header config and no title, then we can render page without header
  if (!headerConfig && !title) {
    return <Outlet />
  }

  return (
    <>
      <header>
        {title && <h1>{title}</h1>}
        {headerConfig?.actions?.()}
      </header>
      <Outlet />
    </>
  )
}
