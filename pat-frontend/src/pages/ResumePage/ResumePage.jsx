import DashboardLayout from "../../layouts/DashboardLayout";
import { useState } from "react";

const ResumePage = () => {

  const [fileName, setFileName] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    localStorage.setItem("resume", file.name);
    setFileName(file.name);
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Upload Resume
      </h1>

      <div className="bg-white p-6 rounded shadow max-w-md">

        <input
          type="file"
          onChange={handleUpload}
          className="mb-4"
        />

        {fileName && (
          <p className="text-green-600">
            Uploaded: {fileName}
          </p>
        )}

      </div>

    </DashboardLayout>
  );
};

export default ResumePage;