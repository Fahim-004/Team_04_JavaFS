import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getEmployerJobs } from "../../services/api";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployerJobs()
      .then((res) => setJobs(res.data))
      .catch(() => {});
  }, []);

  const stats = [
    {
      label: "Jobs Posted",
      value: jobs.length,
      color: "#4c7ef0",
      sub: "Total jobs created",
    },
    {
      label: "Active Jobs",
      value: jobs.filter((j) => j.status !== "CLOSED").length,
      color: "#22a06b",
      sub: "Currently accepting applications",
    },
    {
      label: "Applicants",
      value: jobs.reduce((sum, j) => sum + (j.applicantCount || 0), 0),
      color: "#d97706",
      sub: "Total applicants",
    },
  ];

  return (
    <DashboardLayout title="Employer Dashboard">

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-5"
            style={{ background: "#fff", border: "1px solid #e5e7f0" }}
          >
            <p className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: "#9ca3af" }}>
              {s.label}
            </p>
            <p className="text-4xl font-semibold mb-1" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-xs" style={{ color: "#9ca3af" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick action */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm uppercase tracking-wide font-medium" style={{ color: "#9ca3af" }}>
          Jobs
        </h2>

        <button
          onClick={() => navigate("/employer/post-job")}
          className="px-4 py-2 text-sm rounded-lg"
          style={{
            background: "#4c7ef0",
            color: "#fff",
            border: "none",
          }}
        >
          + Post New Job
        </button>
      </div>

      {/* Jobs table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid #e5e7f0" }}
      >
        <table className="w-full text-sm">
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th className="text-left px-4 py-3">Job Title</th>
              <th className="text-left px-4 py-3">Salary</th>
              <th className="text-left px-4 py-3">Deadline</th>
              <th className="text-left px-4 py-3">Applicants</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No jobs posted yet.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.jobId} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td className="px-4 py-3">{job.jobTitle}</td>
                  <td className="px-4 py-3">{job.salaryPackage}</td>
                  <td className="px-4 py-3">{job.applicationDeadline}</td>
                  <td className="px-4 py-3">{job.applicantCount || 0}</td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        navigate(`/employer/jobs/${job.jobId}/applicants`)
                      }
                      className="text-sm"
                      style={{ color: "#4c7ef0" }}
                    >
                      View Applicants
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </DashboardLayout>
  );
};

export default EmployerDashboard;