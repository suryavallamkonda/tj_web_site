const express = require("express");
const math_converter_router = express.Router();
const static_files_router = express.static("static");
app.use(static_files_router);

math_converter_router.get("/numbers", (req, res) => {
  res.render("math_converter/number_form");
});

math_converter_router.get("/numbers_handler", (req, res) => {
  let form_number = req.query.number;
  res.redirect("/numbers/" + form_number);
});

math_converter_router.get("/numbers/:num", (req, res) => {
  const { num } = req.params;
  const moon_distance = num / 238900;
  const floz_ml = num * 29.5735;
  const gal_lit = num * 3.78541;
  const mph_kph = num * 1.60934;
  const divisors = (num) => {
    let divs = [];
    for (let i = 1; i < num + 1; i++) {
      if (num % i == 0) {
        divs.push(i);
      }
    }
    return divs;
  };
  const is_prime = (num) => {
    return divisors(num).length <= 2;
  };
  const out = {
    number: num,
    moon_distance: moon_distance,
    floz_ml: floz_ml,
    gal_lit: gal_lit,
    mph_kph: mph_kph,
    divisors: divisors(num),
    is_prime: is_prime(num),
  };
  if (req.query.format == "json") {
    res.json(out);
  } else {
    res.render("math_converter/number_facts", out);
  }
});

module.exports = math_converter_router;
