import { Card, CardTitle } from "@/shared/ui/primitives"
import { memo } from "react"

type Props = {
  title: string
  value: string | number
  className?: string
}

export const StatsCard = memo(({ title, value, className }: Props) => {
  return (
    <Card
      className={`group text-md sm:text-lg relative text-center w-full h-full mb-5 mx-auto 
        cursor-pointer overflow-hidden rounded-xl border border-slate-100 bg-white 
        shadow-sm transition-all duration-350 ease-in-out
        hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5
        bg-transparent dark:border-slate-800 dark:hover:border-slate-700 ${className}`}
    >
      <div className="p-2 flex flex-col h-full justify-between">
        {/* Заголовок карточки */}
        <div>
          <CardTitle className="px-2 font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </CardTitle>
        </div>

        {/* Основное значение */}
        <div className="mt-1">
          <span className="px-2 text-slate-800 dark:text-slate-100">
            {value}
          </span>
        </div>
      </div>
    </Card>
  )
})

StatsCard.displayName = "StatsCard"
