import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NotificationBell from "../NotificationBell/NotificationBell";

const DashboardNavbar = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef  = useRef(null);
  const navigate     = useNavigate();
  const { logout }   = useContext(AuthContext);

  const userName = localStorage.getItem("userName") || "Student";
  // it converts Uppercase to lower case
  const role = (localStorage.getItem("role") || "student").toLowerCase();
  // just in case
  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : "User";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Initials avatar — first letter of name
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div
      className="flex items-center justify-between flex-shrink-0"
      style={{
        background:   "#ffffff",
        borderBottom: "1px solid #e5e7f0",
        padding:      "0 32px",
        height:       "60px",
      }}
    >
      {/* Left — page title / breadcrumb */}
      <span className="text-sm font-medium" style={{ color: "#9ca3af" }}>
        {title || "Dashboard"}
      </span>

      {/* Right — welcome text + avatar */}
      <div className="flex items-center gap-4">

        {/* 🔔 Notification Bell */}
        <NotificationBell />
        

        {/* Avatar + dropdown */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            title="Account menu"
            style={{
              width:        "36px",
              height:       "36px",
              borderRadius: "50%",
              background:   "#4c7ef0",
              border:       "2px solid #e5e7f0",
              color:        "#ffffff",
              fontSize:     "14px",
              fontWeight:   "600",
              cursor:       "pointer",
              display:      "flex",
              alignItems:   "center",
              justifyContent:"center",
              transition:   "border-color 150ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4c7ef0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7f0"; }}
          >
            {initial}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              style={{
                position:     "absolute",
                right:        "0",
                top:          "calc(100% + 8px)",
                background:   "#ffffff",
                border:       "1px solid #e5e7f0",
                borderRadius: "10px",
                boxShadow:    "0 4px 16px rgba(0,0,0,0.10)",
                minWidth:     "180px",
                zIndex:       100,
                overflow:     "hidden",
              }}
            >
              {/* User info header */}
              <div
                style={{
                  padding:      "12px 16px",
                  borderBottom: "1px solid #f3f4f6",
                  background:   "#f9fafb",
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "#111827", margin: 0 }}>
                  {userName}
                </p>
                <p className="text-xs" style={{ color: "#9ca3af", margin: "2px 0 0" }}>
                  {displayRole}
                </p>
              </div>

              {/* View Profile */}
              <button
                onClick={() => {
                      setDropdownOpen(false);

                      if (role === "employer") {
                        navigate("/employer/profile");
                      } else {
                        navigate("/profile");
                      }
                    }}
                className="w-full flex items-center gap-3 text-sm"
                style={{
                  padding:    "10px 16px",
                  background: "transparent",
                  border:     "none",
                  cursor:     "pointer",
                  color:      "#374151",
                  textAlign:  "left",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "14px" }}>👤</span>
                <span>View Profile</span>
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/change-password");
                }}
                className="w-full flex items-center gap-3 text-sm"
                style={{
                  padding:    "10px 16px",
                  background: "transparent",
                  border:     "none",
                  cursor:     "pointer",
                  color:      "#374151",
                  textAlign:  "left",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "14px" }}>🔑</span>
                <span>Change Password</span>
              </button>

              {/* Divider */}
              <div style={{ height: "1px", background: "#f3f4f6" }} />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 text-sm"
                style={{
                  padding:    "10px 16px",
                  background: "transparent",
                  border:     "none",
                  cursor:     "pointer",
                  color:      "#ef4444",
                  textAlign:  "left",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "14px" }}>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;