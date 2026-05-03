import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Spinner,
} from "@/shared/ui/primitives"

import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  type FormRegisterSchemaInput,
  type FormRegisterSchemaOutput,
  formRegisterSchema,
} from "../model/auth.schema"

import { type RegisterDto } from "../model/types"
import { useRegisterMutation } from "../model/use-register"

export const SignUpForm = () => {
  const { mutate, isPending } = useRegisterMutation()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormRegisterSchemaInput, unknown, FormRegisterSchemaOutput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formRegisterSchema),
  })

  const onSubmit = (data: FormRegisterSchemaOutput) => {
    const { username, email, password } = data

    const submitData: RegisterDto = {
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    }

    mutate(submitData, {
      onError: (error) => {
        setError("root.serverError", {
          message: error.message,
        })
      },
      onSuccess: () => reset(),
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {errors?.root?.serverError && (
          <FieldError
            className="text-center"
            children={errors.root.serverError.message}
          />
        )}
        <FieldSet>
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email" children={"Email"} />
                  <Input
                    placeholder="Type your email"
                    type="email"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError children={fieldState.error.message} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    placeholder="Type your username"
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError children={fieldState.error.message} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="password" children={"Password"} />
                  <Input
                    id={field.name}
                    placeholder="Type your password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError children={fieldState.error.message} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    htmlFor="confirmPassword"
                    children={"Сonfirm password"}
                  />
                  <Input
                    id={field.name}
                    placeholder="Type your password again"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError children={fieldState.error.message} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button disabled={isPending} type="submit" variant={"outline"}>
                {isPending ? <Spinner /> : "SignUp"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <DevTool control={control} />
    </>
  )
}
