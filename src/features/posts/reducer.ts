import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";

import { allPostsAction } from "./actions";
import { Post } from "./types";

const isLoadingPosts = createReducer(false as boolean)
  .handleAction([allPostsAction.request], () => true)
  .handleAction([allPostsAction.success, allPostsAction.failure], () => false);

const posts = createReducer([] as Post[]).handleAction(
  allPostsAction.success,
  (state, action) => action.payload
);

const postsReducer = combineReducers({
  isLoadingPosts,
  posts
});

export default postsReducer;
export type PostsState = ReturnType<typeof postsReducer>;
