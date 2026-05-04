import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getDashboardStats } from "../../services/api";

const quickLinks = [
  { label: "Browse Placement Drives", path: "/jobs",         icon: "🏢", desc: "View and apply to open drives",     bg: "#eef2fe" },
  { label: "My Applications",         path: "/my-applications", icon: "📋", desc: "Track your application status",     bg: "#eaf3de" },
  { label: "Academic Details",        path: "/academic",     icon: "🎓", desc: "Keep your academic info updated",   bg: "#faeeda" },
  { label: "Upload Resume",           path: "/resume",       icon: "📄", desc: "Upload or update your resume",     bg: "#eeedfe" },
  { label: "Edit Profile",            path: "/profile",      icon: "👤", desc: "Update your personal details",     bg: "#faece7" },
];

const Dashboard = () => {
  const userName = localStorage.getItem("userName") ?? "Student";
  const [stats, setStats] = useState({ availableDrives: 0, myApplications: 0, upcomingInterviews: 0 });

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => {}); // silently fall back to 0s
  }, []);

  const statCards = [
    { label: "Available drives",    value: stats.availableDrives,    sub: "Open positions",  color: "#4c7ef0" },
    { label: "My applications",     value: stats.myApplications,     sub: "Total applied",   color: "#22a06b" },
    { label: "Upcoming interviews", value: stats.upcomingInterviews, sub: "Scheduled",       color: "#d97706" },
  ];

  return (
    <DashboardLayout title="Dashboard">

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "#111827" }}>
          Welcome back, {userName} 👋
        </h1>
        <p className="text-sm" style={{ color: "#6b7280" }}>
          Here's a summary of your placement activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((s) => (
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

      {/* Quick actions */}
      <p className="text-xs uppercase tracking-wide font-medium mb-3" style={{ color: "#9ca3af" }}>
        Quick actions
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center gap-4 rounded-xl p-4 transition-all duration-150"
            style={{ background: "#fff", border: "1px solid #e5e7f0", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c7d2fe")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7f0")}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: link.bg, fontSize: "18px" }}
            >
              {link.icon}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "#111827" }}>{link.label}</p>
              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;
