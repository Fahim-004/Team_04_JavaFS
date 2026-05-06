import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getEmployerProfile,
  saveEmployerProfile,
} from "../../services/api";
import { handleApiError } from "../../utils/handleApiError";

const EmployerProfilePage = () => {
  const [form, setForm] = useState({
    companyName: "",
    companyDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 LOAD PROFILE (REAL → FALLBACK)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getEmployerProfile();
        const data = res?.data || {};

        setForm({
          companyName: data.companyName || "",
          companyDescription: data.companyDescription || "",
        });
      } catch (error) {
        setError(error.message || handleApiError(error));
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfile();
  }, []);

  // INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SAVE PROFILE
  const handleSave = async () => {
    setError("");

    // ✅ validation
    if (!form.companyName.trim()) {
      setError("Company name is required");
      return;
    }

    setLoading(true);

    try {
      await saveEmployerProfile({
        companyName: form.companyName.trim(),
        companyDescription: form.companyDescription.trim(),
      });

      setError("");
      alert("Profile saved successfully");
    } catch (error) {
      setError(error.message || handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Loading state
  if (initialLoading) {
    return (
      <DashboardLayout title="Profile">
        <div className="p-6 text-sm text-gray-400">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile">

      <div
        className="p-6 rounded-lg"
        style={{ background: "#fff", border: "1px solid #e5e7f0" }}
      >

        {/* Section Title */}
        <h2
          className="text-sm uppercase tracking-wide font-medium mb-4"
          style={{ color: "#9ca3af" }}
        >
          Company Details
        </h2>

        {/* Error Banner */}
        {error && (
          <div
            className="mb-4 px-3 py-2 text-sm rounded"
            style={{ background: "#fef2f2", color: "#ef4444" }}
          >
            {error}
          </div>
        )}

        {/* Company Name */}
        <div className="mb-4">
          <label className="text-sm font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
            style={{
              border: "1px solid #e5e7f0",
              outline: "none",
            }}
          />
        </div>

        {/* Company Description */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Company Description
          </label>
          <textarea
            name="companyDescription"
            value={form.companyDescription}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
            style={{
              border: "1px solid #e5e7f0",
              outline: "none",
            }}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-lg"
          style={{
            background: "#4c7ef0",
            color: "#fff",
            border: "none",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

      </div>

    </DashboardLayout>
  );
};

export default EmployerProfilePage;