import {
  PeriodDropdown,
  PeriodNavigation,
  usePeriodNavigation,
} from "@/features/period-navigation"
import { CustomSpinner } from "@/shared/ui/components"
import { useQuery } from "@tanstack/react-query"
import { WORKOUT_STATS_QUERIES } from "../api"
import { STAT_CONFIG } from "../config"
import { StatsCard } from "./StatsCard"
import { StatsCardSkeleton } from "./StatsCardSekeleton"

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
    isArrowsHidden,
  } = usePeriodNavigation()

  const {
    data: stats,
    isLoading,
    isFetching,
  } = useQuery(WORKOUT_STATS_QUERIES.getAll({ startDate, endDate }))

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between gap-x-3 gap-y-4 flex-wrap">
        <PeriodNavigation
          periodLabel={periodLabel}
          onChange={navigatePeriod}
          isCurrentPeriod={isCurrentPeriod}
          isArrowsHidden={isArrowsHidden}
        />
        <PeriodDropdown
          selectedRange={range}
          onChange={setRange}
          onReset={resetDate}
        />
      </div>
      {isLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CONFIG.map((item) => (
            <StatsCardSkeleton key={item.key} />
          ))}
        </div>
      )}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {isFetching && (
            <CustomSpinner className="left-2 bottom-1 absolute size-5" />
          )}
          {STAT_CONFIG.map(({ key, title, prefix }) => {
            const value = prefix ? `${stats[key]} ${prefix}` : stats[key]
            return <StatsCard key={key} title={title} value={value} />
          })}
        </div>
      )}
    </div>
  )
}
