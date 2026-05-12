import { type User } from "@/entities/user/model/types"
import { useLogoutMutation } from "@/features/auth/model/auth/useLogoutMutation"
import { cn } from "@/shared/lib"
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/primitives"
import { ChevronsUpDown, LogOut, Settings, UserCircle } from "lucide-react"

export const UserNav = ({ user }: { user: User }) => {
  const { username } = user
  const { isMobile } = useSidebar()
  const { mutate } = useLogoutMutation()

  return (
    <SidebarMenu>
      <SidebarMenuItem className={cn(isMobile && "p-2")}>
        {isMobile ? (
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="size-8 shrink-0 rounded-lg">
                <AvatarFallback>{username.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span className="truncate font-medium">{username}</span>
            </div>
            <Button
              onClick={() => mutate()}
              className="p-4"
              size={"icon-lg"}
              variant={"destructive"}
            >
              <LogOut />
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback>{username.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{username}</span>
                </div>
                <ChevronsUpDown />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-l"
              side={"right"}
              align="end"
              sideOffset={40}
            >
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserCircle />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Настройки
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => mutate()}
                  variant="destructive"
                >
                  <LogOut />
                  Выйти из аккаунта
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
