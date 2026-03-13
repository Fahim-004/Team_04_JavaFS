import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

const drivesData = [
  {
    company: "Infosys",
    role: "Software Engineer",
    package: "6 LPA",
    cgpa: 7,
    deadline: "20 June",
  },
  {
    company: "TCS",
    role: "System Engineer",
    package: "4 LPA",
    cgpa: 6,
    deadline: "25 June",
  },
  {
    company: "Wipro",
    role: "Project Engineer",
    package: "5 LPA",
    cgpa: 7,
    deadline: "30 June",
  },
];

const DrivesPage = () => {

  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);

  const studentCGPA = 7;

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(stored);
  }, []);

  const handleApply = (drive) => {

    const alreadyApplied = applications.find(
      (app) => app.company === drive.company
    );

    if (alreadyApplied) return;

    const newApplication = {
      company: drive.company,
      role: drive.role,
      status: "Applied",
    };

    const updated = [...applications, newApplication];

    setApplications(updated);

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );
  };

  const filteredDrives = drivesData
    .filter((d) => studentCGPA >= d.cgpa)
    .filter((d) =>
      d.company.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Placement Drives
      </h1>

      <input
        type="text"
        placeholder="Search company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-6 w-full max-w-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {filteredDrives.map((drive, index) => {

          const applied = applications.find(
            (app) => app.company === drive.company
          );

          return (
            <div
              key={index}
              className="bg-white p-6 rounded shadow hover:shadow-lg transition"
            >

              <h2 className="text-xl font-bold mb-2">
                {drive.company}
              </h2>

              <p>Role: {drive.role}</p>
              <p>Package: {drive.package}</p>
              <p>Eligibility: CGPA ≥ {drive.cgpa}</p>
              <p className="mb-4">Deadline: {drive.deadline}</p>

              <button
                disabled={applied}
                onClick={() => handleApply(drive)}
                className={`px-4 py-2 rounded text-white
                  ${applied
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {applied ? "Applied" : "Apply"}
              </button>

            </div>
          );
        })}

      </div>

    </DashboardLayout>
  );
};

export default DrivesPage;