import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getEmployerJobs } from "../../services/api";

const EmployerJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployerJobs()
      .then((res) => setJobs(res.data))
      .catch(() => {});
  }, []);

  return (
    <DashboardLayout title="Jobs">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-sm uppercase tracking-wide font-medium"
          style={{ color: "#9ca3af" }}
        >
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
          
          {/* Header */}
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th className="text-left px-4 py-3">Job Title</th>
              <th className="text-left px-4 py-3">Salary</th>
              <th className="text-left px-4 py-3">Deadline</th>
              <th className="text-left px-4 py-3">Applicants</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No jobs posted yet.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.jobId}
                  style={{ borderTop: "1px solid #f3f4f6" }}
                >
                  <td className="px-4 py-3">{job.jobTitle}</td>

                  <td className="px-4 py-3">
                    {job.salaryPackage}
                  </td>

                  <td className="px-4 py-3">
                    {job.applicationDeadline}
                  </td>

                  <td className="px-4 py-3">
                    {job.applicantCount || 0}
                  </td>

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

export default EmployerJobsPage;