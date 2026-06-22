import { exerciseService } from "@/entities/exercise/api/exercise-service"
import { useWorkoutStore } from "@/entities/workout"
import * as useSubmitMutationWorkoutModule from "@/entities/workout/model/useSubmitWorkoutMutation"
import { PROFILE_MOCK } from "@/tests/mocks/profile"
import { renderWithProviders } from "@/tests/TestUtils"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryRouter, RouterProvider } from "react-router"
import { WorkoutSessionActionsBottomPanel } from "../ui/WorkoutSessionActionsBottomPanel"

//мок сервисов
vi.mock("@/entities/user/model/useUser", () => ({
  useUser: () => PROFILE_MOCK,
}))

import { WorkoutSessionPage } from "../ui/WorkoutSessionPage"

describe(`Тесты для btn action's `, () => {
  test("после старта отображаются action кнопки", async () => {
    const callback = vi.fn()

    render(<WorkoutSessionActionsBottomPanel onSaveHandler={callback} />)

    await userEvent.click(
      screen.getByRole("button", { name: /Начать тренировку/i }),
    )

    expect(
      screen.getByRole("button", { name: /Завершить тренировку/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /Добавить упражнение/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /Отменить тренировку/i }),
    ).toBeInTheDocument()
  })

  test("Завершение тренировки disabled", async () => {
    const callback = vi.fn()

    render(<WorkoutSessionActionsBottomPanel onSaveHandler={callback} />)

    await userEvent.click(
      screen.getByRole("button", { name: /Начать тренировку/i }),
    )

    const finishBtn = screen.getByRole("button", {
      name: /Завершить тренировку/i,
    })

    expect(finishBtn).toBeDisabled()

    await userEvent.click(finishBtn)
    expect(callback).not.toHaveBeenCalled()
  })

  test("Тренировка отменяется", async () => {
    const callback = vi.fn()

    render(<WorkoutSessionActionsBottomPanel onSaveHandler={callback} />)

    await userEvent.click(
      screen.getByRole("button", { name: /Начать тренировку/i }),
    )

    await userEvent.click(
      screen.getByRole("button", {
        name: /Отменить тренировку/i,
      }),
    )

    expect(
      screen.getByRole("button", { name: /Начать тренировку/i }),
    ).toBeInTheDocument()

    expect(
      screen.queryByRole("button", {
        name: /Отменить тренировку/i,
      }),
    ).toBeNull()
  })

  test("ExerciseDrawer открывается при добавлении тренировки", async () => {
    const callback = vi.fn()

    //использую. spy on для подмены метода getAll
    vi.spyOn(exerciseService, "getAll").mockResolvedValue([
      {
        muscle_group_name: "Спина",
        id: "0a0263c3-5a08-41ac-9493-1185ecfef36a",
        name: "Подтягивания",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "0d11ffe0-8317-4d18-8b1f-2bc32cb96cd8",
      },
      {
        muscle_group_name: "Спина",
        id: "bfdd6f5b-bf14-459c-8ad9-797e9d495501",
        name: "Тяга штанги в наклоне",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "0d11ffe0-8317-4d18-8b1f-2bc32cb96cd8",
      },
      {
        muscle_group_name: "Спина",
        id: "b437a030-299b-4b5a-a8f7-825b56ade8cd",
        name: "Тяга верхнего блока",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "0d11ffe0-8317-4d18-8b1f-2bc32cb96cd8",
      },
      {
        muscle_group_name: "Грудь",
        id: "dd9c91e7-e5c6-4be0-afe1-c0564d12b898",
        name: "Жим штанги лежа",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "28edab74-1098-407e-b58c-ef73a3521ee1",
      },
      {
        muscle_group_name: "Грудь",
        id: "3ec249db-c04e-44d6-a23c-ccb7aac300f4",
        name: "Отжимания на брусьях",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "28edab74-1098-407e-b58c-ef73a3521ee1",
      },
      {
        muscle_group_name: "Грудь",
        id: "78df3e9a-8645-4bec-9416-7a0f953af91b",
        name: "Разведение гантелей на наклонной скамье",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "28edab74-1098-407e-b58c-ef73a3521ee1",
      },
      {
        muscle_group_name: "Ноги",
        id: "d322b4ef-1779-4942-9e1b-427053480ee1",
        name: "Приседания со штангой",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "68ece837-4bb8-42ee-abdb-2171ca234988",
      },
      {
        muscle_group_name: "Ноги",
        id: "56fe5e9b-268c-4e57-afd3-177e3441e37a",
        name: "Жим ногами в тренажере",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "68ece837-4bb8-42ee-abdb-2171ca234988",
      },
      {
        muscle_group_name: "Ноги",
        id: "1ff7ea8c-c526-4f51-9ef1-a8f67dbb1dda",
        name: "Выпады с гантелями",
        created_at: "2026-05-21T16:15:07.677423+00:00",
        is_custom: false,
        muscle_group_id: "68ece837-4bb8-42ee-abdb-2171ca234988",
      },
    ])

    renderWithProviders(
      <WorkoutSessionActionsBottomPanel onSaveHandler={callback} />,
    )

    await userEvent.click(
      screen.getByRole("button", { name: /Начать тренировку/i }),
    )

    await userEvent.click(
      screen.getByRole("button", { name: /Добавить упражнение/i }),
    )

    expect(await screen.findByText(/Тяга верхнего блока/i)).toBeInTheDocument()
  })
})

