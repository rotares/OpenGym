import { exerciseApi } from "@/entities/exercise"
import { CustomSpinner } from "@/shared/ui/components/spinner"
import { ExerciseInstructions, ExercisePreview } from "@/widgets/exercise"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"

export const ExerciseDetailsPage = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery(
    exerciseApi.detail(id!, queryClient),
  )

  if (isLoading) return <CustomSpinner />
  if (error || !id || !data) return <div>nor found</div>

  return (
    <>
      <main className="flex flex-col gap-5">
        <ExercisePreview />
        <ExerciseInstructions />
      </main>
    </>
  )
}
