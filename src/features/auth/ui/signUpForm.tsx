import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
  Spinner,
} from "@/shared/ui/primitives"
import { SignUpFirstStep, SignUpSecondStep } from "./signUpFirstStep"
import { FormProvider } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { useSignUpForm } from "../model/forms/useSignUpForm"
import { useState } from "react"

export const SignUpForm = () => {
  const { isPending, control, errors, onSubmit, trigger, clearErrors } =
    useSignUpForm()
  const [step, setStep] = useState<1 | 2>(1)

  const step1Names = ["email", "username"] as const
  const step2Names = ["password", "confirmPassword"] as const

  const handleNext = async () => {
    const isValid = await trigger(step1Names)
    if (isValid) {
      clearErrors(step2Names)
      setStep(2)
    }
  }

  const handleBack = () => setStep(1)

  return (
    <>
      <FormProvider trigger={trigger} control={control}>
        <form onSubmit={onSubmit} noValidate>
          {errors?.root?.serverError && (
            <FieldError
              className="text-center"
              children={errors.root.serverError.message}
            />
          )}

          <FieldSet>
            <FieldGroup>
              {step === 1 ? <SignUpFirstStep /> : <SignUpSecondStep />}
              <Field className="flex">
                {step === 2 && (
                  <Button type="button" variant="ghost" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {step === 1 ? (
                  <Button type="button" onClick={handleNext} variant="outline">
                    Next step
                  </Button>
                ) : (
                  <Button disabled={isPending} type="submit" variant="outline">
                    {isPending ? <Spinner /> : "Зарегистрироваться"}
                  </Button>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </FormProvider>
      <DevTool control={control} />
    </>
  )
}
