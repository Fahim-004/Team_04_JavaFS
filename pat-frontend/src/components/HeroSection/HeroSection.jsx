import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      style={{
        padding: "60px",
        textAlign: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Placement Automation Tool
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        A smart platform for students to track placement drives, apply for
        companies, and manage their placement journey easily.
      </p>

      <Link to="/login">
        <button style={{ padding: "10px 20px", marginRight: "15px" }}>
          Login
        </button>
      </Link>

      <Link to="/register">
        <button style={{ padding: "10px 20px" }}>
          Register
        </button>
      </Link>
    </div>
  );
};

export default HeroSection;