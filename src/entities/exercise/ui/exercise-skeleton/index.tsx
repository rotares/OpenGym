//exercise item
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Skeleton,
} from "@/shared/ui/primitives"

const ExerciseSkeleton = () => {
  return (
    <Item variant={"outline"}>
      <ItemMedia variant="image">
        <Skeleton className="rounded-2xl h-[50px] aspect-square" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Skeleton>123</Skeleton>
        </ItemTitle>
        <ItemDescription>
          <Skeleton>123</Skeleton>
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

export const ExerciseSkeletonList = ({ value }: { value: number }) => {
  return (
    <ItemGroup>
      {[...Array.from({ length: value })].map((_, i) => (
        <ExerciseSkeleton key={i} />
      ))}
    </ItemGroup>
  )
}
