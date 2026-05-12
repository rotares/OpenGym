import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/primitives"
import { NavLink } from "react-router"
import { type ItemType } from "../types"

export const SidebarItem = ({ item }: { item: ItemType }) => {
  const { name, route, icon: Icon } = item

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="px-6 py-5" asChild>
        <NavLink to={route}>
          {Icon && <Icon />}
          <span>{name}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
