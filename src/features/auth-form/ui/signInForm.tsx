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

import { Controller, useForm } from "react-hook-form"
import {
  formLoginSchema,
  type FormLoginSchemaInput,
  type FormLoginSchemaOutput,
} from "../model/auth.schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginMutation } from "../model/use-login"

export const SignInForm = () => {
  const {
    formState: { errors },
    setError,
    control,
    handleSubmit,
    reset,
  } = useForm<FormLoginSchemaInput, unknown, FormLoginSchemaOutput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formLoginSchema),
  })

  const { mutate, isPending } = useLoginMutation()

  const onSubmit = (data: FormLoginSchemaOutput) => {
    mutate(data, {
      onError: (error) => {
        setError("root.serverError", {
          message: error.message,
        })
      },
      onSuccess: () => reset(),
    })
  }

  return (
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
                <FieldLabel htmlFor={field.name} children={"Email"} />
                <Input
                  id={field.name}
                  placeholder="Type your email"
                  type="email"
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
                <FieldLabel htmlFor={field.name} children={"Password"} />
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

          <Field>
            <Button type="submit" variant={"outline"}>
              {isPending ? <Spinner /> : "Sign In"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
