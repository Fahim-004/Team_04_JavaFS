import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

const ProfilePage = () => {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    address: ""
  });

  useEffect(() => {

    const savedProfile =
      JSON.parse(localStorage.getItem("profile")) || {};

    setProfile(savedProfile);

  }, []);

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });

  };

  const handleSave = () => {

    localStorage.setItem("profile", JSON.stringify(profile));

    alert("Personal Details Saved Successfully");

  };

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Personal Details
      </h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-3xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Full Name */}

          <input
            name="name"
            value={profile.name || ""}
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* Email */}

          <input
            name="email"
            value={profile.email || ""}
            placeholder="Email Address"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* Phone */}

          <input
            name="phone"
            value={profile.phone || ""}
            placeholder="Phone Number"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* LinkedIn */}

          <input
            name="linkedin"
            value={profile.linkedin || ""}
            placeholder="LinkedIn Profile URL"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* Address */}

          <input
            name="address"
            value={profile.address || ""}
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded md:col-span-2"
          />

        </div>

        {/* Save Button */}

        <div className="mt-6">

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Personal Details
          </button>

        </div>

      </div>

    </DashboardLayout>

  );
};

export default ProfilePage;