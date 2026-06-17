import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { useWorkoutStore } from "../entities/workout";
import { server } from "./server/server";

beforeAll(() => server.listen())

afterEach(async () => {
  server.resetHandlers()
  useWorkoutStore.getState().resetWorkout()
  localStorage.clear()
  sessionStorage.clear()
  vi.clearAllMocks()
  cleanup()
})

afterAll(() => server.close())

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})
