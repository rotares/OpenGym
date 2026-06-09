import { type WorkoutDetails } from "@/entities/workout"

type Props = {
  exercise: WorkoutDetails["exercises"][0]
}

export const ExerciseCard = ({ exercise }: Props) => {
  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl shadow-sm overflow-hidden">
      {/* Хедер упражнения */}
      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className=" text-base text-slate-800 dark:text-slate-200">
          {exercise.name}
        </h3>
        {/* Суммарные метрики конкретного упражнения */}
        <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-md">
            {exercise.totalVolume} кг всего
          </span>
          <span className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-md">
            {exercise.totalSets} сетов
          </span>
        </div>
      </div>

      {/* Псевдотаблица подходов на CSS Grid */}
      <div className="p-4">
        <div className="max-w-xl mx-auto">
          {/* Шапка таблицы */}
          <div className="grid grid-cols-3 gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-slate-900 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase text-center tracking-wider">
            <div>Подход</div>
            <div>Вес</div>
            <div>Повторения</div>
          </div>

          {/* Ряды таблицы */}
          <div className="space-y-1">
            {exercise.sets
              .sort((a, b) => a.order_index - b.order_index) // Сортировка по порядку, если не отсортировано
              .map((set, setIndex) => (
                <div
                  key={setIndex}
                  className="grid grid-cols-3 gap-2 py-2 text-sm text-center font-medium text-slate-600 dark:text-slate-300 items-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                >
                  {/* Номер подхода */}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {set.order_index + 1}
                    </span>
                  </div>

                  {/* Вес */}
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {set.weight}{" "}
                    <span className="text-xs font-normal text-slate-400">
                      кг
                    </span>
                  </div>

                  {/* Повторения */}
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {set.reps}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
