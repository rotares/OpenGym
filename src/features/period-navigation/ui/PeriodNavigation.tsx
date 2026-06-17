import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui/primitives"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { memo } from "react"
import type { PeriodNavigationProps } from "../model"

export const PeriodNavigation = memo(
  ({
    periodLabel,
    onChange,
    isCurrentPeriod,
    isArrowsHidden,
  }: PeriodNavigationProps) => {
    return (
      <div className="w-full md:w-auto flex gap-2 items-center">
        <Button
          className={cn(
            isArrowsHidden && "duration-300 transition-opacity opacity-0",
          )}
          variant="outline"
          onClick={() => onChange("prev")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="w-full md:min-w-40 text-center text-sm font-medium text-muted-foreground">
          {periodLabel}
        </div>
        <Button
          disabled={isCurrentPeriod}
          variant="outline"
          className={cn(
            isCurrentPeriod && "opacity-70",
            isArrowsHidden && "duration-300 transition-all opacity-0!",
          )}
          onClick={() => onChange("next")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  },
)

PeriodNavigation.displayName = "PeriodNavigation"
