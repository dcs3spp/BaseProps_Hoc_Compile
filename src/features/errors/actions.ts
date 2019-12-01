import { createAction } from "typesafe-actions";
import { History } from "history";

import constants from "./constants";
import { ClearError } from "./types";

export const clearErrorAction = createAction(
  constants.CLEAR_ERROR,
  (
    fromAction: string,
    fromComponent: string,
    history?: History,
    navigateTo?: string
  ): ClearError => ({
    history: history ? history : undefined,
    navigateTo: navigateTo ? navigateTo : undefined,
    fromAction: fromAction,
    fromComponent: fromComponent
  })
)<ClearError>();
