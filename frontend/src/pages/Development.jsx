import React, { useEffect, useState } from "react";
import "./Development.css";

const Development = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/development")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching development:", err));
  }, []);

  return (
    <div className="development-page">
      <h2>Village Development Status</h2>

      {projects.length === 0 && <p>No development projects available.</p>}

      {projects.map((p) => (
        <div className="dev-card" key={p._id}>
          <h3>{p.projectName}</h3>
          <p>{p.description}</p>

          {/* PROGRESS BAR */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${p.progress}%` }}
            ></div>
          </div>

          <p><b>Progress:</b> {p.progress}%</p>
          <p><b>Status:</b> {p.status}</p>
          <p><b>Funds Used:</b> ₹{p.fundsUsed}</p>

          {/* DEVELOPMENT IMAGES */}
          {p.images && p.images.length > 0 && (
            <div className="dev-images">
              {p.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000${img}`}
                  alt="Development Work"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Development;
