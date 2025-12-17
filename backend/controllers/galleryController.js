const Gallery = require("../models/Gallery");

// ADD IMAGE (ADMIN)
exports.addImage = async (req, res) => {
  try {
    const { caption, category } = req.body;

    const imagePath = `/uploads/images/${req.file.filename}`;

    const gallery = await Gallery.create({
      image: imagePath,
      caption,
      category,
    });

    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: "Image upload failed" });
  }
};

// GET ALL IMAGES (PUBLIC)
exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
};

// DELETE IMAGE (ADMIN)
exports.deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
