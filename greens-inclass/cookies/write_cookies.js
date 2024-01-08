const express = require("express");
const app = express();

app.get("/cookies", (req, res) => {
  const expirationDate = new Date(Date.now() + 3 * 86400 * 1000); // 3 days in ms
  let cookieName = "usvername";
  let cookieData = "svalue";

  res.cookie(cookieName, cookieData, { expires: expirationDate });
  res.render("cookie");
});
