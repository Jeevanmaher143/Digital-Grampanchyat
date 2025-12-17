const express = require("express");
const router = express.Router();
const ServiceApplication = require("../models/ServiceApplication");
const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");

router.post(
  "/apply",
  protect,
  upload.array("documents", 5),
  async (req, res) => {
    try {
      const { serviceType, fullName, address, mobile } = req.body;

      const files = req.files ? req.files.map(f => f.path) : [];

      const application = new ServiceApplication({
        serviceType,
        fullName,
        address,
        mobile,
        documents: files,
        appliedBy: req.user.id || req.user._id,
      });

      await application.save();

      res.status(201).json({
        message: "Service application submitted successfully",
      });
    } catch (err) {
      console.error("Apply Service Error:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
