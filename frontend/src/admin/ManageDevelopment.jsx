import React, { useEffect, useState } from "react";
import "./ManageDevelopment.css";

const ManageDevelopment = () => {
  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  // ADD OR UPDATE PROJECT
  const submitProject = async (e) => {
    e.preventDefault();

    if (editingId) {
      // ✅ UPDATE
      await fetch(`http://localhost:5000/api/development/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: form.description,
          progress: Number(form.progress),
          fundsUsed: form.fundsUsed,
        }),
      });
    } else {
      // ✅ ADD
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
    }

    resetForm();
    fetchProjects();
  };

  // START EDIT (LOAD DATA INTO FORM)
  const startEdit = (project) => {
    setEditingId(project._id);
    setForm({
      projectName: project.projectName,
      description: project.description,
      progress: project.progress,
      fundsUsed: project.fundsUsed,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // RESET FORM
  const resetForm = () => {
    setEditingId(null);
    setForm({
      projectName: "",
      description: "",
      progress: "",
      fundsUsed: "",
    });
    setImages([]);
  };

  return (
    <div className="manage-development">
      <h2>Village Development Projects</h2>

      {/* ADD / UPDATE FORM */}
      <form className="dev-form" onSubmit={submitProject}>
        <input
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          required
          disabled={!!editingId} // 🔒 don't change name while editing
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

        {!editingId && (
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        )}

        <div className="form-actions">
          <button type="submit">
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* PROJECT CARDS */}
      <div className="dev-list">
        {projects.map((p) => (
          <div className="dev-card" key={p._id}>
            <h4>{p.projectName}</h4>

            <p>{p.description}</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${p.progress}%` }}
              ></div>
            </div>

            <p><b>Progress:</b> {p.progress}%</p>
            <p><b>Funds Used:</b> ₹{p.fundsUsed}</p>

            {p.status !== "Completed" ? (
              <div className="card-actions">
                <button onClick={() => startEdit(p)}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDevelopment;
