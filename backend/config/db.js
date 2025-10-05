// config/db.js
const mysql = require("mysql2/promise");
require("dotenv").config();
// console.log("Loaded ENV:", process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME, process.env.JWT_SECRET);


const databaseName = "evangadi_forum";

async function initDB() {
  try {
    // Step 1: Connect without selecting DB
    const initialConnection = await mysql.createConnection({
      host: "localhost",
      user: "evangadiAdmin",
      password: "123456",
    });

    // Step 2: Create database if it doesn't exist
    await initialConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${databaseName}\``
    );
    console.log(` Database '${databaseName}' is ready!`);
    await initialConnection.end();

    // Step 3: Create pool for the database
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, 
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Step 4: Create tables
    const tables = [
      `CREATE TABLE IF NOT EXISTS registration (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,
      `CREATE TABLE IF NOT EXISTS profile (
        user_profile_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE
      );`,
      `CREATE TABLE IF NOT EXISTS question (
        question_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        question VARCHAR(255) NOT NULL,
        question_description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE
      );`,
      `CREATE TABLE IF NOT EXISTS answer (
        answer_id INT AUTO_INCREMENT PRIMARY KEY,
        question_id INT NOT NULL,
        user_id INT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE
      );`,
    ];

    for (const tableSQL of tables) {
      await pool.query(tableSQL);
    }
    console.log(" All tables created successfully!");

    return pool;
  } catch (err) {
    console.error("Database setup error:", err.message);
    process.exit(1);
  }
}

// Export a promise that resolves to the pool
module.exports = initDB;
