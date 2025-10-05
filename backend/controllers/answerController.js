
const dbPromise = require("../config/db");

// GET all answers
exports.getAnswers = async (req, res) => {
  const db = req.app.locals.db; // use the pool from app.locals
  try {
    const [rows] = await db.query("SELECT * FROM answer");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE a new answer
exports.createAnswer = async (req, res) => {
  const db = req.app.locals.db; // use the pool from app.locals
  const { question_id, user_id, answer } = req.body;

  if (!question_id || !user_id || !answer) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO answer (question_id, user_id, answer) VALUES (?, ?, ?)",
      [question_id, user_id, answer]
    );
    res
      .status(201)
      .json({ message: "Answer created", answerId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
