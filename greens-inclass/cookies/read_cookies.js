const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/cookies", (req, res) => {
  const expirationDate = new Date(Date.now() + 3 * 86400 * 1000); // 3 days in ms
  let cookieName = "usvername";
  let cookieData = "svalue";

  res.cookie(cookieName, cookieData, { expires: expirationDate });
  res.render("cookie");
});

const listener = app.listen(
  process.env.PORT || 80,
  process.env.HOST || "0.0.0.0",
  function () {
    console.log("Express server started");
  }
);
