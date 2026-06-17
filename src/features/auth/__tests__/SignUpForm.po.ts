import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"


export class SignUpFormPageObject {
  
  get nextBtn() {
    return screen.getByTestId('nextStep')
  }

  get submitBtn() {
    return screen.getByTestId('registerBtn')
  }

  get prevStepBtn() {
    return screen.getByTestId('prevStep')
  }

  get firstStepInputs() {
    return {
      emailInput: screen.getByPlaceholderText(/example@gmail.com/i),
      usernameInput: screen.getByPlaceholderText(/enter your username/i)
    }
  }

  async enterPassword (password = 'password', confirmPassword = password) {
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), password)
    await userEvent.type(screen.getByPlaceholderText(/confirm your password/i), confirmPassword)      
  }

  async goToSecondStep (username = 'username', email = 'example@gmail.com') {

    await userEvent.type(screen.getByPlaceholderText(/example@gmail.com/i), email)
    await userEvent.type(screen.getByPlaceholderText(/enter your username/i), username)

    await userEvent.click(this.nextBtn)
  }
}