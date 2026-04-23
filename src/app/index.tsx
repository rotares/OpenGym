import { AppProvider } from "./providers"
import { AppRouter } from "./router"

import "./styles/index.css"

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
