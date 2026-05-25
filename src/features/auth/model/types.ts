import { type Control, type FieldValues, type Path } from "react-hook-form"

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  options: RegisterAdditionalOptions
}

interface RegisterAdditionalOptions {
  data: {
    username: string
  }
}

export interface FormFieldProps<T extends FieldValues = FieldValues> {
  control?: Control<T>
  name: Path<T>
  type?: string
  placeholder?: string
  label: string
}
