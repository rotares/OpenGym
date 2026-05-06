import { useMutation } from "@tanstack/react-query"
import { authApi } from "../../api/authApi"
import type { LoginDto } from "../types"

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (loginData: LoginDto) => authApi.login(loginData),
    onSuccess: (response) => console.log(response),
    onError: (err) => console.log(err),
  })
}
