//exercise item
import { cn } from "@/shared/lib"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
  Skeleton,
} from "@/shared/ui/primitives"
import { memo } from "react"
import { type ExerciseType } from "../../model/exercise-types"

export type ItemType = "default" | "large"

interface ExerciseItemProps extends Pick<
  ExerciseType,
  "name" | "muscle_group_name"
> {
  onClick?: (args?: unknown) => void
  itemType?: ItemType
}

export const ExerciseItem = memo((props: ExerciseItemProps) => {
  const { name, muscle_group_name, onClick, itemType = "default" } = props

  return (
    <Item
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-100 bg-white dark:bg-transparent dark:border-slate-800 shadow-sm",
        "cursor-pointer items-center transition-all duration-350 ease-in-out grid grid-cols-[auto_1fr] gap-5",
        "hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 hover:-translate-y-0.5",
        itemType === "large" && "p-3 h-25 sm:h-28 w-full",
      )}
      variant={"outline"}
    >
      <div className="h-full aspect-square flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-md border border-slate-100/50 dark:border-slate-800/40" />
      </div>

      <ItemContent className="min-w-0">
        <ItemTitle className="truncate text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {name}
        </ItemTitle>
        {muscle_group_name && (
          <ItemDescription className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {muscle_group_name}
          </ItemDescription>
        )}
      </ItemContent>
    </Item>
  )
})

ExerciseItem.displayName = "ExerciseItem"
