import pool from "../config/db.js";

// Get answers for a question
export const getAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;
    const [rows] = await pool.query(
      "SELECT a.id, a.content, a.created_at, u.username FROM answers a JOIN users u ON a.user_id = u.id WHERE a.question_id = ? ORDER BY a.created_at DESC",
      [questionId]
    );
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch answers", details: error.message });
  }
};

// Post answer
export const postAnswer = async (req, res) => {
  try {
    const { questionId, content } = req.body;

    const [result] = await pool.query(
      "INSERT INTO answers (content, user_id, question_id) VALUES (?, ?, ?)",
      [content, req.user.id, questionId]
    );

    res
      .status(201)
      .json({ message: "Answer added", answerId: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to post answer", details: error.message });
  }
};
