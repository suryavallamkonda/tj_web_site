const express = require("express");
let https = require("https");
const { type } = require("os");

const weather_lab_router = express.Router();

weather_lab_router.get("/weather", (req, res) => {
  res.render("weather_lab/weather_form");
});

weather_lab_router.get(
  "/weather_results",
  (req, res, next) => {
    let { latitude, longitude } = req.query;
    // latitude = parseFloat(latitude);
    // longitude = parseFloat(longitude);
    const url = `https://api.weather.gov/points/${latitude},${longitude}`;
    const options = {
      headers: { "User-Agent": "(weather app), (2024svallamk@tjhsst.edu)" },
    };
    https
      .get(url, options, (response) => {
        let raw = "";
        response.on("data", (chunk) => {
          raw += chunk;
        });
        response.on("end", function () {
          let obj = JSON.parse(raw);
          res.locals.forecast_url = obj["properties"]["forecast"];
          setTimeout(function () {
            next();
          }, 250);
        });
      })
      .on("error", (e) => {
        console.error(e);
      });
  },
  (req, res, next) => {
    const url = res.locals.forecast_url;
    const options = {
      headers: { "User-Agent": "(weather app), (2024svallamk@tjhsst.edu)" },
    };
    https
      .get(url, options, (response) => {
        let raw = "";
        response.on("data", (chunk) => {
          raw += chunk;
        });
        response.on("end", function () {
          let obj = JSON.parse(raw);
          //   console.log(obj);
          let temp = obj["properties"]["periods"][0]["temperature"];
          console.log(temp);
          res.locals.temperature = temp.toString();
          setTimeout(function () {
            next();
          }, 250);
        });
      })
      .on("error", (e) => {
        console.error(e);
      });
  },
  (req, res) => {
    let temp = res.locals.temperature;
    res.render("weather_lab/weather_forecast", { temp });
  }
);

module.exports = weather_lab_router;
