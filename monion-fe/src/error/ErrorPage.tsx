import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const ErrorPage = (): ReactElement => {
  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <br />
      <Link to="/">Back home</Link>
    </div>
  );
};
