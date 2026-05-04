import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { deleteJob, getEmployerJobs, stopJobIntake } from "../../services/api";

const EmployerJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [busyJobId, setBusyJobId] = useState(null);
  const navigate = useNavigate();

  const getErrorMessage = (err, fallback) => {
    if (!err?.response?.data) return fallback;
    if (typeof err.response.data === "string") return err.response.data;
    return err.response.data.error || err.response.data.message || fallback;
  };

  const statusLabel = (status) => status || "OPEN";

  useEffect(() => {
    getEmployerJobs()
      .then((res) => setJobs(res.data))
      .catch((err) => setError(getErrorMessage(err, "Failed to load jobs")));
  }, []);

  const refreshJobs = async () => {
    const res = await getEmployerJobs();
    setJobs(res.data || []);
  };

  const handleEdit = (jobId) => {
    navigate("/employer/post-job", { state: { jobId } });
  };

  const handleStopIntake = async (jobId) => {
    try {
      setBusyJobId(jobId);
      await stopJobIntake(jobId);
      await refreshJobs();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to stop intake"));
    } finally {
      setBusyJobId(null);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job? This will remove it from active listings.")) return;

    try {
      setBusyJobId(jobId);
      await deleteJob(jobId);
      await refreshJobs();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete job"));
    } finally {
      setBusyJobId(null);
    }
  };

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
        {error ? (
          <div style={{ padding: "12px 16px", background: "#fef2f2", color: "#991b1b", borderBottom: "1px solid #fecaca" }}>
            {error}
          </div>
        ) : null}
        <table className="w-full text-sm">
          
          {/* Header */}
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th className="text-left px-4 py-3">Job Title</th>
              <th className="text-left px-4 py-3">Salary</th>
              <th className="text-left px-4 py-3">Deadline</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Applicants</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
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
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        background:
                          job.status === "OPEN"
                            ? "#ecfdf5"
                            : job.status === "CLOSED"
                            ? "#fef3c7"
                            : "#f3f4f6",
                        color:
                          job.status === "OPEN"
                            ? "#166534"
                            : job.status === "CLOSED"
                            ? "#92400e"
                            : "#6b7280",
                      }}
                    >
                      {statusLabel(job.status)}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {job.applicantCount || 0}
                  </td>

                  <td className="px-4 py-3">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      <button
                        onClick={() => handleEdit(job.jobId)}
                        className="text-sm"
                        style={{ color: "#4c7ef0" }}
                        disabled={busyJobId === job.jobId || job.status === "DELETED"}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => navigate(`/employer/jobs/${job.jobId}/applicants`)}
                        className="text-sm"
                        style={{ color: "#16a34a" }}
                      >
                        View Applicants
                      </button>

                      <button
                        onClick={() => handleStopIntake(job.jobId)}
                        className="text-sm"
                        style={{ color: "#d97706" }}
                        disabled={busyJobId === job.jobId || job.status !== "OPEN"}
                      >
                        Stop Intake
                      </button>

                      <button
                        onClick={() => handleDelete(job.jobId)}
                        className="text-sm"
                        style={{ color: "#dc2626" }}
                        disabled={busyJobId === job.jobId}
                      >
                        Delete
                      </button>
                    </div>
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