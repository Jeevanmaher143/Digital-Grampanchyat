import React from "react";
import "./LatestNotices.css";

const notices = [
  {
    id: 1,
    title: "Gram Sabha Meeting",
    date: "15 Sep 2025",
    description: "Gram Sabha meeting will be held at Panchayat office at 11 AM."
  },
  {
    id: 2,
    title: "Water Supply Maintenance",
    date: "18 Sep 2025",
    description: "Water supply will be unavailable from 10 AM to 2 PM."
  },
  {
    id: 3,
    title: "Birth Certificate Camp",
    date: "20 Sep 2025",
    description: "Special camp for birth certificate applications."
  }
];

const NoticesPreview = () => {
  return (
    <div className="notice-section">
      <h2>Latest Notices & Announcements</h2>

      <div className="notice-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-card">
            <h3>{notice.title}</h3>
            <span className="notice-date">{notice.date}</span>
            <p>{notice.description}</p>
          </div>
        ))}
      </div>

      <div className="notice-btn">
        <button>View All Notices</button>
      </div>
    </div>
  );
};

export default NoticesPreview;
