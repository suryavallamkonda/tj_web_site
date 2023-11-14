const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("form");
});

app.get("/get_results", (req, res) => {
  const args = ({ get_name, get_age } = req.query);
  let out = {};
  for (const arg in args) {
    if (args[arg] != "") {
      out[arg] = args[arg];
    } else {
      out[arg] = "undefined";
    }
  }
  res.render("get_results", out);
});

app.post("/post_results", (req, res) => {
  const args = ({ post_name, post_age } = req.body);
  let out = {};
  for (const arg in args) {
    if (args[arg] != "") {
      out[arg] = args[arg];
    } else {
      out[arg] = "undefined";
    }
  }
  res.render("post_results", out);
});

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  () => {
    console.log("server started");
  }
);
