import React from "react";

const StatCard = ({ label, value, color = "#4c7ef0" }) => {
  return (
    <div
      className="rounded-2xl"
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7f0",
        borderLeft: `6px solid ${color}`,
        padding: "18px 20px",
        minWidth: "180px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Value */}
      <h2
        style={{
          fontSize: "26px",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "4px",
        }}
      >
        {value ?? 0}
      </h2>

      {/* Label */}
      <p
        style={{
          fontSize: "13px",
          color: "#6b7280",
        }}
      >
        {label}
      </p>
    </div>
  );
};

export default StatCard;