const express = require("express");
const mysql2 = require('mysql2')
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

const dbConnection = mysql2.createPool({
  user:"evangadi-admin",
  database:"evangadi_forum",
  host:"localhost",
  password:"123456",
  connectionLimit:10
})

dbConnection.execute("select 'test'",(err,result)=>{
  if(err){
    console.log (err.message)
  }else{
    console.log(result)
  }
})

// const userRoutes = require("./routes/userRoutes");
// const questionRoutes = require("./routes/questionRoutes");
// const answerRoutes = require("./routes/answerRoutes");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes with /api prefix
// app.use("/api/users", userRoutes);
// app.use("/api/questions", questionRoutes);
// app.use("/api/answers", answerRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(` Server running on http://localhost:${PORT}`);
// });
