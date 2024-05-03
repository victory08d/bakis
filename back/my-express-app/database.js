const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database1.sqlite", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

// Create Users table
db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
);
db.run(
  "CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, prompt TEXT)"
);
db.run(
  "CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY AUTOINCREMENT, chapter TEXT, question TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES Users(id))"
);
module.exports = db;
