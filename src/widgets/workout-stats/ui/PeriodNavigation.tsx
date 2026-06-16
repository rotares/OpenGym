import { Button } from "@/shared/ui/primitives"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  periodLabel: string
  isCurrentPeriod: boolean
  onChange: (dir: "prev" | "next") => void
}

export const PeriodNavigation = ({
  periodLabel,
  onChange,
  isCurrentPeriod,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="sm" onClick={() => onChange("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-20 text-center text-sm font-medium text-muted-foreground">
          {periodLabel}
        </div>
        <Button
          disabled={isCurrentPeriod}
          variant="outline"
          size="sm"
          className="disabled:bg-red-200!"
          onClick={() => onChange("next")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
