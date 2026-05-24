import {
  exerciseApi,
  ExerciseList,
  type ExerciseType,
} from "@/entities/exercise"
import { CustomSpinner } from "@/shared/ui/components"
import { useQuery } from "@tanstack/react-query"

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/primitives"

import { useEffect, useState } from "react"

type Props = {
  onAdd: (exercise: ExerciseType) => void
}

export const SelectExercise = ({ onAdd }: Props) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data: exercises, isLoading, error } = useQuery(exerciseApi.list())

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
  }, [exercises])

  if (error || (!exercises && !isLoading))
    return <div>{error ? error.message : "Нет упражнений"}</div>

  return (
    <Drawer container={container} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Добавить упражнение
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[75vh] p-4">
        <DrawerHeader>
          <DrawerTitle>Выберите упражнение</DrawerTitle>
        </DrawerHeader>
        <div className="no-scrollbar my-auto overflow-y-auto">
          {isLoading ? (
            <CustomSpinner />
          ) : (
            <ExerciseList onAdd={handleSelectExercise} exercises={exercises!} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
