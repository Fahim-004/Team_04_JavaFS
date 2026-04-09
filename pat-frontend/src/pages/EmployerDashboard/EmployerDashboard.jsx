import DashboardLayout from "../../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployerJobs } from "../../services/api";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getEmployerJobs();
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Jobs Posted ({jobs.length})
          </h2>

          <button
            onClick={() => navigate("/employer/post-job")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post New Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          <table className="w-full border mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border">Job Title</th>
                <th className="p-3 text-left border">Salary</th>
                <th className="p-3 text-left border">Deadline</th>
                <th className="p-3 text-left border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job.jobId}>
                  <td className="p-3 border">{job.jobTitle}</td>
                  <td className="p-3 border">{job.salaryPackage}</td>
                  <td className="p-3 border">{job.applicationDeadline}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() =>
                        navigate(`/employer/jobs/${job.jobId}/applicants`)
                      }
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900"
                    >
                      View Applicants
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;