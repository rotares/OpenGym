import { useIsMobile } from "@/shared/lib"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/primitives"
import { memo } from "react"
import { DROPDOWN_RANGE } from "../config"
import type { PeriodDropdownProps } from "../model"

export const PeriodDropdown = memo(
  ({ onChange, selectedRange, onReset }: PeriodDropdownProps) => {
    const selectedLabel =
      DROPDOWN_RANGE.find((p) => p.value === selectedRange)?.label ||
      "Выберите период"

    const isMobile = useIsMobile()

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-[180px]">
            {selectedLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isMobile ? "center" : "end"}
          className="w-[180px]"
        >
          {DROPDOWN_RANGE.map((range) => (
            <DropdownMenuItem
              key={range.value}
              onClick={() => onChange(range.value)}
              className="cursor-pointer"
            >
              {range.label}
            </DropdownMenuItem>
          ))}
          {onReset && (
            <DropdownMenuItem
              variant="destructive"
              key={onReset.name}
              onClick={onReset}
              className="cursor-pointer"
            >
              Сброс
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
)

PeriodDropdown.displayName = "PeriodDropdown"
