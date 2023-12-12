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
  let stats = await sqlPromise(sqlquery, [c_id]);

  let query2 = "SELECT equipment_id FROM assigned_equipment WHERE hero_id = ?";
  let res2 = await sqlPromise(query2, [c_id]);

  let equip = [
    {
      id: "-1",
      item: "None",
      lore: "None",
      wit: 0,
      strength: 0,
      attack: 0,
      defense: 0,
      magic: 0,
    },
  ];
  if (res2[0] != undefined) {
    let query3 = "SELECT * FROM equipment WHERE id = ?";
    equip = await sqlPromise(query3, [res2[0]["equipment_id"]]);
  }

  let query4 = "SELECT quest_id FROM assigned_quests WHERE hero_id = ?";
  let res3 = await sqlPromise(query4, [c_id]);

  let quest = [
    {
      id: -1,
      name: "None",
      description: "None",
      wit_req: 0,
      strength_req: 0,
      attack_req: 0,
      defense_req: 0,
      magic_req: 0,
    },
  ];
  if (res3[0] != undefined) {
    let query5 = "SELECT * FROM quests WHERE id = ?";
    quest = await sqlPromise(query5, [res3[0]["quest_id"]]);
  }

  console.log(quest[0]);

  let out = {
    stats: stats[0],
    equip: equip[0],
    quest: quest[0],
  };
  res.render("mysql/hero", out);
});

/* EQUIPMENT */

router.get("/sql/equipment", async (req, res) => {
  let sqlquery = "SELECT * FROM equipment";
  let equipment = await sqlPromise(sqlquery, []);

  let query2 = "SELECT c_name, c_id FROM characters";
  let heros = await sqlPromise(query2, []);

  // console.log(assigned);

  let out = { equipment: equipment, heros: heros };
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
              INSERT INTO equipment (id, item, lore, wit, strength, attack, defense, magic) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  let latest_id = await sqlPromise("SELECT MAX(id) FROM equipment", []);
  let new_id = latest_id[0]["MAX(id)"] + 1;
  let sqlparams = [
    new_id,
    item_name,
    lore,
    wit_modifier,
    strength_modifier,
    attack_modifier,
    defense_modifier,
    magic_modifier,
  ];
  await sqlPromise(sqlquery, sqlparams);

  let query2 =
    "INSERT INTO assigned_equipment (hero_id, equipment_id) VALUES (?, ?)";
  await sqlPromise(query2, [-1, new_id]);

  res.redirect("/sql/equipment");
});

router.post("/sql/equipment/remove_equipment", async (req, res) => {
  let { equipment_id } = req.body;
  if (equipment_id == 10000) {
    console.error("cannot delete this item");
  } else {
    let sqlquery = "DELETE FROM equipment WHERE id = ?";
    await sqlPromise(sqlquery, [equipment_id]);
    let query2 = "DELETE FROM assigned_equipment WHERE equipment_id = ?";
    await sqlPromise(query2, [equipment_id]);
  }
  res.redirect("/sql");
});

router.post("/sql/equipment/assign_equipment", async (req, res) => {
  const { equipment_id, hero_id } = req.body;
  if (equipment_id == 10000) {
    console.error("cannot modify this item");
  } else {
    let query =
      "UPDATE assigned_equipment SET hero_id = ? WHERE equipment_id = ?";
    await sqlPromise(query, [hero_id, equipment_id]);
  }
  res.redirect("/sql");
});

/* QUESTS */

router.get("/sql/quests", async (req, res) => {
  let query = "SELECT * FROM quests";
  let quests = await sqlPromise(query, []);

  let query2 = "SELECT c_name, c_id FROM characters";
  let heros = await sqlPromise(query2, []);

  let out = { quests: quests, heros: heros };
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
            INSERT INTO quests (id, name, description, wit_req, strength_req, attack_req, defense_req, magic_req)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  let latest_id = await sqlPromise("SELECT MAX(id) FROM quests", []);
  let new_id = latest_id[0]["MAX(id)"] + 1;
  let params = [
    new_id,
    name,
    description,
    wit_req,
    strength_req,
    attack_req,
    defense_req,
    magic_req,
  ];
  await sqlPromise(query, params);

  let query2 = "INSERT INTO assigned_quests (hero_id, quest_id) VALUES (?, ?)";
  await sqlPromise(query2, [-1, new_id]);

  res.redirect("/sql/quests");
});

router.post("/sql/quests/remove_quest", async (req, res) => {
  let { quest_id } = req.body;
  if (quest_id == 9000) {
    console.error("cannot delete this quest");
  } else {
    let query = "DELETE FROM quests WHERE id = ?";
    await sqlPromise(query, [quest_id]);
    let query2 = "DELETE FROM assigned_quests where quest_id = ?";
    await sqlPromise(query2, [quest_id]);
  }
  res.redirect("/sql");
});

router.post("/sql/quests/assign_quest", async (req, res) => {
  const { quest_id, hero_id } = req.body;
  if (quest_id == 9000) {
    console.error("cannot modify this quest");
  } else {
    let query = "UPDATE assigned_quests SET hero_id = ? WHERE quest_id = ?";
    await sqlPromise(query, [hero_id, quest_id]);
  }
  res.redirect("/sql");
});

module.exports = router;
