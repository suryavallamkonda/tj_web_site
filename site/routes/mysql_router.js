const express = require("express");
const router = express.Router();

const sql = require("sqlite3").verbose();
const db = new sql.Database("database.db");

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

router.get("/sql", async (req, res) => {
  let query = "SELECT * FROM characters";
  let results = await sqlPromise(query, []);
  let out = {
    results: results,
  };
  res.render("mysql/sql_page", out);
});

router.get("/sql/equipment", async (req, res) => {
  let sqlquery = "SELECT * FROM equipment";
  let equipment = await sqlPromise(sqlquery, []);

  let out = {
    equipment: equipment,
  };
  res.render("mysql/equipment", out);
});

router.get("/sql/equipment/add_equipment", async (req, res) => {
  let {
    item_name,
    attack_modifier,
    defense_modifier,
    strength_modifier,
    magic_modifier,
    wit_modifier,
  } = req.query;
  let sqlquery =
    "INSERT INTO equipment (item, wit, strength, attack, defense, magic) VALUES (?, ?, ?, ?, ?, ?)";
  let sqlparams = [
    item_name,
    wit_modifier,
    strength_modifier,
    attack_modifier,
    defense_modifier,
    magic_modifier,
  ];
  let update = await sqlPromise(sqlquery, sqlparams);
  res.redirect("/sql/equipment");
});

router.get("/sql/equipment/remove_equipment", async (req, res) => {
  let { item } = req.query;
  let sqlquery = "DELETE FROM equipment WHERE item = ?";
  let update = await sqlPromise(sqlquery, [item]);

  res.redirect("/sql/equipment");
});

router.get("/sql/characters/:c_name", async (req, res) => {
  const { c_name } = req.params;
  let sqlquery = "SELECT * FROM characters WHERE c_name=(?)";
  let sqlparams = [c_name];
  let stats = await sqlPromise(sqlquery, sqlparams);

  let out = {
    stats: stats,
  };
  res.render("mysql/hero", out);
});

module.exports = router;
