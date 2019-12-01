import { RootAction, RootState, Services } from "typesafe-actions";

import { Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";

import { allPostsAction } from "./actions";
import { Post } from "./types";

const badUrl = "https://ewlkjher.com";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

export const allPostsHandler: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(allPostsAction.request)),
    map(action => {
      if (action.payload && action.payload.fail === true) {
        console.log(`Simulating network error by requesting ${badUrl}`);
        return { action: action, url: badUrl };
      } else {
        return { action: action, url: postsUrl };
      }
    }),
    switchMap(request =>
      api.getJSON<Post[]>(request.url).pipe(
        map(allPostsAction.success),
        catchError(error => {
          console.log("allPostsHandler dispatching a failure notification");
          return of(
            allPostsAction.failure({
              fromAction: request.action.type,
              fromComponent: request.action.payload.componentId,
              message: error.message
            })
          );
        })
      )
    )
  );
