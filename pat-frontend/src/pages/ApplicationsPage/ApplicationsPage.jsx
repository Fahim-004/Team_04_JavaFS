import DashboardLayout from "../../layouts/DashboardLayout";

const ApplicationsPage = () => {

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (

        <div className="bg-white p-6 rounded shadow text-gray-500">
          No applications yet. Go to Placement Drives and apply.
        </div>

      ) : (

        <div className="bg-white p-6 rounded shadow">

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Company</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {applications.map((app, index) => (

                <tr key={index} className="border-b">

                  <td className="py-2">{app.company}</td>

                  <td>{app.role}</td>

                  <td>

                    <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                      {app.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </DashboardLayout>
  );
};

export default ApplicationsPage;