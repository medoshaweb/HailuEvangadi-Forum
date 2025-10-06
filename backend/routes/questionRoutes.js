const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");


// GET /api/questions
// router.get("/all-questions", questionController.getQuestions);
router.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [rows] = await db.query(
      "SELECT * FROM question ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/question/  → to add a new question
router.post("/", async (req, res) => {
  try {
    const { user_id, question, question_description } = req.body;
    const db = req.app.locals.db;

    const [result] = await db.query(
      "INSERT INTO question (user_id, question, question_description) VALUES (?, ?, ?)",
      [user_id, question, question_description]
    );

    res.status(201).json({
      question_id: result.insertId,
      user_id,
      question,
      question_description,
    });
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ message: "Failed to add question" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { id } = req.params;
    const [rows] = await (
      await db()
    ).query("SELECT * FROM question WHERE question_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching question detail:", error);
    res.status(500).json({ message: "Error fetching question detail" });
  }
});

module.exports = router;
