export type PeriodDropdownProps = {
  onChange: (range: PeriodRange) => void
  selectedRange: PeriodRange
  onReset?: () => void
}

export type PeriodNavigationProps = {
  periodLabel: string
  isCurrentPeriod: boolean
  onChange: (dir: "prev" | "next") => void
  isArrowsHidden?: boolean
}

export type PeriodRange = "week" | "month" | "year" | "all"
