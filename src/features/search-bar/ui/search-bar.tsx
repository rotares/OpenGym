import { Button, ButtonGroup, Input } from "@/shared/ui/primitives"
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
        <ButtonGroup className="">
          <Button onClick={onCloseHandle} variant="outline" size={"icon-lg"}>
            <RiArrowLeftLine />
          </Button>
          <Input
            className="h-auto"
            value={searchQuery}
            onChange={onChangeHandle}
            placeholder="Search..."
          />
        </ButtonGroup>
      ) : (
        <Button
          variant={"outline"}
          size={"icon-lg"}
          onClick={() => setIsOpen(true)}
        >
          <RiSearchLine />
        </Button>
      )}
    </>
  )
}
