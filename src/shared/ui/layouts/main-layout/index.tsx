import { Outlet } from "react-router"
import { AppHeader } from "../../components/app-header"

//main app layout
const MainLayout = () => {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-[1440px] ">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
