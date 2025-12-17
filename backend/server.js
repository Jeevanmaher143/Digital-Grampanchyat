const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();
console.log("Service routes loaded");
app.use("/api/auth", require("./routes/authRoutes"));
//app.use('/api/notices', require('./routes/noticeRoutes'));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/notices", require("./routes/noticeRoutes"));




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
