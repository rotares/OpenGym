import { cn } from "@/shared/lib/utils"
import { Card, CardTitle } from "@/shared/ui/primitives"
import { Calendar, ChevronRight, Clock, Dumbbell, Layers } from "lucide-react"
import { memo } from "react"

import { type WorkoutListItem } from "../../model/types"
type Props = {
  workout: WorkoutListItem
  className?: string
  onClick?: () => void
}

export const WorkoutItem = memo(({ workout, className, onClick }: Props) => {
  const { title, totalSets, totalVolume, exercisesPreview, duration, date } =
    workout

  return (
    <Card
      onClick={onClick}
      className={cn(
        "group relative w-full max-h-[250px] h-full mb-5 mx-auto cursor-pointer overflow-hidden rounded-xl shadow-sm",
        "border border-slate-100 bg-white dark:border-slate-800 dark:bg-transparent",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5 dark:hover:border-slate-700",
        className,
      )}
    >
      <div className="p-5 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-7">
          <div>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              {title}
            </CardTitle>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 dark:text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{date}</span>
            </div>
          </div>

          <div className="p-1 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/50 dark:group-hover:text-indigo-400 transition-all duration-200">
            <ChevronRight className="w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-0.5" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden min-h-[60px] relative mb-4">
          <div className="flex flex-wrap gap-2 pr-4">
            {exercisesPreview.map((ex, index) => (
              <div
                key={index}
                className="inline-flex items-center text-xs font-medium bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-800/60"
              >
                <span className="truncate max-w-[120px]">{ex.name}</span>
                <span className="ml-1.5 px-1 py-0.2 bg-white dark:bg-slate-800 rounded text-[10px] text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-slate-700">
                  ×{ex.setsCount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-900 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 bg-amber-50/50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1.5 rounded-lg justify-center">
            <Dumbbell className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{totalVolume} кг</span>
          </div>

          <div className="flex items-center gap-1.5 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 px-2 py-1.5 rounded-lg justify-center">
            <Layers className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{totalSets} сетов</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-2 py-1.5 rounded-lg justify-center">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{duration}</span>
          </div>
        </div>
      </div>
    </Card>
  )
})

WorkoutItem.displayName = "WorkoutItem"
