import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyApplications } from "../../services/api";

// const STATUS_STYLES = {
//   Applied:     { background: "#eff6ff", color: "#1d4ed8" },
//   Shortlisted: { background: "#fefce8", color: "#92400e" },
//   Selected:    { background: "#f0fdf4", color: "#166534" },
//   Rejected:    { background: "#fef2f2", color: "#991b1b" },
// };

const STATUS_STYLES = {
  Applied: { background: "#eff6ff", color: "#1d4ed8" },
  Shortlisted: { background: "#fefce8", color: "#92400e" },
  Selected: { background: "#f0fdf4", color: "#166534" },
  Rejected: { background: "#fef2f2", color: "#991b1b" },
};

const normalizeStatus = (status) => {
  if (!status) return "Applied";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

const StatusBadge = ({ status }) => {
  const normalized = normalizeStatus(status);
  const style = STATUS_STYLES[normalized] || STATUS_STYLES["Applied"];

  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={style}
    >
      {normalized}
    </span>
  );
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
};

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyApplications()
      .then((res) => setApplications(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="My Applications">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>Dashboard / My Applications</p>
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>My Applications</h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Track all your job applications and their current status.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid #e5e7f0", maxWidth: "780px" }}>

        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4"
          style={{ borderBottom: "1px solid #e5e7f0", background: "#fafbff" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#eef2fe", fontSize: "14px" }}>
            📋
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>Application History</p>
            <p className="text-xs" style={{ color: "#9ca3af" }}>
              {applications.length} application{applications.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          {loading ? (
            <p className="text-center py-12 text-sm" style={{ color: "#9ca3af" }}>
              Loading your applications...
            </p>
          ) : applications.length === 0 ? (
            <p className="text-center py-12 text-sm" style={{ color: "#9ca3af" }}>
              You have not applied for any jobs yet.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {applications.map((app) => (
                <div
                  key={app.applicationId}
                  className="rounded-xl px-5 py-4"
                  style={{ border: "1px solid #e5e7f0", background: "#fafbff" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                        {app.job?.jobTitle || "—"}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                        {app.job?.employer?.companyName || "—"}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                        💰 {app.job?.salaryPackage || "—"}
                      </p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-xs mt-3" style={{ color: "#9ca3af" }}>
                    Applied on {formatDate(app.appliedAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </DashboardLayout>
  );
};

export default MyApplicationsPage;