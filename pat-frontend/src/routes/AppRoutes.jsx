import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage        from "../pages/LandingPage/LandingPage";
import LoginPage          from "../pages/LoginPage/LoginPage";
import RegisterPage       from "../pages/RegisterPage/RegisterPage";
import Dashboard          from "../pages/Dashboard/Dashboard";
import JobListPage        from "../pages/JobListPage/JobListPage";
import JobDetailPage      from "../pages/JobDetailPage/JobDetailPage";
import MyApplicationsPage from "../pages/MyApplicationsPage/MyApplicationsPage";
import ResumePage         from "../pages/ResumePage/ResumePage";
import AcademicPage       from "../pages/AcademicPage/AcademicPage";
import ProfilePage        from "../pages/ProfilePage/ProfilePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<LandingPage />} /> {/*Landing Page*/} 
        <Route path="/login"          element={<LoginPage />} /> {/*Login Page*/}
        <Route path="/register"       element={<RegisterPage />} /> {/*Register Page*/}
        <Route path="/dashboard"      element={<Dashboard />} /> {/*Dashboard Page*/}
        <Route path="/profile"        element={<ProfilePage />} /> {/*Profile Page*/}
        <Route path="/resume"         element={<ResumePage />} /> {/*Resume Page*/}
        <Route path="/academic"       element={<AcademicPage />} /> {/*Academic Page*/}
        <Route path="/jobs"           element={<JobListPage />} /> {/*Job List Page or Placement Drives Page*/}
        <Route path="/jobs/:jobId"    element={<JobDetailPage />} /> {/*Job Detail Page*/}
        <Route path="/my-applications" element={<MyApplicationsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;