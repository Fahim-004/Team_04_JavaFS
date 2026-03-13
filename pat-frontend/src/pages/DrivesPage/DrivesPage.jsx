import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

const profile =
  JSON.parse(localStorage.getItem("profile")) || {};

const academic =
  JSON.parse(localStorage.getItem("academic")) || {};

const studentBranch = profile.branch;
const studentCGPA = parseFloat(academic.cgpa);



const drivesData = [

  {
    company: "Infosys",
    role: "Software Engineer",
    package: "6 LPA",
    branch: "Computer Science Engineering (CSE)",
    cgpa: 7,
    deadline: "20 June",
    logo: "https://logo.clearbit.com/infosys.com"
  },

  {
    company: "TCS",
    role: "System Engineer",
    package: "4 LPA",
    branch: "Information Science Engineering (ISE)",
    cgpa: 6,
    deadline: "25 June",
    logo: "https://logo.clearbit.com/tcs.com"
  },

  {
    company: "Wipro",
    role: "Project Engineer",
    package: "5 LPA",
    branch: "Computer Science Engineering (CSE)",
    cgpa: 6.5,
    deadline: "30 June",
    logo: "https://logo.clearbit.com/wipro.com"
  }

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

    const filteredDrives = drivesData.filter(
      (drive) => studentCGPA >= drive.cgpa
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


      <h2 className="text-xl font-semibold mb-4">
        Available Placement Drives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {filteredDrives.map((drive, index) => {

    const applied = applications.find(
      (app) => app.company === drive.company
    );

    return (

      <div
        key={index}
        className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
      >

        {/* Company Header */}

        <div className="flex items-center gap-4 mb-4">

          <img
            src={drive.logo}
            alt={drive.company}
            className="w-12 h-12 rounded"
          />

          <div>

            <h2 className="text-lg font-bold">
              {drive.company}
            </h2>

            <p className="text-gray-500 text-sm">
              {drive.role}
            </p>

          </div>

        </div>

        {/* Job Info */}

        <div className="space-y-1 text-sm text-gray-600">

          <p>💰 Package: {drive.package}</p>

          <p>🎓 Eligibility: CGPA ≥ {drive.cgpa}</p>

          <p>📅 Deadline: {drive.deadline}</p>

        </div>

        {/* Apply Button */}

        <button
          disabled={applied}
          onClick={() => handleApply(drive)}
          className={`mt-5 w-full py-2 rounded text-white
            ${
              applied
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >

            {applied ? "Applied" : "Apply Now"}

          </button>

        </div>

        );

      })}

      </div>

    </DashboardLayout>
  );
};

export default DrivesPage;