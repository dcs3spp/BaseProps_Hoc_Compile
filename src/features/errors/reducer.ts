import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";

import { ClearError } from "./types";
import errorConstants from "./constants";
import { FailureNotify } from "./types";

/**
 * Errors are immutably stored in an array as: FailureNotify[]
 * A CLEAR_ERROR action removes the error from the store
 */

const initialState: FailureNotify[] = [];

/**
 * Construct an array of failure notifications containing the new occurrence
 * @param state  List of current failure notifications
 * @param newItem  An new failure notification
 * @returns List of failure notifications containing the new failure instance
 */
const addError = (
  state: FailureNotify[],
  newItem: FailureNotify
): FailureNotify[] => {
  if (state.find(item => item.fromComponent === newItem.fromComponent)) {
    // if there is already an item then replace it with newItem
    return state.map(item => {
      if (item.fromComponent === newItem.fromComponent) {
        return newItem;
      }
      return item;
    });
  } else {
    // create a new array with the new item appended
    return state.concat([newItem]);
  }
};

/**
 * Remove a failure notification from the list
 * @param state  List of current failures
 * @param item   The item to remove from the list.
 * @returns List of failure notifications with item removed
 */
const removeError = (
  state: FailureNotify[],
  item: ClearError
): FailureNotify[] => {
  const newList: FailureNotify[] = state.filter(
    element => element.fromComponent !== item.fromComponent
  );

  return newList;
};

/**
 * Reducer that adds failure notification to array upon receipt of NOTIFY_ERROR action.
 * The reducer removes an item from the array upon receipt of CLEAR_ERROR action.
 */
const error = createReducer(initialState as FailureNotify[])
  .handleType(
    errorConstants.NOTIFY_ERROR,
    (state, action): FailureNotify[] => {
      console.log(
        `error reducer processing notification of an error from component... ${
          action.payload.fromComponent
        }`
      );
      const errors: FailureNotify[] = addError(state, action.payload);
      console.log(`error reducer state is now => ${JSON.stringify(errors)}`);
      return errors;
    }
  )
  .handleType(
    errorConstants.CLEAR_ERROR,
    (state, action): FailureNotify[] => {
      console.log(`error reducer processing clear error action...`);
      return removeError(state, action.payload);
    }
  );

const errorsReducer = combineReducers({
  error
});

/**
 * Exports
 */
export default errorsReducer;
export type ErrorState = ReturnType<typeof errorsReducer>;
