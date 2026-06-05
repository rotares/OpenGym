import { useMemo, useState } from "react"
import { useDebounceValue } from "./useDebounceValue"

type Props<T> = {
  initialData: T[],
  searchKey: keyof T | (keyof T)[]
}

export const useSearch = <T>({initialData, searchKey}: Props<T>) => {
  
  const [searchQuery, setSearchQuery] = useState<string>('')
  //debounced search query to optimize performance
  const debouncedSearchQuery = useDebounceValue(searchQuery)


  const normalizedSearchKeys = useMemo(
    () => (Array.isArray(searchKey) ? searchKey : [searchKey]),
    [searchKey]
  ) 


  const filteredData = useMemo(() => {
    if(!debouncedSearchQuery.trim()) return initialData

    const formattedQuery = debouncedSearchQuery.trim().toLowerCase()

    return initialData.filter(item => {

      return normalizedSearchKeys.some(key => {
        const valueOfSearch = item[key]
        return typeof valueOfSearch === 'string'
          ? valueOfSearch.toLowerCase().includes(formattedQuery)
          : false
      })

    })

  }, [initialData, debouncedSearchQuery, normalizedSearchKeys])

  return {
    setSearchQuery,
    searchQuery,
    filteredData
  }
}