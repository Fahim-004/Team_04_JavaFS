import { useEffect, useState, useRef } from "react";
import { getNotifications, markNotificationRead } from "../../services/api";
import { handleApiError } from "../../utils/handleApiError";

const normalizeNotification = (notification) => ({
  ...notification,
  isRead: Boolean(notification?.isRead ?? notification?.read),
});

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  // Fetch on mount
  useEffect(() => {
    getNotifications()
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setNotifications(list.map(normalizeNotification));
        setError("");
      })
      .catch((error) => {
        setNotifications([]);
        setError(error.message || handleApiError(error));
      });
  }, []);

  // Close dropdown on outside click (production UX)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);

      // ✅ NO refetch — local update
      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationId === id ? { ...n, isRead: true, read: true } : n
        )
      );
      setError("");
    } catch (error) {
      setError(error.message || handleApiError(error));
    }
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      
      {/* Bell Icon */}
      <div
        onClick={() => setOpen(prev => !prev)}
        style={{
          position: "relative",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        🔔

        {/* Badge */}
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-8px",
              background: "#ef4444",
              color: "#fff",
              borderRadius: "999px",
              fontSize: "10px",
              padding: "2px 6px",
              fontWeight: "600",
            }}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "10px",
            width: "320px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            zIndex: 50,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #f0f2f8",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827",
            }}
          >
            Notifications
          </div>

          {error ? (
            <div style={{ padding: "12px 16px", color: "#991b1b", background: "#fef2f2", fontSize: "12px" }}>
              {error}
            </div>
          ) : null}

          {/* List */}
          {notifications.length === 0 ? (
            <p
              style={{
                padding: "16px",
                fontSize: "13px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              No notifications yet.
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.notificationId}
                onClick={() => !n.isRead && handleMarkRead(n.notificationId)}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f9fafb",
                  cursor: "pointer",
                  background: n.isRead ? "#fff" : "#f0f6ff",
                  borderLeft: n.isRead ? "none" : "3px solid #3b82f6",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: n.isRead ? "400" : "600",
                    color: "#111827",
                    marginBottom: "4px",
                  }}
                >
                  {n.message}
                </p>

                <p
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                  }}
                >
                  {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;