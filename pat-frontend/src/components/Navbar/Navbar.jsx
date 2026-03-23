import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "15px", background: "#1f2937", color: "white" }}>
      
      <h2 style={{ display: "inline", marginRight: "30px" }}>
        Placement Portal
      </h2>

      <Link to="/" style={{ marginRight: "15px", color: "white" }}>
        Home
      </Link>

      <Link to="/login" style={{ marginRight: "15px", color: "white" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "white" }}>
        Register
      </Link>

    </nav>
  );
};

export default Navbar;