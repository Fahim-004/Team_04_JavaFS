import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedApprovedStatus = localStorage.getItem("approvedStatus");
  const storedRejectedStatus = localStorage.getItem("rejectedStatus");
  const initialApprovedStatus =
    storedApprovedStatus === null
      ? null
      : storedApprovedStatus === "true";
  const initialRejectedStatus =
    storedRejectedStatus === null
      ? null
      : storedRejectedStatus === "true";

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [role, setRole] = useState(
    localStorage.getItem("role") || null
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || null
  );
  const [approvedStatus, setApprovedStatus] = useState(initialApprovedStatus);
  const [rejectedStatus, setRejectedStatus] = useState(initialRejectedStatus);

  const login = (
    newToken,
    newRole,
    newUserId,
    newApprovedStatus = null,
    newRejectedStatus = null
  ) => {
    setToken(newToken);
    setRole(newRole);
    setUserId(newUserId);
    setApprovedStatus(newApprovedStatus);
    setRejectedStatus(newRejectedStatus);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    localStorage.setItem("userId", newUserId);
    if (newApprovedStatus === null || newApprovedStatus === undefined) {
      localStorage.removeItem("approvedStatus");
    } else {
      localStorage.setItem("approvedStatus", String(newApprovedStatus));
    }
    if (newRejectedStatus === null || newRejectedStatus === undefined) {
      localStorage.removeItem("rejectedStatus");
    } else {
      localStorage.setItem("rejectedStatus", String(newRejectedStatus));
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    setApprovedStatus(null);
    setRejectedStatus(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("approvedStatus");
    localStorage.removeItem("rejectedStatus");
    localStorage.removeItem("profile");
    localStorage.removeItem("academic");
    localStorage.removeItem("applications");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, role, userId, approvedStatus, rejectedStatus, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};