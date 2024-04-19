const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");



const response = require("./utils/response");
const router = require("./routes/");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors(//{ origin: "http://localhost:3000" }
));



app.use(express.static("public"));
app.use("/", router);

app.get("/api-docs", (req, res) => {
  res.sendFile(__dirname + "/public/html/apiStarted.html");
})

app.get("/api-login", (req, res) => {
  res.sendFile(__dirname + "/public/html/login.html");
})

app.get("*", (req, res) => {
  response(404, "Route not found", res, null)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})



