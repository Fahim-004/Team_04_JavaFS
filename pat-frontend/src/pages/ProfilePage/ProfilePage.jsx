import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

const ProfilePage = () => {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    degree: "",
    branch: "",
    usn: "",
    semester: "",
    cgpa: "",
    prevCgpa: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile")) || {};
    setProfile(saved);
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved successfully");
  };

  const completion =
    Object.values(profile).filter(Boolean).length * 10;

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Student Profile
      </h1>

      <div className="bg-white p-6 rounded shadow max-w-2xl">

        {/* Profile Completion */}

        <div className="mb-6">

          <p className="font-semibold mb-2">
            Profile Completion: {completion}%
          </p>

          <div className="w-full bg-gray-200 h-3 rounded">

            <div
              className="bg-blue-600 h-3 rounded"
              style={{ width: `${completion}%` }}
            ></div>

          </div>

        </div>

        {/* Personal Details */}

        <h2 className="text-xl font-semibold mb-3">
          Personal Details
        </h2>

        <input
          name="name"
          value={profile.name || ""}
          placeholder="Full Name"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="email"
          value={profile.email || ""}
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="phone"
          value={profile.phone || ""}
          placeholder="Phone Number"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="address"
          value={profile.address || ""}
          placeholder="Address"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-6"
        />

        {/* Academic Details */}

        <h2 className="text-xl font-semibold mb-3">
          Academic Details
        </h2>

        <select
          name="degree"
          value={profile.degree || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        >
          <option value="">Select Degree</option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>

        <input
          name="branch"
          value={profile.branch || ""}
          placeholder="Branch"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="usn"
          value={profile.usn || ""}
          placeholder="USN"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="semester"
          value={profile.semester || ""}
          placeholder="Current Semester"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="cgpa"
          value={profile.cgpa || ""}
          placeholder="Current CGPA"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          name="prevCgpa"
          value={profile.prevCgpa || ""}
          placeholder="Previous Semester CGPA"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-6"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>

      </div>

    </DashboardLayout>
  );
};

export default ProfilePage;