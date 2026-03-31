import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
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
    return Promise.reject(err);
  }
);

// ── students Profile ───────────────────────────────────────────
export const getStudentProfile  = ()     => api.get("/students/profile");
export const savePersonalDetails = (data) => api.put("/students/profile", data);
export const saveAcademicDetails = (data) => api.put("/students/academic", data);

// ── Dashboard ─────────────────────────────────────────────────
export const getDashboardStats  = ()     => api.get("/students/dashboard/stats");

export default api;
