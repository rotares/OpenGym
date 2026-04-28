import { exerciseApi } from "@/entities/exercise/api"
import { ExerciseItem } from "@/entities/exercise/ui"
import { CustomSpinner } from "@/shared/ui/components/spinner"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

export const ExerciseDetailsPage = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useQuery(exerciseApi.detail(id))


  if (isLoading) return <CustomSpinner />
  
  if (error || !id) return <div>nor found</div>
  return (
    <>
      <ExerciseItem name={data.name} muscle_group_id={data.muscle_group_id} />
    </>
  )
}
