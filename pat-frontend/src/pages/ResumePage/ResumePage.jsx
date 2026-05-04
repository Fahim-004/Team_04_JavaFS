import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

const ResumePage = () => {

  const [resumeName, setResumeName] = useState("");
  const [uploadedAt, setUploadedAt] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("resume")) || {};
    if (saved.name) setResumeName(saved.name);
    if (saved.uploadedAt) setUploadedAt(saved.uploadedAt);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    const now = new Date().toLocaleString();
    setResumeName(file.name);
    setUploadedAt(now);
    localStorage.setItem("resume", JSON.stringify({ name: file.name, uploadedAt: now }));
  };

  const handleRemove = () => {
    setResumeName("");
    setUploadedAt("");
    localStorage.removeItem("resume");
  };

  return (
    <DashboardLayout title="Resume">

      <h1 className="text-3xl font-bold mb-6">Resume</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-xl">

        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6">
          <p className="text-gray-500 mb-3 text-sm">Upload your resume in PDF</p>
          <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-sm">
            Choose PDF File
            <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        {resumeName ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <div>
                <p className="font-medium text-gray-700 text-sm">{resumeName}</p>
                {uploadedAt && <p className="text-xs text-gray-400">Uploaded on {uploadedAt}</p>}
              </div>
            </div>
            <button onClick={handleRemove} className="text-red-500 hover:text-red-700 text-xs underline ml-4">
              Remove
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center">No resume uploaded yet.</p>
        )}

      </div>

    </DashboardLayout>
  );
};

export default ResumePage;