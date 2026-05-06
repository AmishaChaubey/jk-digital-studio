import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}