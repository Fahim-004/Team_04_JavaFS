import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/dashboard",        label: "Dashboard",        icon: "⬛" },
  { path: "/jobs",             label: "Placement Drives", icon: "🏢" },
  { path: "/my-applications",  label: "My Applications",  icon: "📋" },
  { path: "/academic",         label: "Academic Details", icon: "🎓" },
  { path: "/resume",           label: "Resume",           icon: "📄" },
  { path: "/profile",          label: "Profile",          icon: "👤" },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location  = useLocation();
 
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="flex flex-col flex-shrink-0"
      style={{
        width:            collapsed ? "64px" : "224px",
        height:           "100vh",
        background:       "#0f1629",
        transition:       "width 220ms ease",
        overflow:         "hidden",
        position:         "relative",
      }}
    >
      {/* ── Logo + hamburger ── */}
      <div
        className="flex items-center px-4 py-5 flex-shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          minHeight:    "68px",
          gap:          "10px",
        }}
      >
        {/* Logo — hidden when collapsed */}
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <Link to="/dashboard" className="text-lg font-semibold cursor-pointer" style={{ color: "#6c8af7", whiteSpace: "nowrap" }}>
              PAT
            </Link>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
              Placement Automation Tool
            </p>
          </div>
        )}

        {/* Hamburger toggle */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            background:  "transparent",
            border:      "none",
            cursor:      "pointer",
            padding:     "6px",
            borderRadius:"6px",
            display:     "flex",
            flexDirection:"column",
            gap:         "4px",
            flexShrink:  0,
            marginLeft:  collapsed ? "auto" : "0",
            marginRight: collapsed ? "auto" : "0",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          {/* Three lines */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display:      "block",
                width:        "18px",
                height:       "2px",
                background:   "rgba(255,255,255,0.5)",
                borderRadius: "2px",
              }}
            />
          ))}
        </button>
      </div>

      {/* ── Nav links ── */}
      <nav className="flex-1 py-4" style={{ paddingLeft: "8px", paddingRight: "8px", overflow: "hidden" }}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path
            || (link.path === "/jobs" && location.pathname.startsWith("/jobs"));

          return (
            <div key={link.path} style={{ position: "relative" }} className="group">
              <Link
                to={link.path}
                className="flex items-center rounded-lg mb-0.5 text-sm transition-all duration-150"
                style={{
                  gap:        collapsed ? "0" : "12px",
                  padding:    collapsed ? "10px 0" : "10px 12px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: isActive ? "rgba(108,138,247,0.18)" : "transparent",
                  color:      isActive ? "#6c8af7" : "rgba(255,255,255,0.45)",
                  fontWeight: isActive ? "500" : "400",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color      = "rgba(255,255,255,0.8)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color      = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span style={{ fontSize: "15px", flexShrink: 0, width: "20px", textAlign: "center" }}>
                  {link.icon}
                </span>
                {!collapsed && <span>{link.label}</span>}
              </Link>

              {/* Tooltip — only visible when collapsed */}
              {collapsed && (
                <div
                  style={{
                    position:     "absolute",
                    left:         "72px",
                    top:          "50%",
                    transform:    "translateY(-50%)",
                    background:   "#1e2a45",
                    color:        "#e5e9f7",
                    fontSize:     "12px",
                    padding:      "5px 10px",
                    borderRadius: "6px",
                    whiteSpace:   "nowrap",
                    pointerEvents:"none",
                    opacity:      0,
                    transition:   "opacity 120ms ease",
                    zIndex:       50,
                    border:       "1px solid rgba(108,138,247,0.25)",
                  }}
                  className="sidebar-tooltip"
                >
                  {link.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      
      {/* Tooltip hover CSS — injected once */}
      <style>{`
        .group:hover .sidebar-tooltip { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default Sidebar;