import { expect, test } from "@playwright/test";
import { ROUTE_PATH } from "../../src/shared/config/routePath";
import { getWorkoutMocks } from "../data-mocks/getWorkoutMocks";
import { exercisesMock } from "../helpers/mockExercises";
import { mockMuscles } from "../helpers/mockMuscles";
import { mockWorkout } from "../helpers/mockWorkout";

test.use({
  storageState: "playwright/.auth/user.json",
})

test("Добавление тренировки и проверка в списке", async ({ page }) => {
  const workouts = [
    {
      id: "d1169c20-8be6-415f-897e-b22bb60e3a9d",
      title: "Тренировка",
      duration_minutes: 0,
      finished_at: "2026-06-23T07:22:14.686+00:00",
      total_sets: 1,
      total_volume: 2,
      workout_exercises: [
        {
          exercises: {
            name: "Жим штанги лежа",
          },
          total_sets: 1,
        },
      ],
    },
    {
      id: "ab7e4d8e-1097-414e-b148-2e3ed4baa5b0",
      title: "Тренировка",
      duration_minutes: 91,
      finished_at: "2026-06-23T06:15:47.336+00:00",
      total_sets: 1,
      total_volume: 2,
      workout_exercises: [
        {
          exercises: {
            name: "Жим гантелей сидя",
          },
          total_sets: 1,
        },
      ],
    },
    {
      id: "8ff08358-8bde-44dd-8a0b-d27166943b49",
      title: "Тренировка",
      duration_minutes: 76,
      finished_at: "2026-06-23T06:10:53.728+00:00",
      total_sets: 1,
      total_volume: 2,
      workout_exercises: [
        {
          exercises: {
            name: "Жим гантелей сидя",
          },
          total_sets: 1,
        },
      ],
    },
    {
      id: "f7b5de1f-be4d-4f32-b181-9bbd3faf5758",
      title: "Тренировка",
      duration_minutes: 73,
      finished_at: "2026-06-23T06:08:01.168+00:00",
      total_sets: 1,
      total_volume: 2,
      workout_exercises: [
        {
          exercises: {
            name: "Жим гантелей сидя",
          },
          total_sets: 1,
        },
      ],
    },
    {
      id: "61c95fa4-b633-47fd-b0f5-ab2360d4d8d5",
      title: "Тренировка",
      duration_minutes: 0,
      finished_at: "2026-06-23T03:50:55.144+00:00",
      total_sets: 1,
      total_volume: 25,
      workout_exercises: [
        {
          exercises: {
            name: "Жим штанги лежа",
          },
          total_sets: 1,
        },
      ],
    },
  ]

  const currentWorkout = {
    id: "e2e",
    title: "e2e test",
    duration_minutes: 20,
    finished_at: "2026-06-23T07:22:14.686+00:00",
    total_sets: 1,
    total_volume: 20,
    workout_exercises: [
      {
        exercises: {
          name: "e2e",
        },
        total_sets: 1,
      },
    ],
  }

  const currentWorkoutDetails = {
    id: "e2e",
    title: "e2e",
    finished_at: "2026-06-23T07:22:14.686+00:00",
    duration_minutes: 20,
    total_volume: 20,
    total_sets: 1,
    workout_exercises: [
      {
        sets: [
          {
            reps: 2,
            weight: 2,
            order_index: 0,
          },
        ],
        exercises: {
          name: "e2e",
        },
        total_sets: 1,
        exercise_id: "4a42bc05-2e39-4583-97f5-bd67b1193a9d",
        total_volume: 20,
      },
    ],
  }

  const state = {
    workoutItems: workouts,
    currentWorkoutItem: currentWorkout,
    currentWorkoutDetails: currentWorkoutDetails,
  }

  mockWorkout(page, state)
  mockMuscles(page)
  exercisesMock(page)

  await page.goto(ROUTE_PATH.profile)
  //действия на странице workout session
  await expect(page.getByTestId("username")).toBeVisible()
  await page.getByRole("link", { name: /тренировка/i }).click()
  await expect(page).toHaveURL(ROUTE_PATH.workoutSession)
  await page.getByTestId("startWorkout").click()
  await page.getByTestId("addExercise").click()

  await expect(page.getByText("Жим штанги лежа")).toBeVisible()
  await page.getByText("Жим штанги лежа").click()
  await expect(page.getByText(/выберите упражнение/i)).not.toBeVisible()
  //добавляем упражнение и заполняем данными
  await page.getByTestId("weightInput").fill("20")
  await page.getByTestId("repsInput").fill("15")
  await page.getByTestId("setCompleteCheckbox").click()

  await page.getByTestId("finish").click()
  await expect(page.getByText("Тренировка сохранена!")).toBeVisible()
  //переходим к истории тренировок
  await page.getByRole("link", { name: /история тренировок/i }).click()
  await expect(page).toHaveURL(ROUTE_PATH.workoutsHistory)
  

  //проверяем отображение новой тренировки
  await expect(page.getByText(currentWorkout.title)).toBeVisible()
  const workoutItems = page.getByTestId("workoutItem")

  
  await expect(workoutItems).toHaveCount(workouts.length + 1)
  await workoutItems.first().click()

  await expect(page).toHaveURL(
    `${ROUTE_PATH.workoutsHistory}/${currentWorkout.id}`,
  )

  await expect(page.getByText(/время/i)).toBeVisible()
  await expect(
    page.getByText(`${currentWorkoutDetails.total_volume} кг`, { exact: true }),
  ).toBeVisible()
})

test('Удаление тренировки', async ({page}) => {
  const {workoutList, newWorkout, newWorkoutDetails} = getWorkoutMocks()
  
  const pushedStateWorkoutList = [newWorkout, ...workoutList]

  const state = {
    workoutItems: pushedStateWorkoutList,
    currentWorkoutItem: newWorkout,
    currentWorkoutDetails: newWorkoutDetails
  }

  //мокаем
  mockWorkout(page, state)
  mockMuscles(page)
  exercisesMock(page)

  await page.goto(ROUTE_PATH.workoutsHistory)
  await expect(page.getByTestId('spinner')).not.toBeVisible()
  //кликаем на тренировку
  const workoutToDelete = page.getByText(newWorkout.title)
  await expect(workoutToDelete).toBeVisible()
  await workoutToDelete.click()

  
  await expect(page).toHaveURL(`${ROUTE_PATH.workoutsHistory}/${newWorkout.id}`)
  await expect(page.getByText(/время/i)).toBeVisible()
  //удаляем
  await page.getByTestId('detailsDropdown').click()
  await page.getByText(/удалить/i).click()

  //оптимистичный апдейт tanstack
  await expect(page).toHaveURL(ROUTE_PATH.workoutsHistory)
  await expect(workoutToDelete).not.toBeVisible()
  
  page.reload()
  //после перезагрузки проверяем что новые данные без тренировки
  await expect(page.getByTestId('spinner')).not.toBeVisible()
  await expect(workoutToDelete).not.toBeVisible()
  await expect(page.getByTestId('workoutItem')).toHaveCount(workoutList.length)

})