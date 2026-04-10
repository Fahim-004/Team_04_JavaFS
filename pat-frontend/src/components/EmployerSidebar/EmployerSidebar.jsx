import { Link, useLocation } from "react-router-dom";

const employerLinks = [
  { path: "/employer/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/employer/jobs" , label: "Jobs" , icon: "📃"},
  { path: "/employer/post-job", label: "Post Job", icon: "➕" },
];

const EmployerSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  return (
    <div
      className="flex flex-col flex-shrink-0"
      style={{
        width: collapsed ? "64px" : "224px",
        height: "100vh",
        background: "#0f1629",
        transition: "width 220ms ease",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center px-4 py-5"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          minHeight: "68px",
        }}
      >
        {!collapsed && (
          <Link
            to="/employer/dashboard"
            className="text-lg font-semibold"
            style={{ color: "#6c8af7" }}
          >
            PAT Employer
          </Link>
        )}

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "white",
          }}
        >
          ☰
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 py-4 px-2">
        {employerLinks.map((link) => {
          const isActive = 
            location.pathname === link.path ||
            location.pathname.startsWith(link.path + "/");

          return (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center rounded-lg mb-1 text-sm"
              style={{
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: collapsed ? "0" : "12px",
                background: isActive ? "rgba(108,138,247,0.18)" : "transparent",
                color: isActive ? "#6c8af7" : "rgba(255,255,255,0.6)",
              }}
            >
              <span>{link.icon}</span>
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default EmployerSidebar;