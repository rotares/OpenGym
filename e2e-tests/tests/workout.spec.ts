import { expect, test } from "@playwright/test"
import { ROUTE_PATH } from "../../src/shared/config/routePath"
import { mockMuscles } from "../helpers/mockMuscles"
import { exercisesMock } from "../helpers/mockExercises"
import { mockWorkout } from "../helpers/mockWorkout"

test.use({
  storageState: "playwright/.auth/user.json",
})

test("Добавление тренировки и проверка в списке", async ({ page }) => {
  let workouts = [
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

  await page.route("**/rest/v1/workout_exercises*", async (route) => {
    await route.fulfill({
      body: JSON.stringify([
        {
          id: "testExercise",
        },
      ]),
      status: 201,
    })
  })

  await page.route("**/rest/v1/sets*", async (route) => {
    await route.fulfill({
      status: 201,
    })
  })

  await page.goto(ROUTE_PATH.profile)
  await expect(page.getByTestId("username")).toBeVisible()
  await page.getByRole("link", { name: /тренировка/i }).click()
  await expect(page).toHaveURL(ROUTE_PATH.workoutSession)
  await page.getByTestId("startWorkout").click()
  await page.getByTestId("addExercise").click()

  await expect(page.getByText("Жим штанги лежа")).toBeVisible()
  await page.getByText("Жим штанги лежа").click()
  await expect(page.getByText(/выберите упражнение/i)).not.toBeVisible()

  await page.getByTestId("weightInput").fill("20")
  await page.getByTestId("repsInput").fill("15")
  await page.getByTestId("setCompleteCheckbox").click()
  await page.getByTestId("finish").click()
  await expect(page.getByText("Тренировка сохранена!")).toBeVisible()

  await page.getByRole("link", { name: /история тренировок/i }).click()
  await expect(page).toHaveURL(ROUTE_PATH.workoutsHistory)

  await expect(page.getByTestId("workoutItem").first()).toBeVisible()
  const workoutItems = page.getByTestId("workoutItem")
  await expect(workoutItems).toHaveCount(workouts.length)
  await workoutItems.first().click()

  await expect(page).toHaveURL(
    `${ROUTE_PATH.workoutsHistory}/${currentWorkout.id}`,
  )

  await expect(page.getByText(/время/i)).toBeVisible()
  await expect(
    page.getByText(`${currentWorkoutDetails.total_volume} кг`, { exact: true }),
  ).toBeVisible()
})
