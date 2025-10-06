const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Port
const port = process.env.PORT || 5000;

// Import routes and middleware
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const authenticate = require("./middleware/authMiddleware");

// DB connection
const initDB = require("./config/db");

// Start server
async function start() {
  try {
    const db = await initDB(); // Initialize DB
    app.locals.db = db; // Make db accessible to routes/controllers

    //  Routes
    app.use("/api/users", userRoutes); // Public routes (login, signup)
    app.use("/api/questions", authenticate, questionRoutes); // Public for now (you can protect later)
    app.use("/api/answers", authenticate, answerRoutes); // Protected route

    //  Global error handler
    app.use((err, req, res, next) => {
      console.error("SERVER ERROR:", err);
      res.status(500).json({ message: "Server crashed", error: err.message });
    });

    //  Start listening
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (error) {
    console.error("Startup error:", error.message);
  }
}

start();
