const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const tradeRoutes = require("./routes/tradeRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDatabase();

// // Routes
app.use("/api/user", require("./routes/authRoutes"));
app.use("/api/trades", require("./routes/tradeRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
