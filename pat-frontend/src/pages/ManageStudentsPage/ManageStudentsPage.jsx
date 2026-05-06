import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAdminStudents } from "../../services/api";
import { handleApiError } from "../../utils/handleApiError";

const ManageStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminStudents()
      .then((res) => setStudents(res.data || []))
      .catch((error) => setError(handleApiError(error)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="View Students">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
          Admin / Students
        </p>
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>
          Students List
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          View all registered students.
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ background: "#fef2f2", color: "#991b1b" }}>
          {error}
        </div>
      ) : null}

      {/* Card */}
      <div
        className="rounded-2xl"
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7f0",
          padding: "20px",
        }}
      >
        {loading ? (
          <p
            className="text-center py-12 text-sm"
            style={{ color: "#9ca3af" }}
          >
            Loading students...
          </p>
        ) : students.length === 0 ? (
          <p
            className="text-center py-12 text-sm"
            style={{ color: "#9ca3af" }}
          >
            No students registered yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr
                  style={{
                    textAlign: "left",
                    borderBottom: "1px solid #e5e7eb",
                    color: "#6b7280",
                  }}
                >
                  <th style={{ padding: "10px" }}>Full Name</th>
                  <th style={{ padding: "10px" }}>USN</th>
                  <th style={{ padding: "10px" }}>Branch</th>
                  <th style={{ padding: "10px" }}>CGPA</th>
                  <th style={{ padding: "10px" }}>Passing Year</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.studentId}
                    style={{
                      borderBottom: "1px solid #f0f2f8",
                    }}
                  >
                    <td style={{ padding: "10px", color: "#111827" }}>
                      {student.fullName}
                    </td>

                    <td style={{ padding: "10px", color: "#374151" }}>
                      {student.usn}
                    </td>

                    <td style={{ padding: "10px", color: "#374151" }}>
                      {student.branch}
                    </td>

                    <td style={{ padding: "10px", color: "#374151" }}>
                      {student.cgpa}
                    </td>

                    <td style={{ padding: "10px", color: "#374151" }}>
                      {student.passingYear}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageStudentsPage;