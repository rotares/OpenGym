import { Card, CardTitle, Skeleton } from "@/shared/ui/primitives"

export const StatsCardSkeleton = () => {
  return (
    <Card
      className={`text-md sm:text-lg relative text-center w-full h-full mb-5 mx-auto 
        cursor-pointer overflow-hidden rounded-xl border border-slate-100 bg-white 
        shadow-sm transition-all duration-350 ease-in-out
        hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5
        bg-transparent dark:border-slate-800 dark:hover:border-slate-700`}
    >
      <div className="p-2 flex flex-col h-full justify-between">
        {/* Заголовок карточки */}
        <div>
          <CardTitle className="px-2 font-bold text-slate-800 dark:text-slate-100">
            <Skeleton className="h-5 w-32 mx-auto" />
          </CardTitle>
        </div>
        {/* Основное значение */}
        <div className="mt-1">
          <Skeleton className="h-7 w-16 mx-auto" />
        </div>
      </div>
    </Card>
  )
}
