import {
  Button,
  FieldError,
  FieldGroup,
  FieldSet,
  Spinner,
} from "@/shared/ui/primitives"

const isProduction = import.meta.env.MODE === "production"

import { DevTool } from "@hookform/devtools"
import { ArrowLeft } from "lucide-react"
import { FormProvider, useFormContext } from "react-hook-form"
import { Step, Stepper, useStepper } from "rhf-stepper"
import { useSignUpForm } from "../model/forms/useSignUpForm"
import { SignUpFirstStep, SignUpSecondStep } from "./signUpSteps"

export const SignUpForm = () => {
  const { isPending, control, errors, onSubmit, methods } = useSignUpForm()

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} noValidate className="relative">
          {errors?.root?.serverError && (
            <FieldError
              className="text-center absolute text-xs left-1/2 -translate-x-1/2"
              children={errors.root.serverError.message}
            />
          )}

          <FieldSet>
            <FieldGroup>
              <Stepper>
                {({ activeStep }) => (
                  <>
                    <Step>{activeStep === 0 && <SignUpFirstStep />}</Step>
                    <Step>{activeStep === 1 && <SignUpSecondStep />}</Step>

                    <StepNavigation isPending={isPending} />
                  </>
                )}
              </Stepper>
            </FieldGroup>
          </FieldSet>
        </form>
      </FormProvider>
      {!isProduction && <DevTool control={control} />}
    </>
  )
}

const StepNavigation = ({ isPending }: { isPending: boolean }) => {
  const { next, prev, isFirstStep, isLastStep } = useStepper()
  const { clearErrors } = useFormContext()

  return (
    <div className="flex gap-4">
      {!isLastStep && (
        <Button
          type="button"
          className="flex-1"
          onClick={next}
          variant="outline"
          data-testid="nextStep"
        >
          Next Step
        </Button>
      )}

      {!isFirstStep && (
        <Button
          type="button"
          onClick={() => {
            clearErrors("root.serverError")
            prev()
          }}
          variant="outline"
          data-testid="prevStep"
        >
          <span className="sr-only">Back to first step</span>
          <ArrowLeft />
        </Button>
      )}

      {isLastStep && (
        <Button
          disabled={isPending}
          type="submit"
          variant="outline"
          className="flex-1"
          data-testid="registerBtn"
        >
          {isPending ? <Spinner /> : "Sign Up !"}
        </Button>
      )}
    </div>
  )
}
