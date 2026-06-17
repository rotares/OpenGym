import { http, HttpResponse } from "msw"
import { SESSION_MOCK } from "../mocks/auth"

export const authHandlers = [
  http.post('https://bvlitfazwhymyqtzrwyk.supabase.co/auth/v1/token', async () => {
    return HttpResponse.json(SESSION_MOCK, {
      status: 200
    })
  }),
  http.post('https://bvlitfazwhymyqtzrwyk.supabase.co/auth/v1/signup', async () => {
    return HttpResponse.json(SESSION_MOCK, {
      status: 200
    })
  })
]