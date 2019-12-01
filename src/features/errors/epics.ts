import { Epic } from "redux-observable";
import { filter, tap, ignoreElements } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootAction, RootState, Services } from "typesafe-actions";

import { clearErrorAction } from "./actions";

export const clearErrorEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(clearErrorAction)),
    tap(action => {
      console.log(
        `clearErrorEpic runnning for clearErrorAction ${action.type}`
      );
      if (
        action.payload &&
        action.payload.history &&
        action.payload.navigateTo
      ) {
        console.log(
          `clearErrorEpic redirecting to ${action.payload.navigateTo}`
        );
        action.payload.history.push(action.payload.navigateTo);
      }
    }),
    ignoreElements()
  );
