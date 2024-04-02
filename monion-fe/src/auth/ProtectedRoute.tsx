import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};
