import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllJobs } from "../../services/api";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
};

const JobListPage = () => {
  const [jobs, setJobs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [branchFilter, setBranchFilter] = useState("");
  const [cgpaFilter, setCgpaFilter]   = useState("");
  const navigate = useNavigate();

  const fetchJobs = (branch, cgpa) => {
    setLoading(true);
    getAllJobs(branch || null, cgpa || null)
      .then((res) => setJobs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilter = () => fetchJobs(branchFilter, cgpaFilter);

  const handleClear = () => {
    setBranchFilter("");
    setCgpaFilter("");
    fetchJobs();
  };

  return (
    <DashboardLayout title="Browse Jobs">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>Dashboard / Jobs</p>
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>Browse Jobs</h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Find placement opportunities that match your profile.
        </p>
      </div>

      {/* Filter bar */}
      <div className="rounded-2xl px-6 py-4 mb-5"
        style={{ background: "#fff", border: "1px solid #e5e7f0", maxWidth: "780px" }}>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
              style={{ color: "#6b7280" }}>Branch</label>
            <input
              type="text"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              placeholder="e.g. CSE"
              className="h-10 px-3 text-sm rounded-lg outline-none"
              style={{ border: "1px solid #d1d5db", background: "#fafafa", color: "#111827", width: "160px" }}
              onFocus={(e) => { e.target.style.borderColor = "#6c8af7"; e.target.style.background = "#fff"; }}
              onBlur={(e)  => { e.target.style.borderColor = "#d1d5db"; e.target.style.background = "#fafafa"; }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
              style={{ color: "#6b7280" }}>Min CGPA</label>
            <input
              type="number"
              value={cgpaFilter}
              onChange={(e) => setCgpaFilter(e.target.value)}
              placeholder="e.g. 7.5"
              step="0.1" min="0" max="10"
              className="h-10 px-3 text-sm rounded-lg outline-none"
              style={{ border: "1px solid #d1d5db", background: "#fafafa", color: "#111827", width: "130px" }}
              onFocus={(e) => { e.target.style.borderColor = "#6c8af7"; e.target.style.background = "#fff"; }}
              onBlur={(e)  => { e.target.style.borderColor = "#d1d5db"; e.target.style.background = "#fafafa"; }}
            />
          </div>
          <button
            onClick={handleFilter}
            className="h-10 px-5 text-sm rounded-lg font-medium text-white"
            style={{ background: "#4c7ef0", border: "none" }}
          >
            Filter
          </button>
          <button
            onClick={handleClear}
            className="h-10 px-4 text-sm rounded-lg font-medium"
            style={{ border: "1px solid #d1d5db", color: "#6b7280", background: "transparent" }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Job cards */}
      <div style={{ maxWidth: "780px" }}>
        {loading ? (
          <p className="text-center py-12 text-sm" style={{ color: "#9ca3af" }}>
            Loading jobs...
          </p>
        ) : jobs.length === 0 ? (
          // <p className="text-center py-12 text-sm" style={{ color: "#9ca3af" }}>
          //   No jobs found.
          // </p>

          //temporay placeholder until backend is connected to fetch actual jobs

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              onClick={() => navigate("/jobs/1")}
              className="rounded-2xl px-6 py-5 cursor-pointer transition-all"
              style={{ background: "#fff", border: "1px solid #e5e7f0", opacity: 0.6 }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#6c8af7"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7f0"}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                    Software Engineer Intern
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                    Acme Technologies
                  </p>
                </div>
                <p className="text-xs font-medium px-3 py-1 rounded-full flex-shrink-0"
                  style={{ background: "#eef2fe", color: "#4c7ef0" }}>
                  💰 6 LPA
                </p>
              </div>
              <p className="text-xs mt-3" style={{ color: "#9ca3af" }}>
                Apply by 30 Apr 2026
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {jobs.map((job) => (
              <div
                key={job.jobId}
                onClick={() => navigate(`/jobs/${job.jobId}`)}
                className="rounded-2xl px-6 py-5 cursor-pointer transition-all"
                style={{ background: "#fff", border: "1px solid #e5e7f0" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#6c8af7"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7f0"}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                      {job.jobTitle}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                      {job.employer?.companyName || "—"}
                    </p>
                  </div>
                  <p className="text-xs font-medium px-3 py-1 rounded-full flex-shrink-0"
                    style={{ background: "#eef2fe", color: "#4c7ef0" }}>
                    💰 {job.salaryPackage}
                  </p>
                </div>
                <p className="text-xs mt-3" style={{ color: "#9ca3af" }}>
                  Apply by {formatDate(job.applicationDeadline)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </DashboardLayout>
  );
};

export default JobListPage;