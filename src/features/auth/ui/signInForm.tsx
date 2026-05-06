import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
  Spinner,
} from "@/shared/ui/primitives"

import { useSignInForm } from "../model/forms/useSignInForm"
import { FormField } from "./formField"

const fields = [
  {
    name: "email",
    type: "email",
    placeholder: "your-email@gmail.com",
    label: "Email",
    defaultValue: "",
  },

  {
    name: "password",
    type: "password",
    placeholder: "enter your password",
    label: "Password",
    defaultValue: "",
  },
]

export const SignInForm = () => {
  const { isPending, control, errors, onSubmit } = useSignInForm()

  return (
    <form onSubmit={onSubmit} noValidate>
      {errors?.root?.serverError && (
        <FieldError
          className="text-center"
          children={errors.root.serverError.message}
        />
      )}
      <FieldSet>
        <FieldGroup>
          {/* custom form */}
          {fields.map((field) => (
            <FormField control={control} {...field} />
          ))}
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
