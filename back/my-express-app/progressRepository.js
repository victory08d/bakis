const db = require("./database");

const Question = (number, completed) => {
  return { number: number, completed: completed };
};

function generateQuestionJson(question_count) {
  let list = [];
  for (let i = 1; i < question_count; i++) {
    list.push(Question(i, false));
  }
  return list;
}

function createProgress(chapter, question_count, user_id, callback) {
  const sql =
    "INSERT INTO progress (chapter, question, user_id) VALUES (?,?,?)";
  var questions = JSON.stringify(generateQuestionJson(question_count));
  db.run(sql, [chapter, questions, user_id], function (err) {
    if (err) {
      return callback(err);
    }
  });
}

function getProgress(chapter, user_id, callback) {
  const sql = "SELECT QUESTION FROM progress WHERE USER_ID = ? and CHAPTER = ?";
  db.get(sql, [user_id, chapter], function (err, row) {
    if (err) {
      return callback(err);
    }
    console.log(row);
    callback(null, row);
  });
}

module.exports = {
  createProgress,
  getProgress,
};
