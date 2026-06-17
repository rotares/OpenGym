import { mockLoginError } from "@/tests/mocks/auth"
import { renderWithProviders } from "@/tests/TestUtils"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SignInForm } from "../ui/signInForm"

describe("форма авторизации", () => {
  test("предотвращение отправки при пустых полях", async () => {
    renderWithProviders(<SignInForm />)
    const submitBtn = screen.getByRole("button", { name: /sign in/i })

    await userEvent.click(submitBtn)

    expect(screen.getByText(/Wrong type of email/i)).toBeInTheDocument()
    expect(screen.getByText(/enter the password/i)).toBeInTheDocument()
  })

  test("валидация эл.почты", async () => {
    renderWithProviders(<SignInForm />)

    const submitBtn = screen.getByRole("button", { name: /sign in/i })
    const emailInput = screen.getByPlaceholderText("example@gmail.com")

    await userEvent.type(emailInput, "123123123.333333")
    await userEvent.click(submitBtn)

    expect(screen.getByText("Wrong type of email")).toBeInTheDocument()
  })

  test("отправка с неверными польз. данными", async () => {
    mockLoginError()
    renderWithProviders(<SignInForm />)

    const submitBtn = screen.getByRole("button", { name: /sign in/i })
    const emailInput = screen.getByPlaceholderText("example@gmail.com")
    const passwordInput = screen.getByPlaceholderText("Enter your password")

    await userEvent.type(emailInput, "example@gmail.com")
    await userEvent.type(passwordInput, "notValidPass@")
    await userEvent.click(submitBtn)

    expect(
      await screen.findByText(/Invalid login credentials/i),
    ).toBeInTheDocument()
  })
})
