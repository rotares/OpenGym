import { type ExerciseType } from "@/entities/exercise"
import { useIsMobile } from "@/shared/lib"
import { CustomSpinner } from "@/shared/ui/components"
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/shared/ui/primitives"
import { Plus } from "lucide-react"
import { memo, Suspense, useEffect, useState } from "react"
import { type DrawerProps } from "../model"
import { ExerciseDrawerContentInner } from "./ExerciseDrawerContentInner"

export const ExerciseDrawer = memo(({ onAdd }: DrawerProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isMobile = useIsMobile()

  const handleSelectExercise = (exercise: ExerciseType) => {
    onAdd(exercise)
    setIsOpen(false)
  }

  useEffect(() => {
    async function getContainer() {
      const container = document.querySelector(".main-content-area")
      if (container) setContainer(container as HTMLElement)
    }

    getContainer()
  }, [isOpen])

  return (
    <Drawer container={container} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          {isMobile ? <Plus /> : "Добавить упражнение"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto md:w-[95%] xl:max-w-none h-[75vh] p-4">
        {/* fallback for Exercises */}
        <Suspense fallback={<CustomSpinner />}>
          <ExerciseDrawerContentInner onAdd={handleSelectExercise} />
        </Suspense>
      </DrawerContent>
    </Drawer>
  )
})

ExerciseDrawer.displayName = "ExerciseDrawer"
