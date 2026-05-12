import { useMutation } from "@tanstack/react-query"
import { authApi } from "../../api/authApi"

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => authApi.logout(),
    onError(error) {
      console.log(error)
    },
    onSuccess(result) {
      console.log(result)
    },
  })
}
