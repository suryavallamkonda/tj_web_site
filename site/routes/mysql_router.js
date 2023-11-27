const express = require("express");
const router = express.Router();

router.get("/sql", (req, res) => {
  res.json("hi");
});

module.exports = router;
