const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const {
  addNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

// PUBLIC
router.get("/", getAllNotices);

// ADMIN
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("attachment"), // 🔥 REQUIRED
  addNotice
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("attachment"),
  updateNotice
);

router.delete("/:id", protect, adminOnly, deleteNotice);
router.post("/", protect, adminOnly, addNotice);


module.exports = router;
