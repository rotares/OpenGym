import { act, renderHook } from "@testing-library/react"
import { useSort } from "../model"
import { createInitialConfig } from "./createInitialConfig"
import { mockData, type MockData } from "./mockData"

describe('USESORT, Тесты хука универсальной фильтрации', () => {


  test('Передаем initial sort config с null значениями,.', () => {

    const initialSortConfig = createInitialConfig<MockData>(null, null)
    
    const {result} = renderHook(() => useSort({
      data: mockData,
      initialSortConfig
    }))

    expect(result.current.sortedData).toEqual(mockData)

  })

  test('Передаем сортировку по name, исходная data не равна отсортированной', () => {

const initialSortConfig = createInitialConfig<MockData>('name', 'asc')
    
    const {result} = renderHook(() => useSort({
      data: mockData,
      initialSortConfig
    }))

    expect(result.current.sortedData).not.toEqual(mockData)

  })
  
  test('Передача initialconfig по name, далее смена на null, equal to init data', () => {

    const initialSortConfig = createInitialConfig<MockData>('name', 'asc')
    
    const {result} = renderHook(({data, initialSortConfig}) => useSort({
      data,
      initialSortConfig
    }), {initialProps: {
      data: mockData,
      initialSortConfig
    }})

    expect(result.current.sortedData).not.toEqual(mockData)

    act(() => {
      result.current.requestSort(null)
    })

    expect(result.current.sortedData).toEqual(mockData)

  })

  test('desc сортировка', () => {


    const initialSortConfig = createInitialConfig<MockData>('name', 'desc')
    const sortedDescMockData = mockData.sort((a, b) => {
      return b['name'].localeCompare(a['name'])
    })

    const {result} = renderHook(() => useSort({
      data: mockData,
      initialSortConfig
    }))

    expect(result.current.sortedData).toEqual(sortedDescMockData)
  })

  test('reset конфиги к initial состоянию', () => {

    const initialSortConfig = createInitialConfig<MockData>('name', 'desc')
    const {result} = renderHook(() => useSort({
      data: mockData,
      initialSortConfig
    }))

    act(() => result.current.requestSort('id'))
    act(() => result.current.resetSort())

    expect(result.current.currentSortConfig).toEqual(initialSortConfig)
  })
})