import { renderWithProviders } from "@/tests/TestUtils"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthModal } from "../ui/authModal"

describe("Тестирование виджета AuthModal", () => {
  test("табы авторизации и регистрации успешно переключаются", async () => {
    renderWithProviders(<AuthModal />)

    const regTab = screen.getByTestId("signUpTab")
    const loginTab = screen.getByTestId("signInTab")

    expect(regTab).toBeInTheDocument()
    expect(loginTab).toBeInTheDocument()

    await userEvent.click(regTab)

    screen.debug(document.body, 9999999999)

    expect(screen.getByTestId("nextStep")).toBeInTheDocument()

    await userEvent.click(loginTab)
    expect(screen.getByText(/Sign In !/i)).toBeInTheDocument()
  })
})
