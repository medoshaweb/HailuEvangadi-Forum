const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");


// GET /api/questions
// router.get("/all-questions", questionController.getQuestions);
router.get("/all-questions", (req, res)=>{
    res.send("all-questions")
})

// POST /api/questions
router.post("/", questionController.createQuestion);

module.exports = router;
