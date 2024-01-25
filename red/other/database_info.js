//   //Table for Pokemon species
//   db.run(`
//         CREATE TABLE PokemonSpecies (
//             id INTEGER PRIMARY KEY,
//             name TEXT NOT NULL,
//             type1 TEXT NOT NULL,
//             type2 TEXT,
//             base_hp INTEGER,
//             base_attack INTEGER,
//             base_defense INTEGER,
//             base_speed INTEGER,
//             move1 INTEGER NOT NULL,
//             move2 INTEGER,
//             move3 INTEGER,
//             move4 INTEGER
//         )
//     `);

//   //Table for Pokemon moves
//   db.run(`
//         CREATE TABLE Moves (
//             id INTEGER PRIMARY KEY,
//             name TEXT NOT NULL,
//             type INTEGER NOT NULL,
//             power INTEGER,
//             accuracy INTEGER
//         )
//     `);

//   //Table for Pokemon abilities
//   db.run(`
//         CREATE TABLE Abilities (
//             id INTEGER PRIMARY KEY,
//             name TEXT NOT NULL,
//             description TEXT
//         )
//     `);

//   //Table for Pokemon evolutions
//   db.run(`
//         CREATE TABLE Evolutions (
//             id INT PRIMARY KEY,
//             from_species_id INT,
//             to_species_id INT,
//             level_requirement INT,
//         );
//     `);

//   //Table for Pokemon types
//   db.run(`
//         CREATE TABLE Types (
//             id INT PRIMARY KEY,
//             name VARCHAR(50) NOT NULL,
//         );
//     `);

// let sql = `
// CREATE TABLE TrainerPokemon (
//     id INTEGER PRIMARY KEY,
//     trainer_id INTEGER,
//     pokemon_id INTEGER,
//     FOREIGN KEY(trainer_id) REFERENCES Trainers(trainer_id),
//     FOREIGN KEY(pokemon_id) REFERENCES PokemonSpecies(id)
// )`;

// let sql = `
// CREATE TABLE Trainers (
//     trainer_id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     age INTEGER,
//     location TEXT
// )
// `;
