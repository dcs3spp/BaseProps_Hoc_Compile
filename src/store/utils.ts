import { compose } from "redux";

export const composeEnhancers =
  (window.APP_CONF.mode === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
