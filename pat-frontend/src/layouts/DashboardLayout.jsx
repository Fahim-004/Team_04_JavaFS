import Sidebar from "../components/Sidebar/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";

const DashboardLayout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen" style={{ background: "#f0f2f8" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar title={title} />
        <main className="flex-1 px-8 py-7 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
