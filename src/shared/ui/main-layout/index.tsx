import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="bg-background">
      <Outlet />
    </div>
  )
}

export default MainLayout
