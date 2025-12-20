import React, { useEffect, useState } from "react";
import "./Development.css";

const Development = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/development");
        if (!res.ok) throw new Error("Failed to fetch projects");
        
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError("Unable to load development projects");
        console.error("Error fetching development:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    const statusMap = {
      "completed": "status-completed",
      "in-progress": "status-progress",
      "ongoing": "status-progress",
      "planned": "status-planned",
      "pending": "status-pending"
    };
    return statusMap[status?.toLowerCase()] || "status-default";
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return "progress-high";
    if (progress >= 40) return "progress-medium";
    return "progress-low";
  };

  const filteredProjects = projects.filter(p => {
    if (filter === "all") return true;
    return p.status?.toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="dev-container">
        <div className="dev-loading">
          <div className="spinner"></div>
          <p>Loading development projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dev-container">
        <div className="dev-error">
          <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dev-container">
      <div className="dev-content">
        {/* Header Section */}
        <div className="dev-header">
          <div className="header-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="dev-title">Village Development</h1>
          <p className="dev-subtitle">Track progress of ongoing development projects in our village</p>

          {/* Statistics */}
          <div className="dev-stats">
            <div className="stat-card">
              <div className="stat-icon stat-total">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="stat-info">
                <h3>{projects.length}</h3>
                <p>Total Projects</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-progress">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="stat-info">
                <h3>{projects.filter(p => p.status?.toLowerCase() === "in-progress" || p.status?.toLowerCase() === "ongoing").length}</h3>
                <p>In Progress</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-completed">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-info">
                <h3>{projects.filter(p => p.status?.toLowerCase() === "completed").length}</h3>
                <p>Completed</p>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons">
            <button 
              className={filter === "all" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("all")}
            >
              All Projects
            </button>
            <button 
              className={filter === "in-progress" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("in-progress")}
            >
              In Progress
            </button>
            <button 
              className={filter === "completed" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button 
              className={filter === "planned" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("planned")}
            >
              Planned
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="dev-empty">
            <div className="empty-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p>No development projects available</p>
          </div>
        ) : (
          <div className="dev-grid">
            {filteredProjects.map((project) => (
              <div className="dev-card" key={project._id}>
                <div className="card-header">
                  <h3 className="project-name">{project.projectName}</h3>
                  <span className={`status-badge ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <p className="project-description">{project.description}</p>

                {/* Progress Section */}
                <div className="progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Project Progress</span>
                    <span className="progress-percentage">{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    >
                      <span className="progress-shine"></span>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="project-details">
                  <div className="detail-item">
                    <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="detail-label">Funds Used</p>
                      <p className="detail-value">₹{project.fundsUsed?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Development Images */}
                {project.images && project.images.length > 0 && (
                  <div className="dev-images">
                    <h4 className="images-title">Project Photos</h4>
                    <div className="images-grid">
                      {project.images.map((img, index) => (
                        <div className="image-wrapper" key={index}>
                          <img
                            src={`http://localhost:5000${img}`}
                            alt={`${project.projectName} - Image ${index + 1}`}
                            loading="lazy"
                          />
                          <div className="image-overlay">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Development;