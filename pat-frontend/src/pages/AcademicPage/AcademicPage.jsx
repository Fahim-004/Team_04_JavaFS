import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getStudentProfile, saveAcademicDetails, getAcademicDetails } from "../../services/api";

const EMPTY = {
  degree: "", branch: "", usn: "", semester: "",
  cgpa: "", backlogCount: "", tenth: "", twelfth: "",
  passingYear: "", skills: "", projects: "", certifications: "",
};

const BRANCHES = [
  "Computer Science Engineering (CSE)",
  "Information Science Engineering (ISE)",
  "Artificial Intelligence & Machine Learning",
  "Artificial Intelligence & Data Science",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering", "Civil Engineering",
  "Chemical Engineering", "Biotechnology",
  "Aeronautical Engineering", "Automobile Engineering",
];

// ── Shared focus handlers ─────────────────────────────────────
const withFocus = (accentColor) => ({
  onFocus: (e) => {
    e.target.style.borderColor = accentColor;
    e.target.style.boxShadow   = `0 0 0 3px ${accentColor}22`;
    e.target.style.background  = "#fff";
  },
  onBlur: (e) => {
    e.target.style.borderColor = "#d1d5db";
    e.target.style.boxShadow   = "none";
    e.target.style.background  = "#fafafa";
  },
});

const baseStyle = { border: "1px solid #d1d5db", background: "#fafafa", color: "#111827" };

// ── Sub-components ────────────────────────────────────────────
const Field = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#6b7280" }}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-10 px-3 text-sm rounded-lg outline-none transition-all"
      style={baseStyle}
      {...withFocus("#f59e0b")}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, placeholder }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#6b7280" }}>
      {label}
    </label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full h-10 px-3 text-sm rounded-lg outline-none transition-all appearance-none"
      style={baseStyle}
      {...withFocus("#f59e0b")}
    >
      <option value="">{placeholder || `Select ${label}`}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const TextArea = ({ label, name, value, onChange, placeholder, hint }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#6b7280" }}>
      {label}
    </label>
    <textarea
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all resize-none"
      style={baseStyle}
      {...withFocus("#f59e0b")}
    />
    {hint && <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{hint}</p>}
  </div>
);

const Divider = ({ label }) => (
  <>
    <div className="my-5" style={{ borderTop: "1px solid #f0f2f8" }} />
    <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "#9ca3af" }}>
      {label}
    </p>
  </>
);

