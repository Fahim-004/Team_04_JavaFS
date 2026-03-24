import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "",
    email: "", password: "", confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { firstName, lastName, phone, email, password, confirmPassword } = form;

    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      navigate("/login");

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
          <p className="text-lg">Create your profile, upload your resume, and apply for placement drives easily.</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center bg-gray-100 min-h-screen py-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6">Student Registration</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>

            <div className="mb-4">
              <label className="block mb-2 font-medium">First Name</label>
              <input type="text" name="firstName" placeholder="Enter first name"
                value={form.firstName} onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Last Name</label>
              <input type="text" name="lastName" placeholder="Enter last name"
                value={form.lastName} onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Phone Number</label>
              <input type="tel" name="phone" placeholder="Enter phone number"
                value={form.phone} onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>
              <input type="email" name="email" placeholder="Enter email"
                value={form.email} onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Password</label>
              <input type="password" name="password" placeholder="Enter password"
                value={form.password} onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm password"
                value={form.confirmPassword} onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60">
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default RegisterPage;