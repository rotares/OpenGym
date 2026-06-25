import { http, HttpResponse } from "msw"
import { PROFILE_MOCK, QUERY_URL } from "../mocks/profile"

export const profileHandlers = [
  http.get(QUERY_URL, async () => {
    return HttpResponse.json(PROFILE_MOCK, {
      status: 200
    })
  })
]