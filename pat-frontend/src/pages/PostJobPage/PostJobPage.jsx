import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getJobById, getEmployerProfile, postJob, updateJob } from "../../services/api";
import { isEmployerProfileComplete } from "../../utils/ProfileUtils";

const PostJobPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editJobId = location.state?.jobId;
  const [isApproved, setIsApproved] = useState(true);
  const [isEditMode, setIsEditMode] = useState(Boolean(editJobId));
  useEffect(() => {
  const checkProfile = async () => {
    try {
      const res = await getEmployerProfile();
      const profile = res.data;

      const isComplete = isEmployerProfileComplete(profile);

      if (!isComplete) {
      alert("Please complete your profile before posting a job.");
      navigate("/employer/profile");
      return;
      }
setIsApproved(profile.approvedStatus);

    } catch (err) {
      // API failure = treat as incomplete
      alert("Please complete your profile before posting a job.");
      navigate("/employer/profile");
    }
  };

  checkProfile();
}, []);

  useEffect(() => {
    if (!editJobId) return;

    const loadJob = async () => {
      try {
        const res = await getJobById(editJobId);
        const job = res.data;
        setIsEditMode(true);
        setFormData({
          jobTitle: job.jobTitle || "",
          salaryPackage: job.salaryPackage || "",
          applicationDeadline: job.applicationDeadline || "",
          placementDriveDate: job.placementDriveDate || "",
          jobDescription: job.jobDescription || "",
          jobLocation: job.jobLocation || "",
          minCgpa: job.minCgpa ?? "",
          eligibleBranches: job.eligibleBranches || "",
          maxBacklogs: job.maxBacklogs ?? "",
          passingYear: job.passingYear ?? "",
        });
      } catch (err) {
        setBannerError(err.response?.data?.error || "Failed to load job for editing");
      }
    };

    loadJob();
  }, [editJobId]);

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

  const [errors, setErrors] = useState({});
  const [bannerError, setBannerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setBannerError("");
    setLoading(true);

    try {
      if (isEditMode) {
        await updateJob(editJobId, formData);
      } else {
        await postJob(formData);
      }

      alert(isEditMode ? "Job updated successfully!" : "Job posted successfully!");

      navigate("/employer/dashboard");

    } catch (err) {

      const data = err.response?.data;

      if (data?.error) {
        setBannerError(data.error);
      }

      if (typeof data === "object") {
        setErrors(data);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title={isEditMode ? "Edit Job" : "Post Job"}>

      <div className="max-w-5xl">

        {/* Banner error */}
        {bannerError && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {bannerError}
          </div>
        )}
        {/* Approval status banner */}
        {!isApproved && (
           <div className="mb-4 p-3 rounded-lg bg-yellow-100 text-yellow-800 text-sm">
                 Your account is pending admin approval. You cannot post jobs until approved.
             </div>
            )}

        <div
          className="p-6 rounded-xl"
          style={{ background: "#fff", border: "1px solid #e5e7f0" }}
        >

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* BASIC INFO */}
            <div>
              <h2 className="text-sm font-semibold mb-4 text-gray-700">
                Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium">
                    Job Title *
                  </label>

                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />

                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.jobTitle}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Salary Package *
                  </label>

                  <input
                    type="text"
                    name="salaryPackage"
                    value={formData.salaryPackage}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />

                  {errors.salaryPackage && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salaryPackage}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* DATES */}
            <div>
              <h2 className="text-sm font-semibold mb-4 text-gray-700">
                Important Dates
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium">
                    Application Deadline *
                  </label>

                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Placement Drive Date *
                  </label>

                  <input
                    type="date"
                    name="placementDriveDate"
                    value={formData.placementDriveDate}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

              </div>
            </div>

            {/* JOB DETAILS */}
            <div>
              <h2 className="text-sm font-semibold mb-4 text-gray-700">
                Job Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium">
                    Job Location
                  </label>

                  <input
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Minimum CGPA
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    name="minCgpa"
                    value={formData.minCgpa}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Eligible Branches
                  </label>

                  <input
                    type="text"
                    name="eligibleBranches"
                    value={formData.eligibleBranches}
                    onChange={handleChange}
                    placeholder="CSE, ISE"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Max Backlogs
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="maxBacklogs"
                    value={formData.maxBacklogs}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Passing Year
                  </label>

                  <input
                    type="number"
                    name="passingYear"
                    value={formData.passingYear}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

              </div>

              <div className="mt-4">
                <label className="text-sm font-medium">
                  Job Description
                </label>

                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !isApproved}
                className="px-6 py-2 rounded-lg text-white"
                style={{ background: "#4c7ef0" }}
              >
                {loading ? (isEditMode ? "Updating..." : "Posting...") : (isEditMode ? "Update Job" : "Post Job")}
              </button>
            </div>

          </form>

        </div>
      </div>

    </DashboardLayout>
  );
};

export default PostJobPage;