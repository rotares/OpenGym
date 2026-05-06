import {
  formRegisterSchema,
  type FormRegisterSchemaInput,
} from "../auth.schema"
import { useRegisterMutation } from "../auth/useRegisterMutation"
import { type RegisterDto } from "../types"
import { useFormSettings } from "./useFormSettings"

export const useSignUpForm = () => {
  const { handleSubmit, control, setError, errors, reset } =
    useFormSettings<FormRegisterSchemaInput>({
      defaultValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      schema: formRegisterSchema,
    })

  const { mutate, isPending } = useRegisterMutation()

  const mapData = (data: FormRegisterSchemaInput): RegisterDto => {
    //eslint-disable-next-line
    const { confirmPassword, username, ...rest } = data

    return {
      ...rest,
      options: {
        data: {
          username,
        },
      },
    }
  }

  const onSubmit = handleSubmit((data: FormRegisterSchemaInput) => {
    const mappedData = mapData(data)
    mutate(mappedData, {
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
  }
}
