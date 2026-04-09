import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token,  setToken]  = useState(localStorage.getItem("token")  || null);
  const [role,   setRole]   = useState(localStorage.getItem("role")   || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  const login = (newToken, newRole, newUserId) => {
    setToken(newToken);
    setRole(newRole);
    setUserId(newUserId);
    localStorage.setItem("token",  newToken);
    localStorage.setItem("role",   newRole);
    localStorage.setItem("userId", newUserId);

    // Decode email from JWT payload (base64) so ProfilePage can display it
    try {
      const payload = JSON.parse(atob(newToken.split(".")[1]));
      if (payload.sub) localStorage.setItem("userEmail", payload.sub);
    } catch (_) {}
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("profile");
    localStorage.removeItem("academic");
    localStorage.removeItem("applications");
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
