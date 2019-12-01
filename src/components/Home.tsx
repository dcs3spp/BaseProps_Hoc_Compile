import * as React from "react";
import { Link } from "react-router-dom";

export const Home = (): JSX.Element => (
  <>
    <p>Home</p>
    <Link to="/posts">Posts</Link>
  </>
);
