import { expect, test } from '@playwright/test';
import { ROUTE_PATH } from '../src/shared/config/routePath';

test('не авторизованный пользователь видит home страницу и переходит на страницу авторизации', async ({page}) => {
  await page.goto(ROUTE_PATH.home)

  const loginButton = page.getByRole("button", {
    name: /войти в аккаунт/i,
  });

  await expect(loginButton).toBeVisible()
  await loginButton.click()

  await expect(page).toHaveURL(ROUTE_PATH.auth)

  await expect(
    page.getByRole("button", { name: /sign in/i })
  ).toBeVisible()
  
})

test('не авторизаованный пользователь переходит на страницу workout-session, защищенный роут его выбрасывает на авторизацию', async ({page}) => {
  await page.goto(ROUTE_PATH.exercises)
  await expect(page).toHaveURL(ROUTE_PATH.auth )
  await expect(page.getByRole('button', {
    name: /sign in !/i
  })).toBeVisible()

})
