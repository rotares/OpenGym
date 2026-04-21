import { AppProvider } from "./providers"
import { AppRoutes } from "./routing"

import "./styles/index.css"

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
