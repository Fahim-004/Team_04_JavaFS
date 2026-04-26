import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  createRound,
  getJobRounds,
  updateRoundResult,
  getJobApplicants,
} from "../../services/api";

// Toast (same style as ProfilePage)
const Toast = ({ toast }) => {
  if (!toast) return null;
  const ok = toast.type === "success";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 16px",
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: "500",
        background: ok ? "#ecfdf5" : "#fef2f2",
        color: ok ? "#065f46" : "#991b1b",
        border: `1px solid ${ok ? "#6ee7b7" : "#fca5a5"}`,
        zIndex: 100,
      }}
    >
      {ok ? "✅" : "❌"} {toast.msg}
    </div>
  );
};

const RoundsManagerPage = () => {
  const { jobId } = useParams();

  const [rounds, setRounds] = useState([]);
  const [applicants, setApplicants] = useState([]);

  const [roundName, setRoundName] = useState("");
  const [roundOrder, setRoundOrder] = useState("");

  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  // 🔄 Fetch data
  const fetchData = () => {
    getJobRounds(jobId)
      .then(res => setRounds(Array.isArray(res.data) ? res.data : []))
      .catch(() => setRounds([]));

    getJobApplicants(jobId)
      .then(res => setApplicants(Array.isArray(res.data) ? res.data : []))
      .catch(() => setApplicants([]));
  };

  useEffect(() => {
    fetchData();
  }, [jobId]);

  // ➕ Add round
  const handleAddRound = async () => {
    if (!roundName || !roundOrder) {
      showToast("error", "Fill all fields");
      return;
    }

    try {
      await createRound(jobId, {
        roundName,
        roundOrder: Number(roundOrder),
      });

      showToast("success", "Round added");

      setRoundName("");
      setRoundOrder("");

      fetchData();
    } catch (err) {
      showToast("error", err.response?.data || "Failed to add round");
    }
  };

  // 🔁 Update result
  const handleUpdate = async (applicationId, roundId, status) => {
  try {
    const res = await updateRoundResult(applicationId, roundId, status);

    console.log("UPDATE RESPONSE:", res);

    showToast("success", "Result updated");

    fetchData();
  } catch (err) {
    console.error("UPDATE ERROR:", err);

    showToast("error", err?.response?.data || "Update failed");
  }
};

  return (
    <DashboardLayout title="Rounds Manager">
      <Toast toast={toast} />

      {/* ➕ Add Round */}
      <div
        style={{
          background: "#fff",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #e5e7f0",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Add New Round</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            placeholder="Round Name"
            value={roundName}
            onChange={(e) => setRoundName(e.target.value)}
            style={{
              padding: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
            }}
          />

          <input
            type="number"
            min="1"
            placeholder="Order"
            value={roundOrder}
            onChange={(e) => setRoundOrder(e.target.value)}
            style={{
              padding: "8px",
              width: "80px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
            }}
          />

          <button
            onClick={handleAddRound}
            style={{
              background: "#4c7ef0",
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add Round
          </button>
        </div>
      </div>

      {/* 📋 Rounds */}
      {rounds.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>No rounds created yet.</p>
      ) : (
        rounds.map((round) => (
          <div
            key={round.roundId}
            style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e5e7f0",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ marginBottom: "12px" }}>
              {round.roundName} (Order {round.roundOrder})
            </h3>

            {/* 👥 Applicants */}
            {applicants.length === 0 ? (
              <p style={{ color: "#9ca3af" }}>No applicants found.</p>
            ) : (
              applicants.map((app) => (
                <div
                  key={app.applicationId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <span>{app.student?.fullName || "Unknown"}</span>

                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Passed", "Failed", "Pending"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleUpdate(
                            app.applicationId,
                            round.roundId,
                            status
                          )
                        }
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "1px solid #d1d5db",
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </DashboardLayout>
  );
};

export default RoundsManagerPage;