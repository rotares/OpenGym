import { type JSX } from "react"
import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

//headerConfig
interface HeaderConfig {
  title?: string
  actions?: (() => JSX.Element) | JSX.Element
}

interface HeaderStore {
  headerConfig: HeaderConfig | null
  setHeaderConfig: (headerConfig: HeaderConfig | null) => void
}

//slice for header management
const HeaderSlice: StateCreator<HeaderStore, [["zustand/devtools", never]]> = (
  set,
) => ({
  headerConfig: null,
  setHeaderConfig: (newConfig) =>
    set({ headerConfig: newConfig }, undefined, "setHeaderConfig"),
})

//store for h using zustand with devtools
export const useHeaderStore = create<HeaderStore>()(
  //args = (set, get, api) - instruments of zustand logic
  devtools(
    (...args) => ({
      ...HeaderSlice(...args),
    }),
    { name: "headerStore" },
  ),
)
