import { PostsState } from './reducer';
const selectors = {
  getReduxPosts: (state: PostsState) => state.posts
};

export default selectors;
