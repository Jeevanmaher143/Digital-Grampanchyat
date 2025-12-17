import React, { useEffect, useState } from "react";
import "./ManageGallery.css";

const ManageGallery = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Event");
  const [gallery, setGallery] = useState([]);

  const token = localStorage.getItem("token");

  const fetchGallery = async () => {
    const res = await fetch("http://localhost:5000/api/gallery");
    const data = await res.json();
    setGallery(data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("category", category);

    await fetch("http://localhost:5000/api/gallery", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setCaption("");
    setImage(null);
    fetchGallery();
  };

  const deleteImage = async (id) => {
    await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchGallery();
  };

  return (
    <div className="manage-gallery">
      <h2>Manage Gallery</h2>

      <form onSubmit={uploadImage} className="gallery-form">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <input
          placeholder="Caption (e.g. Blood Donation Camp by XYZ)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Event</option>
          <option>Development</option>
          <option>Cultural</option>
        </select>
        <button type="submit">Upload</button>
      </form>

      <div className="gallery-grid">
        {gallery.map((g) => (
          <div className="gallery-card" key={g._id}>
            <img src={`http://localhost:5000${g.image}`} alt="" />
            <p>{g.caption}</p>
            <span>{g.category}</span>
            <button onClick={() => deleteImage(g._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGallery;
