import DashboardLayout from "../../layouts/DashboardLayout";
import { useState } from "react";
import { postJob } from "../../services/api";
import { useNavigate } from "react-router-dom";

const PostJobPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
    salaryPackage: "",
    applicationDeadline: "",
    placementDriveDate: "",
    jobDescription: "",
    jobLocation: "",
    minCgpa: "",
    eligibleBranches: "",
    maxBacklogs: "",
    passingYear: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await postJob(formData);
      alert("Job posted successfully!");
      navigate("/employer/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Post New Job</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">

          <input
            name="jobTitle"
            placeholder="Job Title *"
            value={formData.jobTitle}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            name="salaryPackage"
            placeholder="Salary Package *"
            value={formData.salaryPackage}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="date"
            name="placementDriveDate"
            value={formData.placementDriveDate}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <textarea
            name="jobDescription"
            placeholder="Job Description"
            value={formData.jobDescription}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="jobLocation"
            placeholder="Job Location"
            value={formData.jobLocation}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="minCgpa"
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="Minimum CGPA"
            value={formData.minCgpa}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="eligibleBranches"
            placeholder="Eligible Branches (comma separated)"
            value={formData.eligibleBranches}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="maxBacklogs"
            type="number"
            min="0"
            placeholder="Max Backlogs"
            value={formData.maxBacklogs}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="passingYear"
            type="number"
            placeholder="Passing Year"
            value={formData.passingYear}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>

        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostJobPage;