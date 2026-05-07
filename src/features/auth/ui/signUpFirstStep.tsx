import { useFormContext } from "react-hook-form"
import { FormField } from "./formField"

const secondStepFields = [
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

const firstStepFields = [
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
]

export const SignUpFirstStep = () => {
  const { control } = useFormContext()

  return (
    <>
      {firstStepFields.map((f) => (
        <FormField key={f.name} control={control} {...f} />
      ))}
    </>
  )
}

export const SignUpSecondStep = () => {
  const { control } = useFormContext()

  return (
    <>
      {secondStepFields.map((f) => (
        <FormField key={f.name} control={control} {...f} />
      ))}
    </>
  )
}
