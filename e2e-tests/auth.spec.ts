import { expect, test } from "@playwright/test"
import { ROUTE_PATH } from "../src/shared/config/routePath"
import { SESSION_MOCK } from "./../src/tests/mocks/auth"

test("пользователь авторизовался и произошел редирект на его профиль", async ({
  page,
}) => {
  await page.goto(ROUTE_PATH.auth)

  await page
    .getByPlaceholder("example@gmail.com")
    .fill("prigodapawel@yandex.ru")
  await page.getByPlaceholder("Enter your password").fill("123123")
  await page.getByTestId("loginSubmit").click()

  await expect(page).toHaveURL(ROUTE_PATH.profile)
  await expect(page.getByTestId("username")).toBeVisible()
})

test("пользователь успешно зарегистрировался", async ({ page }) => {
  await page.route("**/auth/v1/signup", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(SESSION_MOCK),
    })
  })

  await page.route("**/rest/v1/profiles?select=*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "123",
        username: "TestUser",
      }),
    })
  })

  await page.route(
    "**/auth/v1/token?grant_type=refresh_token",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "new-access",
          refresh_token: "new-refresh",
          expires_in: 3600,
          token_type: "bearer",
          user: {
            id: "123",
            email: "test@gmail.com",
          },
        }),
      })
    },
  )

  await page.goto(ROUTE_PATH.auth)
  await page.getByTestId("signUpTab").click()

  const nextBtn = page.getByTestId("nextStep")
  await expect(nextBtn).toBeVisible()

  await page.getByPlaceholder("example@gmail.com").fill("test@gmail.com")
  await page.getByPlaceholder("Enter your username").fill("testUser")

  await nextBtn.click()

  await page.getByPlaceholder("Enter your password").fill("testtest")
  await page.getByPlaceholder("Confirm your password").fill("testtest")

  await page.getByTestId("registerBtn").click()

  await expect(page).toHaveURL(ROUTE_PATH.profile)
  await expect(page.getByTestId("username")).toBeVisible()
})
