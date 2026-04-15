import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    address: "",
  });

  const [saving, setSaving] = useState(false); // Optional: for loading state

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || {};
    setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setSaving(true);

    try {
      localStorage.setItem("profile", JSON.stringify(profile));
      localStorage.setItem("userName", profile.name || ""); // optional

      alert("Personal Details Saved Successfully! 🎉");
      
      // Replace alert with toast later:
      // showToast("success", "Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Personal Details</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={profile.name || ""}
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-3 rounded focus:outline-none focus:border-blue-500"
          />

          <input
            name="email"
            type="email"
            value={profile.email || ""}
            placeholder="Email Address"
            onChange={handleChange}
            className="border p-3 rounded focus:outline-none focus:border-blue-500"
          />

          <input
            name="phone"
            type="tel"
            value={profile.phone || ""}
            placeholder="Phone Number"
            onChange={handleChange}
            className="border p-3 rounded focus:outline-none focus:border-blue-500"
          />

          <input
            name="linkedin"
            value={profile.linkedin || ""}
            placeholder="LinkedIn Profile URL"
            onChange={handleChange}
            className="border p-3 rounded focus:outline-none focus:border-blue-500"
          />

          <input
            name="address"
            value={profile.address || ""}
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded md:col-span-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {saving ? "Saving..." : "Save Personal Details"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;