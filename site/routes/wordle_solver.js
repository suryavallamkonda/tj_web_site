const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
router.use(express.json());

const wordsFilePath = path.join(__dirname, "enable1.txt");
let words = fs.readFileSync(wordsFilePath).toString().split("\n");
words = words.filter((word) => word.length == 5);

// router.get("/wordle/solver", (req, res) => {
//   res.render("wordle/solver");
// });

// router.post("/wordfinder/", (req, res) => {
//   let { letter1, letter2, letter3, letter4, letter5 } = req.body;
//   console.log(letter1, letter2, letter3, letter4, letter5);
//   res.json({ guess: "test" });
// });

// module.exports = router;

// [.n..e] 'a' somewhere, no 'bf', ---- ankle
