import { WORKOUT_STATS_QUERIES } from "@/entities/workout-stats"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useStatsPeriod } from "../model/useStatsPeriod"
import { PeriodDropdown } from "./PeriodDropdown"
import { PeriodNavigation } from "./PeriodNavigation"

export const WorkoutStats = () => {
  const {
    endDate,
    startDate,
    navigatePeriod,
    range,
    setRange,
    periodLabel,
    isCurrentPeriod,
    resetDate,
  } = useStatsPeriod()

  const { data } = useSuspenseQuery(
    WORKOUT_STATS_QUERIES.getAll({ range, startDate, endDate }),
  )

  return (
    <div>
      <PeriodNavigation
        onChange={navigatePeriod}
        isCurrentPeriod={isCurrentPeriod}
        periodLabel={periodLabel}
      />
      <PeriodDropdown
        onChange={setRange}
        selectedRange={range}
        onReset={resetDate}
      />
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
