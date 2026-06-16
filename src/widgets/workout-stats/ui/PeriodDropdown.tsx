import type { PeriodRange } from "@/entities/workout-stats"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/primitives"
import { DROPDOWN_RANGE } from "../utils"

type Props = {
  onChange: (range: PeriodRange) => void
  selectedRange: PeriodRange
  onReset?: () => void
}

export const PeriodDropdown = ({ onChange, selectedRange, onReset }: Props) => {
  const selectedLabel =
    DROPDOWN_RANGE.find((p) => p.value === selectedRange)?.label ||
    "Выберите период"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px]">
          {selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
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
}
