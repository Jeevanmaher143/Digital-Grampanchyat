import React, { useEffect, useState } from "react";
import "./UserNotices.css";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notices");
        if (!res.ok) throw new Error("Failed to fetch notices");

        const data = await res.json();

        if (Array.isArray(data)) {
          // 🔥 Important notices first, then latest
          const sorted = data.sort((a, b) => {
            if (a.isImportant === b.isImportant) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return b.isImportant - a.isImportant;
          });

          setNotices(sorted);
        } else {
          setNotices([]);
        }
      } catch (err) {
        setError("Unable to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return <p className="loading-text">Loading notices...</p>;
  if (error) return <p className="loading-text error">{error}</p>;

  return (
    <div className="user-notice-section">
      <h2>📢 Notice Board</h2>

      {notices.length === 0 ? (
        <p className="no-notice">No notices available</p>
      ) : (
        <div className="user-notice-list">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className={`user-notice-card ${
                notice.isImportant ? "important" : ""
              }`}
            >
              <h3>✦ {notice.title}</h3>

              <p className="notice-date">
                📅 {new Date(notice.createdAt).toLocaleDateString()}
              </p>

              <p className="notice-desc">{notice.description}</p>

              {notice.isImportant && (
                <span className="important-badge">IMPORTANT</span>
              )}

              {notice.attachment && (
                <a
                  href={`http://localhost:5000${notice.attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notice-download"
                >
                  📄 View / Download Document
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notices;
