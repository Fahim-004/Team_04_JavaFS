import DashboardLayout from "../../layouts/DashboardLayout";
import { useState} from "react";
import { uploadResume } from "../../services/api";

const ResumePage = () => {

 const [selectedFile, setSelectedFile] = useState(null);
const [resumeData, setResumeData] = useState(null);
const [loading, setLoading] = useState(false);

const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) {
    alert("Please select a file");
    return;
  }

  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed");
    return;
  }

  setSelectedFile(file);
};

const handleUploadResume = async () => {
  if (!selectedFile) {
    alert("Please select a resume");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("file", selectedFile);

    const response = await uploadResume(formData);

    setResumeData(response.data);

    alert("Resume uploaded successfully");
  } catch (err) {
    alert(
      err.response?.data?.error || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};
  
  return (
    <DashboardLayout title="Resume">

      <h1 className="text-3xl font-bold mb-6">Resume</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-xl">

        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6">
          <p className="text-gray-500 mb-3 text-sm">Upload your resume in PDF</p>
          <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-sm">
            Choose PDF File
            <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
          </label>
          <button
  onClick={handleUploadResume}
  className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition text-sm"
>
  {loading ? "Uploading..." : "Upload Resume"}
</button>
        </div>
        {resumeData ? (
  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">

    <div className="flex items-center gap-3">

      <span className="text-2xl">📄</span>

      <div>
        <p className="font-medium text-gray-700 text-sm">
          {resumeData.fileName}
        </p>

        <p className="text-xs text-gray-400">
          Uploaded successfully
        </p>
      </div>

    </div>

    <button
      onClick={() =>
        window.open(
          `http://localhost:8080${resumeData.resumeUrl}`,
          "_blank"
        )
      }
      className="text-blue-600 underline text-sm"
    >
      View Resume
    </button>

  </div>
) : (
  <p className="text-sm text-gray-400 text-center">
    No resume uploaded yet.
  </p>
)}
        

      </div>

    </DashboardLayout>
  );
};

export default ResumePage;