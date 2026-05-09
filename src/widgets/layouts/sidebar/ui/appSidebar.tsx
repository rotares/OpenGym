import { Sidebar, SidebarContent, SidebarFooter } from "@/shared/ui/primitives"
import { MainNav } from "./main-nav"

import { NAV_CONFIG } from "../sidebarConfig"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent className="pt-5">
        <MainNav items={NAV_CONFIG.mainNav} />
      </SidebarContent>
      <SidebarFooter>//usernav</SidebarFooter>
    </Sidebar>
  )
}
