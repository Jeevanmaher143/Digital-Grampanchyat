import React, { useEffect, useState } from "react";
import "./Scheme.css";

const Scheme = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/schemes")
      .then((res) => res.json())
      .then((data) => setSchemes(data));
  }, []);

  return (
    <div className="scheme-container">
      <h2 className="scheme-title">Government Schemes</h2>

      {schemes.map((s) => (
        <div className="scheme-card" key={s._id}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p><b>Benefits:</b> {s.benefits}</p>
          <p><b>Eligibility:</b> {s.eligibility}</p>
        </div>
      ))}
    </div>
  );
};

export default Scheme;
