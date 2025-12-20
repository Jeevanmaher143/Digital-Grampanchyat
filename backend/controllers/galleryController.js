const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

// ADD IMAGE
exports.addImage = async (req, res) => {
  try {
    const gallery = new Gallery({
      caption: req.body.caption,
      image: `/uploads/gallery/${req.file.filename}`, // PUBLIC PATH
    });

    await gallery.save();
    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ message: "Gallery upload failed" });
  }
};

// GET IMAGES
exports.getImages = async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  res.json(images);
};

// DELETE IMAGE
exports.deleteImage = async (req, res) => {
  const image = await Gallery.findById(req.params.id);

  if (image) {
    const filePath = path.join(__dirname, "..", image.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await image.deleteOne();
  }

  res.json({ message: "Image deleted" });
};
