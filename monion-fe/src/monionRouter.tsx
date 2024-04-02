import { createBrowserRouter } from "react-router-dom";
import { Login } from "./login/Login";
import { ErrorPage } from "./error/ErrorPage";
import { Register } from "./register/Register";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Home } from "./home/Home";

export const MonionRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<Home />} />,
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
