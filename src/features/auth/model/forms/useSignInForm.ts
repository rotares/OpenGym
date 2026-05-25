import { formLoginSchema, type FormLoginSchemaInput } from "../auth.schema"
import { useLoginMutation } from "../auth/useLoginMutation"
import { type LoginDto } from "../types"
import { useFormSettings } from "./useFormSettings"

export const useSignInForm = () => {
  const { handleSubmit, control, setError, errors, reset, methods } =
    useFormSettings<FormLoginSchemaInput>({
      defaultValues: {
        email: "",
        password: "",
      },
      schema: formLoginSchema,
    })

  const { mutate, isPending } = useLoginMutation()

  const onSubmit = handleSubmit((data: LoginDto) => {
    mutate(data, {
      onError: (error) => {
        setError("root.serverError", {
          message: error.message,
        })
      },
      onSuccess: () => reset(),
    })
  })

  return {
    isPending,
    control,
    errors,
    onSubmit,
    methods,
  }
}
