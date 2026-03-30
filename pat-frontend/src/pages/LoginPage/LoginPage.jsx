import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Invalid email or password.");
      return;
    }

    login(data.token, data.role, data.userId);

    navigate("/dashboard");

  } catch (err) {
    setError("Unable to connect to server. Please try again.");
  } finally {
    setLoading(false);
  }
};
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

      {/* Left Branding */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Placement Automation Tool</h1>
          <p className="text-lg">Manage placement drives, upload resumes, and track applications in one platform.</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;