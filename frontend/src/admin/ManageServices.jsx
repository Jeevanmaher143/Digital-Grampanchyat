import React, { useEffect, useState } from "react";
import "./ManageServices.css";

const ManageServices = () => {
  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Pending");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedAppId, setSelectedAppId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    const res = await fetch("http://localhost:5000/api/admin/services", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setApplications(data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status, reason = "") => {
    await fetch(`http://localhost:5000/api/admin/services/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, rejectionReason: reason }),
    });

    fetchApplications();
  };

  const handleReject = (appId) => {
    setSelectedAppId(appId);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    updateStatus(selectedAppId, "Rejected", rejectReason);
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedAppId(null);
  };

  const cancelReject = () => {
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedAppId(null);
  };

  const pending = applications.filter((a) => a.status === "Pending");
  const approved = applications.filter((a) => a.status === "Approved");
  const rejected = applications.filter((a) => a.status === "Rejected");

  const getFilteredApplications = () => {
    switch (activeFilter) {
      case "Pending":
        return pending;
      case "Approved":
        return approved;
      case "Rejected":
        return rejected;
      default:
        return pending;
    }
  };

  const filteredApps = getFilteredApplications();

  return (
    <div className="manage-services">
      <h2>Service Applications Management</h2>

      {/* FILTER BUTTONS */}
      <div className="filter-buttons">
        <button
          className={`filter-btn pending-btn ${
            activeFilter === "Pending" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("Pending")}
        >
          🕒 Pending ({pending.length})
        </button>

        <button
          className={`filter-btn approved-btn ${
            activeFilter === "Approved" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("Approved")}
        >
          ✅ Approved ({approved.length})
        </button>

        <button
          className={`filter-btn rejected-btn ${
            activeFilter === "Rejected" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("Rejected")}
        >
          ❌ Rejected ({rejected.length})
        </button>
      </div>

      {/* APPLICATIONS DISPLAY */}
      <section className={`applications-section ${activeFilter.toLowerCase()}`}>
        <h3>
          {activeFilter === "Pending" && "🕒 Pending Applications"}
          {activeFilter === "Approved" && "✅ Approved Applications"}
          {activeFilter === "Rejected" && "❌ Rejected Applications"}
        </h3>

        {filteredApps.length === 0 && (
          <p className="no-data">
            No {activeFilter.toLowerCase()} applications
          </p>
        )}

        <div className="cards-container">
          {filteredApps.map((app) => (
            <div
              className={`service-card ${activeFilter.toLowerCase()}-card`}
              key={app._id}
            >
              <p>
                <b>Name:</b> {app.fullName}
              </p>
              <p>
                <b>Service:</b> {app.serviceType}
              </p>
              <p>
                <b>Phone:</b> {app.mobile || "N/A"}
              </p>
              <p>
                <b>Address:</b> {app.address || "N/A"}
              </p>
              <p>
                <b>Date:</b>{" "}
                {app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* VIEW UPLOADED DOCUMENTS */}
              {app.documents && Object.keys(app.documents).length > 0 && (
                <div className="documents-section">
                  <b>📄 Uploaded Documents:</b>
                  <div className="documents-list">
                    {Object.entries(app.documents).map(
                      ([key, value], index) => (
                        <a
                          key={index}
                          href={`http://localhost:5000${value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="document-link"
                        >
                          📎 {key}
                        </a>
                      )
                    )}
                  </div>
                </div>
              )}

              {activeFilter === "Rejected" && app.rejectionReason && (
                <div className="rejection-reason">
                  <b>Rejection Reason:</b>
                  <p>{app.adminRemark}</p>
                </div>
              )}

              {activeFilter === "Pending" && (
                <div className="actions">
                  <button
                    className="approve-btn"
                    onClick={() => updateStatus(app._id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => handleReject(app._id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* REJECT REASON MODAL */}
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="reject-modal">
            <h3>❌ Reject Application</h3>
            <p>Please provide a reason for rejecting this application:</p>

            <textarea
              className="reject-textarea"
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows="5"
            />

            <div className="modal-actions">
              <button className="confirm-reject-btn" onClick={confirmReject}>
                Confirm Reject
              </button>
              <button className="cancel-btn" onClick={cancelReject}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
