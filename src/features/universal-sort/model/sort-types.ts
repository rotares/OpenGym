
export type SortOption<T> = {
  displayName: string,
  key: keyof T
}

export type SortConfig<T> = {
  key: keyof T | null,
  order: 'asc' | 'desc' | null
}

