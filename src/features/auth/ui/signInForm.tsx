import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
  Spinner,
} from "@/shared/ui/primitives"

import { signInFields } from "../config/fields"
import { type FormLoginSchemaInput } from "../model/auth.schema"
import { useSignInForm } from "../model/forms/useSignInForm"
import { FormField } from "./formField"

export const SignInForm = () => {
  const { isPending, control, errors, onSubmit } = useSignInForm()

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {errors?.root?.serverError && (
        <FieldError
          className="text-center absolute text-xs left-1/2 -translate-x-1/2"
          children={errors.root.serverError.message}
          data-testid="serverError"
        />
      )}
      <FieldSet>
        <FieldGroup>
          {/* custom form */}
          {signInFields.map((field) => (
            <FormField<FormLoginSchemaInput>
              key={field.name}
              control={control}
              {...field}
            />
          ))}
          <Field>
            <Button data-testid="loginSubmit" type="submit" variant={"outline"}>
              {isPending ? <Spinner /> : "Sign In !"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
