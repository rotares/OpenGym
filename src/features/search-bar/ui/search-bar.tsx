import {
  Button,
  ButtonGroup,
  InputGroup,
  InputGroupInput,
} from "@/shared/ui/primitives"
import { RiArrowLeftLine, RiSearchLine } from "@remixicon/react"
import { useEffect, useState, type SyntheticEvent } from "react"
import { useShallow } from "zustand/shallow"
import { useSearchBar } from "../model/search-bar"

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { searchQuery, setSearchQuery } = useSearchBar(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery,
    })),
  )

  //reset store on unmount
  useEffect(() => {
    return () => setSearchQuery("")
  }, [setSearchQuery])

  const onChangeHandle = (e: SyntheticEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value)
  }

  const onCloseHandle = () => {
    setIsOpen(false)
    setSearchQuery("")
  }

  return (
    <>
        {isOpen ? (
          <ButtonGroup>
            <Button onClick={onCloseHandle} variant="outline" size={"icon"}>
              <RiArrowLeftLine />
            </Button>
            <InputGroup>
              <InputGroupInput
                value={searchQuery}
                onChange={onChangeHandle}
                placeholder="Search..."
              />
            </InputGroup>
          </ButtonGroup>
        ) : (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsOpen(true)}
          >
            <RiSearchLine />
          </Button>
        )}
    </>
  )
}
