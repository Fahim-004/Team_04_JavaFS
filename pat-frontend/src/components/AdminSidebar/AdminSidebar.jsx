import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { label: "Employers", path: "/admin/employers", icon: "🏢" },
    { label: "Students", path: "/admin/students", icon: "🎓" },
  ];

  return (
    <div
      style={{
        width: collapsed ? "80px" : "220px",
        background: "#ffffff",
        borderRight: "1px solid #e5e7f0",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px",
          borderBottom: "1px solid #e5e7f0",
          fontWeight: "600",
          fontSize: "16px",
          color: "#111827",
        }}
      >
        {collapsed ? "PAT" : "Admin Panel"}
      </div>

      {/* Menu */}
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "10px",
                cursor: "pointer",
                background: active ? "#eef2fe" : "transparent",
                color: active ? "#4c7ef0" : "#374151",
                fontSize: "14px",
                fontWeight: active ? "500" : "400",
              }}
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          );
        })}
      </div>

      {/* Collapse Button */}
      <div style={{ marginTop: "auto", padding: "12px" }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "100%",
            height: "36px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;