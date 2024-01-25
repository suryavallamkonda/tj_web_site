const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
router.use(express.json());

// const wordsFilePath = path.join(__dirname, "enable1.txt");

// let words = [];

// try {
//   const data = fs.readFileSync(wordsFilePath, "utf8");
//   const wordArray = data.replace(/\r?\n/g, " ").split(" ");
//   wordList = wordArray.filter((word) => word.trim() !== "");
//   filtered = wordList.filter((word) => word.length == 5);
//   words = filtered;
// } catch (err) {
//   console.error("Error reading the file:", err);
// }

router.get("/wordle", (req, res) => {
  res.render("wordle/solver");
});

router.post("/wordfinder/", (req, res) => {
  let { letter1, letter2, letter3, letter4, letter5 } = req.body;
  let data = {
    letter1: letter1,
    letter2: letter2,
    letter3: letter3,
    letter4: letter4,
    letter5: letter5,
  };
  const letters = Object.values(data).map((v) => [v["letter"], v["color"]]);
  let pattern = "^";
  const addedLetters = new Set();
  for (let i = 0; i < letters.length; i++) {
    const [letter, color] = letters[i];
    if (color === "yellow") {
      if (!addedLetters.has(letter)) {
        pattern += `(?=.*(${letter})`;
        const numThisYellow = letters.filter(
          ([l, c]) => l === letter && c === "yellow"
        ).length;
        pattern += ".*\\1".repeat(numThisYellow - 1);
        pattern += ")";
        addedLetters.add(letter);
      }
      pattern += `(?!.{${i + 1}}${letter})`;
    } else if (color === "grey") {
      pattern += `(?!.*${letter})`;
    }
  }
  pattern += letters
    .map(([letter, color]) => (color === "green" ? letter : "."))
    .join("");
  pattern += "$";

  console.log(pattern);

  const regex = new RegExp(pattern);

  const wordsFilePath = path.join(__dirname, "enable1.txt");
  let words = [];

  try {
    const data = fs.readFileSync(wordsFilePath, "utf8");
    const wordArray = data.replace(/\r?\n/g, " ").split(" ");
    wordList = wordArray.filter((word) => word.trim() !== "");
    filtered = wordList.filter((word) => word.length == 5);
    words = filtered;
  } catch (err) {
    console.error("Error reading the file:", err);
  }

  let guesses = [];

  for (const word of words) {
    if (regex.test(word)) {
      guesses.push(word);
    }
  }

  res.json({ response: guesses });
});

module.exports = router;
