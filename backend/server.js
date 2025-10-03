const express = require("express");
// /const mysql2 = require('mysql2')
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();
const app = express();
const port =5000

//db Connection
const dbConnection = require("./config/db")


// user routes middleware file
const userRoutes = require("./routes/userRoutes");
//const questionRoutes = require("./routes/questionRoutes");
//const answerRoutes = require("./routes/answerRoutes");

// Routes with /api prefix
app.use("/api", userRoutes);
//app.use("/api/questions", questionRoutes);
//app.use("/api/answers", answerRoutes);

async function start(){

  try{
    const result = await dbConnection.execute("select 'test'")
  }catch(error){
    console.log(error.message)
  }
}


app.listen(port,(err)=>{
  if(err){
      console.log(err.message);
  }else{
    console.log(`listening on ${port}`);
  }
})

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());



// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(` Server running on http://localhost:${PORT}`);
// });



