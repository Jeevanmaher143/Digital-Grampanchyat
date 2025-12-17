import React, { useEffect, useState } from "react";
import "./ManageDevelopment.css";

const ManageDevelopment = () => {
  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    progress: "",
    description: "",
  });

  const [form, setForm] = useState({
    projectName: "",
    description: "",
    progress: "",
    fundsUsed: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    const res = await fetch("http://localhost:5000/api/development");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
  };

  // FORM CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD PROJECT
  const submitProject = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    await fetch("http://localhost:5000/api/development", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setForm({
      projectName: "",
      description: "",
      progress: "",
      fundsUsed: "",
    });
    setImages([]);
    fetchProjects();
  };

  // UPDATE PROJECT
  const updateProject = async (id) => {
    await fetch(`http://localhost:5000/api/development/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        progress: Number(editData.progress),
        description: editData.description,
      }),
    });

    setEditingId(null);
    setEditData({ progress: "", description: "" });
    fetchProjects();
  };

  // MARK COMPLETED
  const markCompleted = async (id) => {
    await fetch(`http://localhost:5000/api/development/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress: 100 }),
    });

    fetchProjects();
  };

  return (
    <div className="manage-development">
      <h2>Village Development Projects</h2>

      {/* ADD PROJECT FORM */}
      <form className="dev-form" onSubmit={submitProject}>
        <input
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="fundsUsed"
          placeholder="Funds Used (₹)"
          value={form.fundsUsed}
          onChange={handleChange}
        />

        <input
          type="number"
          name="progress"
          placeholder="Progress %"
          value={form.progress}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <button type="submit">Add Project</button>
      </form>

      {/* PROJECT CARDS */}
      <div className="dev-list">
        {projects.map((p) => (
          <div className="dev-card" key={p._id}>
            <h4>{p.projectName}</h4>

            {editingId === p._id ? (
              <>
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editData.progress}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      progress: e.target.value,
                    })
                  }
                />

                <button onClick={() => updateProject(p._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{p.description}</p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${p.progress}%` }}
                  ></div>
                </div>

                <p>
                  <b>Progress:</b> {p.progress}%
                </p>
                <p>
                  <b>Funds Used:</b> ₹{p.fundsUsed}
                </p>

                {p.status !== "Completed" ? (
                  <div className="card-actions">
                    <button
                      onClick={() => {
                        setEditingId(p._id);
                        setEditData({
                          progress: p.progress,
                          description: p.description,
                        });
                      }}
                    >
                      Update Project
                    </button>

                    <button
                      className="complete-btn"
                      onClick={() => markCompleted(p._id)}
                    >
                      Mark Completed
                    </button>
                  </div>
                ) : (
                  <p className="done-text">✅ Project Completed</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDevelopment;
