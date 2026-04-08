import { useState } from "react";
import Sidebar          from "../components/Sidebar/Sidebar";
import DashboardNavbar  from "../components/DashboardNavbar/DashboardNavbar";

const DashboardLayout = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex" style={{ height: "100vh", overflow: "hidden", background: "#f0f2f8" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

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