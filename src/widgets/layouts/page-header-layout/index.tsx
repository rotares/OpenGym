import { BackButton } from "@/shared/ui/components"
import { Outlet } from "react-router"
import { type PageHeaderConfig } from "../common/model/types"
import { usePageHeaderConfig } from "../common/model/usePageHeaderConfig"

//layout for pages with header, which will be used in router for pages with header
export const PageHeaderLayout = () => {
  const pageHeaderConfig: PageHeaderConfig = usePageHeaderConfig()
  if (!pageHeaderConfig) return <Outlet />

  return (
    <>
      <header className="text-xl mb-5 flex gap-5">
        {pageHeaderConfig?.back && <BackButton />}
        {pageHeaderConfig?.title && (
          <h1 className="self-center">{pageHeaderConfig.title}</h1>
        )}
      </header>
      <Outlet />
    </>
  )
}
