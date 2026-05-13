import { Field, FieldError, FieldLabel, Input } from "@/shared/ui/primitives"

import { Controller } from "rhf-stepper"
import { type FormFieldProps } from "../model/types"

export const FormField = ({
  name,
  type = "text",
  placeholder,
  label,
  control,
}: FormFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field className="relative pb-2">
            <FieldLabel htmlFor={field.name} children={label} />
            <Input
              id={field.name}
              placeholder={placeholder}
              type={type}
              aria-invalid={fieldState.invalid}
              {...field}
            />
            <div className="absolute -bottom-3 left-0">
              {fieldState.error && (
                <FieldError
                  className="text-xs"
                  children={fieldState.error.message}
                />
              )}
            </div>
          </Field>
        )
      }}
    />
  )
}
