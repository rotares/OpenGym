import { useHeaderContext } from "@/shared/context/header-config-context"
import { Outlet } from "react-router"

//layout for pages with header, which will use header config from context
export const PageHeaderLayout = () => {
  const { headerConfig } = useHeaderContext()

  return (
    <>
      <header>{headerConfig?.title}</header>
      <Outlet />
    </>
  )
}
