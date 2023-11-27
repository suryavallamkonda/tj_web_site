const sql = require("sqlite3").verbose();
const db = new sql.Database("nfl.db");
function sqlPromise(query, params) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

query1 = "SELECT * FROM stadiums";
let a = sqlPromise(query1, []);

console.log(Object.entries(a));
