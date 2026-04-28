import { type ExerciseType } from "../model/exercise-types"
import { MOCK_DATA } from "./mocks"

// This is a mock implementation of the exercise service. In a real application, this would make HTTP requests to a backend API.
export const exerciseService = {
  async getAll(): Promise<ExerciseType[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA), 2000)
    })
  },

  //fix types
  async getById(id: string): Promise<ExerciseType> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const exercise = MOCK_DATA.find((exercise) => exercise.id === id)
        console.log(exercise)
        resolve(exercise!)
      }, 2000)
    })
  },
}
