import { SidebarInset, SidebarProvider } from "@/shared/ui/primitives"
import { AppSidebar } from "@/widgets/sidebar"
import { Outlet } from "react-router"
import { PrivateHeader } from "../header"
//main app layout
export const PrivateLayout = () => {
  return (
    <SidebarProvider className="flex flex-col">
      <PrivateHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset className=" eflex-1 flex">
          <div className="relative flex-1 flex flex-col w-full max-w-[980px] mx-auto p-6 lg:p-10">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
