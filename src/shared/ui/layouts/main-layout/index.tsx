import { Outlet } from "react-router"
import { AppHeader } from "../../components/app-header"

//main app layout
const MainLayout = () => {
  return (
    <>
      <AppHeader />
      <main className="p-4">
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default MainLayout
