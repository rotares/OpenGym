import type { PeriodRange } from "@/entities/workout-stats"
import { addMonths, addWeeks, addYears, endOfMonth, endOfWeek, endOfYear, isSameMonth, isSameWeek, isSameYear, startOfMonth, startOfWeek, startOfYear, subMonths, subWeeks, subYears } from "date-fns"
import { useMemo, useState } from "react"
import { formatPeriodLabel } from "../utils"

export const strategy = {
  week: {
    getStart: startOfWeek,
    getEnd: endOfWeek,
    prev: subWeeks,
    next: addWeeks,
    isCurrentPeriod: isSameWeek
  },
  month: {
    getStart: startOfMonth,
    getEnd: endOfMonth,
    prev: subMonths,
    next: addMonths,
    isCurrentPeriod: isSameMonth,
  },
  year: {
    getStart: startOfYear,
    getEnd: endOfYear,
    prev: subYears,
    next: addYears,
    isCurrentPeriod: isSameYear,
  }
} as const

export const useStatsPeriod = () => {
  const [range, setRange] = useState<PeriodRange>("week")
  const [anchorDate, setAnchorDate] = useState(new Date())

  const canNavigate = useMemo(() => range !== "all", [range])

  const {startDate, endDate, currentStrategy, isCurrentPeriod} = useMemo(() => {

    if(range === 'all') {
      return {startDate: null, endDate: null, currentStrategy: null, isCurrentPeriod: true}
    }

    const strat = strategy[range] 

    return {
      startDate: strat.getStart(anchorDate),
      endDate: strat.getEnd(anchorDate),
      currentStrategy: strat,
      isCurrentPeriod: strat.isCurrentPeriod(anchorDate, new Date())
    }

  }, [range, anchorDate]) 

  const navigatePeriod = (dir: 'prev' | 'next') => {
    if(!currentStrategy) return
    setAnchorDate(prev => currentStrategy[dir](prev, 1))
  }

  const periodLabel = useMemo(() => {
    return formatPeriodLabel(range, startDate, endDate)
  }, [startDate, endDate, range])


  const resetDate = () => {
    setRange('week')
    setAnchorDate(new Date())

  }

  return {
    range,
    setRange,
    startDate,
    endDate,
    canNavigate,
    navigatePeriod,
    periodLabel,
    isCurrentPeriod,
    resetDate
  }
}