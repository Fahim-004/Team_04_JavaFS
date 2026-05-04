import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Default Pages
import LandingPage        from "../pages/LandingPage/LandingPage";
import LoginPage          from "../pages/LoginPage/LoginPage";
import RegisterPage       from "../pages/RegisterPage/RegisterPage";
// Student Pages
import Dashboard          from "../pages/Dashboard/Dashboard";
import JobListPage        from "../pages/JobListPage/JobListPage";
import JobDetailPage      from "../pages/JobDetailPage/JobDetailPage";
import MyApplicationsPage from "../pages/MyApplicationsPage/MyApplicationsPage";
import ResumePage         from "../pages/ResumePage/ResumePage";
import AcademicPage       from "../pages/AcademicPage/AcademicPage";
import ProfilePage        from "../pages/ProfilePage/ProfilePage";
import StudentRoutes from "../routes/StudentRoutes";
// Employer Pages
import EmployerDashboard from "../pages/EmployerDashboard/EmployerDashboard";
import PostJobPage from "../pages/PostJobPage/PostJobPage";
import ApplicantsPage from "../pages/ApplicantsPage/ApplicantsPage";
import EmployerJobsPage from "../pages/EmployerJobsPage/EmployerJobsPage";
import EmployerProfilePage from "../pages/EmployerProfilePage/EmployerProfilePage";
import EmployerRoutes from "../routes/EmployerRoutes";
// Admin Pages
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ManageEmployersPage from "../pages/ManageEmployersPage/ManageEmployersPage";
import ManageStudentsPage from "../pages/ManageStudentsPage/ManageStudentsPage";
import RoundsManagerPage from "../pages/RoundsManagerPage/RoundsManagerPage";
import AdminRoutes from "../routes/AdminRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<LandingPage />} /> {/*Landing Page*/} 
        <Route path="/login"          element={<LoginPage />} /> {/*Login Page*/}
        <Route path="/register"       element={<RegisterPage />} /> {/*Register Page*/}
        
        <Route path="/dashboard" element={
          <StudentRoutes>
            <Dashboard />
          </StudentRoutes>
        } />

        <Route path="/profile" element={
          <StudentRoutes>
            <ProfilePage />
          </StudentRoutes>
        } />

        <Route path="/resume" element={
          <StudentRoutes>
            <ResumePage />
          </StudentRoutes>
        } />

        <Route path="/academic" element={
          <StudentRoutes>
            <AcademicPage />
          </StudentRoutes>
        } />

        <Route path="/jobs" element={
          <StudentRoutes>
            <JobListPage />
          </StudentRoutes>
        } />

        <Route path="/jobs/:jobId" element={
          <StudentRoutes>
            <JobDetailPage />
          </StudentRoutes>
        } />

        <Route path="/my-applications" element={
          <StudentRoutes>
            <MyApplicationsPage />
          </StudentRoutes>
        } />

        <Route path="/employer/dashboard" element={
          <EmployerRoutes>
            <EmployerDashboard />
          </EmployerRoutes>
        } />

        <Route path="/employer/post-job" element={
          <EmployerRoutes>
            <PostJobPage />
          </EmployerRoutes>
        } />

        <Route path="/employer/jobs" element={
          <EmployerRoutes>
            <EmployerJobsPage />
          </EmployerRoutes>
        } />

        <Route path="/employer/profile" element={
          <EmployerRoutes>
            <EmployerProfilePage />
          </EmployerRoutes>
        } />

        <Route path="/employer/jobs/:jobId/applicants" element={
          <EmployerRoutes>
            <ApplicantsPage />
          </EmployerRoutes>
        } />

        <Route path="/employer/jobs/:jobId/rounds" element={
          <EmployerRoutes>
            <RoundsManagerPage />
          </EmployerRoutes>
        } />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutes>
              <AdminDashboard />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/employers"
          element={
            <AdminRoutes>
              <ManageEmployersPage />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/students"
          element={
            <AdminRoutes>
              <ManageStudentsPage />
            </AdminRoutes>
          }
        />

        {/* Fallcak Route  */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;