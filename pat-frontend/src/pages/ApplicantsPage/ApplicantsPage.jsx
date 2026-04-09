import DashboardLayout from "../../layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobApplicants } from "../../services/api";

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await getJobApplicants(jobId);
        setApplicants(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Applicants</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-6xl">
        {applicants.length === 0 ? (
          <p className="text-gray-500">No applicants yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">USN</th>
                <th className="p-3 border text-left">Branch</th>
                <th className="p-3 border text-left">CGPA</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Applied At</th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((app) => (
                <tr key={app.applicationId}>
                  <td className="p-3 border">{app.student.fullName}</td>
                  <td className="p-3 border">{app.student.usn}</td>
                  <td className="p-3 border">{app.student.branch}</td>
                  <td className="p-3 border">{app.student.cgpa}</td>
                  <td className="p-3 border">{app.status}</td>
                  <td className="p-3 border">{app.appliedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicantsPage;