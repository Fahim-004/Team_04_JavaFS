import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getJobById, getStudentResumes, applyForJob } from "../../services/api";
import { handleApiError } from "../../utils/handleApiError";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
};

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide mb-1"
      style={{ color: "#9ca3af" }}>{label}</p>
    <p className="text-sm" style={{ color: "#111827" }}>{value || "—"}</p>
  </div>
);

const Toast = ({ toast }) => {
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <div
      className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg"
      style={{
        background: ok ? "#ecfdf5" : "#fef2f2",
        color: ok ? "#065f46" : "#991b1b",
        border: `1px solid ${ok ? "#6ee7b7" : "#fca5a5"}`,
      }}
    >
      {ok ? "✅" : "❌"} {toast.msg}
    </div>
  );
};

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate  = useNavigate();

  const [job, setJob]                   = useState(null);
  const [resumes, setResumes]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [showApply, setShowApply]       = useState(false);
  const [selectedResume, setSelectedResume] = useState("");
  const [applying, setApplying]         = useState(false);
  const [toast, setToast]               = useState(null);
  const [error, setError]               = useState("");

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    Promise.all([getJobById(jobId), getStudentResumes()])
      .then(([jobRes, resumeRes]) => {
        setJob(jobRes.data);
        setResumes(resumeRes.data || []);
      })
      .catch((error) => setError(error.message || handleApiError(error)))
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleApply = async () => {
    if (!selectedResume) {
      showToast("error", "Please select a resume first.");
      return;
    }
    setApplying(true);
    try {
      await applyForJob(jobId, parseInt(selectedResume));
      showToast("success", "Application submitted successfully!");
      setShowApply(false);
      setSelectedResume("");
    } catch (error) {
      showToast("error", error.message || handleApiError(error));
    } finally {
      setApplying(false);
    }
  };

  return (
    <DashboardLayout title="Job Details">
      <Toast toast={toast} />

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
          <span
            onClick={() => navigate("/jobs")}
            className="cursor-pointer"
            style={{ color: "#4c7ef0" }}
          >
            Jobs
          </span>
          {" / Job Details"}
        </p>
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>Job Details</h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Review the job details and apply if you are eligible.
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ background: "#fef2f2", color: "#991b1b" }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <p className="text-center py-12 text-sm" style={{ color: "#9ca3af" }}>
          Loading job details...
        </p>
      ) : !job ? (
        <p className="text-center py-12 text-sm" style={{ color: "#9ca3af" }}>
          Job not found.
        </p>
      ) : (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #e5e7f0", maxWidth: "780px" }}>

          {/* Card header */}
          <div className="px-6 py-5"
            style={{ borderBottom: "1px solid #e5e7f0", background: "#fafbff" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold" style={{ color: "#111827" }}>
                  {job.jobTitle}
                </p>
                <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
                  {job.employer?.companyName || "—"}
                </p>
              </div>
              <p className="text-sm font-medium px-3 py-1 rounded-full flex-shrink-0"
                style={{ background: "#eef2fe", color: "#4c7ef0" }}>
                💰 {job.salaryPackage}
              </p>
            </div>
          </div>

          <div className="px-6 py-6">

            {job.status && job.status !== "OPEN" && (
              <div className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ background: job.status === "CLOSED" ? "#fef3c7" : "#f3f4f6", color: job.status === "CLOSED" ? "#92400e" : "#6b7280" }}>
                Applications are {job.status === "CLOSED" ? "closed" : "no longer available"} for this role.
              </div>
            )}

            {/* Key dates */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6"
              style={{ borderBottom: "1px solid #f0f2f8" }}>
              <DetailRow label="Application Deadline" value={formatDate(job.applicationDeadline)} />
              <DetailRow label="Placement Drive Date" value={formatDate(job.placementDriveDate)} />
            </div>

            {/* Job info */}
            <p className="text-xs font-semibold uppercase tracking-wide mb-4"
              style={{ color: "#9ca3af" }}>Job Information</p>
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6"
              style={{ borderBottom: "1px solid #f0f2f8" }}>
              <DetailRow label="Location"      value={job.jobLocation} />
              <DetailRow label="Salary Package" value={job.salaryPackage} />
              {job.jobDescription && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1"
                    style={{ color: "#9ca3af" }}>Description</p>
                  <p className="text-sm" style={{ color: "#374151", lineHeight: "1.6" }}>
                    {job.jobDescription}
                  </p>
                </div>
              )}
            </div>

            {/* Eligibility */}
            <p className="text-xs font-semibold uppercase tracking-wide mb-4"
              style={{ color: "#9ca3af" }}>Eligibility Criteria</p>
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6"
              style={{ borderBottom: "1px solid #f0f2f8" }}>
              <DetailRow label="Min CGPA"          value={job.minCgpa ?? "No requirement"} />
              <DetailRow label="Max Backlogs"       value={job.maxBacklogs ?? "No requirement"} />
              <DetailRow label="Passing Year"       value={job.passingYear ?? "No requirement"} />
              <DetailRow label="Eligible Branches"  value={job.eligibleBranches ?? "All branches"} />
            </div>

            {/* Apply section */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowApply((prev) => !prev)}
                className="h-10 px-6 text-sm rounded-lg font-medium text-white"
                style={{ background: "#4c7ef0", border: "none" }}
                disabled={job.status && job.status !== "OPEN"}
              >
                {showApply ? "Cancel" : "Apply Now"}
              </button>
            </div>

            {showApply && (
              <div className="mt-4 rounded-xl px-5 py-4"
                style={{ border: "1px solid #e5e7f0", background: "#fafbff" }}>
                <p className="text-sm font-medium mb-3" style={{ color: "#111827" }}>
                  Select a resume to apply with:
                </p>
                {resumes.length === 0 ? (
                  <p className="text-sm" style={{ color: "#9ca3af" }}>
                    No resumes uploaded yet. Please upload a resume from your{" "}
                    <span
                      className="cursor-pointer"
                      style={{ color: "#4c7ef0" }}
                      onClick={() => navigate("/profile")}
                    >
                      Profile page
                    </span>.
                  </p>
                ) : (
                  <>
                    <select
                      value={selectedResume}
                      onChange={(e) => setSelectedResume(e.target.value)}
                      className="w-full h-10 px-3 text-sm rounded-lg outline-none mb-3"
                      style={{ border: "1px solid #d1d5db", background: "#fff", color: "#111827" }}
                    >
                      <option value="">-- Select a resume --</option>
                      {resumes.map((r) => (
                        <option key={r.resumeId} value={r.resumeId}>
                          {r.resumeFile}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleApply}
                      disabled={applying}
                      className="h-9 px-5 text-sm rounded-lg font-medium text-white"
                      style={{ background: applying ? "#93aef0" : "#4c7ef0", border: "none" }}
                    >
                      {applying ? "Submitting..." : "Confirm Application"}
                    </button>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default JobDetailPage;