import { Outlet } from "react-router"
import { AppHeader } from "../../app-header"

//main app layout
const MainLayout = () => {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
