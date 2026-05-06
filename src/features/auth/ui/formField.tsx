import { Field, FieldError, FieldLabel, Input } from "@/shared/ui/primitives"
import { Controller } from "react-hook-form"
import { type FormFieldProps } from "../model/types"

export const FormField = ({
  control,
  name,
  type = "text",
  placeholder,
  label,
}: FormFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={field.name} children={label} />
          <Input
            id={field.name}
            placeholder={placeholder}
            type={type}
            aria-invalid={fieldState.invalid}
            {...field}
          />
          {fieldState.error && (
            <FieldError children={fieldState.error.message} />
          )}
        </Field>
      )}
    />
  )
}
