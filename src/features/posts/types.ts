export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type PostRequest = {
  componentId: string;
  fail: boolean;
};
