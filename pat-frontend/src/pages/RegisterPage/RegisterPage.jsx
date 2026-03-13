import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

      {/* Left Branding Section */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Placement Automation Tool
          </h1>

          <p className="text-lg">
            Create your profile, upload your resume, and apply for placement drives easily.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6">
            Student Registration
          </h2>

          <form>

            <div className="mb-4">
              <label className="block mb-2 font-medium">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default RegisterPage;