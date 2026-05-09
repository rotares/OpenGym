import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/primitives"

import { NavLink } from "react-router"
import { type ItemType } from "../types"

type MainNavProps = {
  items: ItemType[]
}

export const MainNav = ({ items }: MainNavProps) => {
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-3">
        {items.map(({ label, name, route, icon: Icon }) => (
          <SidebarMenuItem className="justify-center" key={label}>
            <SidebarMenuButton className="px-6 py-5" asChild>
              <NavLink to={route}>
                {Icon && <Icon />}
                <span>{name}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
