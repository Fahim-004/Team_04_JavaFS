import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAdminEmployers,
  approveEmployer,
  removeEmployer,
} from "../../services/api";

// Toast (same pattern as ProfilePage)
const Toast = ({ toast }) => {
  if (!toast) return null;
  const ok = toast.type === "success";

  return (
    <div
      className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg"
      style={{
        background: ok ? "#ecfdf5" : "#fef2f2",
        color: ok ? "#065f46" : "#991b1b",
        border: `1px solid ${ok ? "#6ee7b7" : "#fca5a5"}`,
      }}
    >
      {ok ? "✅" : "❌"} {toast.msg}
    </div>
  );
};

const ManageEmployersPage = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getAdminEmployers()
      .then((res) => setEmployers(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = async (id) => {
    try {
      await approveEmployer(id);

      // update state locally
      setEmployers((prev) =>
        prev.map((emp) =>
          emp.employerId === id
            ? { ...emp, approvedStatus: true }
            : emp
        )
      );

      showToast("success", "Employer approved successfully!");
    } catch {
      showToast("error", "Failed to approve employer.");
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeEmployer(id);

      // remove from state
      setEmployers((prev) =>
        prev.filter((emp) => emp.employerId !== id)
      );

      showToast("success", "Employer removed successfully!");
    } catch {
      showToast("error", "Failed to remove employer.");
    }
  };

  return (
    <DashboardLayout title="Manage Employers">
      <Toast toast={toast} />

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
          Admin / Employers
        </p>
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>
          Manage Employers
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Approve or remove registered companies.
        </p>
      </div>

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
            Loading employers...
          </p>
        ) : employers.length === 0 ? (
          <p
            className="text-center py-12 text-sm"
            style={{ color: "#9ca3af" }}
          >
            No employers registered yet.
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
                  <th style={{ padding: "10px" }}>Company</th>
                  <th style={{ padding: "10px" }}>Email</th>
                  <th style={{ padding: "10px" }}>Status</th>
                  <th style={{ padding: "10px" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {employers.map((emp) => (
                  <tr
                    key={emp.employerId}
                    style={{
                      borderBottom: "1px solid #f0f2f8",
                    }}
                  >
                    <td style={{ padding: "10px", color: "#111827" }}>
                      {emp.companyName}
                    </td>

                    <td style={{ padding: "10px", color: "#374151" }}>
                      {emp.user?.email}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "10px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "500",
                          background: emp.approvedStatus
                            ? "#ecfdf5"
                            : "#fff7ed",
                          color: emp.approvedStatus
                            ? "#065f46"
                            : "#9a3412",
                          border: `1px solid ${
                            emp.approvedStatus
                              ? "#6ee7b7"
                              : "#fdba74"
                          }`,
                        }}
                      >
                        {emp.approvedStatus ? "Approved" : "Pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "10px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {!emp.approvedStatus && (
                          <button
                            onClick={() =>
                              handleApprove(emp.employerId)
                            }
                            className="h-8 px-3 text-xs rounded-lg font-medium text-white"
                            style={{
                              background: "#10b981",
                              border: "none",
                            }}
                          >
                            Approve
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleRemove(emp.employerId)
                          }
                          className="h-8 px-3 text-xs rounded-lg font-medium text-white"
                          style={{
                            background: "#ef4444",
                            border: "none",
                          }}
                        >
                          Remove
                        </button>
                      </div>
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

export default ManageEmployersPage;