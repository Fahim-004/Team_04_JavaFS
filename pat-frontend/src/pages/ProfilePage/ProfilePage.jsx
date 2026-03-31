import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getStudentProfile, savePersonalDetails } from "../../services/api";

const EMPTY = { fullName: "", phoneNumber: "", linkedinUrl: "", githubUrl: "" };

// ── Toast ─────────────────────────────────────────────────────
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

// ── Input field ───────────────────────────────────────────────
const Field = ({ label, name, value, onChange, placeholder, type = "text", colSpan = 1 }) => (
  <div className={colSpan === 2 ? "md:col-span-2" : ""}>
    <label
      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
      style={{ color: "#6b7280" }}
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-10 px-3 text-sm rounded-lg outline-none transition-all"
      style={{ border: "1px solid #d1d5db", background: "#fafafa", color: "#111827" }}
      onFocus={(e) => {
        e.target.style.borderColor = "#6c8af7";
        e.target.style.boxShadow = "0 0 0 3px rgba(108,138,247,0.12)";
        e.target.style.background = "#fff";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#d1d5db";
        e.target.style.boxShadow = "none";
        e.target.style.background = "#fafafa";
      }}
    />
  </div>
);

// ── Page ──────────────────────────────────────────────────────
const ProfilePage = () => {
  const [form, setForm]       = useState(EMPTY);
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);

  useEffect(() => {
    // Get email from localStorage (set by AuthContext on login)
    const stored = localStorage.getItem("userEmail") || "";
    setEmail(stored);

    getStudentProfile()
      .then((res) => {
        if (res.data) {
          setForm({
            fullName:    res.data.fullName    || "",
            phoneNumber: res.data.phoneNumber || "",
            linkedinUrl: res.data.linkedinUrl || "",
            githubUrl:   res.data.githubUrl   || "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await savePersonalDetails(form);
      if (form.fullName) {
        localStorage.setItem("userName", form.fullName.split(" ")[0]);
      }
      showToast("success", "Personal details saved successfully!");
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

  const initials = form.fullName
    ? form.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "ST";

  return (
    <DashboardLayout title="Profile">
      <Toast toast={toast} />

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>Dashboard / Profile</p>
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>My Profile</h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Keep your personal details up to date.
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
          style={{ borderBottom: "1px solid #e5e7f0", background: "#fafbff" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#eef2fe", fontSize: "14px" }}
          >
            👤
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>Personal details</p>
            <p className="text-xs" style={{ color: "#9ca3af" }}>Your basic contact information</p>
          </div>
        </div>

        <div className="px-6 py-6">
          {loading ? (
            <p className="text-center py-12 text-sm" style={{ color: "#9ca3af" }}>
              Loading your profile...
            </p>
          ) : (
            <>
              {/* Avatar */}
              <div
                className="flex items-center gap-4 mb-6 pb-5"
                style={{ borderBottom: "1px solid #f0f2f8" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold flex-shrink-0"
                  style={{ background: "#eef2fe", color: "#4c7ef0" }}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#111827" }}>
                    {form.fullName || "Your Name"}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                    {email || "your@email.com"}
                  </p>
                </div>
              </div>

              {/* Fields */}
              <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "#9ca3af" }}>
                Contact information
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Field label="Full name"         name="fullName"     value={form.fullName}     onChange={handleChange} placeholder="e.g. Priya Sharma" />
                <Field label="Phone number"      name="phoneNumber"  value={form.phoneNumber}  onChange={handleChange} placeholder="+91 98765 43210" />
                <Field label="LinkedIn profile"  name="linkedinUrl"  value={form.linkedinUrl}  onChange={handleChange} placeholder="linkedin.com/in/yourname" />
                <Field label="GitHub profile"    name="githubUrl"    value={form.githubUrl}    onChange={handleChange} placeholder="github.com/yourusername" />
              </div>

              {/* Email (read-only — from JWT/auth) */}
              <div className="mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#6b7280" }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full h-10 px-3 text-sm rounded-lg"
                  style={{ border: "1px solid #e5e7eb", background: "#f9fafb", color: "#9ca3af" }}
                />
                <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                  Email cannot be changed — contact admin if needed.
                </p>
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
                  style={{ background: saving ? "#93aef0" : "#4c7ef0", border: "none" }}
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

export default ProfilePage;
