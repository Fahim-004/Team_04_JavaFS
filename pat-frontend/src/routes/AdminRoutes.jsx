import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoutes = ({ children }) => {
  const { role, token } = useContext(AuthContext);

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Not admin
  if (role !== "admin") {
    if (role === "student") return <Navigate to="/dashboard" replace />;
    if (role === "employer") return <Navigate to="/employer/dashboard" replace />;
    return <Navigate to="/" replace />;
}
  return children;
};

export default AdminRoutes;