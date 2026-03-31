const DashboardNavbar = ({ title }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const userName = localStorage.getItem("userName") || "Student";

  return (
    <div
      className="flex items-center justify-between px-8 py-4"
      style={{ background: "#ffffff", borderBottom: "1px solid #e5e7f0" }}
    >
      <span className="text-sm font-medium" style={{ color: "#9ca3af" }}>
        {title || "Dashboard"}
      </span>
      <span className="text-sm" style={{ color: "#6b7280" }}>
        {getGreeting()},{" "}
        <span className="font-semibold" style={{ color: "#111827" }}>{userName}</span> 👋
      </span>
    </div>
  );
};

export default DashboardNavbar;
