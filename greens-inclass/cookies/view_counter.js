const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/cookie_views", (req, res) => {
  let { visit_count } = req.cookies;
  if (isNaN(visit_count)) {
    visit_count = 1;
  }
  newCookieValue = Number(visit_count);
  newCookieValue += 1;

  const expirationDate = new Date(Date.now() + 3 * 86400 * 1000); // 3 days in ms
  let cookieName = "visit_count";

  res.cookie(cookieName, newCookieValue, { expires: expirationDate });
  res.render("cookie");
});

const listener = app.listen(
  process.env.PORT || 80,
  process.env.HOST || "0.0.0.0",
  function () {
    console.log("Express server started");
  }
);
