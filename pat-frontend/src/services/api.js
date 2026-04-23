import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Auto attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Keep your original loginUser with fetch (safest) ─────────────────
export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// ── All other APIs (now working) ─────────────────────────────────────
export const getDashboardStats = () => api.get("/students/dashboard/stats");

export const getAllJobs = (branch, minCgpa) => {
  const params = {};
  if (branch) params.branch = branch;
  if (minCgpa) params.minCgpa = minCgpa;
  return api.get("/jobs", { params });
};

export const getJobById = (jobId) => api.get(`/jobs/${jobId}`);

export const applyForJob = (jobId, resumeId) =>
  api.post(`/jobs/${jobId}/apply`, { resumeId });

export const getMyApplications = () => api.get("/students/applications");

export const getStudentResumes = () => api.get("/students/resumes");

export const postJob = (data) => api.post("/jobs", data);
export const getEmployerJobs = () => api.get("/employers/jobs");
export const getJobApplicants = (jobId) => api.get(`/jobs/${jobId}/applicants`);

// ── Employer ──────────────────────────────────────────────────
export const postJob          = (data)   => api.post("/jobs", data);
export const getEmployerJobs  = ()       => api.get("/employers/jobs");
export const getJobApplicants = (jobId)  => api.get(`/jobs/${jobId}/applicants`);


// ── Employer Profile ───────────────────────────────────────────
export const getEmployerProfile = () => api.get("/employers/profile");
export const saveEmployerProfile = (data) => api.post("/employers/profile", data);


// ── Admin ─────────────────────────────
export const getAdminStudents = () => api.get("/admin/students");
export const getAdminEmployers = () => api.get("/admin/employers");
export const approveEmployer = (id) => api.put(`/admin/employers/${id}/approve`);
export const removeEmployer = (id) => api.delete(`/admin/employers/${id}`);
export const getAdminStatistics = () => api.get("/admin/statistics");


export default api;
