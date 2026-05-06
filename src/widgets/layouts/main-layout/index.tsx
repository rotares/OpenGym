import { Outlet } from "react-router"
import { AppHeader } from "../../../shared/ui/components/app-header"

//main app layout
const MainLayout = () => {
  return (
    <div className="flex flex-1 flex-col min-h-svh">
      <AppHeader />
      <main className="px-4 py-[40px] flex-1 flex flex-col">
        <div className="@md:max-w-200 flex-1  flex flex-col w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
