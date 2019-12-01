import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "typesafe-actions";

import { Post as PostComponent } from "../components/Post";

import { allPostsAction, createPostsRequest } from "../features/posts/actions";
import { RequiredProps } from "../higher-order-components/withErrorListener";
import { Post } from "../features/posts/types";
import { withErrorListener } from "../higher-order-components/withErrorListener";

type StateProps = {
  isLoading: boolean;
  posts: Post[];
};

/**
 * Redux dispatch and state mappings
 */
const dispatchProps = {
  fetchPosts: allPostsAction.request
};

const mapStateToProps = (state: RootState): StateProps => ({
  isLoading: state.posts.isLoadingPosts,
  posts: [] // state.posts.posts
});

const connector = connect(
  mapStateToProps,
  dispatchProps
);

type ReduxProps = ConnectedProps<typeof connector>;

/**
 * Component property type definitions
 */
type PostsListProps = ReduxProps & RequiredProps;

/**
 * CourseList component
 */
const PostsListBase = ({
  posts = [],
  uniqueId,
  fetchPosts,
  isLoading
}: PostsListProps): JSX.Element => {
  // dispatch fetch posts action on mount
  React.useEffect(() => {
    console.log(
      `PostListBase dispatching PostsRequest action with id ${uniqueId}`
    );
    fetchPosts(createPostsRequest(uniqueId));
  }, [fetchPosts, uniqueId]);

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
        <Link to="/">Home</Link>
      </>
    );
  }

  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      <Link to="/">Home</Link>
      <h2>List of post id's</h2>
      {
        <ul>
          {posts.map(element => (
            <li key={element.id}>
              <PostComponent post={element} />
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

// connect to redux
const PostsListConnected = connector(PostsListBase);

// connect to error listener
export const PostsListWithErrorListener = withErrorListener(PostsListConnected);
