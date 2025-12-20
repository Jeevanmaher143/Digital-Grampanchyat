import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then(setImages);
  }, []);

  return (
    <div>
      <h2>Village Gallery</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 15 }}>
        {images.map((img) => (
          <img
            key={img._id}
            src={`http://localhost:5000${img.image}`}
            alt=""
            style={{ width: "100%", height: 200, objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
