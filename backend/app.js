const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const userRoutes = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/schemes", require("./routes/schemeRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/development", require("./routes/developmentRoutes"));
app.use("/api/user", userRoutes);

module.exports = app;
