const db = require('./database');

function createUser(username, password, callback) {
  const sql = 'INSERT INTO users (username, password) VALUES (?,?)';
  db.run(sql, [username, password], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, username, password });
  });
}

module.exports = {
  createUser
};
