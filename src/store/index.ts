import { RootAction, RootState } from "typesafe-actions";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { composeEnhancers } from "./utils";
import rootEpic from "./rootEpic";
import rootReducer from "./rootReducer";
import services from "../services";

/**
 * redux-observable
 */
export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>({
  dependencies: services
});

// configure middlewares
const middlewares = [epicMiddleware];

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

// spawn redux-observable
epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
