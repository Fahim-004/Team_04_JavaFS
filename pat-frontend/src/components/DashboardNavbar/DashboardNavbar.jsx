const DashboardNavbar = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow">

      <h2 className="text-xl font-semibold">
        Student Portal
      </h2>

      <div className="flex items-center space-x-4">

        <span className="text-gray-600">
          Welcome, Student
        </span>

        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>

      </div>

    </div>
  );
};

export default DashboardNavbar;