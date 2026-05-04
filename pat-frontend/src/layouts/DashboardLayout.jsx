import Sidebar from "../components/Sidebar/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <DashboardNavbar />

        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;