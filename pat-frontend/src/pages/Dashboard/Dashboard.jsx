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

  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const userName = profile.name || "Student";

  const stats = [
    { label: "Available Drives", value: "6", color: "text-blue-600" },
    { label: "My Applications", value: "3", color: "text-green-600" },
    { label: "Upcoming Interviews", value: "1", color: "text-purple-600" },
  ];

  const quickLinks = [
    { label: "Browse Placement Drives", path: "/drives", icon: "🏢", desc: "View and apply to open drives" },
    { label: "My Applications", path: "/applications", icon: "📋", desc: "Track your application status" },
    { label: "Update Academic Details", path: "/academic", icon: "🎓", desc: "Keep your academic info updated" },
    { label: "Upload Resume", path: "/resume", icon: "📄", desc: "Upload or update your resume" },
    { label: "Edit Profile", path: "/profile", icon: "👤", desc: "Update your personal details" },
  ];

  return (
    <DashboardLayout title="Dashboard">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName} 👋</h1>
        <p className="text-gray-500 mt-1 text-sm">Here's a summary of your placement activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">{stat.label}</h3>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link, i) => (
          <Link key={i} to={link.path}
            className="bg-white p-5 rounded-lg shadow hover:shadow-md hover:border-blue-400 border border-transparent transition flex items-start gap-4">
            <span className="text-2xl">{link.icon}</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">{link.label}</p>
              <p className="text-xs text-gray-400 mt-1">{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;