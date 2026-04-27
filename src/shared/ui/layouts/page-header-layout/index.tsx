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
  const matches = useMatches()
  const title = (matches.at(-1)?.handle as Handle)?.meta?.title

  return (
    <>
      <header>{title && <h1>{title}</h1>}</header>
      <Outlet />
    </>
  )
}
