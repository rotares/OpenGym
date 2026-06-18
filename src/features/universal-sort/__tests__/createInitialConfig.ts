import { type SortConfig } from "../model"

export const createInitialConfig = <T>(key: SortConfig<T>['key'], order:SortConfig<T>['order']) => {
  return {
    key,
    order
  } 
}
