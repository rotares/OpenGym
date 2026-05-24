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

interface ExerciseItemProps extends Pick<
  ExerciseType,
  "name" | "muscle_group"
> {
  onClick?: (args?: unknown) => void
}

export const ExerciseItem = memo((props: ExerciseItemProps) => {
  const { name, muscle_group, onClick } = props
  return (
    <Item
      onClick={onClick}
      className="hover:scale-101 transition-all duration-75 cursor-pointer"
      variant={"outline"}
    >
      <ItemMedia variant="image">
        <div className="bg-red-500 rounded-2xl h-[50px] aspect-square"></div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        {muscle_group && <ItemDescription>{muscle_group.name}</ItemDescription>}
      </ItemContent>
    </Item>
  )
})
