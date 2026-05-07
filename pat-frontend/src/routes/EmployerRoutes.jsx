import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EmployerRoutes = ({ children }) => {
  const { role, token, approvedStatus, rejectedStatus } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "employer") {
    if (role === "student") return <Navigate to="/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  if (rejectedStatus === true) {
    return <Navigate to="/employer/rejected" replace />;
  }

  if (approvedStatus === false) {
    return <Navigate to="/employer/pending-approval" replace />;
  }

  return children;
};

export default EmployerRoutes;