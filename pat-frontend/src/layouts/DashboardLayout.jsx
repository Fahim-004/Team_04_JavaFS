import Sidebar from "../components/Sidebar/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";

const DashboardLayout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar title={title} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;