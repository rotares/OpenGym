// src/features/auth/config/fields.ts
type FieldConfig = {
  name: string
  type: string
  placeholder: string
  label: string
  defaultValue?: string
}

// ===== Sign Up =====

export const signUpFirstStepFields: FieldConfig[] = [
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

export const signUpSecondStepFields: FieldConfig[] = [
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

export const signInFields: FieldConfig[] = [
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
