import { AppProvider } from "./providers"
import { AppRoutes } from "./routes"

import "./styles/index.css"

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
