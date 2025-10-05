const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;


// Import routes
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
 const authenticate = require('./middleware/authMiddleware')
const answerRoutes = require("./routes/answerRoutes");

const initDB = require("./config/db");


async function start() {
  try {
    const db = await initDB(); //  Call the function

    // Save pool in app.locals to use in controllers
    app.locals.db = db;

    // Routes with /api prefix
    app.use("/api", userRoutes);
    app.use("/api/question", authenticate, questionRoutes);
    app.use("/api/answer", answerRoutes);

    // Global error handler (put this at the end, before app.listen)
    app.use((err, req, res, next) => {
      console.error(" SERVER ERROR:", err);
      res.status(500).json({ message: "Server crashed", error: err.message });
    });

    // Test query
    // const [result] = await db.execute("SELECT 'test' AS test_col");
    // console.log("Database connection established:", result);

    app.listen(port, () => {
      console.log(` Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Startup error:", error.message);
  }
}

start();
