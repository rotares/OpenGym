import { render } from "@testing-library/react"
import { type ReactElement } from "react"

import { Providers } from "./Providers"

type RenderOptions = {
  toaster?: boolean
  initialEntries?: string[]
}

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
) => {
  return render(ui, {
    wrapper: ({ children }) => <Providers {...options}>{children}</Providers>,
  })
}
