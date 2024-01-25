const express = require("express");
// const cors = require("cors");
app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(express.json());
// app.use(cors());

let math_converter = require("./routes/math_converter_router.js");
let weather = require("./routes/weather_lab_router.js");
let sql = require("./routes/mysql_router.js");
let wordle = require("./routes/wordle_solver.js");
app.use(math_converter);
app.use(weather);
app.use(sql);
app.use(wordle);

app.get("/", (req, res) => {
  res.render("home");
});

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function () {
    console.log("Express server started");
  }
);
