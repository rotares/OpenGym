import { AppHeader } from "@/shared/ui/components/app-header"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/primitives"
import { Separator } from "@/shared/ui/primitives/separator"
import { Outlet } from "react-router"
import { AppSidebar } from "../sidebar/"

//main app layout
export const PrivateLayout = () => {
  return (
    <SidebarProvider className="flex flex-col">
      <AppHeader
        sidebarTrigger={
          <SidebarTrigger variant={"outline"} size={"lg"} className="-ml-1" />
        }
        separator={<Separator orientation="vertical" />}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <main className="flex-1 flex">
            <div className="flex-1 flex flex-col max-w-[980px] mx-auto p-6 lg:p-10">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
