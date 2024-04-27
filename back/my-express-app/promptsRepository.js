const db = require('./database');

function getPromptByID(identification, callback) {
  const sql = 'SELECT prompt FROM questions where id = ?';
  db.get(sql, [identification], function(err, row) {
    if (err) {
      return callback(err);
    }
    callback(null, { row });
  });
}

module.exports = {
  getPromptByID
};
