import { AspectRatio } from "@/shared/ui/primitives/"

export const ExercisePreview = () => {
  return (
    <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
      <div className="h-[20vh] w-full"></div>
    </AspectRatio>
  )
}
