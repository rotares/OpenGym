import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
  Spinner,
} from "@/shared/ui/primitives"

import { DevTool } from "@hookform/devtools"
import { useSignUpForm } from "../model/forms/useSignUpForm"
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
    name: "username",
    placeholder: "enter your username",
    label: "Username",
    defaultValue: "",
  },

  {
    name: "password",
    type: "password",
    placeholder: "enter your password",
    label: "Password",
    defaultValue: "",
  },

  {
    name: "confirmPassword",
    type: "password",
    placeholder: "enter your password",
    label: "Confirm password",
    defaultValue: "",
  },
]

export const SignUpForm = () => {
  const { isPending, control, errors, onSubmit } = useSignUpForm()

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        {errors?.root?.serverError && (
          <FieldError
            className="text-center"
            children={errors.root.serverError.message}
          />
        )}
        <FieldSet>
          <FieldGroup>
            {fields.map((field) => (
              <FormField key={field.name} control={control} {...field} />
            ))}
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
