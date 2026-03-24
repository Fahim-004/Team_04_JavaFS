import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ApplicationsPage = () => {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(stored);
  }, []);

  const handleWithdraw = (companyName) => {
    const updated = applications.filter((app) => app.company !== companyName);
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  return (
    <DashboardLayout title="My Applications">

      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          No applications yet.{" "}
          <Link to="/drives" className="text-blue-600 hover:underline">
            Browse Placement Drives
          </Link>{" "}
          and apply.
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600 uppercase text-xs">
                <th className="py-3 pr-4">Company</th>
                <th className="pr-4">Role</th>
                <th className="pr-4">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 pr-4 font-medium">{app.company}</td>
                  <td className="pr-4 text-gray-600">{app.role}</td>
                  <td className="pr-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleWithdraw(app.company)}
                      className="text-red-500 hover:text-red-700 text-xs underline">
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </DashboardLayout>
  );
};

export default ApplicationsPage;