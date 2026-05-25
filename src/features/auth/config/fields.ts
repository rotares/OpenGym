import { type Path } from "react-hook-form"
import { type FormLoginSchemaInput, type FormRegisterSchemaInput } from "../model/auth.schema"

type FieldConfig<T> = {
  name: Path<T>
  type: string
  placeholder: string
  label: string
  defaultValue?: string
}

// ===== Sign Up =====

export const signUpFirstStepFields: FieldConfig<FormRegisterSchemaInput>[] = [
  {
    name: "email",
    type: "email",
    placeholder: "example@gmail.com",
    label: "Email",
    defaultValue: "",
  },
  {
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    label: "Username",
    defaultValue: "",
  },
]

export const signUpSecondStepFields: FieldConfig<FormRegisterSchemaInput>[] = [
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    defaultValue: "",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm your password",
    label: "Confirm Password",
    defaultValue: "",
  },
]

// ===== Sign In =====

export const signInFields: FieldConfig<FormLoginSchemaInput>[] = [
  {
    name: "email",
    type: "email",
    placeholder: "example@gmail.com",
    label: "Email",
    defaultValue: "",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    defaultValue: "",
  },
]
