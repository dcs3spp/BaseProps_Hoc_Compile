import { combineReducers } from "redux";

import postsReducer from "../features/posts/reducer";
import errorsReducer from "../features/errors/reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  errors: errorsReducer
});

export default rootReducer;
