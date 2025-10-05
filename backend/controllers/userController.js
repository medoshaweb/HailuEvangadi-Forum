const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const db = req.app.locals.db; // use the pool
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO registration (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const userId = result.insertId;

    await db.query(
      "INSERT INTO profile (user_id, first_name, last_name) VALUES (?, ?, ?)",
      [userId, firstname, lastname]
    );

    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      userId,
      username,
      firstname,
      lastname,
      email,
    });
  } catch (err) {
    console.error("Error during register:", err.message);
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Username or email already exists" });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT r.user_id, r.username, r.password FROM registration r WHERE r.email = ?",
      [email]
    );

    if (!rows || rows.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { username: user.username, userId: user.user_id },
      process.env.JWT_SECRET, // replace with process.env.JWT_SECRET in production
      { expiresIn: "1d" }
    );

    return res.status(StatusCodes.OK).json({
      msg: "User login successful",
      token,
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

// CHECK USER (Protected route)
exports.checkUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const { username, userId } = req.user;
  const db = req.app.locals.db;

  try {
    const [rows] = await db.query("SELECT * FROM registration");

    return res.status(StatusCodes.OK).json({
      msg: "Valid user",
      username,
      userId,
      registrations: rows,
    });
  } catch (err) {
    console.error("Error fetching registrations:", err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};
