import { test, expect } from "@playwright/test"
import { ROUTE_PATH } from "../../src/shared/config/routePath"

test("авторизация", async ({ page }) => {
  await page.goto(ROUTE_PATH.auth)

  await page
    .getByPlaceholder("example@gmail.com")
    .fill("prigodapawel@yandex.ru")
  await page.getByPlaceholder("Enter your password").fill("123123")

  await page.getByTestId("loginSubmit").click()

  await expect(page).toHaveURL(ROUTE_PATH.profile)

  await page.context().storageState({
    path: "playwright/.auth/user.json",
  })
})
