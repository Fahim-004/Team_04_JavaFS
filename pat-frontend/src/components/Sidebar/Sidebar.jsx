import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        Placement Portal
      </h2>

      <nav className="flex flex-col space-y-4">

        <Link to="/dashboard" className="hover:text-gray-300">
          📊 Dashboard
        </Link>

        <Link to="/profile" className="hover:text-gray-300">
          👤 Profile
        </Link>

        <Link to="/drives" className="hover:text-gray-300">
          🏢 Placement Drives
        </Link>

        <Link to="/applications" className="hover:text-gray-300">
          📄 My Applications
        </Link>

        <Link to="/resume" className="hover:text-gray-300">
          📎 Upload Resume
        </Link>

        <Link to="/academic" className="hover:text-gray-300">
          🎓 Academic Details
        </Link>

      </nav>

    </div>
  );
};

export default Sidebar;