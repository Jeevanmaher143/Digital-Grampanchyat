import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  // Dummy analytics data (later you can fetch from backend)
  const analytics = {
    totalProjects: 12,
    totalIssues: 5,
    approvedDocs: 20,
    rejectedDocs: 3,
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <p className="dashboard-subtitle">
        Welcome to Digital Gram Panchayat Admin Panel
      </p>

      <div className="dashboard-boxes">
        <div className="dashboard-card">
          <h3>Total Projects</h3>
          <p>{analytics.totalProjects}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Issues</h3>
          <p>{analytics.totalIssues}</p>
        </div>

        <div className="dashboard-card">
          <h3>Approved Documents</h3>
          <p>{analytics.approvedDocs}</p>
        </div>

        <div className="dashboard-card">
          <h3>Rejected Documents</h3>
          <p>{analytics.rejectedDocs}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
