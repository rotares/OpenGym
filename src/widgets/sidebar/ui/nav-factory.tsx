import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/primitives"
import { NavLink } from "react-router"
import { type NavProps } from "../types"

export const FactoryNav = ({ items, ...props }: NavProps) => {
  return (
    <SidebarGroup {...props}>
      <SidebarMenu className="gap-3">
        {items.map(({ label, name, route, icon: Icon }) => (
          <SidebarMenuItem className="justify-center" key={label}>
            <SidebarMenuButton asChild>
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
