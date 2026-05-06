import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getJobApplicants } from "../../services/api";
import { handleApiError } from "../../utils/handleApiError";

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobApplicants(jobId)
      .then((res) => setApplicants(res.data))
      .catch((error) => setError(handleApiError(error)));
  }, [jobId]);

  const getStatusColor = (status) => {
    if (status === "SELECTED") return "#22a06b";
    if (status === "REJECTED") return "#ef4444";
    if (status === "SHORTLISTED") return "#4c7ef0";
    return "#6b7280";
  };

  return (
    <DashboardLayout title="Applicants">

      {/* Table container */}
      {error ? (
        <div className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ background: "#fef2f2", color: "#991b1b" }}>
          {error}
        </div>
      ) : null}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid #e5e7f0" }}
      >

        <table className="w-full text-sm">

          {/* Header */}
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th className="text-left px-4 py-3">Student Name</th>
              <th className="text-left px-4 py-3">USN</th>
              <th className="text-left px-4 py-3">Branch</th>
              <th className="text-left px-4 py-3">CGPA</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Applied At</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>

            {applicants.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No applicants yet.
                </td>
              </tr>
            ) : (
              applicants.map((app) => (
                <tr key={app.applicationId} style={{ borderTop: "1px solid #f3f4f6" }}>

                  <td className="px-4 py-3">{app.student.fullName}</td>

                  <td className="px-4 py-3">{app.student.usn}</td>

                  <td className="px-4 py-3">{app.student.branch}</td>

                  <td className="px-4 py-3">{app.student.cgpa}</td>

                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        background: `${getStatusColor(app.status)}20`,
                        color: getStatusColor(app.status),
                      }}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(app.appliedAt).toLocaleDateString()}
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

export default ApplicantsPage;