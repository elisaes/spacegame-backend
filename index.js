require("dotenv").config();
const express = require("express");
const app = express();

require("./config/db"); //calls my mongoose connection to cleanup thois file
app.use(express.json()); //allows me to use json files send from backend

const cors = require("cors");

// 404 errors
app.use(cors());

app.use("/auth", require("./routes/auth.route"));

// app.get("*", (req, res) => {
//   res.status(404).json({ message: "estas perdido", code: "EB404" });
// });

app.listen(process.env.PORT, () => {
  console.log("runing on" + process.env.PORT);
});


// app.

app.get("/", (req,res) => {res.send("u are at root")})