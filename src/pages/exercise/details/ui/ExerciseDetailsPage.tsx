import { exerciseApi } from "@/entities/exercise"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { ExerciseDetailsPreview } from "./ExerciseDetailsPreview"
import { ExerciseInstructions } from "./ExerciseInstructions"

export const ExerciseDetailsPage = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data } = useSuspenseQuery(exerciseApi.detail(id!, queryClient))

  return (
    <>
      <main className="flex overflow-y-auto no-scrollbar flex-col gap-5">
        <div>{data.name}</div>
        <ExerciseDetailsPreview />
        <ExerciseInstructions />
      </main>
    </>
  )
}
