const express = require("express");
const app = express();
app.set("view engine", "ejs");

const cookieSessionModule = require("cookie-session");

const cookieInitializationParams = {
  name: "sv-visit-count-cookie",
  keys: ["encryptionkey"],
  expirationAge: 7 * 24 * 3600 * 1000,
};

const cookieMiddleware = cookieSessionModule(cookieInitializationParams);
app.use(cookieMiddleware);

const visitMiddleware = (req, res, next) => {
  let { visits } = req.session;
  visits ||= 0;
  req.session.visits = visits;
  req.session.visits += 1;
  next();
};

app.get("/", (req, res, next) => {
  let { visits } = req.session;
  visits ||= 0;
  req.session.visits = visits;
  req.session.visits += 1;
  if (req.session.authenticated) {
    res.render("premium", {
      visits: req.session.visits,
      authenticated: req.session.authenticated,
    });
  } else {
    if (req.session.visits <= 10) {
      res.render("premium", {
        visits: req.session.visits,
        authenticated: req.session.authenticated,
      });
    } else {
      res.render("blocked", {
        visits: req.session.visits,
        authenticated: req.session.authenticated,
      });
    }
  }

  next();
});

app.get("/login", (req, res) => {
  req.session.authenticated = true;
  res.redirect("/");
});
app.get("/logout", (req, res) => {
  req.session.authenticated = false;
  res.redirect("/");
});

app.listen(80, "0.0.0.0", () => {
  console.log("running");
});
