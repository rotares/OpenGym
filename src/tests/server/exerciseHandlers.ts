import { HttpResponse, http } from "msw";
import { EXERCISE_MOCK, QUERY_URL } from "../mocks/exercise";

export const exerciseHandlers = [
  http.get(QUERY_URL, async () => {
    return HttpResponse.json(EXERCISE_MOCK, {
      status: 200
    })
  })
]
