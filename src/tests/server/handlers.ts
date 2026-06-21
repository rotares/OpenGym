//мок запросов
import { authHandlers } from "./authHandlers";
import { exerciseHandlers } from "./exerciseHandlers";
import { musclesHandlers } from './musclesHandler';
import { profileHandlers } from "./profileHandlers";
import { userHandlers } from "./userHandlers";

export const handlers = [
  ...authHandlers,
  ...profileHandlers,
  ...exerciseHandlers,
  ...musclesHandlers,
  ...userHandlers
]