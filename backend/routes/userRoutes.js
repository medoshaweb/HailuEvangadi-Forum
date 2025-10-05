const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// authentication middleware
const authenticate = require('../middleware/authMiddleware');

// POST /api/users/register
router.post("/register", userController.register);

// POST /api/users/login
router.post("/login", userController.login);

// GET /api/users/check
router.get("/check", authenticate, (req, res) => {
  // Only runs if token is valid
  if (!req.user) {
    return res.status(401).json({ msg: "Authentication invalid" });
  }

  res.status(200).json({
    msg: "You accessed a protected route!",
    user: req.user, // contains username & userId from JWT
  });
});

module.exports = router;
