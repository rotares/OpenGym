import { signUpFirstStepFields, signUpSecondStepFields } from "../config/fields"
import { type FormRegisterSchemaInput } from "../model/auth.schema"
import { FormField } from "./formField"

export const SignUpFirstStep = () => {
  return (
    <>
      {signUpFirstStepFields.map((f) => (
        <FormField<FormRegisterSchemaInput> key={f.name} {...f} />
      ))}
    </>
  )
}

export const SignUpSecondStep = () => {
  return (
    <>
      {signUpSecondStepFields.map((f) => (
        <FormField<FormRegisterSchemaInput> key={f.name} {...f} />
      ))}
    </>
  )
}
