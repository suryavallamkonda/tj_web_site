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
  // console.log(results);
  let out = {
    results: results,
  };
  res.render("mysql/sql_page", out);
});

router.post("/sql/heros/update_hero", async (req, res) => {
  const { hero_id, wit_u, strength_u, attack_u, defense_u, magic_u } = req.body;
  // let sqlquery = "SELECT * FROM characters WHERE c_id=(?)";
  // let sqlparams = [hero_id];
  // let stats = await sqlPromise(sqlquery, sqlparams);
  res.redirect(`/sql/heros/${hero_id}`);
});

router.get("/sql/heros/:c_id", async (req, res) => {
  const { c_id } = req.params;
  let sqlquery = "SELECT * FROM characters WHERE c_id=(?)";
  let sqlparams = [c_id];
  let stats = await sqlPromise(sqlquery, sqlparams);
  let out = {
    stats: stats[0],
  };
  res.render("mysql/hero", out);
});

/* EQUIPMENT */

router.get("/sql/equipment", async (req, res) => {
  let sqlquery = "SELECT * FROM equipment";
  let equipment = await sqlPromise(sqlquery, []);

  let out = { equipment: equipment };
  res.render("mysql/equipment", out);
});

router.post("/sql/equipment/add_equipment", async (req, res) => {
  let {
    item_name,
    lore,
    attack_modifier,
    defense_modifier,
    strength_modifier,
    magic_modifier,
    wit_modifier,
  } = req.body;
  let sqlquery = `
              INSERT INTO equipment (id, item, lore, hero, wit, strength, attack, defense, magic) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let latest_id = await sqlPromise("SELECT MAX(id) FROM equipment", []);
  let new_id = parseInt(latest_id) + 1;
  let sqlparams = [
    new_id,
    item_name,
    lore,
    "UNEQUIPPED",
    wit_modifier,
    strength_modifier,
    attack_modifier,
    defense_modifier,
    magic_modifier,
  ];
  await sqlPromise(sqlquery, sqlparams);
  res.redirect("/sql/equipment");
});

router.post("/sql/equipment/remove_equipment", async (req, res) => {
  let { equipment_id } = req.body;
  if (equipment_id == 10000) {
    console.error("cannot delete this item");
  } else {
    let sqlquery = "DELETE FROM equipment WHERE id = ?";
    await sqlPromise(sqlquery, [equipment_id]);
  }
  res.redirect("/sql/equipment");
});

router.get("/sql/equipment/assign_equipment", async (req, res) => {});

/* QUESTS */

router.get("/sql/quests", async (req, res) => {
  let query = "SELECT * FROM quests";
  let quests = await sqlPromise(query, []);
  let out = { quests: quests };
  res.render("mysql/quests", out);
});

router.post("/sql/quests/add_quest", async (req, res) => {
  let {
    name,
    description,
    wit_req,
    strength_req,
    attack_req,
    defense_req,
    magic_req,
  } = req.body;
  let query = `
            INSERT INTO quests (id, name, description, hero, wit_req, strength_req, attack_req, defense_req, magic_req)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let latest_id = await sqlPromise("SELECT MAX(id) FROM quests", []);
  let new_id = parseInt(latest_id) + 1;
  let params = [
    new_id,
    name,
    description,
    "UNCLAIMED",
    wit_req,
    strength_req,
    attack_req,
    defense_req,
    magic_req,
  ];
  await sqlPromise(query, params);
  res.redirect("/sql/quests");
});

router.post("/sql/quests/remove_quest", async (req, res) => {
  let { quest_id } = req.body;
  if (quest_id == 9000) {
    console.error("cannot delete this quest");
  } else {
    let query = "DELETE FROM quests WHERE id = ?";
    await sqlPromise(query, [quest_name]);
  }
  res.redirect("/sql/quests");
});

router.get("/sql/quests/assign_quest", async (req, res) => {});

module.exports = router;
