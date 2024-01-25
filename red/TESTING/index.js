const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/pokedex", async (req, res) => {
  res.render("pokedex");
});

app.post("/api/data", async (req, res) => {
  let { entries } = req.body;
  const entry_bundle_size = 30;
  let start_index = entry_bundle_size * entries - (entry_bundle_size - 1);
  let end_index = entries * entry_bundle_size;
  if (end_index > 1025) end_index = 1025;
  if (start_index > 1025) res.json({ response: "No more pokemon to load" });

  console.log("got here");
  console.log(start_index, end_index);
  try {
    const pokemons = [];
    for (let i = start_index; i <= end_index; i++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );
      const pokemon_response = response.data;
      pokemons.push(pokemon_response);
    }
    res.json({ response: pokemons });
    console.log("send");
  } catch (err) {
    res.send(404).render("error", { message: "Error! Pokemon not found" });
  }
});

app.get("/pokemon/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon = response.data;

    // const pokedex_entry = await axios.get(
    //   `https://pokeapi.co/api/v2/pokemon-species/${name}`
    // );

    res.render("pokemon", { pokemon });
  } catch (err) {
    res.send(404).render("error", { message: "Error! Pokemon not found" });
  }
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
