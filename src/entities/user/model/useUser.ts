import { useSuspenseQuery } from "@tanstack/react-query"
import { USER_QUERIES } from "./userQueries"

export const useUser = () => {
  return useSuspenseQuery(USER_QUERIES.me())
}
