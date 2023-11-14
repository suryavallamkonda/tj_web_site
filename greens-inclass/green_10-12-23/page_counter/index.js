#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("static_files"));

const static_files_router = express.static("static");
app.use(static_files_router);

let count = 0;

app.get("/", function (req, res) {
  count++;
  var obj = { visitor: count };
  console.log(obj);
  res.render("home", obj);
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.'

var listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function () {
    console.log("Express server started");
  }
);
