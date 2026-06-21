import { http, HttpResponse } from "msw"
import { MUSCLES_MOCK, QUERY_URL } from "../mocks/muscles"

export const musclesHandlers = [
    http.get(QUERY_URL, async () => {
      return HttpResponse.json(MUSCLES_MOCK, {
        status: 200
      })
    })
]

