const db = require("../config/db"); // your db connection

// GET all questions
exports.getQuestions = async (req, res) => {
  const db = req.app.locals.db; // use the pool
  try {
    const [rows] = await db.query("SELECT * FROM question");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createQuestion = async (req, res) => {
  const db = req.app.locals.db; // your database connection
  const { question, question_description, user_id } = req.body;

  if (!question || !question_description || !user_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Insert the question
    const [result] = await db.query(
      "INSERT INTO question (question, question_description, user_id) VALUES (?, ?, ?)",
      [question, question_description, user_id]
    );

    // Fetch the newly created question
    const [rows] = await db.query(
      "SELECT * FROM question WHERE question_id = ?",
      [result.insertId]
    );

    // Return the full question object
    res.status(201).json({ message: "Question created", question: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