const Toast = ({ toast }) => {
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <div
      className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg"
      style={{
        background: ok ? "#ecfdf5" : "#fef2f2",
        color:      ok ? "#065f46" : "#991b1b",
        border:     `1px solid ${ok ? "#6ee7b7" : "#fca5a5"}`,
      }}
    >
      {ok ? "✅" : "❌"} {toast.msg}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────
const AcademicPage = () => {
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [profileRes, academicRes] = await Promise.all([
        getStudentProfile(),
        getAcademicDetails(),
      ]);

      const p = profileRes.data || {};
      const a = academicRes.data || {};

      setForm({
        // 🔹 From STUDENT table
        branch: p.branch || "",
        usn: p.usn || "",
        cgpa: p.cgpa || "",
        backlogCount: p.backlogCount || "",
        passingYear: p.passingYear || "",
        skills: p.skills || "",
        projects: p.projects || "",

        // 🔹 From ACADEMIC table
        degree: a.degree || "",
        tenth: a.tenth || "",
        twelfth: a.twelfth || "",
        semester: a.semester || "",
        certifications: a.certifications || "",
      });

    } catch (err) {
      console.log("Error fetching academic data", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveAcademicDetails({
        ...form,
        semester:     form.semester     ? parseInt(form.semester)     : null,
        passingYear:  form.passingYear  ? parseInt(form.passingYear)  : null,
        backlogCount: form.backlogCount ? parseInt(form.backlogCount) : null,
        cgpa:         form.cgpa         ? parseFloat(form.cgpa)       : null,
        tenth:        form.tenth        ? parseFloat(form.tenth)      : null,
        twelfth:      form.twelfth      ? parseFloat(form.twelfth)    : null,
      });
      showToast("success", "Academic details saved successfully!");
    } catch {
      showToast("error", "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <DashboardLayout title="Academic Details">
      <Toast toast={toast} />

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>Dashboard / Academic Details</p>
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>Academic Details</h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Keep your academic information accurate for placement eligibility.
        </p>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid #e5e7f0", maxWidth: "780px" }}
      >
        {/* Card header */}
        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{ borderBottom: "1px solid #e5e7f0", background: "#fffdf5" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#faeeda", fontSize: "14px" }}
          >
            🎓
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>Academic information</p>
            <p className="text-xs" style={{ color: "#9ca3af" }}>Your college, grades, and skills</p>
          </div>
        </div>

        <div className="px-6 py-6">
          {loading ? (
            <p className="text-center py-12 text-sm" style={{ color: "#9ca3af" }}>
              Loading your details...
            </p>
          ) : (
            <>
              {/* Institution */}
              <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "#9ca3af" }}>
                Institution
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Degree" name="degree" value={form.degree} onChange={handleChange}
                  options={["B.E / B.Tech", "M.E / M.Tech"]}
                />
                <Select
                  label="Branch" name="branch" value={form.branch} onChange={handleChange}
                  options={BRANCHES}
                />
                <Field label="USN"          name="usn"         value={form.usn}         onChange={handleChange} placeholder="e.g. 1XX21CS001" />
                <Select
                  label="Semester" name="semester" value={form.semester} onChange={handleChange}
                  options={["1","2","3","4","5","6","7","8"]}
                />
                <Field label="Passing year" name="passingYear" value={form.passingYear} onChange={handleChange} placeholder="e.g. 2025" type="number" />
              </div>

              <Divider label="Academic performance" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="CGPA"              name="cgpa"         value={form.cgpa}         onChange={handleChange} placeholder="e.g. 8.50"  type="number" />
                <Field label="Number of backlogs" name="backlogCount" value={form.backlogCount} onChange={handleChange} placeholder="e.g. 0"    type="number" />
                <Field label="10th percentage"   name="tenth"        value={form.tenth}        onChange={handleChange} placeholder="e.g. 92.5" type="number" />
                <Field label="12th percentage"   name="twelfth"      value={form.twelfth}      onChange={handleChange} placeholder="e.g. 88.0" type="number" />
              </div>

              <Divider label="Skills & certifications" />
              <div className="grid grid-cols-1 gap-4">
                <TextArea
                  label="Technical skills"   name="skills"          value={form.skills}         onChange={handleChange}
                  placeholder="e.g. Java, Spring Boot, React, MySQL, Git"
                  hint="Separate multiple skills with commas"
                />
                <TextArea
                  label="Projects"           name="projects"        value={form.projects}       onChange={handleChange}
                  placeholder="e.g. E-commerce website, Placement portal"
                  hint="Brief descriptions of notable projects"
                />
                <TextArea
                  label="Certifications"     name="certifications"  value={form.certifications} onChange={handleChange}
                  placeholder="e.g. AWS Cloud Practitioner, Oracle Java SE"
                  hint="Separate multiple certifications with commas"
                />
              </div>

              {/* Actions */}
              <div
                className="flex justify-end gap-3 mt-6 pt-5"
                style={{ borderTop: "1px solid #f0f2f8" }}
              >
                <button
                  onClick={() => setForm(EMPTY)}
                  className="h-9 px-4 text-sm rounded-lg font-medium transition-all"
                  style={{ border: "1px solid #d1d5db", color: "#6b7280", background: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="h-9 px-5 text-sm rounded-lg font-medium text-white transition-all"
                  style={{ background: saving ? "#f9c54a" : "#f59e0b", border: "none" }}
                >
                  {saving ? "Saving..." : "Save details"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AcademicPage;
