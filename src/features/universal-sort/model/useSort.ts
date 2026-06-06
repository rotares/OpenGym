import { useMemo, useState } from "react"

import type { SortConfig } from "./sort-types"

type SortProps<T> = {data: T[], initialSortConfig: SortConfig<T>}

export const useSort = <T>({data, initialSortConfig}: SortProps<T>) => {

  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(initialSortConfig)
  
  const sortedData = useMemo(() => {
    const { key, order } = sortConfig
    
    if(!key || !order) return data

    return [...data].sort((a, b) => {
      const valueA = a[key]
      const valueB = b[key]
      
      //если valueA не назачено то кидаем в конец > 0 -> первый элемент идет в конец
      if(valueA === undefined || valueA === null) return 1
      //если valueB не назачено то кидаем в конец < 0 -> первый элемент идет раньше второго
      if(valueB === undefined || valueB === null) return -1

      if(typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }
      
   
      if(valueA < valueB) return order === 'asc' ? -1 : 1
      if(valueA > valueB) return order === 'asc' ? 1 : -1

      return 0

    })

  }, [sortConfig, data])

  //change sort when click on same sort
  const requestSort = (key: SortConfig<T>['key']) => {
    
    //если у нас тот же ключ, то меняем направление сортировки
    if(sortConfig.key === key) {
      const newOrder: SortConfig<T>['order'] = sortConfig.order === 'asc' ? 'desc' : 'asc'
      setSortConfig({key, order: newOrder})
      return 
    }

    //в ином случае оставляем направление, но меняем ключ
    setSortConfig({key, order: sortConfig.order})
  }

  //reset
  const resetSort = () => setSortConfig(initialSortConfig || null)

  return {
    sortedData,
    requestSort,
    currentSortConfig: sortConfig,
    resetSort
  }
  
}