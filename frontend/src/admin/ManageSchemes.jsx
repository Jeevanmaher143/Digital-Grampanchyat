import React, { useEffect, useState } from "react";
import "./ManageSchemes.css";

const ManageSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    benefits: "",
    eligibility: "",
    applyProcess: "",
    schemeType: "Central",
  });

  const token = localStorage.getItem("token");

  const fetchSchemes = async () => {
    const res = await fetch("http://localhost:5000/api/schemes");
    const data = await res.json();
    setSchemes(data);
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addScheme = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/schemes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({
      title: "",
      description: "",
      benefits: "",
      eligibility: "",
      applyProcess: "",
      schemeType: "Central",
    });

    fetchSchemes();
  };

  const deleteScheme = async (id) => {
    await fetch(`http://localhost:5000/api/schemes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchSchemes();
  };

  return (
    <div className="manage-schemes">
      <h2>Manage Government Schemes</h2>

      <form className="scheme-form" onSubmit={addScheme}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <textarea name="benefits" placeholder="Benefits" value={form.benefits} onChange={handleChange} />
        <textarea name="eligibility" placeholder="Eligibility" value={form.eligibility} onChange={handleChange} />
        <textarea name="applyProcess" placeholder="Apply Process" value={form.applyProcess} onChange={handleChange} />

        <select name="schemeType" value={form.schemeType} onChange={handleChange}>
          <option value="Central">Central</option>
          <option value="State">State</option>
        </select>

        <button type="submit">Add Scheme</button>
      </form>

      <div className="scheme-list">
        {schemes.map((s) => (
          <div className="scheme-card" key={s._id}>
            <h4>{s.title}</h4>
            <p><strong>Type:</strong> {s.schemeType}</p>
            <button onClick={() => deleteScheme(s._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSchemes;
