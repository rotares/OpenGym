import { useEffect, useState } from "react"


//GENERIC 
export const useDebounceValue = <T>(value: T, delay = 300): T => {

  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {

    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)

  }, [value, delay])

  return debouncedValue
}