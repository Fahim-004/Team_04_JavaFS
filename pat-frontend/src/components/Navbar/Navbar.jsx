import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav

      className="flex justify-between items-center px-10 py-5 bg-white shadow-sm"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 60px",
        backgroundColor: "#0F172A",
        color: "white",
        fontWeight: "500",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
        Placement Automation Tool
      </h2>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          Home
        </Link>

        <Link style={{ color: "white", textDecoration: "none" }} to="/login">
          Login
        </Link>

        <Link
          to="/register"
          style={{
            backgroundColor: "#2563EB",
            padding: "8px 16px",
            borderRadius: "6px",
            color: "white",
            textDecoration: "none",
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;