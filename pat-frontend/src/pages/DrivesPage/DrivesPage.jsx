import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

const drivesData = [
  { company: "Infosys", role: "Software Engineer", package: "6 LPA", deadline: "20 June", logo: "https://logo.clearbit.com/infosys.com" },
  { company: "TCS", role: "System Engineer", package: "4 LPA", deadline: "25 June", logo: "https://logo.clearbit.com/tcs.com" },
  { company: "Wipro", role: "Project Engineer", package: "5 LPA", deadline: "30 June", logo: "https://logo.clearbit.com/wipro.com" },
  { company: "Accenture", role: "Associate Software Engineer", package: "4.5 LPA", deadline: "5 July", logo: "https://logo.clearbit.com/accenture.com" },
  { company: "Cognizant", role: "Programmer Analyst", package: "4 LPA", deadline: "10 July", logo: "https://logo.clearbit.com/cognizant.com" },
  { company: "Google", role: "Software Development Engineer", package: "40 LPA", deadline: "15 July", logo: "https://logo.clearbit.com/google.com" },
];

const DrivesPage = () => {

  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(stored);
  }, []);

  const handleApply = (drive) => {
    const alreadyApplied = applications.find((app) => app.company === drive.company);
    if (alreadyApplied) return;

    const updated = [...applications, { company: drive.company, role: drive.role, status: "Applied" }];
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  const filteredDrives = drivesData.filter((drive) =>
    drive.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Placement Drives">

      <h1 className="text-3xl font-bold mb-6">Placement Drives</h1>

      <input
        type="text"
        placeholder="Search by company name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-6 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {filteredDrives.length === 0 ? (
        <p className="text-gray-500">No drives found matching "{search}".</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrives.map((drive, index) => {
            const applied = applications.find((app) => app.company === drive.company);
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
                <div className="flex items-center gap-4 mb-4">
                  <img src={drive.logo} alt={drive.company} className="w-12 h-12 rounded"
                    onError={(e) => { e.target.style.display = "none"; }} />
                  <div>
                    <h2 className="text-lg font-bold">{drive.company}</h2>
                    <p className="text-gray-500 text-sm">{drive.role}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>💰 Package: {drive.package}</p>
                  <p>📅 Deadline: {drive.deadline}</p>
                </div>
                <button
                  disabled={!!applied}
                  onClick={() => handleApply(drive)}
                  className={`mt-5 w-full py-2 rounded text-white transition
                    ${applied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {applied ? "✓ Applied" : "Apply Now"}
                </button>
              </div>
            );
          })}
        </div>
      )}

    </DashboardLayout>
  );
};

export default DrivesPage;