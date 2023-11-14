const express = require("express");
const { hello_world, template } = require("./test");

const app = express();

app.set("view engine", "ejs");

const static_files_router = express.static("static");
app.use(static_files_router);

app.get("/", hello_world);

const static_func = function (req, res) {
  res.render("index");
};

app.get("/template", static_func);

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function () {
    console.log("Express server started");
  }
);
