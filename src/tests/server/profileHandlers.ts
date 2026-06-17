import { http, HttpResponse } from "msw"
import { PROFILE_MOCK } from "../mocks/profile"

export const profileHandlers = [
  http.get(`https://bvlitfazwhymyqtzrwyk.supabase.co/rest/v1/profiles`, async () => {
    return HttpResponse.json(PROFILE_MOCK, {
      status: 200
    })
  })
]