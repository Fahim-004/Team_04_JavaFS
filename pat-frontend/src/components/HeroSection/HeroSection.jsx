import { Link } from "react-router-dom";
import dashboard from "../../assets/dashboard-preview.png";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-8">

        {/* LEFT SIDE TEXT */}
        <div>

          <h1 className="text-5xl font-bold text-slate-800 leading-tight">
            Placement Automation Tool
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Automate and manage the entire campus placement process in one platform.
            Students can create profiles, track placement drives, upload resumes
            and monitor their application progress.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Login
            </Link>

          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center">

          <img
            src={dashboard}
            alt="Dashboard preview"
            className="rounded-xl shadow-xl w-full max-w-lg hover:scale-105 transition duration-300 cursor-pointer"
          />

        </div>

      </div>

    </section>
  );
};

export default HeroSection;