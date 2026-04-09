import { useState } from "react";
import StudentSidebar from "../components/Sidebar/StudentSidebar";
import EmployerSidebar from "../components/EmployerSidebar/EmployerSidebar";

import DashboardNavbar  from "../components/DashboardNavbar/DashboardNavbar";

const DashboardLayout = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem("role");

  return (
    <div className="flex" style={{ height: "100vh", overflow: "hidden", background: "#f0f2f8" }}>
      {role === "employer" ? (
        <EmployerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      ) : (
        <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      {/* Right column is a flex column that fills remaining width */}
      <div className="flex flex-col" style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
        <DashboardNavbar title={title} collapsed={collapsed} />

        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;