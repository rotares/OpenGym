import { HttpResponse, http } from "msw"
import { QUERY_URL, USER_MOCK } from "../mocks/user"

export const userHandlers = [
  http.get(QUERY_URL, async () => {
    return HttpResponse.json(USER_MOCK, {
      status: 200
    })
  })
]