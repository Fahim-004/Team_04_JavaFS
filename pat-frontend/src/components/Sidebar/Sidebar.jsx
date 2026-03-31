import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  { path: "/dashboard",    label: "Dashboard",        icon: "⬛" },
  { path: "/drives",       label: "Placement Drives", icon: "🏢" },
  { path: "/applications", label: "My Applications",  icon: "📋" },
  { path: "/academic",     label: "Academic Details", icon: "🎓" },
  { path: "/resume",       label: "Resume",           icon: "📄" },
  { path: "/profile",      label: "Profile",          icon: "👤" },
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
    <div
      className="flex flex-col min-h-screen flex-shrink-0"
      style={{ width: "224px", background: "#0f1629" }}
    >
      {/* Logo */}
      <div className="px-5 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <h1 className="text-lg font-semibold" style={{ color: "#6c8af7" }}>PAT</h1>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          Placement Automation Tool
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all duration-150"
              style={
                isActive
                  ? { background: "rgba(108,138,247,0.18)", color: "#6c8af7", fontWeight: "500" }
                  : { color: "rgba(255,255,255,0.45)" }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <span className="w-5 text-center" style={{ fontSize: "15px" }}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all"
          style={{ color: "rgba(255,255,255,0.4)", background: "transparent", border: "none" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.background = "rgba(248,113,113,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
