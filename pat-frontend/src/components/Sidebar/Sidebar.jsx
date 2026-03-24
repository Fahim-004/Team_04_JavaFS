import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  { path: "/dashboard", label: "Dashboard", icon: "🏠" },
  { path: "/drives", label: "Placement Drives", icon: "🏢" },
  { path: "/applications", label: "My Applications", icon: "📋" },
  { path: "/academic", label: "Academic Details", icon: "🎓" },
  { path: "/resume", label: "Resume", icon: "📄" },
  { path: "/profile", label: "Profile", icon: "👤" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-white border-r w-64 min-h-screen">

      {/* Logo */}
      <div className="px-6 py-5 border-b">
        <h1 className="text-xl font-bold text-blue-600">PAT</h1>
        <p className="text-xs text-gray-400">Placement Automation Tool</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
                ${isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full transition"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;