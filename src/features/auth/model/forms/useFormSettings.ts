import { zodResolver } from "@hookform/resolvers/zod"
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
} from "react-hook-form"

type UseFormSettingsParams<T> = {
  //eslint-disable-next-line
  schema: any
  defaultValues: DefaultValues<T>
}

//на вход подается generic для useForm, в пропсах field -> где будет имя и defaultValues, и также нужна schema для zod Resolver
export const useFormSettings = <T extends FieldValues>({
  schema,
  defaultValues,
}: UseFormSettingsParams<T>) => {
  const {
    handleSubmit,
    control,
    setError,
    reset,
    trigger,
    clearErrors
    formState: { errors },
  } = useForm<T>({
    mode: "onSubmit",
    defaultValues,
    resolver: zodResolver(schema) as Resolver<T>,
  })

  return {
    handleSubmit,
    control,
    setError,
    errors,
    reset,
    trigger,
    clearErrors
  }
}
