import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Dashboard from "../pages/Dashboard/Dashboard";

import DrivesPage from "../pages/DrivesPage/DrivesPage";
import ApplicationsPage from "../pages/ApplicationsPage/ApplicationsPage";
import ResumePage from "../pages/ResumePage/ResumePage";
import AcademicPage from "../pages/AcademicPage/AcademicPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/drives" element={<DrivesPage />} />

        <Route path="/applications" element={<ApplicationsPage />} />

        <Route path="/resume" element={<ResumePage />} />

        <Route path="/academic" element={<AcademicPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;