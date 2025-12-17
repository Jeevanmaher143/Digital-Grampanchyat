import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./UserProfile.css";

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch(() => console.log("Failed to load profile"));
  }, [token]);

  if (!profile) return <p>Loading profile...</p>;

  const { user, services } = profile;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {/* BASIC DETAILS */}
      <div className="profile-card">
        <h3>Basic Information</h3>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Village:</b> {user.village}</p>
        <p><b>Mobile:</b> {user.mobile}</p>
      </div>

      {/* SERVICES */}
      <div className="profile-card">
        <h3>Your Applications</h3>
        {services.length === 0 ? (
          <p>No services applied</p>
        ) : (
          services.map((s) => (
            <div key={s._id} className={`service-status ${s.status.toLowerCase()}`}>
              <p><b>Service:</b> {s.serviceType}</p>
              <p><b>Status:</b> {s.status}</p>
              <p><b>Date:</b> {new Date(s.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
