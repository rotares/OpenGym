import { Outlet, useMatches } from "react-router"

//layout for pages with header, which will be used in router for pages with header
export const PageHeaderLayout = () => {
  const matches = useMatches()

  const title = matches.at(-1)?.handle?.meta?.title

  return (
    <>
      {title && <header>{title}</header>}
      <Outlet />
    </>
  )
}
