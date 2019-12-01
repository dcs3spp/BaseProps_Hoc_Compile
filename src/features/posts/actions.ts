import { createAsyncAction } from "typesafe-actions";

import postConstants from "./constants";
import errorConstants from "../errors/constants";
import { FailureNotify } from "../errors/types";
import { Post, PostRequest } from "./types";

/**
 * Generate a random failure occurrence
 */
const randomiseNetworkConnectionFlag = () => {
  const fail = Math.random() < 0.5;
  return fail;
};

export const createPostsRequest = (fromComponent: string): PostRequest => {
  const result: PostRequest = {
    componentId: fromComponent,
    fail: randomiseNetworkConnectionFlag()
  };
  return result;
};

export const allPostsAction = createAsyncAction(
  postConstants.ALL_POSTS_REQUEST,
  postConstants.ALL_POSTS_SUCCESS,
  errorConstants.NOTIFY_ERROR
)<PostRequest, Post[], FailureNotify>();
