const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("pokemon_database.db");

let sql = `
CREATE TABLE IF NOT EXISTS TrainerPokemon (
    id INTEGER PRIMARY KEY,
    trainer_id INTEGER,
    pokemon_id INTEGER,
    FOREIGN KEY(trainer_id) REFERENCES Trainers(trainer_id),
    FOREIGN KEY(pokemon_id) REFERENCES PokemonSpecies(id),
    CONSTRAINT max_pokemon CHECK (
        (SELECT COUNT(*) FROM TrainerPokemon WHERE trainer_id = ?) <= 6
    )
)
`;

db.run(sql, [], function (err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Rows inserted ${this.changes}`);
});

db.close();
