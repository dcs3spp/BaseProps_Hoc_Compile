import { combineEpics } from "redux-observable";

import * as postEpics from "../features/posts/epics";
import * as errorEpics from "../features/errors/epics";

export default combineEpics(
  postEpics.allPostsHandler,
  errorEpics.clearErrorEpic
);
