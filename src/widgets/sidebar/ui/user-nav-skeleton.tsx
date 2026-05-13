import { Skeleton } from "@/shared/ui/primitives"

export const UserNavSkeleton = () => {
  return (
    <div className="flex gap-3 items-center p-2">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}
