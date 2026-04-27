//exercise item
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/primitives"
import { memo } from "react"
import { type ExerciseType } from "../../model/exercise-types"

export const ExerciseItem = memo((props: Partial<ExerciseType>) => {
  const { name, muscle_group_id } = props
  return (
    <Item variant={"outline"}>
      <ItemMedia variant="image">
        <div className="bg-red-500 rounded-2xl h-[50px] aspect-square"></div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{muscle_group_id}</ItemDescription>
      </ItemContent>
    </Item>
  )
})
