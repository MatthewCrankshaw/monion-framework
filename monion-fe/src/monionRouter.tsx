import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Login } from "./login/Login";
import { ErrorPage } from "./error/ErrorPage";
import { Register } from "./register/Register";

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
  {
    path: "/register",
    element: <Register />,
  },
]);
