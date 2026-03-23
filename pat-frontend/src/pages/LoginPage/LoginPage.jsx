import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

      {/* Left Section */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Placement Automation Tool
          </h1>

          <p className="text-lg">
            Manage placement drives, upload resumes, and track applications in one platform.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6">
            Student Login
          </h2>

          <form>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;