import { signUpFirstStepFields, signUpSecondStepFields } from "../config/fields"
import { FormField } from "./formField"

export const SignUpFirstStep = () => {
  return (
    <>
      {signUpFirstStepFields.map((f) => (
        <FormField key={f.name} {...f} />
      ))}
    </>
  )
}

export const SignUpSecondStep = () => {
  return (
    <>
      {signUpSecondStepFields.map((f) => (
        <FormField key={f.name} {...f} />
      ))}
    </>
  )
}
