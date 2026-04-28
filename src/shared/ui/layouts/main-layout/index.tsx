import { Outlet } from "react-router"
import { AppHeader } from "../../components/app-header"

//main app layout
const MainLayout = () => {
  return (
    <div className="flex flex-1 flex-col min-h-svh">
      <AppHeader />
      <main className="px-4 py-5  flex-1 flex flex-col">
        <div className="max-w-[1440px] flex-1 flex flex-col w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
