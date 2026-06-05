import { queryOptions } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export const USER_KEYS = {
  users: () => ["user"],
  me: () => [...USER_KEYS.users(), "me"],
}

export const USER_QUERIES = {
  me: () =>
    queryOptions({
      queryKey: USER_KEYS.me(),
      queryFn: () => userApi.getCurrentUser(),
      refetchOnMount: false,
      staleTime: 5 * 1000 * 60,
    }),
}
