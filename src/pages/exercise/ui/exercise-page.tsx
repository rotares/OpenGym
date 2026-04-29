import { exerciseApi } from "@/entities/exercise/api"
import { CustomSpinner } from "@/shared/ui/components/spinner"
import { ExerciseInstructions, ExercisePreview } from "@/widgets/exercise"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

export const ExerciseDetailsPage = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useQuery(exerciseApi.detail(id))

  if (isLoading) return <CustomSpinner />
  if (error || !id) return <div>nor found</div>

  return (
    <>
      <main className="flex flex-col gap-5">
        <ExercisePreview />
        <ExerciseInstructions />
      </main>
    </>
  )
}
