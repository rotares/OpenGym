import { GuestRoute } from "@/app/router/GuestRoute"
import { UserProfilePage } from "@/pages/user"
import { renderWithProviders } from "@/tests/TestUtils"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryRouter, RouterProvider } from "react-router"
import { SignInForm } from "../ui/signInForm"
import { SignUpForm } from "../ui/signUpForm"
import { SignUpFormPageObject } from "./SignUpForm.po"

describe("авторизация", () => {
  test("после атворизации перекидывает на страницу профиля", async () => {
    const router = createMemoryRouter(
      [
        {
          Component: GuestRoute,
          children: [
            {
              path: "/auth",
              Component: SignInForm,
            },
          ],
        },
        {
          Component: UserProfilePage,
          path: "/profile",
        },
      ],
      {
        initialEntries: ["/auth"],
      },
    )

    renderWithProviders(<RouterProvider router={router} />)

    const submitBtn = await screen.findByRole("button", { name: /sign in/i })
    const emailInput = screen.getByPlaceholderText("example@gmail.com")
    const passwordInput = screen.getByPlaceholderText("Enter your password")

    await userEvent.type(emailInput, "example@gmail.com")
    await userEvent.type(passwordInput, "123123")
    await userEvent.click(submitBtn)

    expect(await screen.findByText("slaze900")).toBeInTheDocument()
  })
})

describe("Регистрация", () => {
  test("Успешная регистрация, редирект на страницу пользователя", async () => {
    //create instance of page object
    const page = new SignUpFormPageObject()

    const router = createMemoryRouter(
      [
        {
          Component: GuestRoute,
          children: [
            {
              path: "/auth",
              Component: SignUpForm,
            },
          ],
        },
        {
          Component: UserProfilePage,
          path: "/profile",
        },
      ],
      {
        initialEntries: ["/auth"],
      },
    )

    renderWithProviders(<RouterProvider router={router} />)
    expect(await screen.findByTestId("nextStep")).toBeInTheDocument()

    await page.goToSecondStep()
    await page.enterPassword()

    await userEvent.click(page.submitBtn)
    expect(await screen.findByTestId("username")).toBeInTheDocument()
  })
})
