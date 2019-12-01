import * as React from "react";

import { Post as PostModel } from "../features/posts/types";

type PostProps = {
  post: PostModel;
};
export const Post = ({ post }: PostProps): JSX.Element => (
  <>
    <>
      <p>{post.id}</p>
    </>
  </>
);
 