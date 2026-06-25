//мок запросов
import { authHandlers } from "./authHandlers";
import { exerciseHandlers } from "./exerciseHandlers";
import { musclesHandlers } from './musclesHandler';
import { profileHandlers } from "./profileHandlers";

export const handlers = [
  ...authHandlers,
  ...profileHandlers,
  ...exerciseHandlers,
  ...musclesHandlers,
]