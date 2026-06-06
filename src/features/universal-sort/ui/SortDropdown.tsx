import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/primitives"

import type { SortConfig, SortOption } from "../model"

type SortDropdownProps<T> = {
  sortOptions: readonly SortOption<T>[]
  onChangeSort: (key: keyof T | null) => void
  currentSortConfig: SortConfig<T>
  resetSort: () => void
}

import { cn } from "@/shared/lib"
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react"

export const SortDropdown = <T,>({
  sortOptions,
  onChangeSort,
  currentSortConfig,
  resetSort,
}: SortDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <span className="sr-only">Открыть список фильтров</span>
          <ArrowDownUp />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-max">
        <DropdownMenuGroup>
          {sortOptions.map(({ displayName, key }) => {
            const activeItem = currentSortConfig.key === key
            return (
              <DropdownMenuItem
                key={displayName}
                onSelect={(e) => {
                  e.preventDefault()
                  onChangeSort(key)
                }}
                className={cn("flex items-center gap-2")}
              >
                <div
                  className={cn(
                    !activeItem && "opacity-0 pointer-events-none ",
                    "w-4 h-4",
                  )}
                >
                  {activeItem &&
                    (currentSortConfig.order === "asc" ? (
                      <ArrowUp />
                    ) : (
                      <ArrowDown />
                    ))}
                </div>
                <div>{displayName}</div>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault()
              resetSort()
            }}
          >
            Сбросить
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
