import { AppHeader } from "@/shared/ui/components/app-header"
import { SidebarProvider } from "@/shared/ui/primitives"
import { Outlet } from "react-router"
import { AppSidebar } from "../sidebar/appSidebar"

//main app layout
export const PrivateLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col flex-1">
        <AppHeader />
        <main className="flex-1 flex">
          <div className="flex-1 flex flex-col w-full mx-auto p-6 lg:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
