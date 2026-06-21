import { MUSCLE_QUERIES } from "@/entities/muscle"
import { usePrivateLayoutContext } from "@/shared/context/private-layout"
import { CustomSpinner } from "@/shared/ui/components"
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/primitives"
import { useQuery } from "@tanstack/react-query"
import { ListFilter } from "lucide-react"
import { memo } from "react"
import { type ExerciseFilter } from "../model"
type Props = {
  onChangeFilter: (patch: ExerciseFilter) => void
  onResetFilters: () => void
}

export const ExerciseFilterModal = memo(
  ({ onChangeFilter, onResetFilters }: Props) => {
    const { data: muscleList, isLoading } = useQuery(MUSCLE_QUERIES.list())
    const container = usePrivateLayoutContext()
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} variant="outline">
            <span className="sr-only">Фильтры</span>
            <ListFilter />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="absolute"
          container={container}
          showCloseButton={false}
        >
          <DialogHeader>
            <div className="flex justify-between">
              <DialogTitle>Фильтры</DialogTitle>
              <Button variant={"outline"} onClick={onResetFilters}>
                Сбросить фильтры
              </Button>
            </div>
          </DialogHeader>
          {isLoading && !muscleList && <CustomSpinner />}
          {muscleList && (
            <ButtonGroup>
              {muscleList.map(({ name, id }) => (
                <Button
                  variant={"outline"}
                  key={id}
                  id={id}
                  onClick={() =>
                    onChangeFilter({
                      muscle_group_id: id,
                    })
                  }
                >
                  {name}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </DialogContent>
      </Dialog>
    )
  },
)

ExerciseFilterModal.displayName = "ExerciseFilterModal"
