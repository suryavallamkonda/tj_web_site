const express = require("express");
let https = require("https");

const router = express.Router();
const app = express();

router.get("/weather_form", (req, res) => {
  res.render("weather_form");
});
