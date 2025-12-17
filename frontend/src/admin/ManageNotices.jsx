import React, { useEffect, useState } from "react";
import "./ManageNotices.css";

const ManageNotices = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [file, setFile] = useState(null);

  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [message, setMessage] = useState("");
  const [viewNotice, setViewNotice] = useState(null);

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchNotices = async () => {
    const res = await fetch("http://localhost:5000/api/notices");
    const data = await res.json();
    setNotices(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // ================= ADD =================
  const addNotice = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("isImportant", isImportant);
    if (file) formData.append("attachment", file);

    await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setTitle("");
    setDescription("");
    setIsImportant(false);
    setFile(null);
    setMessage("✅ Notice added successfully");
    fetchNotices();
  };

  // ================= DELETE =================
  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    await fetch(`http://localhost:5000/api/notices/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage("🗑 Notice deleted");
    fetchNotices();
  };

  // ================= EDIT =================
  const startEdit = (notice) => {
    setEditingId(notice._id);
    setEditTitle(notice.title);
    setEditDescription(notice.description);
  };

  const updateNotice = async (id) => {
    await fetch(`http://localhost:5000/api/notices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
      }),
    });

    setEditingId(null);
    setViewNotice(null);
    setMessage("✏️ Notice updated successfully");
    fetchNotices();
  };

  return (
    <div className="manage-notices">
      <h2>Manage Notices</h2>
      {message && <p className="success-msg">{message}</p>}

      {/* ADD FORM */}
      <form className="notice-form" onSubmit={addNotice}>
        <input
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Notice Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="important-checkbox">
          <input
            type="checkbox"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          Mark as Important
        </label>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">Add Notice</button>
      </form>

      {/* NOTICE CARDS */}
      <div className="notice-list">
        {notices.map((n) => (
          <div className="notice-card" key={n._id}>
            <h4>{n.title}</h4>
            <p>{n.description}</p>

            <div className="card-actions">
              <button className="view-btn" onClick={() => setViewNotice(n)}>
                View
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteNotice(n._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW MODAL */}
      {viewNotice && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{viewNotice.title}</h3>

            {editingId === viewNotice._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </>
            ) : (
              <p>{viewNotice.description}</p>
            )}

            {viewNotice.attachment && (
              <a
                href={`http://localhost:5000${viewNotice.attachment}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 View Attachment
              </a>
            )}

            <div className="modal-actions">
              {editingId === viewNotice._id ? (
                <button onClick={() => updateNotice(viewNotice._id)}>
                  Save
                </button>
              ) : (
                <button onClick={() => startEdit(viewNotice)}>Edit</button>
              )}

              <button
                className="close-btn"
                onClick={() => {
                  setViewNotice(null);
                  setEditingId(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotices;
