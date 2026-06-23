import { Page } from "@playwright/test"

type State = {
  workoutItems: any[]
  currentWorkoutItem?: any
  currentWorkoutDetails?: any
  workoutDetails?: any
}

export const mockWorkout = (page: Page, state: State) => {
  page.route("**/rest/v1/workouts*", async (route) => {
    const request = route.request()
    const method = request.method()
    const url = new URL(request.url())

    if (method === "GET") {
      const id = url.searchParams.get("id")

      if (!!id) {
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
      state.workoutItems.unshift(state.currentWorkoutItem)
      return await route.fulfill({
        body: JSON.stringify({
          id: "testid",
        }),
        status: 201,
      })
    }
  })
}
