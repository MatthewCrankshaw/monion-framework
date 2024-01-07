import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Login } from "./login/Login";
import { ErrorPage } from "./error/ErrorPage";

export const MonionRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
