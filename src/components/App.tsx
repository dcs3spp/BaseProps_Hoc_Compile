import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./Home";
import { PostsListWithErrorListener } from "../containers/PostsList";

type AppProps = {};

export class App extends React.Component<AppProps, {}> {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <div>
          <React.Suspense fallback={<div>LoaderOptionsPlugin...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/posts"
                render={(props): JSX.Element => (
                  <PostsListWithErrorListener {...props} />
                )}
              />
            </Switch>
          </React.Suspense>
        </div>
      </BrowserRouter>
    );
  }
}