describe("Сценарий добавления тренировок", () => {
  test("Добавляем тренировку и сохраняем, получаем ошибку, проверить карточки", async () => {
    const exerciseMock = {
      id: "testExerciseId",
      name: "Тяга верхнего блока",
    }

    //мок сервиса тренировок
    const router = createMemoryRouter(
      [
        {
          Component: WorkoutSessionPage,
          path: "/workout-session",
        },
      ],
      {
        initialEntries: ["/workout-session"],
      },
    )

    renderWithProviders(<RouterProvider router={router} />, { toaster: true })
    expect(await screen.findByText("Тренировка")).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole("button", { name: /Начать тренировку/i }),
    )

    act(() => useWorkoutStore.getState().addExercise(exerciseMock))

    expect(screen.getByText(exerciseMock.name)).toBeInTheDocument()

    expect(await screen.findByText(/Добавить подход/i)).toBeInTheDocument()
    await userEvent.click(screen.getByTestId("finish"))

    expect(await screen.findByText(/Ошибка, проверьте карточки упражнений/i))
  })

  test("Добавляем тренировку и сохраняем, видимо toast с успешным сообщением сохранения", async () => {
    const exerciseMock = {
      id: "testExerciseId",
      name: "Тяга верхнего блока",
    }

    //мок сервиса тренировок
    const router = createMemoryRouter(
      [
        {
          Component: WorkoutSessionPage,
          path: "/workout-session",
        },
      ],
      {
        initialEntries: ["/workout-session"],
      },
    )

    //мок хука useSubmitWorkoutMutation
    const mutationSpy = vi
      .spyOn(useSubmitMutationWorkoutModule, "useSubmitWorkoutMutation")
      .mockImplementation(() => {
        return {
          mutateAsync: vi.fn().mockResolvedValue(true),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      })

    renderWithProviders(<RouterProvider router={router} />, { toaster: true })
    expect(await screen.findByText("Тренировка")).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole("button", { name: /Начать тренировку/i }),
    )

    act(() => useWorkoutStore.getState().addExercise(exerciseMock))

    expect(screen.getByText(exerciseMock.name)).toBeInTheDocument()

    await userEvent.type(screen.getByTestId("weightInput"), "20")
    await userEvent.type(screen.getByTestId("repsInput"), "5")
    await userEvent.click(screen.getByTestId("setCompleteCheckbox"))
    await userEvent.click(screen.getByTestId("finish"))

    expect(await screen.findByText(/Тренировка сохранена!/i))

    mutationSpy.mockRestore()
  })
})
