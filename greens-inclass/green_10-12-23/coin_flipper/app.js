const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("static_files"));

const static_file_router = express.static("static");
app.use(static_file_router);

app.get("/flip", (req, res) => {
  let outcome = Math.floor(Math.random() * 2);
  let display = ["win", "lose"][outcome];
  console.log(outcome, display);
  res.render(display);
});

var listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function () {
    console.log("server started");
  }
);
