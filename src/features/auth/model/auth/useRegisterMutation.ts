import { useMutation } from "@tanstack/react-query"
import { authApi } from "../../api/authApi"
import type { RegisterDto } from "../types"

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (registerData: RegisterDto) => authApi.register(registerData),
    onSuccess: (response) => console.log(response),
    onError: (err) => console.log(err),
  })
}
