import type { Control } from "react-hook-form"
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

export interface FormFieldProps {
  control: Control
  name: string
  type?: string
  placeholder?: string
  label: string
}
