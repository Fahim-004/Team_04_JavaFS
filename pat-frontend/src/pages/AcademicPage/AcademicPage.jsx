import DashboardLayout from "../../layouts/DashboardLayout";

const AcademicPage = () => {
  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Academic Details
      </h1>

      <div className="bg-white p-6 rounded shadow max-w-xl">

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="10th Percentage"
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="12th Percentage"
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Current CGPA"
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Branch"
            className="border p-2 rounded"
          />

        </div>

      </div>

    </DashboardLayout>
  );
};

export default AcademicPage;