import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  createRound,
  getJobRounds,
  updateRoundResult,
  getRoundsApplicants,
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

  const getErrorMessage = (err, fallback) => {
    if (!err?.response?.data) return fallback;
    if (typeof err.response.data === "string") return err.response.data;
    return err.response.data.error || err.response.data.message || fallback;
  };

  const getRoundResultForApplicant = (app, round) => {
    const result = (app.roundResults || []).find(
      (r) => r.roundId === round.roundId || r.roundOrder === round.roundOrder
    );

    return result?.status || "NOT_UPDATED";
  };

  const isEligibleForRound = (app, round) => {
    const previousRounds = rounds.filter((r) => r.roundOrder < round.roundOrder);
    if (previousRounds.length === 0) return true;

    return previousRounds.every((prevRound) => {
      const prevResult = (app.roundResults || []).find(
        (r) => r.roundId === prevRound.roundId || r.roundOrder === prevRound.roundOrder
      );

      return prevResult?.status === "PASSED";
    });
  };

  // 🔄 Fetch data
  const fetchData = () => {
    getJobRounds(jobId)
      .then(res => setRounds(Array.isArray(res.data) ? res.data : []))
      .catch(() => setRounds([]));

    getRoundsApplicants(jobId)
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
      showToast("error", getErrorMessage(err, "Failed to add round"));
    }
  };

  // 🔁 Update result
  const handleUpdate = async (applicationId, roundId, status) => {
    try {
      await updateRoundResult(applicationId, roundId, status);

      showToast("success", "Result updated");

      fetchData();
    } catch (err) {
      showToast("error", getErrorMessage(err, "Update failed"));
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
            ) : applicants.filter((app) => isEligibleForRound(app, round)).length === 0 ? (
              <p style={{ color: "#9ca3af" }}>
                No eligible candidates for this round yet. Only candidates who passed all preceding rounds are shown.
              </p>
            ) : (
              applicants
                .filter((app) => isEligibleForRound(app, round))
                .map((app) => (
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
                  <div>
                    <span>{app.studentName || "Unknown"}</span>
                    <p style={{ color: "#6b7280", fontSize: "12px", marginTop: "4px" }}>
                      Status in this round: {getRoundResultForApplicant(app, round).replace("_", " ")}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Passed", "Failed"].map((status) => (
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