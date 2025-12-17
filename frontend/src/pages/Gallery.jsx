import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => setGallery(data));
  }, []);

  return (
    <div className="gallery-page">
      <h2>Village Gallery</h2>

      <div className="gallery-grid">
        {gallery.map((g) => (
          <div className="gallery-card" key={g._id}>
            <img src={`http://localhost:5000${g.image}`} alt="" />
            <h4>{g.caption}</h4>
            <p>{g.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
