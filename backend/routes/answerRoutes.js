const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");

// POST /api/answers/:questionId
router.post("/:questionId", answerController.createAnswer);

// GET /api/answers/:questionId
router.get("/:questionId", answerController.getAnswers);

module.exports = router;
