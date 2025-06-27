require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://reicperevive-frontend.onrender.com", // replace with your actual frontend URL
];

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // This line parses incoming JSON requests
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Define Routes
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
