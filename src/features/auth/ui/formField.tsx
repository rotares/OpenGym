import { Field, FieldError, FieldLabel, Input } from "@/shared/ui/primitives"

import { type FieldValues, useFormContext } from "react-hook-form"
import { Controller } from "rhf-stepper"
import { type FormFieldProps } from "../model/types"

export const FormField = <T extends FieldValues = FieldValues>({
  name,
  type = "text",
  placeholder,
  label,
  control: controlProp,
}: FormFieldProps<T>) => {
  // Получаем control из контекста, если не передан в пропсы
  let control = controlProp
  try {
    const formContext = useFormContext<T>()
    control = controlProp || formContext.control
  } catch {
    // Если нет контекста, используем переданный control
    if (!controlProp) {
      throw new Error(
        "FormField: control prop is required when FormProvider is not available",
      )
    }
  }

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
