const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const router = express.Router();
router.use(express.json());

const wordsFilePath = path.join(__dirname, "enable1.txt");
const words = fs.readFileSync(wordsFilePath).toString().split("\n");

router.get("/wordle/solver", (req, res) => {
  res.render("wordle/solver");
});

router.get("/wordfinder/:params", (req, res) => {
  console.log(req.query);
  console.log("on wordfinder");
  res.json({ a: "test" });
});

module.exports = router;
