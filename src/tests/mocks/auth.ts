import { http, HttpResponse } from "msw"
import { server } from "../server/server"

export const SESSION_MOCK = {
    "access_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6IjNlNGM1MTBlLTkwOTMtNDE5OS1hMzg4LTMyM2JmYWFjNDRkZCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2J2bGl0ZmF6d2h5bXlxdHpyd3lrLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIwNWY0NzQ5ZS0wMTQxLTRhYzItOGM1MC05MjEzNzRjODk2YmMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzgxMzY4NjA5LCJpYXQiOjE3ODEzNjUwMDksImVtYWlsIjoicHJpZ29kYXBhd2VsQHlhbmRleC5ydSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJwcmlnb2RhcGF3ZWxAeWFuZGV4LnJ1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMDVmNDc0OWUtMDE0MS00YWMyLThjNTAtOTIxMzc0Yzg5NmJjIiwidXNlcm5hbWUiOiJzbGF6ZTkwMCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzgxMzY1MDA5fV0sInNlc3Npb25faWQiOiIzNjk3ZjEzYi03N2UxLTQ4MTEtOWQyMC1mNWQ0N2FiMmM4ZmUiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.NMr9w4umJnkB0X4cq5Qg8vR9MwKXipPEJumG8dlo7g7Kgz6QqRpYnYjZ6ICLdI0yf5Bq704dyLoTlqdH1AW2dA",
    "token_type": "bearer",
    "expires_in": 3600,
    "expires_at": 1781368609,
    "refresh_token": "s3bqzw3x244z",
    "user": {
        "id": "05f4749e-0141-4ac2-8c50-921374c896bc",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "prigodapawel@yandex.ru",
        "email_confirmed_at": "2026-05-02T15:13:57.207674Z",
        "phone": "",
        "confirmed_at": "2026-05-02T15:13:57.207674Z",
        "last_sign_in_at": "2026-06-13T15:36:49.953393015Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {
            "email": "prigodapawel@yandex.ru",
            "email_verified": true,
            "phone_verified": false,
            "sub": "05f4749e-0141-4ac2-8c50-921374c896bc",
            "username": "slaze900"
        },
        "identities": [
            {
                "identity_id": "b558bbc4-31a8-4a4c-9b28-027085fe2e5e",
                "id": "05f4749e-0141-4ac2-8c50-921374c896bc",
                "user_id": "05f4749e-0141-4ac2-8c50-921374c896bc",
                "identity_data": {
                    "email": "prigodapawel@yandex.ru",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "05f4749e-0141-4ac2-8c50-921374c896bc",
                    "username": "slaze900"
                },
                "provider": "email",
                "last_sign_in_at": "2026-05-02T15:13:57.201932Z",
                "created_at": "2026-05-02T15:13:57.201994Z",
                "updated_at": "2026-05-02T15:13:57.201994Z",
                "email": "prigodapawel@yandex.ru"
            }
        ],
        "created_at": "2026-05-02T15:13:57.169895Z",
        "updated_at": "2026-06-13T15:36:49.964725Z",
        "is_anonymous": false
    },
    "weak_password": null
}

const QUERY_URL = `https://bvlitfazwhymyqtzrwyk.supabase.co/auth/v1/token`
const REG_URL = `https://bvlitfazwhymyqtzrwyk.supabase.co/auth/v1/signup`

export const mockLoginError = () => {
  server.use(
    http.post(QUERY_URL, async () => {
      return HttpResponse.json({
        code: 'invalid_credentials',
        message: "Invalid login credentials"
      }, {
        status: 401
      })
    })
  )
}

export const mockRegisterAlreadyExist = () => {
  server.use(
    http.post(REG_URL, async () => {
      return HttpResponse.json({"code":"user_already_exists","message":"User already registered"}, {
      status: 422
    })
    })
  )
}

