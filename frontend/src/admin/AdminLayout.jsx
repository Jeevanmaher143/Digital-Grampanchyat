import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* LEFT SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-title">
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-menu">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/notices">Notices</Link>
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/schemes">Schemes</Link>
          <Link to="/admin/development">Development</Link>
          <Link to="/admin/gallery">Gallery</Link>
          <Link to="/admin/complaints">Complaints</Link>
        </nav>

        <div className="admin-logout">
          <Link to="/login">Logout</Link>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
