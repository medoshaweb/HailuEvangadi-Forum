const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// ✅ Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Simple POST route to test body
app.post("/api/test-body", (req, res) => {
  console.log("✅ Received body:", req.body);
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`🚀 Test server running on http://localhost:${port}`);
});
