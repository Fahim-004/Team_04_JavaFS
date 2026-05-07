import axios from "axios";
import { handleApiError } from "../utils/handleApiError";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Attach JWT token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401 → clear storage and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      window.location.href = "/login";
    }

    return Promise.reject({
      message: handleApiError(err),
      status: err.response?.status || null,
      raw: err,
      code: err.response?.data?.code || null,
      details: err.response?.data?.details || null,
    });
  }
);

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const changePassword = (data) => api.post("/auth/change-password", data);

// ── students Profile ───────────────────────────────────────────
export const getStudentProfile = () => api.get("/students/profile");
export const savePersonalDetails = (data) => api.put("/students/profile", data);

export const saveAcademicDetails = (data) => api.put("/students/academic", data);
// ── Resume Upload ──────────────────────────────────────────────
export const uploadResume = async (formData) => {
  return await api.post("/students/resume", formData);
};

// ── Dashboard ─────────────────────────────────────────────────
export const getDashboardStats = () => api.get("/students/dashboard/stats");

// ── Jobs ──────────────────────────────────────────────────────
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

// ── Employer ──────────────────────────────────────────────────
export const postJob = (data) => api.post("/jobs", data);
export const getEmployerJobs = () => api.get("/employers/jobs");
export const getJobApplicants = (jobId) => api.get(`/jobs/${jobId}/applicants`);
export const getRoundsApplicants = (jobId) => api.get(`/jobs/${jobId}/rounds/applicants`);
export const updateJob = (jobId, data) => api.put(`/employers/jobs/${jobId}`, data);
export const deleteJob = (jobId) => api.delete(`/employers/jobs/${jobId}`);
export const stopJobIntake = (jobId) => api.put(`/employers/jobs/${jobId}/stop-intake`);

// ── Employer Profile ───────────────────────────────────────────
export const getEmployerProfile = () => api.get("/employers/profile");
export const saveEmployerProfile = (data) => api.post("/employers/profile", data);

// ── Admin ─────────────────────────────
export const getAdminStudents = () => api.get("/admin/students");
export const getAdminEmployers = () => api.get("/admin/employers");
export const approveEmployer = (id) => api.put(`/admin/employers/${id}/approve`);
export const removeEmployer = (id) => api.delete(`/admin/employers/${id}`);
export const getAdminStatistics = () => api.get("/admin/statistics");

// ── Academic Details ───────────────────────────────────────────
export const getAcademicDetails = () => {
  return api.get("/students/academic");
};

// ── Notifications ─────────────────────────────────────────────
export const getNotifications = () => api.get("/notifications");
export const markNotificationRead = (id) =>
  api.put(`/notifications/${id}/read`);

// ── Recruitment Rounds ────────────────────────────────────────
export const createRound = (jobId, data) =>
  api.post(`/jobs/${jobId}/rounds`, data);

export const getJobRounds = (jobId) =>
  api.get(`/jobs/${jobId}/rounds`);

export const updateRound = (roundId, data) =>
  api.put(`/rounds/${roundId}`, data);

export const updateRoundResult = (applicationId, roundId, status) =>
  api.put(`/rounds/update-result`, null, {
    params: {
      applicationId,
      roundId,
      status,
    },
  });

// ── Auth: Forgot/Reset Password ────────────────────────────────
export const forgotPassword = async (email) =>
  api.post("/auth/forgot-password", null, { params: { email } });

export const resetPassword = async (token, newPassword) =>
  api.post("/auth/reset-password", null, { params: { token, newPassword } });

export default api;
