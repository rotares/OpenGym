import { mockRegisterAlreadyExist } from "@/tests/mocks/auth"
import { renderWithProviders } from "@/tests/TestUtils"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SignUpForm } from "../ui/signUpForm"
import { SignUpFormPageObject } from "./SignUpForm.po"

describe("тестирование формы регистрации", () => {
  beforeEach(() => {
    renderWithProviders(<SignUpForm />)
  })

  const pageObject = new SignUpFormPageObject()

  test("переход на 2 шаг формы с пустыми данными вызывает ошибку валидации и не дает перейти дальше", async () => {
    const nextBtn = screen.getByTestId("nextStep")

    await userEvent.click(nextBtn)
    expect(screen.getByText(/Wrong type of email/)).toBeInTheDocument()
    expect(screen.getByText(/Minimum length is 6 symobls/)).toBeInTheDocument()
  })

  test("Данные заполнены корректно, выполнен переход на 2 шаг", async () => {
    await pageObject.goToSecondStep()

    const submitBtn = screen.getByTestId("registerBtn")
    expect(submitBtn).toBeInTheDocument()
  })

  test("Заполнение 1 шага + переход на второй, отправка с пустыми данными", async () => {
    await pageObject.goToSecondStep()

    await userEvent.click(pageObject.submitBtn)

    expect(screen.getByText(/Minimum length is 6 symobls/i)).toBeInTheDocument()
    expect(screen.getByText(/Password can't be a empty/i)).toBeInTheDocument()
  })

  test("Появляется ошибка если пароли не совпадают на 2 шаге при отправке", async () => {
    await pageObject.goToSecondStep()
    await pageObject.enterPassword("123123", "3333333")

    await userEvent.click(pageObject.submitBtn)
    expect(screen.getByText(/passwords aren't equal/i)).toBeInTheDocument()
  })

  test("Состояние 1 шага сохраняется после возврата со 2 шага", async () => {
    const { emailInput, usernameInput } = pageObject.firstStepInputs

    await pageObject.goToSecondStep()
    await userEvent.click(pageObject.prevStepBtn)

    expect(emailInput).toHaveValue("example@gmail.com")
    expect(usernameInput).toHaveValue("username")
  })

  test("серверная ошибка пользователь уже существует при submit", async () => {
    mockRegisterAlreadyExist()

    await pageObject.goToSecondStep()
    await pageObject.enterPassword()
    await userEvent.click(pageObject.submitBtn)

    expect(screen.getByText(/User already registered/i))
  })

  test("серверная ошибка исчезает после того как человек вернулся на предыдущий шаг", async () => {
    mockRegisterAlreadyExist()

    await pageObject.goToSecondStep()
    await pageObject.enterPassword()
    await userEvent.click(pageObject.submitBtn)

    expect(screen.getByText(/User already registered/i))

    await userEvent.click(pageObject.prevStepBtn)
    await userEvent.click(pageObject.nextBtn)

    expect(screen.queryByText(/User already registered/i)).toBeNull()
  })

  test("Ошибка валидации поля подтверждения пароля остается после возврата на предыдущй шаг и обратно", async () => {
    await pageObject.goToSecondStep()
    await pageObject.enterPassword("validPassword", "invalidPassword")
    await userEvent.click(pageObject.submitBtn)

    expect(screen.getByText(/Passwords aren't equal/i))

    await userEvent.click(pageObject.prevStepBtn)
    await userEvent.click(pageObject.nextBtn)

    expect(screen.getByText(/Passwords aren't equal/))
  })
})
