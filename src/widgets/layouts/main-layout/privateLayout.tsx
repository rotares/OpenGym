import { SidebarInset, SidebarProvider } from "@/shared/ui/primitives"
import { AppSidebar } from "@/widgets/sidebar"
import { Outlet } from "react-router"
import { PrivateHeader } from "../header"
//main app layout
export const PrivateLayout = () => {
  return (
    <SidebarProvider
      className="
        h-svh

        flex
        flex-col
      "
    >
      <PrivateHeader />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />

        <SidebarInset className="flex flex-1">
          <div
            className="
              main-content-area
              relative

              flex
              flex-1
              flex-col

              w-full
              max-w-[980px]

              mx-auto

              overflow-hidden

              px-6
              pt-6

              lg:px-10
              lg:pt-10
            "
          >
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
