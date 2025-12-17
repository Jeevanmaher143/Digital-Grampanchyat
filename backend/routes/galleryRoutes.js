const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  addImage,
  getImages,
  deleteImage,
} = require("../controllers/galleryController");

// PUBLIC
router.get("/", getImages);

// ADMIN
router.post("/", protect, adminOnly, upload.single("image"), addImage);
router.delete("/:id", protect, adminOnly, deleteImage);

module.exports = router;
