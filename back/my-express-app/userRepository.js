const db = require("./database");

function createUser(username, password, callback) {
  const sql = "INSERT INTO users (username, password) VALUES (?,?)";
  db.run(sql, [username, password], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, username, password });
  });
}

function getUser(username, password, callback) {
  const sql = "SELECT id FROM users where username = ? and password = ?";
  db.get(sql, [username, password], function (err, row) {
    if (err) {
      return callback(err);
    }
    callback(null, {
      id: row === undefined ? undefined : row.id,
      username,
      password,
    });
  });
}

module.exports = {
  createUser,
  getUser,
};
