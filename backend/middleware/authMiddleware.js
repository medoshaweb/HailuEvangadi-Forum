// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // replace "secret" with your env secret
    req.user = decoded; // store token payload in req.user
    next(); //  pass control to the next middleware or route
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
};

module.exports = authenticate;
