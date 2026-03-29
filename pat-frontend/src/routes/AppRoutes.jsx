import ProtectedRoute from "../components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import DrivesPage from "../pages/DrivesPage/DrivesPage";
import ApplicationsPage from "../pages/ApplicationsPage/ApplicationsPage";
import ResumePage from "../pages/ResumePage/ResumePage";
import AcademicPage from "../pages/AcademicPage/AcademicPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/drives" element={<PrivateRoute><DrivesPage /></PrivateRoute>} />
        <Route path="/applications" element={<PrivateRoute><ApplicationsPage /></PrivateRoute>} />
        <Route path="/resume" element={<PrivateRoute><ResumePage /></PrivateRoute>} />
        <Route path="/academic" element={<PrivateRoute><AcademicPage /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;