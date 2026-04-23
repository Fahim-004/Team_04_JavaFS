import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAdminStatistics } from "../../services/api";
import StatCard from "../../components/StatCard/StatCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getAdminStatistics()
      .then((res) => {
        setStats(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
          Dashboard / Admin
        </p>
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>
          Admin Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Monitor platform activity and manage users.
        </p>
      </div>

      {/* Content Card */}
      <div
        className="rounded-2xl"
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7f0",
          padding: "24px",
        }}
      >
        {loading ? (
          <p
            className="text-center py-12 text-sm"
            style={{ color: "#9ca3af" }}
          >
            Loading statistics...
          </p>
        ) : (
          <>
            {/* Stat Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "28px",
              }}
            >
              <StatCard
                label="Total Students"
                value={stats?.totalStudents}
                color="#4c7ef0"
              />

              <StatCard
                label="Total Employers"
                value={stats?.totalEmployers}
                color="#10b981"
              />

              <StatCard
                label="Total Jobs"
                value={stats?.totalJobs}
                color="#8b5cf6"
              />

              <StatCard
                label="Total Applications"
                value={stats?.totalApplications}
                color="#f59e0b"
              />

              <StatCard
                label="Total Selected"
                value={stats?.totalSelected}
                color="#059669"
              />
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate("/admin/employers")}
                className="h-10 px-5 text-sm rounded-lg font-medium text-white"
                style={{
                  background: "#4c7ef0",
                  border: "none",
                }}
              >
                Manage Employers
              </button>

              <button
                onClick={() => navigate("/admin/students")}
                className="h-10 px-5 text-sm rounded-lg font-medium"
                style={{
                  background: "#ffffff",
                  border: "1px solid #d1d5db",
                  color: "#374151",
                }}
              >
                View Students
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;