import { PublicHeader } from "@/widgets/layouts/header"
import { Outlet } from "react-router"

//main app layout
export const PublicLayout = () => {
  return (
    <div className="flex flex-1 flex-col  min-h-svh">
      <PublicHeader />
      <main className="px-6 lg:px-10 flex-1 flex flex-col">
        <div className="@md:max-w-200 flex-1 flex flex-col w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
