import { type ExerciseType } from "@/entities/exercise"
import { usePrivateLayoutContext } from "@/shared/context/private-layout"
import { useIsMobile } from "@/shared/lib"
import { CustomSpinner } from "@/shared/ui/components"
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/primitives"
import { Plus } from "lucide-react"
import { memo, Suspense, useState } from "react"
import { type DrawerProps } from "../model"
import { ExerciseDrawerContentInner } from "./ExerciseDrawerContentInner"

export const ExerciseDrawer = memo(({ onAdd }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isMobile = useIsMobile()
  const container = usePrivateLayoutContext()

  const handleSelectExercise = (exercise: ExerciseType) => {
    onAdd(exercise)
    setIsOpen(false)
  }

  return (
    <Drawer container={container} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          {isMobile ? <Plus /> : "Добавить упражнение"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto md:w-[95%] xl:max-w-[1120px] h-[75vh] p-4">
        <DrawerHeader>
          <DrawerTitle>Выберите упражнение</DrawerTitle>
        </DrawerHeader>
        {/* fallback for Exercises */}
        <Suspense fallback={<CustomSpinner />}>
          <ExerciseDrawerContentInner onAdd={handleSelectExercise} />
        </Suspense>
      </DrawerContent>
    </Drawer>
  )
})

ExerciseDrawer.displayName = "ExerciseDrawer"
