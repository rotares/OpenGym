import {
  useDeleteWorkoutMutation,
  useWorkoutStore,
  WORKOUT_QUERIES,
  workoutMapper,
} from "@/entities/workout"
import { CustomSpinner, PageWrapper } from "@/shared/ui/components"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/primitives"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
  Activity,
  ArrowLeft,
  Calendar,
  Clock,
  Dumbbell,
  Ellipsis,
  Layers,
} from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { ExerciseCard } from "./ExerciseCard"
import { StatCard } from "./StatCard"

export const WorkoutDetailsPage = () => {
  const editWorkout = useWorkoutStore((s) => s.editWorkout)

  const { id } = useParams()
  const { data: workout, isRefetching } = useSuspenseQuery(
    WORKOUT_QUERIES.detail(id!),
  )
  const { mutate } = useDeleteWorkoutMutation()
  const navigate = useNavigate()

  const handleDelete = () => {
    mutate(workout.id)
    navigate("/workouts-history")
  }

  const handleEdit = () => {
    //map details data to workout session store
    const mappedToWorkoutDraft = workoutMapper.detailsToWorkoutSession(workout)
    editWorkout(mappedToWorkoutDraft)
    navigate("/workout-session")
  }

  return (
    <PageWrapper>
      <PageWrapper.Header className="flex flex-col md:flex-row md:items-center justify-between gap-4  border-b border-slate-100 dark:border-slate-900">
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Назад"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex justify-between w-full">
            <div>
              <h1 className="text-xl tracking-tight">
                Тренировка {workout.date}
              </h1>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> ID сессии: #
                {workout.id.slice(0, 8)}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  data-testid="detailsDropdown"
                  variant={"outline"}
                  size={"icon-lg"}
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="left" align="center">
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="text-amber-200/80"
                >
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} variant="destructive">
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </PageWrapper.Header>
      <PageWrapper.Content className="space-y-6">
        {/* Блок суммарной статистики тренировки */}
        {isRefetching && <CustomSpinner />}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={Dumbbell}
            title="Вес"
            value={`${workout.totalVolume} кг`}
            colorClass="text-amber-600 dark:text-amber-400"
          />
          <StatCard
            icon={Layers}
            title="Подходы"
            value={`${workout.totalSets} сетов`}
            colorClass="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            icon={Clock}
            title="Время"
            value={workout.duration}
            colorClass="text-emerald-600 dark:text-emerald-400"
          />
        </div>

        {/* Список упражнений */}
        <div className="space-y-6 mt-12 mb-7">
          <h2 className="text flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-indigo-500" /> Выполненные
            упражнения
          </h2>

          {workout.exercises.map((exercise, exIndex) => (
            <ExerciseCard key={exIndex} exercise={exercise} />
          ))}
        </div>
      </PageWrapper.Content>
    </PageWrapper>
  )
}
