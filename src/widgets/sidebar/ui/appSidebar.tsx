import { cn } from "@/shared/lib"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/shared/ui/primitives"
import { ChevronRight } from "lucide-react"
import { Suspense } from "react"
import { NAV_CONFIG } from "../model/sidebarConfig"
import { FactoryNav } from "./nav-factory"
import { UserNav } from "./user-nav"
import { UserNavSkeleton } from "./user-nav-skeleton"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, toggleSidebar } = useSidebar()

  return (
    <Sidebar
      variant={"inset"}
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      {isMobile && (
        <SidebarHeader className={"border-b h-(--header-height)"}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={toggleSidebar}>
                <ChevronRight />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}
      <SidebarContent className={cn(!isMobile && "pt-4")}>
        <FactoryNav items={NAV_CONFIG.mainNav} />
        {isMobile && (
          <FactoryNav className="border-t" items={NAV_CONFIG.mobileNav} />
        )}
      </SidebarContent>
      <SidebarFooter className=" border-t">
        <Suspense fallback={<UserNavSkeleton />}>
          <UserNav />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
