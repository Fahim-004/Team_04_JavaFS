const DashboardNavbar = ({ title }) => {

  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const userName = profile.name || "Student";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <h2 className="text-lg font-semibold text-gray-700">
        {title || "Dashboard"}
      </h2>
      <div className="text-sm text-gray-500">
        {getGreeting()},{" "}
        <span className="font-medium text-gray-700">{userName}</span> 👋
      </div>
    </div>
  );
};

export default DashboardNavbar;