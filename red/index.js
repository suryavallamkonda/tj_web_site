const express = require("express");
const app = express();
const sql = require("sqlite3").verbose();
const db = new sql.Database("pokemon_database.db");

app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);

function sqlPromise(query, params = []) {
  return new Promise((resolve, reject) => {
    const fn = query.split(" ")[0].toUpperCase() === "SELECT" ? "all" : "run";
    if (params.length === 0) {
      db[fn](query, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    } else {
      db[fn](query, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    }
  });
}

app.get("/", async (req, res) => {
  let query = "SELECT * from PokemonSpecies";
  let results = await sqlPromise(query, []);
  let out = {
    results: results,
  };
  res.render("index", out);
});

app.post("/add_pokemon", async (req, res) => {
  const {
    name,
    type1,
    type2,
    base_hp,
    base_attack,
    base_defense,
    base_speed,
    move1,
    move2,
    move3,
    move4,
  } = req.body;

  const query = `
    INSERT INTO PokemonSpecies (name, type1, type2, base_hp, base_attack, base_defense, base_speed, move1, move2, move3, move4)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  let results = await sqlPromise(query, [
    name,
    type1,
    type2,
    base_hp,
    base_attack,
    base_defense,
    base_speed,
    move1,
    move2,
    move3,
    move4,
  ]);

  let out = {
    results: results,
  };
  res.redirect("/");
});

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function () {
    console.log("Express server started");
  }
);
