import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives"
import { useMemo } from "react"
import { type Workout } from "../../model/types"

type Props = {
  workout: Workout
}

export const WorkoutItem = ({ workout }: Props) => {
  const { title, started_at } = workout

  const startDate = useMemo(() => {
    const date = new Date(started_at)
    return date.toString()
  }, [started_at])

  return (
    <Card className="w-full mb-5 mx-auto">
      <CardHeader>
        <CardTitle>Тренировка {title}</CardTitle>
        <p className="text-muted">{startDate}</p>
      </CardHeader>

      <CardContent>
        <p>{workout.title}</p>
      </CardContent>
    </Card>
  )
}
