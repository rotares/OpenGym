import { AspectRatio } from "@/shared/ui/primitives/"

export const ExerciseDetailsPreview = () => {
  return (
    <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted max-w[500px]">
      <div className="h-[10vh]"></div>
    </AspectRatio>
  )
}
