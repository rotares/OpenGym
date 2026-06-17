//мок запросов
import { authHandlers } from "./authHandlers"
import { profileHandlers } from "./profileHandlers"

export const handlers = [
  ...authHandlers,
  ...profileHandlers
]