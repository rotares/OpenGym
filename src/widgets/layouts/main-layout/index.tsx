import { Outlet } from "react-router"
import { AppHeader } from "../../../shared/ui/components/app-header"
import { useHeaderConfig } from "../common/model/useHeaderConfig"

//main app layout
const MainLayout = () => {
  const headerConfig = useHeaderConfig()

  console.log(headerConfig)

  return (
    <div className="flex flex-1 flex-col min-h-svh">
      <AppHeader headerConfig={headerConfig} actions={headerConfig?.actions} />
      <main className="px-4 py-5  flex-1 flex flex-col">
        <div className="max-w-[1440px] flex-1 flex flex-col w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
