import * as React from "react";
import { render } from "react-dom";

import { App } from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import "./styles.css";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
