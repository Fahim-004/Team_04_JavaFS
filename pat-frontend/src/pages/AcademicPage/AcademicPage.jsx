import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";

const AcademicPage = () => {

  const [academic, setAcademic] = useState({
    degree: "",
    branch: "",
    usn: "",
    semester: "",
    cgpa: "",
    tenth: "",
    twelfth: "",
    backlogs: ""
  });

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("academic")) || {};
    setAcademic(saved);
  }, []);

  const handleChange = (e) => {
    setAcademic({
      ...academic,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    localStorage.setItem("academic", JSON.stringify(academic));
    alert("Academic details saved");
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Academic Details
      </h1>

      <div className="bg-white p-6 rounded shadow max-w-3xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            name="degree"
            value={academic.degree || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Degree</option>
            <option>B.E / B.Tech</option>
            <option>M.E / M.Tech</option>
          </select>

          <select
            name="branch"
            value={academic.branch || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          >

            <option value="">Select Branch</option>

            <option>Computer Science Engineering (CSE)</option>
            <option>Information Science Engineering (ISE)</option>
            <option>Artificial Intelligence & Machine Learning</option>
            <option>Artificial Intelligence & Data Science</option>
            <option>Electronics & Communication Engineering</option>
            <option>Electrical & Electronics Engineering</option>
            <option>Mechanical Engineering</option>
            <option>Civil Engineering</option>
            <option>Chemical Engineering</option>
            <option>Biotechnology</option>
            <option>Aeronautical Engineering</option>
            <option>Automobile Engineering</option>

          </select>

          <input
            name="usn"
            value={academic.usn || ""}
            placeholder="USN"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="semester"
            value={academic.semester || ""}
            onChange={handleChange}
            className="border p-3 rounded"
          >

            <option value="">Select Semester</option>

            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>

          </select>

          <input
            name="cgpa"
            value={academic.cgpa || ""}
            placeholder="CGPA"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="tenth"
            value={academic.tenth || ""}
            placeholder="10th Percentage"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="twelfth"
            value={academic.twelfth || ""}
            placeholder="12th Percentage"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="backlogs"
            value={academic.backlogs || ""}
            placeholder="Number of Backlogs"
            onChange={handleChange}
            className="border p-3 rounded"
          />

        </div>

        <div className="mt-6">

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Academic Details
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default AcademicPage;