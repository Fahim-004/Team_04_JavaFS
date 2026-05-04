import DashboardLayout from "../../layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Available Drives</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">My Applications</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">3</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Upcoming Interviews</h3>
          <p className="text-3xl font-bold mt-2 text-purple-600">1</p>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;