import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { changePassword } from "../services/api";
import { handleApiError } from "../utils/handleApiError";

const INITIAL_FORM = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      setMessage("Password updated successfully.");
      setForm(INITIAL_FORM);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Change Password">
      <div className="mb-6">
        <p
          className="text-xs mb-1"
          style={{ color: "#9ca3af" }}
        >
          Dashboard / Change Password
        </p>

        <h1
          className="text-2xl font-semibold"
          style={{ color: "#111827" }}
        >
          Change Password
        </h1>

        <p
          className="text-sm mt-1"
          style={{ color: "#6b7280" }}
        >
          Update the password for your signed-in account.
        </p>
      </div>

      {error ? (
        <div
          className="mb-4 rounded-lg px-4 py-3 text-sm"
          style={{
            background: "#fef2f2",
            color: "#991b1b",
          }}
        >
          {error}
        </div>
      ) : null}

      {message ? (
        <div
          className="mb-4 rounded-lg px-4 py-3 text-sm"
          style={{
            background: "#ecfdf5",
            color: "#065f46",
          }}
        >
          {message}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#fff",
          border: "1px solid #e5e7f0",
          maxWidth: "560px",
        }}
      >
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 gap-4">

            {/* Current Password */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "#6b7280" }}
              >
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="w-full h-10 px-3 pr-16 text-sm rounded-lg outline-none transition-all"
                  style={{
                    border: "1px solid #d1d5db",
                    background: "#fafafa",
                    color: "#111827",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium"
                  style={{
                    color: "#6b7280",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showCurrentPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "#6b7280" }}
              >
                New Password
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full h-10 px-3 pr-16 text-sm rounded-lg outline-none transition-all"
                  style={{
                    border: "1px solid #d1d5db",
                    background: "#fafafa",
                    color: "#111827",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium"
                  style={{
                    color: "#6b7280",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "#6b7280" }}
              >
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full h-10 px-3 pr-16 text-sm rounded-lg outline-none transition-all"
                  style={{
                    border: "1px solid #d1d5db",
                    background: "#fafafa",
                    color: "#111827",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium"
                  style={{
                    color: "#6b7280",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div
            className="flex justify-end gap-3 mt-6 pt-5"
            style={{ borderTop: "1px solid #f0f2f8" }}
          >
            <button
              type="button"
              onClick={() => setForm(INITIAL_FORM)}
              className="h-9 px-4 text-sm rounded-lg font-medium transition-all"
              style={{
                border: "1px solid #d1d5db",
                color: "#6b7280",
                background: "transparent",
              }}
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-9 px-5 text-sm rounded-lg font-medium text-white"
              style={{
                background: loading ? "#93aef0" : "#4c7ef0",
                border: "none",
              }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ChangePassword;