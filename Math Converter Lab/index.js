const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/numbers", (req, res) => {
  res.render("number_form");
});

app.get("/numbers_handler", (req, res) => {
  let form_number = req.query.number;
  res.redirect("/numbers/" + form_number);
});

app.get("/numbers/:num", (req, res) => {
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

  //   console.log(
  //     moon_distance,
  //     floz_ml,
  //     gal_lit,
  //     mph_kph,
  //     divisors(num),
  //     is_prime(num)
  //   );

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
    res.render("number_facts", out);
  }
});

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  () => console.log("server started")
);
