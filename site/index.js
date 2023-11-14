const express = require("express");
app = express();

app.set("view engine", "ejs");
const static_files_router = express.static("static");
app.use(static_files_router);

let math_converter = require("./routes/math_converter_router.js");
let weather = require("./routes/weather_lab_router.js");
app.use(math_converter);
app.use(weather);

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
