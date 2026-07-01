import { Page } from "@playwright/test"
import type { NewWorkoutDetails, NewWorkoutType, WorkoutListType } from "../data-mocks/getWorkoutMocks"

type State = {
  workoutItems: WorkoutListType
  currentWorkoutItem: NewWorkoutType
  currentWorkoutDetails?: NewWorkoutDetails
}

export const mockWorkout = (page: Page, state: State) => {
  page.route("**/rest/v1/workouts*", async (route) => {
    const request = route.request()
    const method = request.method()
    const url = new URL(request.url())

    if (method === "GET") {
      const id = url.searchParams.get("id")

      if (id) {
        return await route.fulfill({
          body: JSON.stringify(state.currentWorkoutDetails),
          status: 200,
        })
      }

      return await route.fulfill({
        body: JSON.stringify(state.workoutItems),
        status: 200,
      })
    }

    if (method === "POST") {
      state.workoutItems = [state.currentWorkoutItem, ...state.workoutItems]
      return await route.fulfill({
        body: JSON.stringify({
          id: "testid",
        }),
        status: 201,
      })
    }

    if(method === 'DELETE') {
      const id = url.searchParams.get("id")
      if(id) {
        state.workoutItems = state.workoutItems.filter(w => w.id !== id.split('.').at(-1))
        return await route.fulfill({
          body: JSON.stringify(id),
          status: 204
         }
        )
      }
    }
  })

  page.route("**/rest/v1/workout_exercises*", async (route) => {
    await route.fulfill({
      body: JSON.stringify([
        {
          id: "testExercise",
        },
      ]),
      status: 201,
    })
  })

  page.route("**/rest/v1/sets*", async (route) => {
    await route.fulfill({
      status: 201,
    })
  })
}
