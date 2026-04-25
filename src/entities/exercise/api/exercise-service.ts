import { type ExerciseType } from "../model/exercise-types"
import { MOCK_DATA } from "./mocks"

// This is a mock implementation of the exercise service. In a real application, this would make HTTP requests to a backend API.
export const exerciseService = {
  async getAll(): Promise<ExerciseType[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA), 1000)
    })
  },
}
